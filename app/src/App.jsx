import { useEffect, useState } from 'react'
import './App.css'

const instagramUrl = 'https://www.instagram.com/dearly_digitalstudio/'
const instagramDmUrl = 'https://ig.me/m/dearly_digitalstudio'

const templateCategories = [
  {
    id: 'all',
    label: { en: 'All templates', ar: 'كل القوالب' }
  },
  {
    id: 'weddings',
    label: { en: 'Weddings', ar: 'حفلات الزفاف' },
    types: { en: 'Wedding', ar: 'زفاف' }
  },
  {
    id: 'love-stories',
    label: { en: 'Love Stories', ar: 'حكايات حب' },
    types: { en: 'Engagement · Proposal', ar: 'الخطوبة وطلبات الزواج' }
  },
  {
    id: 'celebrations',
    label: { en: 'Celebrations', ar: 'مناسبات سعيدة' },
    types: { en: 'Birthday · Gender Reveal', ar: 'أعياد الميلاد وحفلات معرفة جنس المولود' }
  },
  {
    id: 'events',
    label: { en: 'Events', ar: 'فعاليات' },
    types: { en: 'Event websites', ar: 'الفعاليات المختلفة' }
  }
]

const templates = [
  {
    title: 'Laylat Al Omr',
    category: 'weddings',
    type: { en: 'Wedding invitation', ar: 'دعوة زفاف' },
    description: {
      en: 'An elegant Islamic-inspired invitation in rich burgundy and gold.',
      ar: 'دعوة بطابع إسلامي أنيق، تجمع بين اللون النبيتي ولمسات الذهب.'
    },
    preview: {
      en: {
        kicker: 'A WEDDING INVITATION',
        headline: 'Laylat Al Omr',
        subtitle: 'A night to remember, shared with the ones you love',
        detail: 'A celebration made meaningful'
      },
      ar: {
        kicker: 'دعوة لحفل زفاف',
        headline: 'ليلة العمر',
        subtitle: 'ليلة تجمع الأحبة وتصنع ذكرى لا تُنسى',
        detail: 'فرحتنا تحلى بوجودكم · ٢٠٢٦'
      }
    },
    previewAssets: {
      mobile: '/mobile.png',
      message: '/message.png'
    },
    href: 'https://laylat-al-omr.vercel.app/'
  },
  {
    title: 'Golden Hour',
    category: 'weddings',
    type: { en: 'Wedding invitation', ar: 'دعوة زفاف' },
    description: {
      en: 'A warm, romantic wedding invitation with soft golden details.',
      ar: 'تصميم زفاف رومانسي بألوان هادئة ولمسات ذهبية دافئة.'
    },
    preview: {
      en: {
        kicker: 'A WEDDING INVITATION',
        headline: 'Lina & Adam',
        subtitle: 'Together with their families',
        detail: '15 May 2027 · Moonlit Garden Hall'
      },
      ar: {
        kicker: 'دعوة لحفل زفاف',
        headline: 'لينا وآدم',
        subtitle: 'يسعدنا أن تشاركونا بداية حكايتنا',
        detail: '١٥ مايو ٢٠٢٧ · قاعة مونلايت جاردن'
      }
    },
    previewAssets: {
      mobile: '/LAmobile.png',
      message: '/LAinvelope.png'
    },
    href: 'https://golden-hour-sand.vercel.app/lina-adam'
  },
  {
    title: 'Birthday Plan',
    category: 'celebrations',
    type: { en: 'Birthday invitation', ar: 'دعوة عيد ميلاد' },
    description: {
      en: 'A joyful birthday surprise with a personal invitation and a day made to celebrate.',
      ar: 'مفاجأة عيد ميلاد مبهجة، بدعوة شخصية وتفاصيل تجعل اليوم احتفالًا لا يُنسى.'
    },
    preview: {
      en: {
        kicker: 'A BIRTHDAY INVITATION',
        headline: 'Happy Birthday',
        subtitle: 'A little surprise, made just for you',
        detail: 'Let the celebration begin'
      },
      ar: {
        kicker: 'دعوة عيد ميلاد',
        headline: 'عيد ميلاد سعيد',
        subtitle: 'مفاجأة صغيرة صُممت من أجلك',
        detail: 'لتبدأ الاحتفالات'
      }
    },
    previewAssets: {
      mobile: '/BDPhone.png',
      message: '/BD.png'
    },
    href: 'https://birthdayplan.vercel.app/'
  },
  {
    title: 'Chroma',
    category: 'events',
    type: { en: 'Lipgloss workshop · Event website', ar: 'موقع ورشة صناعة ملمع الشفاه' },
    description: {
      en: 'A playful event page for a hands-on lipgloss workshop, dressed in pink.',
      ar: 'صفحة مفعمة بالحيوية لورشة نصنع فيها ملمع الشفاه بألوان وردية ولمسات لامعة.'
    },
    preview: {
      en: {
        kicker: 'A CREATIVE EXPERIENCE',
        headline: 'Chroma',
        subtitle: 'A little gloss. A lot of sparkle.',
        detail: 'Lipgloss making workshop'
      },
      ar: {
        kicker: 'ورشة إبداعية',
        headline: 'Chroma',
        subtitle: 'اختاري ألوانك وابتكري ملمعك الخاص',
        detail: 'تجربة ممتعة لعاشقات الجمال'
      }
    },
    previewAssets: {
      mobile: '/chroma.png',
      message: '/chromaph.png'
    },
    href: 'https://chroma-puce-two.vercel.app/'
  }
]

