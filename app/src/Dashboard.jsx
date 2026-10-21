import { useEffect, useState } from 'react'
import { supabaseClient } from './supabaseClient.js'
import './Dashboard.css'

const adminEmail = 'shahd.soliman2050@gmail.com'

function Dashboard() {
  const [session, setSession] = useState(null)
  const [authLoaded, setAuthLoaded] = useState(() => !supabaseClient)
  const [linkSent, setLinkSent] = useState(false)
  const [loadingLink, setLoadingLink] = useState(false)
  const [visitorCount, setVisitorCount] = useState(null)
  const [errorMessage, setErrorMessage] = useState(() => (
    supabaseClient ? '' : 'إعدادات Supabase غير مكتملة. أضيفي رابط المشروع والمفتاح العام إلى ملف البيئة.'
  ))

  useEffect(() => {
    if (!supabaseClient) return undefined

    let isMounted = true
    const loadSession = async () => {
      const { data, error } = await supabaseClient.auth.getSession()
      if (!isMounted) return

      if (error) {
        setErrorMessage(`تعذّر التحقق من تسجيل الدخول: ${error.message}`)
      } else {
        setSession(data.session)
        if (data.session && data.session.user.email?.toLowerCase() !== adminEmail) {
          setErrorMessage('هذا الحساب غير مصرح له بالدخول إلى لوحة الزوار.')
        }
      }
      setAuthLoaded(true)
    }

    void loadSession()
    const { data } = supabaseClient.auth.onAuthStateChange((_event, nextSession) => {
      if (isMounted) {
        setSession(nextSession)
        if (nextSession && nextSession.user.email?.toLowerCase() !== adminEmail) {
          setErrorMessage('هذا الحساب غير مصرح له بالدخول إلى لوحة الزوار.')
        }
      }
    })

    return () => {
      isMounted = false
      data.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!supabaseClient || !session || session.user.email?.toLowerCase() === adminEmail) return

    const signOutUnauthorizedUser = async () => {
      const { error } = await supabaseClient.auth.signOut()
      if (error) setErrorMessage(`تعذّر إنهاء جلسة الحساب غير المصرح له: ${error.message}`)
    }
    void signOutUnauthorizedUser()
  }, [session])

  useEffect(() => {
    if (!session || session.user.email?.toLowerCase() !== adminEmail || !supabaseClient) return undefined

    let isMounted = true
    const refreshCount = async () => {
      try {
        const { data, error } = await supabaseClient.rpc('count_active_visitors')

        if (!isMounted) return
        if (error) {
          setErrorMessage(`تعذّر تحديث عدد الزوار: ${error.message}`)
          return
        }

        setErrorMessage('')
        setVisitorCount(data)
      } catch (error) {
        if (isMounted) setErrorMessage(`تعذّر تحديث عدد الزوار: ${error.message}`)
      }
    }

    void refreshCount()
    const refreshTimer = window.setInterval(() => void refreshCount(), 10_000)

    return () => {
      isMounted = false
      window.clearInterval(refreshTimer)
    }
  }, [session])

  const sendLoginLink = async () => {
    if (!supabaseClient) {
      setErrorMessage('إعدادات Supabase غير مكتملة.')
      return
    }

    setLoadingLink(true)
    setErrorMessage('')
    try {
      const { error } = await supabaseClient.auth.signInWithOtp({
        email: adminEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/?page=dashboard`
        }
      })

      if (error) {
        setErrorMessage(`تعذّر إرسال رابط الدخول: ${error.message}`)
        return
      }

      setLinkSent(true)
    } catch (error) {
      setErrorMessage(`تعذّر إرسال رابط الدخول: ${error.message}`)
    } finally {
      setLoadingLink(false)
    }
  }

  const signOut = async () => {
    if (!supabaseClient) return

    try {
      const { error } = await supabaseClient.auth.signOut()
      if (error) {
        setErrorMessage(`تعذّر تسجيل الخروج: ${error.message}`)
        return
      }

      window.location.assign('/')
    } catch (error) {
      setErrorMessage(`تعذّر تسجيل الخروج: ${error.message}`)
    }
  }

  const isAdmin = session?.user.email?.toLowerCase() === adminEmail

  return (
    <main className="visitor-dashboard" dir="rtl" lang="ar">
      <header className="visitor-dashboard-header">
        <a href="/" className="visitor-dashboard-brand">DEARLY</a>
        {isAdmin && (
          <button className="visitor-dashboard-signout" type="button" onClick={signOut}>
            تسجيل الخروج
          </button>
        )}
      </header>

      <section className="visitor-dashboard-card" aria-live="polite">
        <p className="visitor-dashboard-eyebrow">لوحة ديرلي</p>
        <h1>زوار الموقع</h1>

        {!supabaseClient ? (
          <p className="visitor-dashboard-message">إعدادات Supabase غير مكتملة.</p>
        ) : !authLoaded ? (
          <p className="visitor-dashboard-message">جارٍ التحقق من تسجيل الدخول...</p>
        ) : isAdmin ? (
          <>
            <div className="visitor-count" aria-label={`${visitorCount ?? '—'} زائر الآن`}>
              {visitorCount ?? '—'}
            </div>
            <p className="visitor-dashboard-message">زائر نشط الآن</p>
            <p className="visitor-dashboard-caption">يتحدّث العدد تلقائيًا كل ١٠ ثوانٍ.</p>
          </>
        ) : (
          <>
            <p className="visitor-dashboard-message">
              {linkSent
                ? `أرسلنا رابط الدخول إلى ${adminEmail}. افتحي الرسالة من هذا الجهاز.`
                : `سجّلي الدخول برابط آمن يُرسل إلى ${adminEmail}.`}
            </p>
            {!linkSent && (
              <button
                className="visitor-dashboard-login"
                type="button"
                onClick={sendLoginLink}
                disabled={loadingLink}
              >
                {loadingLink ? 'جارٍ إرسال الرابط...' : 'إرسال رابط الدخول'}
              </button>
            )}
          </>
        )}

        {errorMessage && <p className="visitor-dashboard-error" role="alert">{errorMessage}</p>}
      </section>
    </main>
  )
}

export default Dashboard
