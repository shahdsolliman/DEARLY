import { useEffect, useState } from 'react'
import './App.css'

const instagramUrl = 'https://www.instagram.com/dearly_digitalstudio/'
const instagramDmUrl = 'https://ig.me/m/dearly_digitalstudio'
const whatsappInternational = '201065852613'

const getWhatsappUrl = (lang = 'ar', context = '') => {
  const defaultMsg =
    lang === 'ar'
      ? 'مرحباً ديرلي، أود الاستفسار عن تفاصيل تصميم تجربة رقمية.'
      : "Hello Dearly Studio! I'd like to ask about creating a digital experience."
  const msg = context ? `${defaultMsg} (${context})` : defaultMsg
  return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(msg)}`
}

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
      features: 'Features',
      packages: 'Packages',
      approach: 'Our approach',
      faq: 'FAQ',
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
      contact: 'Chat with us on WhatsApp',
      previewBrand: 'A DEARLY EXPERIENCE'
    },
    features: {
      eyebrow: 'THOUGHTFUL DETAILS',
      title: 'Everything your guests need,',
      titleAccent: 'made effortless.',
      intro: 'Digital invitations that replace paper with interaction, warmth, and ease.',
      items: [
        {
          id: 'rsvp',
          title: 'Smart RSVP Tracking',
          desc: 'Guests confirm attendance in seconds. Real-time headcounts organized for your seating arrangements.'
        },
        {
          id: 'location',
          title: 'One-Tap Directions',
          desc: 'Direct Google Maps integration so your guests arrive smoothly with no confusion.'
        },
        {
          id: 'music',
          title: 'Personal Soundtrack',
          desc: 'Your favorite song or gentle melody plays softly as the envelope opens.'
        },
        {
          id: 'guestbook',
          title: 'Digital Wishes & Notes',
          desc: 'A warm space where loved ones leave heartfelt blessings and messages you keep forever.'
        },
        {
          id: 'calendar',
          title: 'Calendar & Live Countdown',
          desc: 'Adds the celebration directly to phone calendars, accompanied by an exciting live countdown.'
        }
      ]
    },
    packages: {
      eyebrow: 'TRANSPARENT PACKAGES',
      title: 'Tailored for your',
      titleAccent: 'special celebration.',
      intro: 'From birthdays and love stories to workshop pages and complete wedding experiences.',
      policyTitle: 'Booking & Payment Terms',
      policyText: 'We start designing upon receiving a 50% deposit to secure your booking. The remaining balance is paid upon final review and delivery of your live invitation.',
      list: [
        {
          id: 'collection',
          name: 'Collection Template',
          tag: 'Curated & Ready',
          price: 'Starting from 200 EGP',
          note: 'Covers birthdays, love stories, events & wedding invites · 20% OFF applied',
          desc: 'Select any template from our catalog, customized with your details, photos, and music.',
          features: [
            'Any signature template from our collection',
            'Full customization of names, dates & ceremony details',
            'One-click Google Maps location button',
            'Interactive RSVP guest confirmation',
            'Custom background music of your choice',
            'Delivered in 24 - 48 hours'
          ],
          cta: 'Order via WhatsApp',
          ctaInsta: 'Or book via Instagram DM'
        },
        {
          id: 'bespoke',
          name: 'Bespoke Studio',
          tag: 'Most Loved · 100% Custom',
          isFeatured: true,
          price: 'Custom Quote',
          note: 'Tailored specifically around your vision',
          desc: 'A one-of-a-kind digital world designed from scratch around your love story and event theme.',
          features: [
            '100% exclusive concept and design from scratch',
            'Color palette & artwork matching your decor & flowers',
            'Custom animations & unique interactions',
            'Dedicated pages (Schedule, Our Story, Dress Code)',
            'Interactive RSVP & memories guestbook',
            'Priority revisions until absolute perfection'
          ],
          cta: 'Create Bespoke on WhatsApp',
          ctaInsta: 'Or discuss via Instagram DM'
        }
      ]
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
      intro: 'Five simple steps from first idea to final delivery.',
      listLabel: 'The Dearly journey',
      steps: [
        { title: 'Let’s talk', description: 'We start with your story, the occasion, and the feeling you want to share.' },
        { title: 'Details & Deposit', description: 'Share your words, photos, and ideas. We secure your booking with a 50% deposit to initiate design immediately.' },
        { title: 'We create', description: 'We shape your ideas into a thoughtful, one-of-a-kind digital experience.' },
        { title: 'Review & revisions', description: 'Share your feedback and we will refine every detail together until you are in love with it.' },
        { title: 'Delivery & Launch', description: 'Upon your final approval and settling the remaining balance, your experience is launched and ready to share.' }
      ]
    },
    faq: {
      eyebrow: 'FREQUENTLY ASKED',
      title: 'Answers to your',
      titleAccent: 'questions.',
      intro: 'Everything you need to know about creating your digital invitation with Dearly.',
      items: [
        {
          q: 'How long does it take to prepare and deliver the invitation?',
          a: 'Templates from our collection are delivered within 24 to 48 hours after receiving your details. Fully custom bespoke designs take between 4 to 7 business days.'
        },
        {
          q: 'How do I share the invitation with my guests?',
          a: 'We send you a private, lightning-fast web link. You can send it directly via WhatsApp, Instagram, or family groups. It opens seamlessly like a native app on every mobile screen.'
        },
        {
          q: 'Can we change the colors, text, or background music?',
          a: 'Yes! Every design can be customized to match your wedding color scheme, fonts, wording in Arabic or English, and any song or audio clip you love.'
        },
        {
          q: 'How does the RSVP attendance system work?',
          a: 'When your guest opens the invitation, they can tap to confirm their attendance and specify guest count. You can view all confirmed guests instantly.'
        },
        {
          q: 'What payment methods do you accept, and how does billing work?',
          a: 'We accept convenient payment methods including InstaPay, Vodafone Cash, and Bank Transfer. Work begins upon receiving a 50% deposit to confirm your booking, and the remaining balance is paid upon final review and receiving your ready link.'
        }
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
      contact: 'Chat with us on WhatsApp'
    },
    footer: {
      copyright: '© 2026 Dearly Studio',
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
      instagramLabel: 'Instagram'
    },
    metadata: {
      title: 'Dearly | Digital Invitations & Event Websites',
      description: 'Dearly creates thoughtful wedding invitations, birthdays, love stories and custom event websites for life’s most meaningful moments.'
    }
  },
  ar: {
    nav: {
      templates: 'القوالب',
      features: 'المميزات',
      packages: 'الباقات',
      approach: 'كيف نعمل',
      faq: 'الأسئلة الشائعة',
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
      contact: 'تواصلوا معنا عبر واتساب',
      previewBrand: 'تجربة من ديرلي'
    },
    features: {
      eyebrow: 'تفاصيل تصنع الفارق',
      title: 'كل ما يحتاجه ضيوفكم،',
      titleAccent: 'في تجربة واحدة أنيقة.',
      intro: 'دعوة رقمية ذكية تجمع بين الجمال، التفاعل، وسهولة وصول أحبتكم لمشاركتكم الفرحة.',
      items: [
        {
          id: 'rsvp',
          title: 'تأكيد الحضور الذكي (RSVP)',
          desc: 'يؤكد ضيوفكم حضورهم بلمسة واحدة، لتصلكم قائمة دقيقة ومنظمة تسّهل عليكم ترتيب مقاعد القاعة.'
        },
        {
          id: 'location',
          title: 'خريطة القاعة المباشرة',
          desc: 'زر مباشر يفتح موقع الحفل على خرائط Google Maps لتفادي أي ارتباك أو تأخير.'
        },
        {
          id: 'music',
          title: 'موسيقاكم وأغنيتكم المفضلة',
          desc: 'تُعزف نغماتكم المختارة بنعومة فور فتح الظرف لتنقل أحبتكم إلى أجواء فرحتكم.'
        },
        {
          id: 'guestbook',
          title: 'دفتر تهاني وذكريات الأحبة',
          desc: 'ركن دافئ يترك فيه الأهل والأصدقاء أرق الكلمات والتمنيات لتبقى ذكرى جميلة لمدى الحياة.'
        },
        {
          id: 'calendar',
          title: 'تذكير بالتقويم وعدّ تنازلي',
          desc: 'إضافة موعد المناسبة لتقويم هاتف الضيوف بنقرة واحدة، مع عدّ تنازلي يزيد حماس اليوم المنتظر.'
        }
      ]
    },
    packages: {
      eyebrow: 'باقات ديرلي',
      title: 'اختر الباقة الأنسب',
      titleAccent: 'لمناسبتكم.',
      intro: 'تصاميم تناسب مختلف المناسبات من أعياد الميلاد وحكايات الحب إلى الفعاليات وحفلات الزفاف.',
      policyTitle: 'نظام الدفع وتأكيد الحجز',
      policyText: 'نبدأ العمل وتجهيز التصميم فور استلام عربون (Deposit) ٥٠٪ لتأكيد حجزكم، ويتم سداد باقي المبلغ عند المراجعة النهائية واستلام الرابط جاهزاً للمشاركة.',
      list: [
        {
          id: 'collection',
          name: 'قالب من مجموعتنا',
          tag: 'جاهز ومميز',
          price: 'تبدأ من ٢٠٠ ج.م',
          note: 'تناسب مختلف المناسبات (أعياد ميلاد، حكايات حب، فعاليات، وزفاف) · يشملها خصم ٢٠٪',
          desc: 'اختيار أي تصميم من قوالبنا المميزة مع تخصيص كامل للأسماء وتفاصيل الحفل والموسيقى.',
          features: [
            'أي قالب تختارونه من مجموعتنا المميزة',
            'تخصيص كامل للأسماء والتواريخ وتفاصيل اليوم',
            'خريطة Google Maps للوصول بضغطة زر',
            'نظام تأكيد الحضور الذكي (RSVP)',
            'إضافة مقطوعتكم الموسيقية المفضلة',
            'تسليم فوري خلال ٢٤ إلى ٤٨ ساعة'
          ],
          cta: 'احجز عبر واتساب',
          ctaInsta: 'أو احجز عبر إنستغرام DM'
        },
        {
          id: 'bespoke',
          name: 'تصميم خاص بالكامل (Bespoke)',
          tag: 'الأكثر طلباً · حصري لكم',
          isFeatured: true,
          price: 'حسب التفاصيل',
          note: 'تواصلوا معنا لمشاركة فكرتكم وثيم ليلتكم',
          desc: 'عالم رقمي متفرد يُصمم من الصفر خصيصاً لكم ليعكس ثيم وألوان وقصة مناسبتكم بكل تفاصيلها.',
          features: [
            'فكرة وهوية بصرية حصرية ١٠٠٪ من الصفر',
            'رسومات وزخارف متوافقة مع ديكور وثيم الحفل',
            'تأثيرات وحركات تفاعلية مبتكرة خاصة بكم',
            'صفحات فرعية (برنامج اليوم، قصة اللقاء، الدريس كود)',
            'نظام RSVP متقدم ودفتر تهاني تفاعلي',
            'متابعة شخصية وتعديلات حتى الرضا التام'
          ],
          cta: 'صمّم فكرتك عبر واتساب',
          ctaInsta: 'أو ناقش فكرتك عبر إنستغرام DM'
        }
      ]
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
        { title: 'التفاصيل والعربون', description: 'تشاركونا الصور والكلمات والتفاصيل، ونؤكد الحجز بدفع عربون (Deposit) ٥٠٪ لنبدأ العمل والتصميم مباشرة.' },
        { title: 'نبدأ التصميم', description: 'نحوّل ما شاركتمونا به إلى تجربة رقمية مصممة بعناية من أجلكم.' },
        { title: 'نراجعها معًا', description: 'تطّلعون على التصميم وتشاركونا ملاحظاتكم لنصل إلى النتيجة التي تحبونها.' },
        { title: 'الاستلام والإطلاق', description: 'بعد مراجعتكم للتصميم واعتماده وسداد باقي المبلغ، نطلق تجربتكم فوراً لتشاركوها مع العائلة والأصدقاء.' }
      ]
    },
    faq: {
      eyebrow: 'الأسئلة الشائعة',
      title: 'كل ما تحتاجون معرفته',
      titleAccent: 'قبل البدء.',
      intro: 'إجابات واضحة ومباشرة عن كافة تساؤلاتكم حول دعوات ومواقع ديرلي الرقمية.',
      items: [
        {
          q: 'كم يستغرق تجهيز الدعوة وتسليمها؟',
          a: 'القوالب الجاهزة من مجموعتنا تُسلّم خلال ٢٤ إلى ٤٨ ساعة بعد استلام بياناتكم. أما التصاميم الخاصة بالكامل (Bespoke) فتستغرق من ٤ إلى ٧ أيام عمل.'
        },
        {
          q: 'كيف أشارك الدعوة مع ضيوفي؟',
          a: 'نرسل لكم رابطاً خاصاً وسريعاً للغاية، يمكنكم إرساله بنقرة واحدة عبر واتساب أو وضعه في رسائل العائلة. ويفتح بشكل تفاعلي مبهر على جميع الهواتف.'
        },
        {
          q: 'هل يمكن تعديل الألوان، الموسيقى، أو الكلمات؟',
          a: 'نعم بالتأكيد! كل قالب قابل للتعديل كاملاً ليناسب ألوان ثيم الحفل، ونبرة الكلمات باللغة العربية أو الإنجليزية، واختيار المقطع الموسيقي المحبب لديكم.'
        },
        {
          q: 'كيف يعمل نظام تأكيد الحضور (RSVP)؟',
          a: 'يجد الضيف زراً سهلاً لتأكيد حضوره وتحديد عدد الأفراد المرافقين، وتصلكم التأكيدات مباشرة في لوحة تحكم منظمة لترتيب المقاعد والحضور بكل راحة.'
        },
        {
          q: 'ما هي طرق الدفع المتاحة؟ وكيف يتم سداد الحساب؟',
          a: 'نوفر طرق دفع سهلة وسريعة (إنستاباي InstaPay، فودافون كاش، أو التحويل البنكي). نبدأ العمل فور استلام عربون (Deposit) ٥٠٪ لتأكيد الحجز وتجهيز التصميم، ويتم سداد باقي المبلغ عند الاستلام والمراجعة النهائية للتصميم.'
        }
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
      contact: 'تواصلوا معنا عبر واتساب'
    },
    footer: {
      copyright: '© ٢٠٢٦ · ديرلي',
      whatsapp: 'واتساب',
      instagram: 'إنستغرام',
      instagramLabel: 'إنستغرام'
    },
    metadata: {
      title: 'ديرلي | دعوات ومواقع مناسبات بتصميم خاص',
      description: 'نصمّم في ديرلي دعوات زفاف ومواقع إلكترونية للمناسبات وأعياد الميلاد، بتفاصيل تعبّر عنكم وتليق بأجمل لحظاتكم.'
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

function WhatsAppIcon({ className = 'whatsapp-icon' }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function InstagramSmallIcon({ className = 'insta-icon' }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg className="chevron-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="check-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M3.5 8.5l3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function FeatureIcon({ type }) {
  if (type === 'rsvp') {
    return (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
  if (type === 'location') {
    return (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    )
  }
  if (type === 'music') {
    return (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    )
  }
  if (type === 'guestbook') {
    return (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
        <path d="M6 14h6" />
      </svg>
    )
  }
  return (
    <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="12" cy="15" r="1.5" />
    </svg>
  )
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTemplateCategory, setActiveTemplateCategory] = useState('all')
  const [siteLanguage, setSiteLanguage] = useState('en')
  const [activeJourneyStep, setActiveJourneyStep] = useState('01')
  const [journeyHasBeenOpened, setJourneyHasBeenOpened] = useState(false)
  const [activeFaq, setActiveFaq] = useState(null)
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
            { label: copy.nav.features, href: '#features' },
            { label: copy.nav.packages, href: '#packages' },
            { label: copy.nav.approach, href: '#journey' },
            { label: copy.nav.faq, href: '#faq' },
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
            href={getWhatsappUrl(siteLanguage)}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <WhatsAppIcon />
            <span>{copy.nav.contact}</span>
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
          href={getWhatsappUrl(siteLanguage)}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon />
          <span>{copy.nav.contact}</span>
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
                <a href={getWhatsappUrl(siteLanguage, selectedTemplateCategory?.label[siteLanguage])} target="_blank" rel="noreferrer">
                  <WhatsAppIcon />
                  <span>{copy.templates.contact}</span>
                </a>
              </div>
            </div>
          )}
        </section>

        <section id="features" className="features-section" aria-labelledby="features-heading">
          <div className="section-head text-center">
            <p className="eyebrow muted">{copy.features.eyebrow}</p>
            <h2 id="features-heading">
              {copy.features.title}
              <span>{copy.features.titleAccent}</span>
            </h2>
            <p className="section-intro">{copy.features.intro}</p>
          </div>

          <div className="features-grid">
            {copy.features.items.map((item, index) => (
              <article key={item.id} className="feature-card">
                <span className="feature-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="feature-icon-wrap" aria-hidden="true">
                  <FeatureIcon type={item.id} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="packages" className="packages-section" aria-labelledby="packages-heading">
          <div className="section-head text-center">
            <p className="eyebrow muted">{copy.packages.eyebrow}</p>
            <h2 id="packages-heading">
              {copy.packages.title}
              <span>{copy.packages.titleAccent}</span>
            </h2>
            <p className="section-intro">{copy.packages.intro}</p>
          </div>

          <div className="packages-grid">
            {copy.packages.list.map((pkg) => (
              <div
                key={pkg.id}
                className={`package-card ${pkg.isFeatured ? 'is-featured' : ''}`}
              >
                {pkg.isFeatured && (
                  <span className="package-ribbon">{pkg.tag}</span>
                )}
                <div className="package-header">
                  {!pkg.isFeatured && <span className="package-tag">{pkg.tag}</span>}
                  <h3>{pkg.name}</h3>
                  <div className="package-price">
                    <span className="price-value">{pkg.price}</span>
                  </div>
                  <p className="package-note">{pkg.note}</p>
                  <p className="package-description">{pkg.desc}</p>
                </div>

                <ul className="package-features" aria-label={pkg.name}>
                  {pkg.features.map((feat) => (
                    <li key={feat}>
                      <CheckIcon />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="package-actions">
                  <a
                    className={`package-btn ${pkg.isFeatured ? 'primary-btn' : 'secondary-btn'}`}
                    href={getWhatsappUrl(siteLanguage, pkg.name)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsAppIcon />
                    <span>{pkg.cta}</span>
                  </a>
                  <a
                    className="package-btn-insta"
                    href={instagramDmUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <InstagramSmallIcon />
                    <span>{pkg.ctaInsta}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {copy.packages.policyText && (
            <div className="packages-payment-policy">
              <span className="policy-badge">
                <CheckIcon />
                <span>{copy.packages.policyTitle}</span>
              </span>
              <p>{copy.packages.policyText}</p>
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

        <section id="faq" className="faq-section" aria-labelledby="faq-heading">
          <div className="section-head text-center">
            <p className="eyebrow muted">{copy.faq.eyebrow}</p>
            <h2 id="faq-heading">
              {copy.faq.title}
              <span>{copy.faq.titleAccent}</span>
            </h2>
            <p className="section-intro">{copy.faq.intro}</p>
          </div>

          <div className="faq-accordion">
            {copy.faq.items.map((item, index) => {
              const isOpen = activeFaq === index
              return (
                <div
                  key={item.q}
                  className={`faq-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <ChevronDownIcon />
                    </span>
                  </button>
                  <div className="faq-answer" hidden={!isOpen}>
                    <p>{item.a}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="faq-footer-help">
            <p>
              {siteLanguage === 'ar' ? 'لديك استفسار آخر أو طلب خاص؟' : 'Have a special request or another question?'}{' '}
              <a
                href={getWhatsappUrl(siteLanguage, 'FAQ inquiry')}
                target="_blank"
                rel="noreferrer"
              >
                {siteLanguage === 'ar' ? 'تحدث معنا مباشرة عبر واتساب' : 'Chat directly with us on WhatsApp'}
              </a>
            </p>
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
        </section>

        <footer className="site-footer">
          <p>{copy.footer.copyright}</p>
          <div className="footer-links">
            <a
              href={getWhatsappUrl(siteLanguage)}
              target="_blank"
              rel="noreferrer"
              className="footer-whatsapp-link"
              aria-label={copy.footer.whatsapp}
            >
              <WhatsAppIcon />
              <span>{copy.footer.whatsapp}</span>
            </a>
            <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label={copy.footer.instagramLabel}>
              <InstagramSmallIcon className="instagram-icon" />
              <span>{copy.footer.instagram}</span>
            </a>
          </div>
        </footer>

        <a
          href={getWhatsappUrl(siteLanguage)}
          target="_blank"
          rel="noreferrer"
          className="floating-whatsapp"
          aria-label={siteLanguage === 'ar' ? 'تواصل معنا عبر واتساب' : 'Chat on WhatsApp'}
        >
          <WhatsAppIcon />
          <span className="floating-whatsapp-text">
            {siteLanguage === 'ar' ? 'واتساب' : 'WhatsApp'}
          </span>
        </a>
      </main>
    </div>
  )
}

export default App