const siteCopy = {
  en: {
    nav: {
      templates: 'Templates',
      approach: 'Our approach',
      gifts: 'Gifts',
      contact: 'Contact us',
      mainLabel: 'Main navigation',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      languageLabel: 'Choose site language'
    },
    hero: {
      eyebrow: 'DEARLY · DIGITAL EXPERIENCE STUDIO',
      title: 'Digital experiences,',
      titleAccent: 'made personal.',
      subtitleLead: 'Thoughtful little worlds for life’s most',
      subtitleEnding: 'meaningful moments.',
      explore: 'Explore experiences',
      instagram: 'Instagram'
    },
    templates: {
      eyebrow: 'MADE FOR YOUR MOMENT',
      heading: 'Find your kind of wonderful.',
      intro: 'Explore each design and find the one that feels like you.',
      languageLabel: 'Choose language',
      filterLabel: 'Filter templates by category',
      openTemplate: 'Open template',
      openMessages: 'Open messages',
      comingSoon: 'Something lovely is on its way.',
      comingSoonIntro: 'We’re dreaming up',
      comingSoonOutro: 'templates for this collection. In the meantime, we can create one just for you.',
      contact: 'Tell us what you have in mind',
      previewBrand: 'A DEARLY EXPERIENCE'
    },
    approach: {
      eyebrow: 'MADE AROUND YOU',
      title: 'Your idea',
      titleSecond: 'doesn’t have to',
      titleThird: 'fit a template.',
      description: 'The best experiences start with a feeling. We’ll shape the rest around what makes it yours.',
      stepsLabel: 'Project process timeline',
      steps: ['Idea', 'Design', 'Experience']
    },
    journey: {
      eyebrow: 'THE DEARLY JOURNEY',
      title: 'A lovely thing,',
      titleSecond: 'made together.',
      intro: 'Five little steps from first hello to ready to share.',
      listLabel: 'The Dearly journey',
      steps: [
        { title: 'Let’s talk', description: 'We start with your story, the occasion, and the feeling you want to share.' },
        { title: 'Share materials', description: 'Gather the words, photographs, and little details that make it yours.' },
        { title: 'We create', description: 'We shape your ideas into a thoughtful, one-of-a-kind digital experience.' },
        { title: 'Review & revisions', description: 'Share your feedback and we will refine every detail together.' },
        { title: 'Launch', description: 'Your finished experience is ready to share with the people you love.' }
      ]
    },
    gifts: {
      eyebrow: 'A LITTLE EXTRA, FROM US',
      title: 'A special gift',
      titleSecond: 'with every',
      titleThird: 'experience.',
      description: 'Something thoughtful to make the moment feel even more yours.'
    },
    promo: {
      eyebrow: 'A LITTLE SOMETHING EXTRA',
      message: 'your first Dearly experience. Let’s make it one to remember.'
    },
    closing: {
      eyebrow: 'YOUR TURN',
      title: 'Have an idea?',
      titleSecond: 'Let’s make it real.',
      contact: 'Message us on Instagram'
    },
    footer: {
      copyright: '© 2026 Dearly Studio',
      instagram: 'Instagram',
      instagramLabel: 'Instagram'
    },
    metadata: {
      title: 'Dearly | Wedding Invitations & Event Websites',
      description: 'Dearly creates thoughtful wedding invitations and custom event websites for celebrations and life’s most meaningful moments.'
    }
  },
  ar: {
    nav: {
      templates: 'القوالب',
      approach: 'كيف نعمل',
      gifts: 'هدايانا',
      contact: 'تواصلي معنا',
      mainLabel: 'القائمة الرئيسية',
      openMenu: 'افتحي القائمة',
      closeMenu: 'أغلقي القائمة',
      languageLabel: 'لغة الموقع'
    },
    hero: {
      eyebrow: 'ديرلي · نصنع تجارب رقمية',
      title: 'حكايات رقمية',
      titleAccent: 'نصمّمها لكم.',
      subtitleLead: 'نصنع تجارب رقمية دافئة تحتفي',
      subtitleEnding: 'بلحظاتكم الأجمل.',
      explore: 'اكتشفوا قوالبنا',
      instagram: 'إنستغرام'
    },
    templates: {
      eyebrow: 'لحظاتكم، بطريقتكم',
      heading: 'لكل مناسبة حكاية',
      intro: 'تصفّحوا تصاميمنا واختاروا ما يعبّر عن مناسبتكم.',
      languageLabel: 'لغة الموقع',
      filterLabel: 'تصفّح القوالب حسب المناسبة',
      openTemplate: 'شاهدي القالب',
      openMessages: 'افتحي الرسائل',
      comingSoon: 'قوالب جديدة في الطريق',
      comingSoonIntro: 'نعمل الآن على قوالب',
      comingSoonOutro: 'لتكتمل هذه المجموعة. وحتى ذلك الحين، يسعدنا تصميم تجربة خاصة بكم.',
      contact: 'شاركونا فكرتكم',
      previewBrand: 'تجربة من ديرلي'
    },
    approach: {
      eyebrow: 'نصمّمها لكم',
      title: 'فكرتكم',
      titleSecond: 'تستحق تصميمًا',
      titleThird: 'يشبهها.',
      description: 'نبدأ من فكرتكم، ونصمّم تجربة تعبّر عنها بكل تفاصيلها.',
      stepsLabel: 'مراحل تنفيذ التجربة',
      steps: ['الفكرة', 'التصميم', 'الإطلاق']
    },
    journey: {
      eyebrow: 'رحلتكم مع ديرلي',
      title: 'من أول فكرة',
      titleSecond: 'إلى لحظة المشاركة.',
      intro: 'خمس خطوات بسيطة، ونحوّل فكرتكم إلى تجربة جاهزة لتشاركوها.',
      listLabel: 'خطوات العمل مع ديرلي',
      steps: [
        { title: 'نتعرّف إلى فكرتكم', description: 'نستمع إلى فكرتكم ونتعرّف إلى مناسبتكم والأجواء التي تتمنونها.' },
        { title: 'تشاركونا التفاصيل', description: 'ترسلون لنا الصور والكلمات والتفاصيل التي تمنح التجربة طابعها الخاص.' },
        { title: 'نبدأ التصميم', description: 'نحوّل ما شاركتمونا به إلى تجربة رقمية مصممة بعناية من أجلكم.' },
        { title: 'نراجعها معًا', description: 'تطّلعون على التصميم وتشاركونا ملاحظاتكم لنصل إلى النتيجة التي تحبونها.' },
        { title: 'تصبح جاهزة للمشاركة', description: 'نطلق تجربتكم لتشاركوها مع العائلة والأصدقاء في مناسبتكم.' }
      ]
    },
    gifts: {
      eyebrow: 'لفتة محبّة من ديرلي',
      title: 'هدية خاصة',
      titleSecond: 'ترافق',
      titleThird: 'تجربتكم.',
      description: 'لأن أجمل اللحظات تستحق تفصيلة إضافية تبهجكم.'
    },
    promo: {
      eyebrow: 'هدية ترحيب من ديرلي',
      message: 'على أول تجربة تختارونها من ديرلي. لنبدأ معًا حكاية تستحق أن تُروى.'
    },
    closing: {
      eyebrow: 'والآن، دوركم',
      title: 'هل لديكم فكرة؟',
      titleSecond: 'يسعدنا أن نصنعها معكم.',
      contact: 'راسلونا على إنستغرام'
    },
    footer: {
      copyright: '© ٢٠٢٦ · ديرلي',
      instagram: 'إنستغرام',
      instagramLabel: 'إنستغرام'
    },
    metadata: {
      title: 'ديرلي | دعوات زفاف ومواقع مناسبات بتصميم خاص',
      description: 'نصمّم في ديرلي دعوات زفاف ومواقع إلكترونية للمناسبات، بتفاصيل تعبّر عنكم وتليق بأجمل لحظاتكم.'
    }
  }
}

function FlowerBranch({ side }) {
  return (
    <svg
      className={`flower-branch ${side}`}
      viewBox="0 0 70 420"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className="branch-art" transform="scale(.52 1)">
      <g className="branch-stems">
        <path d="M52 416 C82 380 37 350 61 318 C83 287 50 263 67 231 C84 199 47 177 65 145 C83 111 59 88 73 61 C81 43 77 27 82 8" />
        <path d="M58 363 C28 359 20 341 17 323 M58 331 C84 329 101 311 104 292 M58 270 C29 264 20 245 20 228 M70 229 C100 220 107 199 102 181 M59 177 C35 171 26 151 32 132 M66 147 C93 132 96 112 88 96 M71 94 C51 84 49 67 57 52" />
      </g>
      <g className="branch-leaves">
        <path d="M25 347 C12 342 8 332 10 325 C21 328 27 337 25 347Z M59 354 C69 343 80 342 87 346 C80 356 69 360 59 354Z" />
        <path d="M63 327 C53 316 42 315 35 319 C42 330 53 334 63 327Z M90 310 C98 300 110 298 117 302 C112 313 101 317 90 310Z" />
        <path d="M40 267 C27 261 22 250 25 243 C36 247 42 256 40 267Z M65 266 C74 255 86 253 93 257 C87 269 76 273 65 266Z" />
        <path d="M70 226 C59 216 48 216 41 221 C48 231 60 235 70 226Z M99 207 C107 197 118 194 124 199 C119 209 109 214 99 207Z" />
        <path d="M47 174 C36 164 25 164 18 169 C25 179 37 183 47 174Z M66 143 C76 133 87 132 94 137 C88 147 77 151 66 143Z" />
        <path d="M71 94 C62 83 52 80 45 84 C50 95 61 100 71 94Z M76 62 C84 51 94 48 101 52 C97 63 87 68 76 62Z" />
      </g>
      <g className="branch-blooms">
        <g transform="translate(24 323)">
          <circle className="branch-flower" cx="0" cy="-4" r="3" />
          <circle className="branch-flower" cx="4" cy="-1" r="3" />
          <circle className="branch-flower" cx="2" cy="4" r="3" />
          <circle className="branch-flower" cx="-3" cy="3" r="3" />
          <circle className="flower-center" r="1.6" />
        </g>
        <g transform="translate(105 291) scale(.8)">
          <circle className="branch-flower" cx="0" cy="-4" r="3" />
          <circle className="branch-flower" cx="4" cy="-1" r="3" />
          <circle className="branch-flower" cx="2" cy="4" r="3" />
          <circle className="branch-flower" cx="-3" cy="3" r="3" />
          <circle className="flower-center" r="1.6" />
        </g>
        <g transform="translate(29 226) scale(.85)">
          <circle className="branch-flower" cx="0" cy="-4" r="3" />
          <circle className="branch-flower" cx="4" cy="-1" r="3" />
          <circle className="branch-flower" cx="2" cy="4" r="3" />
          <circle className="branch-flower" cx="-3" cy="3" r="3" />
          <circle className="flower-center" r="1.6" />
        </g>
        <g transform="translate(103 178) scale(.8)">
          <circle className="branch-flower" cx="0" cy="-4" r="3" />
          <circle className="branch-flower" cx="4" cy="-1" r="3" />
          <circle className="branch-flower" cx="2" cy="4" r="3" />
          <circle className="branch-flower" cx="-3" cy="3" r="3" />
          <circle className="flower-center" r="1.6" />
        </g>
        <g transform="translate(38 131) scale(.75)">
          <circle className="branch-flower" cx="0" cy="-4" r="3" />
          <circle className="branch-flower" cx="4" cy="-1" r="3" />
          <circle className="branch-flower" cx="2" cy="4" r="3" />
          <circle className="branch-flower" cx="-3" cy="3" r="3" />
          <circle className="flower-center" r="1.6" />
        </g>
        <circle className="flower-bud" cx="91" cy="346" r="2.2" />
        <circle className="flower-bud" cx="21" cy="190" r="2" />
        <circle className="flower-bud" cx="95" cy="83" r="2" />
        <path className="falling-petal petal-one" d="M43 284 C37 278 39 272 45 269 C49 275 48 281 43 284Z" />
        <path className="falling-petal petal-two" d="M95 137 C90 131 92 126 98 123 C102 129 100 134 95 137Z" />
      </g>
      </g>
    </svg>
  )
}

function TemplateArtwork({ preview, templateAssets }) {
  const useCustomAssets = Boolean(templateAssets)

  return (
    <div className="template-artwork template-artwork-custom" aria-hidden="true">
      <span className="template-artwork-frame" />
      <div className={`template-artwork-content ${useCustomAssets ? 'template-artwork-with-assets' : ''}`}>
        {useCustomAssets ? (
          <div className="template-artwork-assets">
            <img src={templateAssets.mobile} alt="" className="template-artwork-mobile" />
            <img src={templateAssets.message} alt="" className="template-artwork-message" />
          </div>
        ) : (
          <>
            <h4>{preview.headline}</h4>
            <span className="template-artwork-divider">
              <i />
              <span className="template-ornament" />
              <i />
            </span>
            <p className="template-artwork-subtitle">{preview.subtitle}</p>
            <p className="template-artwork-detail">{preview.detail}</p>
          </>
        )}
      </div>
    </div>
  )
}

function ExternalArrowIcon() {
  return (
    <svg className="external-arrow-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M4 12 12 4M5 4h7v7" />
    </svg>
  )
}

function TimelineArrowIcon() {
  return (
    <svg className="timeline-arrow-icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M3 10h14m-5-5 5 5-5 5" />
    </svg>
  )
}

function ReelSceneDemo() {
  const [activeScene, setActiveScene] = useState('wa')
  const [recordMode, setRecordMode] = useState(false)

  useEffect(() => {
    let timers = []
    const durationMap = { wa: 7200, env: 7200, out: 5000 }

    const runSequence = (sceneId) => {
      timers.forEach((timer) => clearTimeout(timer))
      timers = []

      if (sceneId === 'all') {
        let offset = 0
        ;['wa', 'env', 'out'].forEach((id) => {
          timers.push(
            window.setTimeout(() => {
              setActiveScene(id)
            }, offset)
          )
          offset += durationMap[id]
        })
        return
      }

      setActiveScene(sceneId)
    }

    runSequence('wa')
    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [])

  const triggerSequence = (sceneId) => {
    if (sceneId === 'all') {
      const durationMap = { wa: 7200, env: 7200, out: 5000 }
      let offset = 0
      ;['wa', 'env', 'out'].forEach((id) => {
        window.setTimeout(() => setActiveScene(id), offset)
        offset += durationMap[id]
      })
      return
    }

    setActiveScene(sceneId)
  }

  const weddingDetails = {
    names: 'Lina & Adam',
    subtitle: 'Together with their families',
    date: '15 May 2027',
    venue: 'Moonlit Garden Hall',
    url: 'golden-hour-sand.vercel.app'
  }

  return (
    <div className={`reel-demo ${recordMode ? 'is-record-mode' : ''}`}>
      <div className="reel-toolbar" role="toolbar" aria-label="Reel scene controls">
        <button type="button" className="is-primary" onClick={() => triggerSequence('all')}>▶ Play all</button>
        <button type="button" className={activeScene === 'wa' ? 'is-active' : ''} onClick={() => triggerSequence('wa')}>1 · WhatsApp</button>
        <button type="button" className={activeScene === 'env' ? 'is-active' : ''} onClick={() => triggerSequence('env')}>2 · Envelope</button>
        <button type="button" className={activeScene === 'out' ? 'is-active' : ''} onClick={() => triggerSequence('out')}>3 · Outro</button>
        <button type="button" onClick={() => setRecordMode((value) => !value)}>
          {recordMode ? 'Exit record mode' : 'Record mode (H)'}
        </button>
      </div>

      <div className="reel-stage-shell">
        <div className="reel-stage">
          <section className={`reel-scene reel-scene-wa ${activeScene === 'wa' ? 'run' : ''}`}>
            <div className="reel-heading">Your wedding invitation.<i className="reel-script">Reimagined.</i></div>

            <div className="reel-phone">
              <div className="reel-phone-header"><div className="reel-avatar">L</div>{weddingDetails.names}</div>
              <div className="reel-chat">
                <div className="reel-bubble">
                  You&apos;re invited to {weddingDetails.names}&apos;s wedding 💍
                  <div className="reel-link-card">
                    <div className="reel-link-image">L&amp;A</div>
                    <div className="reel-link-text">
                      {weddingDetails.names} · Wedding Invitation
                      <u>{weddingDetails.url}</u>
                    </div>
                  </div>
                  <span className="reel-tick">✓✓</span>
                </div>
              </div>
              <div className="reel-composer"><span><em>You&apos;re invited to {weddingDetails.names}&apos;s wedding 💍</em></span></div>
            </div>

            <div className="reel-ring" />
            <div className="reel-ripple" />
          </section>

          <section className={`reel-scene reel-scene-env ${activeScene === 'env' ? 'run' : ''}`}>
            <div className="reel-cam">
              <div className="reel-env-header">
                <div className="reel-cap">A joyful invitation for you</div>
                <p>{weddingDetails.names}</p>
              </div>

              <div className="reel-envelope">
                <div className="reel-envelope-back" />
                <div className="reel-card">
                  <div className="reel-card-name">{weddingDetails.names}</div>
                  <small>{weddingDetails.date}</small>
                  <small>{weddingDetails.venue}</small>
                </div>
                <div className="reel-flap-left" />
                <div className="reel-flap-right" />
                <div className="reel-flap-bottom" />
                <div className="reel-envelope-front" />
                <div className="reel-seal"><div>L&amp;A<small>2026</small></div></div>
              </div>

              <div className="reel-cta">OPEN INVITATION</div>
            </div>
            <div className="reel-glow" />
          </section>

          <section className={`reel-scene reel-scene-out ${activeScene === 'out' ? 'run' : ''}`}>
            <div className="reel-out-mark">L&amp;A</div>
            <h2>{weddingDetails.subtitle}.<br />Their invitation.</h2>
            <div className="reel-out-line" />
            <div className="reel-out-script">{weddingDetails.date} · {weddingDetails.venue}</div>
            <div className="reel-out-brand">Golden Hour</div>
          </section>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTemplateCategory, setActiveTemplateCategory] = useState('all')
  const [siteLanguage, setSiteLanguage] = useState('en')
  const [activeJourneyStep, setActiveJourneyStep] = useState('01')
  const [journeyHasBeenOpened, setJourneyHasBeenOpened] = useState(false)
  const [activePage, setActivePage] = useState(() => {
    if (typeof window === 'undefined') return 'home'
    return window.location.hash === '#reel' ? 'reel' : 'home'
  })
  const copy = siteCopy[siteLanguage]
  const selectedJourneyStep = copy.journey.steps[Number(activeJourneyStep) - 1]
  const approachSteps = copy.approach.steps
  const visibleTemplates = templates.filter(
    (template) => activeTemplateCategory === 'all' || template.category === activeTemplateCategory
  )
  const selectedTemplateCategory = templateCategories.find(
    (category) => category.id === activeTemplateCategory
  )

  useEffect(() => {
    const syncHashRoute = () => {
      setActivePage(window.location.hash === '#reel' ? 'reel' : 'home')
    }

    window.addEventListener('hashchange', syncHashRoute)
    syncHashRoute()

    return () => window.removeEventListener('hashchange', syncHashRoute)
  }, [])

  useEffect(() => {
    document.documentElement.lang = siteLanguage
    document.documentElement.dir = siteLanguage === 'ar' ? 'rtl' : 'ltr'
    document.title = copy.metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.metadata.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', copy.metadata.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', copy.metadata.description)
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', siteLanguage === 'ar' ? 'ar_EG' : 'en_US')
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', copy.metadata.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', copy.metadata.description)
  }, [copy.metadata.description, copy.metadata.title, siteLanguage])

  if (activePage === 'reel') {
    return (
      <div className="page-shell reel-page-shell" dir={siteLanguage === 'ar' ? 'rtl' : 'ltr'} lang={siteLanguage}>
        <header className="site-header reel-header">
          <a className="brand-block" href="#home" aria-label={siteLanguage === 'ar' ? 'الرئيسية — ديرلي' : 'Dearly home'}>
            <img src="/navbarlogo.png" alt={siteLanguage === 'ar' ? 'شعار ديرلي' : 'Dearly logo'} className="brand-mark" />
          </a>

          <a className="contact-btn desktop-contact-btn" href="#home" onClick={() => setActivePage('home')}>
            {siteLanguage === 'ar' ? 'العودة للموقع' : 'Back to website'}
          </a>
        </header>

        <ReelSceneDemo />
      </div>
    )
  }

  return (
    <div
      className="page-shell"
      dir={siteLanguage === 'ar' ? 'rtl' : 'ltr'}
      lang={siteLanguage}
      onClick={(event) => {
        if (mobileMenuOpen && !event.target.closest('.mobile-menu-toggle')) {
          setMobileMenuOpen(false)
        }
      }}
    >
      <header className="site-header">
        <a className="brand-block" href="#home" aria-label={siteLanguage === 'ar' ? 'الرئيسية — ديرلي' : 'Dearly home'}>
          <img src="/navbarlogo.png" alt={siteLanguage === 'ar' ? 'شعار ديرلي' : 'Dearly logo'} className="brand-mark" />
        </a>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? copy.nav.closeMenu : copy.nav.openMenu}
          aria-expanded={mobileMenuOpen}
          aria-controls="site-navigation"
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
        >
          <span className={`menu-icon ${mobileMenuOpen ? 'is-open' : ''}`} aria-hidden="true">
            <span />
          </span>
        </button>

        <nav
          className={`main-nav ${mobileMenuOpen ? 'is-open' : ''}`}
          id="site-navigation"
          aria-label={copy.nav.mainLabel}
        >
          {[
            { label: copy.nav.templates, href: '#experiences' },
            { label: copy.nav.approach, href: '#journey' },
            { label: copy.nav.gifts, href: '#gifts' }
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label.toUpperCase()}
            </a>
          ))}

          <a
            className="contact-btn mobile-contact-btn"
            href={instagramDmUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileMenuOpen(false)}
          >
            {copy.nav.contact}
          </a>
          <a
            className="nav-link"
            href="#reel"
            onClick={() => setMobileMenuOpen(false)}
          >
            {(siteLanguage === 'ar' ? 'الفيديو' : 'REEL').toUpperCase()}
          </a>
        </nav>

        <div className="header-language-switch" role="group" aria-label={copy.nav.languageLabel}>
          <button
            type="button"
            className={siteLanguage === 'en' ? 'is-active' : ''}
            aria-pressed={siteLanguage === 'en'}
            onClick={() => setSiteLanguage('en')}
          >
            EN
          </button>
          <span aria-hidden="true">|</span>
          <button
            type="button"
            className={siteLanguage === 'ar' ? 'is-active' : ''}
            aria-pressed={siteLanguage === 'ar'}
            onClick={() => setSiteLanguage('ar')}
          >
            عربي
          </button>
        </div>

        <a
          className="contact-btn desktop-contact-btn"
          href={instagramDmUrl}
          target="_blank"
          rel="noreferrer"
        >
          {copy.nav.contact}
        </a>
      </header>

      <main id="home">
        <section className="hero-section">
          <FlowerBranch side="left" />
          <FlowerBranch side="right" />

          <div className="hero-inner">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1>
              {copy.hero.title}
              <span>{copy.hero.titleAccent}</span>
            </h1>
            <p className="subtitle">
              <span>{copy.hero.subtitleLead}</span>
              {' '}
              <span className="subtitle-ending">{copy.hero.subtitleEnding}</span>
            </p>

            <div className="hero-actions">
              <a className="primary-btn hero-primary-btn" href="#experiences">
                {copy.hero.explore}
              </a>
              <a className="secondary-btn" href="#reel">
                {siteLanguage === 'ar' ? 'عرض الفيديو' : 'View reel'}
              </a>
              <a
                className="secondary-btn"
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                {copy.hero.instagram}
              </a>
            </div>
          </div>
        </section>

        <section
          id="experiences"
          className="experiences-section"
          aria-labelledby="experiences-heading"
        >
          <div className="experiences-heading">
            <div>
              <p className="eyebrow muted">{copy.templates.eyebrow}</p>
              <h2 id="experiences-heading">{copy.templates.heading}</h2>
            </div>
            <div className="template-heading-aside">
              <p>{copy.templates.intro}</p>
            </div>
          </div>

          <div
            className="template-filters"
            role="group"
            aria-label={copy.templates.filterLabel}
          >
            {templateCategories.map((category) => (
              <button
                key={category.id}
                className={`template-filter ${activeTemplateCategory === category.id ? 'is-active' : ''}`}
                type="button"
                aria-pressed={activeTemplateCategory === category.id}
                onClick={() => setActiveTemplateCategory(category.id)}
              >
                {category.label[siteLanguage]}
              </button>
            ))}
          </div>

          {visibleTemplates.length > 0 ? (
            <div className="experience-grid" aria-live="polite">
              {visibleTemplates.map((template, index) => (
                <article
                  className={`experience-card template-card template-card-${template.category}`}
                  key={template.title}
                  style={{ '--card-index': index }}
                >
                  <div className="template-preview">
                    <div className="template-browser-bar" aria-hidden="true">
                      <span className="template-browser-dots">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="template-browser-address">{template.title}</span>
                      <svg className="template-browser-flower" viewBox="0 0 120 90" focusable="false">
                        <path d="M60 84 C56 66 63 48 60 17 M59 58 C43 48 36 37 35 24 M61 48 C77 40 84 30 87 17" />
                        <path d="M45 47 C34 47 28 41 26 34 C36 33 43 38 45 47Z M40 39 C39 28 43 21 50 18 C53 27 49 35 40 39Z M68 42 C79 42 86 37 89 30 C79 28 71 34 68 42Z M77 34 C78 24 74 17 67 14 C64 23 68 31 77 34Z" />
                        <circle cx="60" cy="12" r="3" />
                        <circle cx="53" cy="18" r="2" />
                        <circle cx="67" cy="18" r="2" />
                      </svg>
                    </div>
                    <div className="template-preview-stage template-preview-stage-chroma">
                      <TemplateArtwork
                        preview={template.preview[siteLanguage]}
                        templateAssets={template.previewAssets}
                      />
                    </div>
                  </div>
                  <div className="experience-card-copy template-card-copy">
                    <div>
                      <p className="template-type">{template.type[siteLanguage]}</p>
                      <h3>{template.title}</h3>
                      <p className="template-description">
                        {template.description[siteLanguage]}
                      </p>
                    </div>
                    <div className="template-card-actions">
                      <a href={template.href} target="_blank" rel="noreferrer">
                        {copy.templates.openTemplate} <ExternalArrowIcon />
                      </a>
                      {template.category === 'weddings' && (
                        <a
                          className="open-messages-link"
                          href={`${template.href.replace(/\/$/, '')}/messages`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {copy.templates.openMessages} <ExternalArrowIcon />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="template-empty-state" aria-live="polite">
              <span className="template-ornament" aria-hidden="true" />
              <div>
                <p className="eyebrow muted">{selectedTemplateCategory?.label[siteLanguage]}</p>
                <h3>{copy.templates.comingSoon}</h3>
                <p>
                  {copy.templates.comingSoonIntro}{' '}
                  {selectedTemplateCategory?.types[siteLanguage]}{' '}
                  {copy.templates.comingSoonOutro}
                </p>
                <a href={instagramDmUrl} target="_blank" rel="noreferrer">
                  {copy.templates.contact} <ExternalArrowIcon />
                </a>
              </div>
            </div>
          )}
        </section>

        <section className="process-section">
          <div className="process-copy">
            <p className="eyebrow muted">{copy.approach.eyebrow}</p>
            <h2>
              {copy.approach.title}
              <span>{copy.approach.titleSecond}</span>
              <span>{copy.approach.titleThird}</span>
            </h2>
            <p className="process-text">{copy.approach.description}</p>
          </div>

          <div className="timeline" aria-label={copy.approach.stepsLabel}>
            {approachSteps.map((title, index) => (
              <div key={title} className={`step ${index === approachSteps.length - 1 ? 'active' : ''}`}>
                <div className="step-line" />
                <div className="step-top">
                  <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                  {index < approachSteps.length - 1 && (
                    <span className="step-arrow">
                      <TimelineArrowIcon />
                    </span>
                  )}
                </div>
                <h3>{title}</h3>
                <div className="step-line step-line-bottom" />
              </div>
            ))}
          </div>
        </section>

        <section id="journey" className="journey-section">
          <div className="journey-heading">
            <div>
              <p className="eyebrow muted">{copy.journey.eyebrow}</p>
              <h2>
                {copy.journey.title}
                <span>{copy.journey.titleSecond}</span>
              </h2>
            </div>
            <p>{copy.journey.intro}</p>
          </div>

          <ol className="journey-track" aria-label={copy.journey.listLabel}>
            {copy.journey.steps.map((step, index) => {
              const stepId = String(index + 1).padStart(2, '0')
              const isCurrent = stepId === activeJourneyStep

              return (
                <li key={stepId} className="journey-item">
                  <button
                    type="button"
                    className={`journey-step ${isCurrent ? 'is-current' : ''}`}
                    aria-pressed={isCurrent}
                    aria-controls="journey-detail"
                    onClick={() => {
                      setActiveJourneyStep(stepId)
                      setJourneyHasBeenOpened(true)
                    }}
                  >
                    <span className="journey-dot" aria-hidden="true" />
                    <span className="journey-count">{stepId}</span>
                    <span className="journey-title">{step.title}</span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div
            className="journey-detail-panel"
            id="journey-detail"
            aria-live="polite"
            aria-atomic="true"
            hidden={!journeyHasBeenOpened}
          >
            {journeyHasBeenOpened && selectedJourneyStep && (
              <p className="journey-detail" key={activeJourneyStep}>
                {selectedJourneyStep.description}
              </p>
            )}
          </div>
        </section>

        <section id="gifts" className="gift-section">
          <div className="gift-visual" aria-hidden="true">
            <span className="gift-sprig sprig-left" />
            <span className="gift-sprig sprig-right" />
            <div className="gift-card">
              <div className="gift-bow">
                <span className="loop left" />
                <span className="loop right" />
                <span className="knot" />
              </div>
              <div className="gift-box">
                <span className="ribbon vertical" />
                <span className="ribbon horizontal" />
              </div>
            </div>
          </div>

          <div className="gift-copy">
            <p className="eyebrow muted">{copy.gifts.eyebrow}</p>
            <h2>
              <span>{copy.gifts.title}</span>
              <span>{copy.gifts.titleSecond}</span>
              <span>{copy.gifts.titleThird}</span>
            </h2>
            <p>{copy.gifts.description}</p>
          </div>
        </section>

        <section className="promo-banner">
          <div className="promo-value">
            <span>20</span>
            <small>%</small>
          </div>

          <div className="promo-copy">
            <p className="eyebrow muted">{copy.promo.eyebrow}</p>
            <p>
              <strong>{siteLanguage === 'ar' ? 'خصم ٢٠٪' : '20% OFF'}</strong>{' '}
              {copy.promo.message}
            </p>
          </div>
        </section>

        <section className="closing-cta">
          <div className="closing-copy">
            <p className="eyebrow muted">{copy.closing.eyebrow}</p>
            <h2>
              {copy.closing.title}
              <span>{copy.closing.titleSecond}</span>
            </h2>
          </div>
          <a
            className="primary-btn"
            href={instagramDmUrl}
            target="_blank"
            rel="noreferrer"
          >
            {copy.closing.contact}
          </a>
        </section>

        <footer className="site-footer">
          <p>{copy.footer.copyright}</p>
          <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label={copy.footer.instagramLabel}>
            <svg
              className="instagram-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
            </svg>
            {copy.footer.instagram}
          </a>
        </footer>
      </main>
    </div>
  )
}

export default App
