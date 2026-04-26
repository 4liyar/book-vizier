import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Plus, Search, Edit3, Trash2, Award, TrendingUp, Settings, LogOut, User, Upload, FileText, Sparkles, Bell, X, Check, Moon, Sun, Globe, Link2, BarChart3, Target, Flame, ChevronRight, Feather, Scroll, Crown, Loader, PenTool, Quote, RefreshCw } from 'lucide-react';

// ============ LOCALIZATION ============
const translations = {
  en: {
    appName: 'Book Vizier',
    tagline: 'Sally forth to your literary dreams with this powerful tool',
    signIn: 'Sign In', signUp: 'Sign Up', signOut: 'Sign Out',
    username: 'Username', password: 'Password',
    haveAccount: 'Have an account?', noAccount: 'New scribe?',
    dashboard: 'Library', projects: 'Projects', profile: 'Profile',
    settings: 'Settings', vizier: 'The Vizier',
    newProject: 'New Manuscript', searchBooks: 'Search manuscripts...',
    projectName: 'Manuscript Title', categories: 'Genres',
    wordCount: 'Target Word Count', milestones: 'Milestones',
    create: 'Inscribe', cancel: 'Cancel', save: 'Preserve',
    edit: 'Edit', delete: 'Remove', confirm: 'Confirm',
    progress: 'Progress', achievements: 'Achievements',
    totalWords: 'Words Written', remaining: 'Remaining',
    completion: 'Completion', addWords: 'Add Words',
    badges: 'Honors', noProjects: 'No manuscripts yet. Begin your first work.',
    uploadFile: 'Upload Manuscript', connectGoogle: 'Connect Google Docs',
    analyzing: 'The Vizier contemplates...', vizierAdvice: 'Counsel of the Vizier',
    suggestions: 'Recommended Readings', language: 'Language',
    theme: 'Theme', lightMode: 'Light', darkMode: 'Dark',
    logOut: 'Sign out?', yes: 'Yes', no: 'No',
    minWords: 'Min 1000', maxWords: 'Max 200,000',
    activeProjects: 'Active Works', completedWorks: 'Completed Works',
    member: 'Author since', chooseFile: 'Choose file (.docx, .txt, .pdf)',
    analyzeWriting: 'Analyze Manuscript', grammarCheck: 'Grammar & Style',
    consistency: 'Consistency Analysis', insights: 'Progress Insights',
    bronze: 'Bronze Quill', silver: 'Silver Quill', gold: 'Gold Quill',
    firstThird: 'First Third Complete', secondThird: 'Two Thirds Complete', fullComplete: 'Manuscript Complete',
    day: 'day', days: 'days', streak: 'Writing Streak',
    selectProject: 'Select a manuscript',
    googleConnected: 'Google Docs Connected',
    googleConnectPrompt: 'Connect your Google account to sync documents',
    authorize: 'Authorize',
    fetchDoc: 'Fetch Document',
    passwordRule: 'Min 8 characters, 1 special character',
    usernameExists: 'This name is already inscribed',
    welcome: 'Welcome, Author',
    beginJourney: 'Begin your literary journey',
    projectLimit: 'Maximum 15 active manuscripts',
    categoryLimit: '1-3 genres required',
    milestoneRange: '3-10 milestones',
    projectCreated: 'Manuscript inscribed',
    vizierWelcome: 'I am the Vizier. I shall observe your craft, counsel your hand, and illuminate your path. Share with me your manuscript, and I shall divine its nature.',
    noSuggestions: 'Complete your manuscript setup to receive counsel',
    daysSince: 'Days since last writing',
    assignToProject: 'Select a manuscript to assign this analysis',
    assign: 'Assign',
    skip: 'Skip',
    progressSynced: 'Progress synced to manuscript',
    linkedDocs: 'Linked Documents',
    update: 'Update',
    noLinkedDocs: 'No documents linked yet',
    linkedToProject: 'Linked to',
    lastSynced: 'Last synced',
    extractError: 'Could not extract text from this file',
    unsupportedFormat: 'Unsupported file format',
    extracting: 'Extracting manuscript...',
    noActiveProjects: 'You have no active manuscripts. Create one first.',
    currentWords: 'Current',
    newWords: 'From file',
    // NEW STRINGS
    chooseAvatar: 'Choose Your Companion',
    avatarHint: 'Pick a character to represent you on your literary path',
    changeAvatar: 'Change Companion',
    selectCategory: 'Choose a length',
    customLength: 'Or set a custom target',
    wordRange: 'words',
    shortForm: 'Short Form',
    shortFormDesc: 'Essays, short stories, poetry collections',
    midLength: 'Mid Length',
    midLengthDesc: 'Novellas, technical guides, memoirs',
    longForm: 'Long Form',
    longFormDesc: 'Standard novels, biographies, textbooks',
    extendedWorks: 'Extended Works',
    extendedWorksDesc: 'Epic fantasy, comprehensive treatises',
    motivationOfTheDay: 'Today\'s Counsel',
    refresh: 'Refresh',
    yourHonors: 'Your honors shall appear here as your manuscripts grow.',
    earnFirstQuill: 'Write to earn your first quill...',
    sentences: 'Sentences',
    paragraphs: 'Paragraphs',
    avgPerSentence: 'Avg/Sentence',
    diversity: 'Diversity',
    disconnect: 'Disconnect',
    enterDocUrl: 'Enter a Google Doc URL',
    docRetrieved: 'Document retrieved',
    manuscriptAnalyzed: 'Manuscript analyzed',
    invalidCredentials: 'Invalid credentials',
    disconnected: 'Disconnected',
    unlink: 'Unlink',
    notice: 'Notice',
    avatarLabels: {
      scribe: 'The Scribe',
      scholar: 'The Scholar',
      poet: 'The Poet',
      sage: 'The Sage',
      muse: 'The Muse',
      wanderer: 'The Wanderer',
      calligrapher: 'The Calligrapher',
      chronicler: 'The Chronicler',
    },
  },
  ar: {
    appName: 'وزير الكتاب',
    tagline: 'انطلق نحو أحلامك الأدبية بهذه الأداة القوية',
    signIn: 'تسجيل الدخول', signUp: 'إنشاء حساب', signOut: 'خروج',
    username: 'اسم المستخدم', password: 'كلمة المرور',
    haveAccount: 'لديك حساب؟', noAccount: 'كاتب جديد؟',
    dashboard: 'المكتبة', projects: 'المشاريع', profile: 'الملف الشخصي',
    settings: 'الإعدادات', vizier: 'الوزير',
    newProject: 'مخطوطة جديدة', searchBooks: 'ابحث في المخطوطات...',
    projectName: 'عنوان المخطوطة', categories: 'الأنواع',
    wordCount: 'عدد الكلمات المستهدف', milestones: 'المراحل',
    create: 'سجّل', cancel: 'إلغاء', save: 'احفظ',
    edit: 'تعديل', delete: 'حذف', confirm: 'تأكيد',
    progress: 'التقدم', achievements: 'الإنجازات',
    totalWords: 'الكلمات المكتوبة', remaining: 'المتبقي',
    completion: 'الإنجاز', addWords: 'أضف كلمات',
    badges: 'الأوسمة', noProjects: 'لا توجد مخطوطات. ابدأ عملك الأول.',
    uploadFile: 'ارفع المخطوطة', connectGoogle: 'اربط مستندات جوجل',
    analyzing: 'الوزير يتأمل...', vizierAdvice: 'نصيحة الوزير',
    suggestions: 'قراءات موصى بها', language: 'اللغة',
    theme: 'المظهر', lightMode: 'فاتح', darkMode: 'داكن',
    logOut: 'هل تريد تسجيل الخروج؟', yes: 'نعم', no: 'لا',
    minWords: 'الحد الأدنى ١٠٠٠', maxWords: 'الحد الأقصى ٢٠٠٬٠٠٠',
    activeProjects: 'الأعمال النشطة', completedWorks: 'الأعمال المكتملة',
    member: 'كاتب منذ', chooseFile: 'اختر ملف (.docx, .txt, .pdf)',
    analyzeWriting: 'تحليل المخطوطة', grammarCheck: 'النحو والأسلوب',
    consistency: 'تحليل الاتساق', insights: 'رؤى التقدم',
    bronze: 'الريشة البرونزية', silver: 'الريشة الفضية', gold: 'الريشة الذهبية',
    firstThird: 'اكتمل الثلث الأول', secondThird: 'اكتمل الثلثان', fullComplete: 'اكتملت المخطوطة',
    day: 'يوم', days: 'أيام', streak: 'سلسلة الكتابة',
    selectProject: 'اختر مخطوطة',
    googleConnected: 'مستندات جوجل متصلة',
    googleConnectPrompt: 'اربط حسابك في جوجل لمزامنة المستندات',
    authorize: 'تفويض',
    fetchDoc: 'جلب المستند',
    passwordRule: '٨ أحرف على الأقل، رمز خاص واحد',
    usernameExists: 'هذا الاسم مسجل بالفعل',
    welcome: 'أهلاً، أيها الكاتب',
    beginJourney: 'ابدأ رحلتك الأدبية',
    projectLimit: '١٥ مخطوطة نشطة كحد أقصى',
    categoryLimit: '١-٣ أنواع مطلوبة',
    milestoneRange: '٣-١٠ مراحل',
    projectCreated: 'تم تسجيل المخطوطة',
    vizierWelcome: 'أنا الوزير. سأراقب حرفتك، وأرشد يدك، وأنير طريقك. شاركني مخطوطتك وسأستشف طبيعتها.',
    noSuggestions: 'أكمل إعداد مخطوطتك لتلقي النصيحة',
    daysSince: 'الأيام منذ آخر كتابة',
    assignToProject: 'اختر مخطوطة لإسناد هذا التحليل إليها',
    assign: 'إسناد',
    skip: 'تخطي',
    progressSynced: 'تم مزامنة التقدم مع المخطوطة',
    linkedDocs: 'المستندات المرتبطة',
    update: 'تحديث',
    noLinkedDocs: 'لا توجد مستندات مرتبطة بعد',
    linkedToProject: 'مرتبط بـ',
    lastSynced: 'آخر مزامنة',
    extractError: 'تعذر استخراج النص من هذا الملف',
    unsupportedFormat: 'صيغة ملف غير مدعومة',
    extracting: 'جاري استخراج المخطوطة...',
    noActiveProjects: 'ليس لديك مخطوطات نشطة. أنشئ واحدة أولاً.',
    currentWords: 'الحالي',
    newWords: 'من الملف',
    // NEW STRINGS
    chooseAvatar: 'اختر رفيقك',
    avatarHint: 'اختر شخصية تمثلك في رحلتك الأدبية',
    changeAvatar: 'تغيير الرفيق',
    selectCategory: 'اختر طولاً',
    customLength: 'أو حدد هدفاً مخصصاً',
    wordRange: 'كلمة',
    shortForm: 'النص القصير',
    shortFormDesc: 'مقالات، قصص قصيرة، مجموعات شعرية',
    midLength: 'النص المتوسط',
    midLengthDesc: 'روايات قصيرة، أدلة تقنية، مذكرات',
    longForm: 'النص الطويل',
    longFormDesc: 'روايات معتادة، سير ذاتية، كتب دراسية',
    extendedWorks: 'الأعمال الموسعة',
    extendedWorksDesc: 'ملاحم، مؤلفات شاملة',
    motivationOfTheDay: 'كلمة اليوم',
    refresh: 'تحديث',
    yourHonors: 'ستظهر أوسمتك هنا مع نمو مخطوطاتك.',
    earnFirstQuill: 'اكتب لتنال ريشتك الأولى...',
    sentences: 'الجمل',
    paragraphs: 'الفقرات',
    avgPerSentence: 'متوسط/الجملة',
    diversity: 'التنوع',
    disconnect: 'قطع الاتصال',
    enterDocUrl: 'أدخل رابط مستند جوجل',
    docRetrieved: 'تم استرجاع المستند',
    manuscriptAnalyzed: 'تم تحليل المخطوطة',
    invalidCredentials: 'بيانات اعتماد غير صحيحة',
    disconnected: 'تم قطع الاتصال',
    unlink: 'إلغاء الربط',
    notice: 'تنبيه',
    avatarLabels: {
      scribe: 'الناسخ',
      scholar: 'العالم',
      poet: 'الشاعر',
      sage: 'الحكيم',
      muse: 'الملهم',
      wanderer: 'الرحّالة',
      calligrapher: 'الخطّاط',
      chronicler: 'المؤرّخ',
    },
  },
  fa: {
    appName: 'وزیر کتاب',
    tagline: 'به سوی رویاهای ادبی خود با این ابزار توانمند گام بردارید',
    signIn: 'ورود', signUp: 'ثبت نام', signOut: 'خروج',
    username: 'نام کاربری', password: 'گذرواژه',
    haveAccount: 'حساب دارید؟', noAccount: 'نویسنده جدید؟',
    dashboard: 'کتابخانه', projects: 'پروژه‌ها', profile: 'نمایه',
    settings: 'تنظیمات', vizier: 'وزیر',
    newProject: 'دست‌نوشته جدید', searchBooks: 'جستجو در دست‌نوشته‌ها...',
    projectName: 'عنوان دست‌نوشته', categories: 'ژانرها',
    wordCount: 'تعداد کلمات هدف', milestones: 'مراحل',
    create: 'ثبت کن', cancel: 'لغو', save: 'ذخیره',
    edit: 'ویرایش', delete: 'حذف', confirm: 'تایید',
    progress: 'پیشرفت', achievements: 'دستاوردها',
    totalWords: 'کلمات نوشته شده', remaining: 'باقی‌مانده',
    completion: 'تکمیل', addWords: 'افزودن کلمات',
    badges: 'نشان‌ها', noProjects: 'هنوز دست‌نوشته‌ای نیست. اولین اثر خود را آغاز کنید.',
    uploadFile: 'بارگذاری دست‌نوشته', connectGoogle: 'اتصال به گوگل داکس',
    analyzing: 'وزیر در اندیشه است...', vizierAdvice: 'رایزنی وزیر',
    suggestions: 'کتاب‌های پیشنهادی', language: 'زبان',
    theme: 'پوسته', lightMode: 'روشن', darkMode: 'تیره',
    logOut: 'از حساب خارج می‌شوید؟', yes: 'بله', no: 'خیر',
    minWords: 'حداقل ۱۰۰۰', maxWords: 'حداکثر ۲۰۰٬۰۰۰',
    activeProjects: 'آثار فعال', completedWorks: 'آثار تکمیل شده',
    member: 'نویسنده از', chooseFile: 'فایل انتخاب کنید (.docx, .txt, .pdf)',
    analyzeWriting: 'تحلیل دست‌نوشته', grammarCheck: 'دستور و سبک',
    consistency: 'تحلیل انسجام', insights: 'بینش‌های پیشرفت',
    bronze: 'قلم برنزی', silver: 'قلم نقره‌ای', gold: 'قلم طلایی',
    firstThird: 'یک سوم کامل شد', secondThird: 'دو سوم کامل شد', fullComplete: 'دست‌نوشته کامل شد',
    day: 'روز', days: 'روز', streak: 'رشته نویسندگی',
    selectProject: 'یک دست‌نوشته انتخاب کنید',
    googleConnected: 'گوگل داکس متصل شد',
    googleConnectPrompt: 'حساب گوگل خود را برای همگام‌سازی اسناد متصل کنید',
    authorize: 'تفویض اختیار',
    fetchDoc: 'دریافت سند',
    passwordRule: 'حداقل ۸ نویسه، یک نماد ویژه',
    usernameExists: 'این نام قبلاً ثبت شده است',
    welcome: 'خوش آمدید، نویسنده',
    beginJourney: 'سفر ادبی خود را آغاز کنید',
    projectLimit: 'حداکثر ۱۵ دست‌نوشته فعال',
    categoryLimit: '۱ تا ۳ ژانر لازم است',
    milestoneRange: '۳ تا ۱۰ مرحله',
    projectCreated: 'دست‌نوشته ثبت شد',
    vizierWelcome: 'من وزیر هستم. به هنر شما خواهم نگریست، دست شما را راهنمایی خواهم کرد، و راه شما را روشن خواهم ساخت. دست‌نوشته خود را با من در میان بگذارید تا ماهیت آن را دریابم.',
    noSuggestions: 'تنظیمات دست‌نوشته خود را کامل کنید تا مشاوره دریافت کنید',
    daysSince: 'روزهای از آخرین نویسندگی',
    assignToProject: 'یک دست‌نوشته برای اختصاص این تحلیل انتخاب کنید',
    assign: 'اختصاص',
    skip: 'رد کردن',
    progressSynced: 'پیشرفت با دست‌نوشته همگام‌سازی شد',
    linkedDocs: 'اسناد متصل',
    update: 'به‌روزرسانی',
    noLinkedDocs: 'هنوز سندی متصل نشده است',
    linkedToProject: 'متصل به',
    lastSynced: 'آخرین همگام‌سازی',
    extractError: 'نمی‌توان متن را از این فایل استخراج کرد',
    unsupportedFormat: 'قالب فایل پشتیبانی نمی‌شود',
    extracting: 'در حال استخراج دست‌نوشته...',
    noActiveProjects: 'شما دست‌نوشته فعالی ندارید. ابتدا یکی ایجاد کنید.',
    currentWords: 'فعلی',
    newWords: 'از فایل',
    // NEW STRINGS
    chooseAvatar: 'همراه خود را برگزینید',
    avatarHint: 'شخصیتی برگزینید تا در راه ادبی نماینده شما باشد',
    changeAvatar: 'تغییر همراه',
    selectCategory: 'یک طول برگزینید',
    customLength: 'یا یک هدف دلخواه تعیین کنید',
    wordRange: 'واژه',
    shortForm: 'نوشتار کوتاه',
    shortFormDesc: 'مقاله، داستان کوتاه، مجموعه شعر',
    midLength: 'نوشتار میانه',
    midLengthDesc: 'رمان کوتاه، راهنمای فنی، خاطرات',
    longForm: 'نوشتار بلند',
    longFormDesc: 'رمان معمول، زندگی‌نامه، کتاب درسی',
    extendedWorks: 'آثار گسترده',
    extendedWorksDesc: 'حماسه، رساله‌های جامع',
    motivationOfTheDay: 'سخن امروز',
    refresh: 'تازه‌سازی',
    yourHonors: 'نشان‌های شما با رشد دست‌نوشته‌هایتان اینجا نمایان خواهد شد.',
    earnFirstQuill: 'بنویسید تا نخستین قلم خود را بدست آورید...',
    sentences: 'جملات',
    paragraphs: 'بندها',
    avgPerSentence: 'میانگین/جمله',
    diversity: 'تنوع',
    disconnect: 'قطع اتصال',
    enterDocUrl: 'پیوند سند گوگل را وارد کنید',
    docRetrieved: 'سند دریافت شد',
    manuscriptAnalyzed: 'دست‌نوشته تحلیل شد',
    invalidCredentials: 'اطلاعات ورود نادرست است',
    disconnected: 'اتصال قطع شد',
    unlink: 'لغو پیوند',
    notice: 'یادداشت',
    avatarLabels: {
      scribe: 'منشی',
      scholar: 'دانشور',
      poet: 'شاعر',
      sage: 'فرزانه',
      muse: 'الهام‌بخش',
      wanderer: 'رهنورد',
      calligrapher: 'خوش‌نویس',
      chronicler: 'تاریخ‌نگار',
    },
  }
};

// ============ CATEGORIES (per language) ============
const CATEGORIES_BY_LANG = {
  en: [
    'Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction', 'Mystery', 'Thriller',
    'Romance', 'Historical Fiction', 'Literary Fiction', 'Horror', 'Adventure',
    'Biography', 'Autobiography', 'Memoir', 'Self-Help', 'Philosophy', 'Religion',
    'Spirituality', 'Poetry', 'Drama', 'Essay', 'Academic', 'Scientific',
    'Technical', 'Educational', 'Children', 'Young Adult', 'Graphic Novel',
    'Crime', 'Dystopian', 'Utopian', 'Magical Realism', 'Mythology', 'Folklore',
    'Travel', 'Cookbook', 'Art', 'Music', 'Photography', 'Business',
    'Economics', 'Politics', 'History', 'Psychology', 'Sociology', 'Anthropology',
    'Linguistics', 'Literary Criticism', 'Reference', 'Anthology', 'Short Stories',
    // Islamic / cultural
    'Islamic Studies', 'Quranic Sciences', 'Hadith Studies', 'Seerah (Prophet Biography)',
    'Fiqh (Jurisprudence)', 'Tasawwuf (Spirituality)', 'Islamic History', 'Arabic Literature',
    'Persian Literature', 'Sufi Poetry', 'Comparative Religion', 'Islamic Philosophy',
  ],
  ar: [
    'رواية', 'غير روائي', 'فانتازيا', 'خيال علمي', 'غموض', 'إثارة',
    'رومانسية', 'رواية تاريخية', 'أدب راقٍ', 'رعب', 'مغامرة',
    'سيرة', 'سيرة ذاتية', 'مذكرات', 'تطوير الذات', 'فلسفة', 'دين',
    'روحانيات', 'شعر', 'دراما', 'مقالة', 'أكاديمي', 'علمي',
    'تقني', 'تعليمي', 'أطفال', 'يافعون', 'رواية مصورة',
    'جريمة', 'ديستوبيا', 'يوتوبيا', 'واقعية سحرية', 'أساطير', 'فلكلور',
    'سفر', 'طبخ', 'فن', 'موسيقى', 'تصوير', 'أعمال',
    'اقتصاد', 'سياسة', 'تاريخ', 'علم النفس', 'علم الاجتماع', 'أنثروبولوجيا',
    'لسانيات', 'نقد أدبي', 'مرجع', 'مختارات', 'قصص قصيرة',
    // إسلامية / ثقافية
    'الدراسات الإسلامية', 'علوم القرآن', 'علوم الحديث', 'السيرة النبوية',
    'الفقه', 'التصوف', 'التاريخ الإسلامي', 'الأدب العربي',
    'الأدب الفارسي', 'الشعر الصوفي', 'مقارنة الأديان', 'الفلسفة الإسلامية',
    'العقيدة', 'التفسير', 'الأخلاق الإسلامية', 'علم الكلام',
  ],
  fa: [
    'داستانی', 'غیرداستانی', 'فانتزی', 'علمی-تخیلی', 'معمایی', 'هیجان‌انگیز',
    'عاشقانه', 'رمان تاریخی', 'ادبیات والا', 'وحشت', 'ماجراجویی',
    'زندگی‌نامه', 'خودزیست‌نامه', 'خاطرات', 'خودیاری', 'فلسفه', 'دین',
    'معنویت', 'شعر', 'نمایش‌نامه', 'مقاله', 'دانشگاهی', 'علمی',
    'فنی', 'آموزشی', 'کودک', 'نوجوان', 'رمان مصور',
    'جنایی', 'پادآرمان‌شهر', 'آرمان‌شهر', 'رئالیسم جادویی', 'اسطوره‌شناسی', 'فولکلور',
    'سفر', 'آشپزی', 'هنر', 'موسیقی', 'عکاسی', 'کسب و کار',
    'اقتصاد', 'سیاست', 'تاریخ', 'روان‌شناسی', 'جامعه‌شناسی', 'انسان‌شناسی',
    'زبان‌شناسی', 'نقد ادبی', 'مرجع', 'گزیده', 'داستان کوتاه',
    // اسلامی / فرهنگی
    'مطالعات اسلامی', 'علوم قرآنی', 'علوم حدیث', 'سیره نبوی',
    'فقه', 'عرفان و تصوف', 'تاریخ اسلام', 'ادبیات عرب',
    'ادبیات فارسی', 'شعر صوفیانه', 'دین‌پژوهی تطبیقی', 'فلسفه اسلامی',
    'کلام اسلامی', 'تفسیر قرآن', 'اخلاق اسلامی', 'حکمت',
  ],
};

// Suggested books by category (with culturally relevant additions)
const SUGGESTED_BOOKS = {
  // English
  'Fiction': [{ book: 'The Art of Fiction', author: 'John Gardner' }, { book: 'On Writing', author: 'Stephen King' }],
  'Fantasy': [{ book: 'The Name of the Wind', author: 'Patrick Rothfuss' }, { book: 'Wizard of Earthsea', author: 'Ursula K. Le Guin' }],
  'Science Fiction': [{ book: 'Dune', author: 'Frank Herbert' }, { book: 'Hyperion', author: 'Dan Simmons' }],
  'Mystery': [{ book: 'The Maltese Falcon', author: 'Dashiell Hammett' }, { book: 'And Then There Were None', author: 'Agatha Christie' }],
  'Romance': [{ book: 'Pride and Prejudice', author: 'Jane Austen' }, { book: 'Outlander', author: 'Diana Gabaldon' }],
  'Historical Fiction': [{ book: 'Wolf Hall', author: 'Hilary Mantel' }, { book: 'The Name of the Rose', author: 'Umberto Eco' }],
  'Literary Fiction': [{ book: 'Beloved', author: 'Toni Morrison' }, { book: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez' }],
  'Philosophy': [{ book: 'Meditations', author: 'Marcus Aurelius' }, { book: 'Thus Spoke Zarathustra', author: 'Friedrich Nietzsche' }],
  'Poetry': [{ book: 'Leaves of Grass', author: 'Walt Whitman' }, { book: 'The Waste Land', author: 'T.S. Eliot' }],
  'Biography': [{ book: 'The Diary of a Young Girl', author: 'Anne Frank' }, { book: 'Long Walk to Freedom', author: 'Nelson Mandela' }],
  'Self-Help': [{ book: 'Atomic Habits', author: 'James Clear' }, { book: 'Man\'s Search for Meaning', author: 'Viktor Frankl' }],
  'Thriller': [{ book: 'The Silence of the Lambs', author: 'Thomas Harris' }, { book: 'Gone Girl', author: 'Gillian Flynn' }],
  'Islamic Studies': [{ book: 'The Sealed Nectar', author: 'Safi-ur-Rahman al-Mubarakpuri' }, { book: 'In the Footsteps of the Prophet', author: 'Tariq Ramadan' }],
  'Quranic Sciences': [{ book: 'An Introduction to the Sciences of the Qur\'an', author: 'Yasir Qadhi' }, { book: 'Ulum al-Qur\'an', author: 'Ahmad von Denffer' }],
  'Hadith Studies': [{ book: 'An Introduction to the Science of Hadith', author: 'Suhaib Hasan' }, { book: 'Studies in Hadith Methodology', author: 'M. M. Azami' }],
  'Seerah (Prophet Biography)': [{ book: 'The Sealed Nectar', author: 'Safi-ur-Rahman al-Mubarakpuri' }, { book: 'Muhammad: His Life Based on the Earliest Sources', author: 'Martin Lings' }],
  'Sufi Poetry': [{ book: 'The Essential Rumi', author: 'Coleman Barks (trans.)' }, { book: 'The Conference of the Birds', author: 'Attar of Nishapur' }],
  'Arabic Literature': [{ book: 'Cities of Salt', author: 'Abdulrahman Munif' }, { book: 'The Yacoubian Building', author: 'Alaa Al Aswany' }],
  'Persian Literature': [{ book: 'The Blind Owl', author: 'Sadegh Hedayat' }, { book: 'Shahnameh', author: 'Ferdowsi' }],
  // Arabic
  'الدراسات الإسلامية': [{ book: 'الرحيق المختوم', author: 'صفي الرحمن المباركفوري' }, { book: 'في ظلال القرآن', author: 'سيد قطب' }],
  'علوم القرآن': [{ book: 'الإتقان في علوم القرآن', author: 'جلال الدين السيوطي' }, { book: 'مباحث في علوم القرآن', author: 'مناع القطان' }],
  'السيرة النبوية': [{ book: 'الرحيق المختوم', author: 'صفي الرحمن المباركفوري' }, { book: 'فقه السيرة', author: 'محمد الغزالي' }],
  'الأدب العربي': [{ book: 'موسم الهجرة إلى الشمال', author: 'الطيب صالح' }, { book: 'ثلاثية القاهرة', author: 'نجيب محفوظ' }],
  'الشعر الصوفي': [{ book: 'ديوان ابن الفارض', author: 'ابن الفارض' }, { book: 'ترجمان الأشواق', author: 'محيي الدين بن عربي' }],
  'الفقه': [{ book: 'فقه السنة', author: 'سيد سابق' }, { book: 'بداية المجتهد', author: 'ابن رشد' }],
  'التصوف': [{ book: 'إحياء علوم الدين', author: 'أبو حامد الغزالي' }, { book: 'الرسالة القشيرية', author: 'القشيري' }],
  'فلسفة': [{ book: 'تهافت الفلاسفة', author: 'أبو حامد الغزالي' }, { book: 'فصل المقال', author: 'ابن رشد' }],
  'شعر': [{ book: 'ديوان المتنبي', author: 'أبو الطيب المتنبي' }, { book: 'الأعمال الشعرية الكاملة', author: 'محمود درويش' }],
  'تاريخ': [{ book: 'مقدمة ابن خلدون', author: 'ابن خلدون' }, { book: 'تاريخ الطبري', author: 'الطبري' }],
  // Persian
  'مطالعات اسلامی': [{ book: 'سیرت رسول الله', author: 'ابن اسحاق' }, { book: 'الحیاة', author: 'محمدرضا حکیمی' }],
  'عرفان و تصوف': [{ book: 'مثنوی معنوی', author: 'مولانا جلال‌الدین رومی' }, { book: 'تذکرة الاولیاء', author: 'عطار نیشابوری' }],
  'شعر صوفیانه': [{ book: 'دیوان حافظ', author: 'حافظ شیرازی' }, { book: 'منطق‌الطیر', author: 'عطار نیشابوری' }],
  'ادبیات فارسی': [{ book: 'بوف کور', author: 'صادق هدایت' }, { book: 'سووشون', author: 'سیمین دانشور' }],
  'شعر': [{ book: 'دیوان حافظ', author: 'حافظ شیرازی' }, { book: 'دیوان شمس', author: 'مولانا' }],
  'فلسفه اسلامی': [{ book: 'الحکمة المتعالیة', author: 'ملا صدرا' }, { book: 'اشارات و تنبیهات', author: 'ابن سینا' }],
  'تاریخ اسلام': [{ book: 'تاریخ یعقوبی', author: 'احمد بن یعقوب' }, { book: 'مروج‌الذهب', author: 'مسعودی' }],
  'فلسفه': [{ book: 'تهافت‌الفلاسفه', author: 'امام محمد غزالی' }, { book: 'شفا', author: 'ابن سینا' }],
  'تاریخ': [{ book: 'تاریخ بیهقی', author: 'ابوالفضل بیهقی' }, { book: 'تاریخ جهانگشای جوینی', author: 'عطاملک جوینی' }],
};

// ============ CHARACTER / AVATAR ROSTER ============
// Stable IDs (used in storage); display labels come from translations.
const AVATARS = [
  { id: 'scribe',       glyph: '✒',  hue: 195 },  // teal
  { id: 'scholar',      glyph: '✦',  hue: 158 },  // emerald
  { id: 'poet',         glyph: '❦',  hue: 22 },   // copper
  { id: 'sage',         glyph: '☾',  hue: 280 },  // violet
  { id: 'muse',         glyph: '✿',  hue: 340 },  // rose
  { id: 'wanderer',     glyph: '✧',  hue: 220 },  // sapphire
  { id: 'calligrapher', glyph: '﷽',  hue: 38 },   // amber
  { id: 'chronicler',   glyph: '☥',  hue: 100 },  // moss
];

// ============ MOTIVATIONAL QUOTES (per language) ============
// Mix of literary, philosophical, and Islamic/cultural counsel.
const MOTIVATIONAL_QUOTES = {
  en: [
    { text: 'Seek knowledge from the cradle to the grave.', source: 'Prophetic tradition' },
    { text: 'The ink of the scholar is more sacred than the blood of the martyr.', source: 'Prophetic tradition' },
    { text: 'A word after a word after a word is power.', source: 'Margaret Atwood' },
    { text: 'There is no friend as loyal as a book.', source: 'Ernest Hemingway' },
    { text: 'Whoever travels in search of knowledge, God makes easy for him a path to Paradise.', source: 'Prophetic tradition' },
    { text: 'You do not have to write — but you have to live as if you might.', source: 'Anne Lamott (adapted)' },
    { text: 'I write to discover what I know.', source: 'Flannery O\'Connor' },
    { text: 'Read in the name of your Lord who created.', source: 'Qur\'an 96:1' },
    { text: 'Do not bend; do not water it down; do not edit your soul according to the fashion.', source: 'Franz Kafka' },
    { text: 'Patience is a light from God.', source: 'Prophetic tradition' },
    { text: 'Start writing, no matter what. The water does not flow until the faucet is turned on.', source: 'Louis L\'Amour' },
    { text: 'My Lord, increase me in knowledge.', source: 'Qur\'an 20:114' },
  ],
  ar: [
    { text: 'اطلبوا العلم من المهد إلى اللحد.', source: 'حديث شريف' },
    { text: 'مداد العلماء أفضل من دماء الشهداء.', source: 'أثر منسوب' },
    { text: 'من سلك طريقاً يلتمس فيه علماً، سهّل الله له طريقاً إلى الجنة.', source: 'صحيح مسلم' },
    { text: 'اقرأ باسم ربك الذي خلق.', source: 'القرآن الكريم — العلق ١' },
    { text: 'وقل ربِّ زدني علماً.', source: 'القرآن الكريم — طه ١١٤' },
    { text: 'الكتاب خير جليس في الزمان.', source: 'المتنبي' },
    { text: 'لكل ساقطة لاقطة، ولكل كلمة من يستمع إليها.', source: 'مثل عربي' },
    { text: 'العلم ما نفع، ليس العلم ما حُفظ.', source: 'الإمام الشافعي' },
    { text: 'إذا لم تستحِ فاصنع ما شئت.', source: 'حديث شريف' },
    { text: 'الصبر ضياء.', source: 'حديث شريف' },
    { text: 'القلم أحد اللسانين.', source: 'مثل عربي' },
    { text: 'مَن جدَّ وجَد، ومَن زرع حصد.', source: 'مثل عربي' },
  ],
  fa: [
    { text: 'بنویس به نام پروردگارت که آفرید.', source: 'قرآن کریم — علق ۱' },
    { text: 'بار خدایا بر دانشم بیفزای.', source: 'قرآن کریم — طه ۱۱۴' },
    { text: 'هر آن که جانب اهل وفا نگه دارد / خداش در همه حال از بلا نگه دارد.', source: 'حافظ شیرازی' },
    { text: 'توانا بود هر که دانا بود / ز دانش دل پیر برنا بود.', source: 'فردوسی' },
    { text: 'بشنو این نی چون شکایت می‌کند / از جدایی‌ها حکایت می‌کند.', source: 'مولانا — مثنوی معنوی' },
    { text: 'دوش دیدم که ملائک در میخانه زدند / گل آدم بسرشتند و به پیمانه زدند.', source: 'حافظ شیرازی' },
    { text: 'هر که آمد عمارتی نو ساخت / رفت و منزل به دیگری پرداخت.', source: 'سعدی' },
    { text: 'علم از گهواره تا گور بجویید.', source: 'حدیث شریف' },
    { text: 'صبر، روشنایی است.', source: 'حدیث شریف' },
    { text: 'بنی آدم اعضای یکدیگرند / که در آفرینش ز یک گوهرند.', source: 'سعدی' },
    { text: 'هر که در او جوهر دانایی است / بر همه چیزش توانایی است.', source: 'فردوسی' },
    { text: 'نوشتن، اندیشیدنی است که نقش می‌بندد.', source: 'گفتار ادبی' },
  ],
};

// ============ WORD COUNT CATEGORIES ============
const WORD_COUNT_CATEGORIES = [
  { id: 'short',    min: 1000,   max: 7500,    typical: 5000,   key: 'shortForm',    descKey: 'shortFormDesc' },
  { id: 'mid',      min: 7500,   max: 40000,   typical: 25000,  key: 'midLength',    descKey: 'midLengthDesc' },
  { id: 'long',     min: 40000,  max: 100000,  typical: 70000,  key: 'longForm',     descKey: 'longFormDesc' },
  { id: 'extended', min: 100000, max: 200000,  typical: 130000, key: 'extendedWorks', descKey: 'extendedWorksDesc' },
];

// ============ VIZIER AI ENGINE (Heuristic + Claude API fallback) ============
const analyzeTextLocally = (text) => {
  if (!text) return null;
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = sentences.length;
  const avgWordsPerSentence = sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : 0;
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
  
  const issues = [];
  const veryLongSentences = sentences.filter(s => s.trim().split(/\s+/).length > 40);
  if (veryLongSentences.length > 0) issues.push(`${veryLongSentences.length} sentences exceed 40 words — consider splitting for clarity`);
  
  const passivePattern = /\b(was|were|been|being|is|are|am)\s+\w+ed\b/gi;
  const passiveMatches = text.match(passivePattern) || [];
  if (passiveMatches.length > wordCount * 0.05) issues.push(`Passive voice appears ${passiveMatches.length} times — consider active alternatives`);
  
  const fillers = (text.match(/\b(very|really|just|actually|basically|literally|quite|rather|somewhat)\b/gi) || []).length;
  if (fillers > wordCount * 0.02) issues.push(`${fillers} filler words detected — tighten prose where possible`);
  
  const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z]/g, '')));
  const lexicalDiversity = (uniqueWords.size / wordCount * 100).toFixed(1);
  
  return {
    wordCount,
    sentenceCount,
    paragraphCount: paragraphs,
    avgWordsPerSentence,
    lexicalDiversity,
    issues,
    passiveCount: passiveMatches.length,
    fillerCount: fillers,
  };
};

const generateVizierInsight = (analysis, project) => {
  if (!analysis) return null;
  const insights = [];
  
  if (project && project.achievedWordCount > 0) {
    const pct = (project.achievedWordCount / project.projectedWordCount * 100).toFixed(1);
    insights.push(`You have woven ${project.achievedWordCount.toLocaleString()} of ${project.projectedWordCount.toLocaleString()} words — ${pct}% of your voyage complete.`);
  }
  
  if (analysis.avgWordsPerSentence < 10) {
    insights.push('Your prose runs in brief cadence. Consider weaving some longer passages for rhythm variation.');
  } else if (analysis.avgWordsPerSentence > 25) {
    insights.push('Your sentences stretch long and elaborate — beautiful, though punctuating with briefer strokes will sharpen impact.');
  } else {
    insights.push('Your sentence rhythm holds admirable balance — neither too curt nor too winding.');
  }
  
  if (analysis.lexicalDiversity > 50) {
    insights.push(`A rich lexicon graces your work — ${analysis.lexicalDiversity}% unique vocabulary. Your voice is distinctive.`);
  } else if (analysis.lexicalDiversity < 30) {
    insights.push(`Your vocabulary repeats often (${analysis.lexicalDiversity}% diversity). Let the Vizier suggest: vary your word choice to deepen texture.`);
  }
  
  if (analysis.passiveCount > 20) {
    insights.push('Passive voice appears frequently. Active verbs grant vigor to your narrative — consider revisions.');
  }
  
  return insights;
};

// ============ MAIN APP ============
export default function BookVizier() {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [view, setView] = useState('auth');
  const [authMode, setAuthMode] = useState('signin');
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);
  const [googleConnected, setGoogleConnected] = useState(false);
  
  const t = translations[lang];
  const isRTL = lang === 'ar' || lang === 'fa';
  const CATEGORIES = CATEGORIES_BY_LANG[lang] || CATEGORIES_BY_LANG.en;
  
  // Load persisted state
  useEffect(() => {
    (async () => {
      try {
        const u = await window.storage.get('user');
        if (u) { setUser(JSON.parse(u.value)); setView('dashboard'); }
      } catch {}
      try {
        const s = await window.storage.get('settings');
        if (s) { const d = JSON.parse(s.value); setLang(d.lang || 'en'); setTheme(d.theme || 'light'); }
      } catch {}
      try {
        const p = await window.storage.get('projects');
        if (p) setProjects(JSON.parse(p.value));
      } catch {}
      try {
        const g = await window.storage.get('google_connected');
        if (g) setGoogleConnected(JSON.parse(g.value));
      } catch {}
    })();
  }, []);
  
  useEffect(() => {
    try { window.storage.set('settings', JSON.stringify({ lang, theme })); } catch {}
  }, [lang, theme]);
  
  useEffect(() => {
    if (user) {
      try { window.storage.set('projects', JSON.stringify(projects)); } catch {}
    }
  }, [projects, user]);
  
  // Persist user (so avatar updates survive reloads)
  useEffect(() => {
    if (user) {
      try { window.storage.set('user', JSON.stringify(user)); } catch {}
    }
  }, [user]);
  
  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };
  
  const handleAuth = async (username, password, isSignUp) => {
    if (isSignUp) {
      if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        showNotification(t.passwordRule, 'error');
        return false;
      }
      try {
        const existing = await window.storage.get(`auth:${username}`);
        if (existing) {
          showNotification(t.usernameExists, 'error');
          return false;
        }
      } catch {}
      const newUser = { username, joined: new Date().toISOString(), completedBooks: 0, allBadges: [], avatarId: null };
      try {
        await window.storage.set(`auth:${username}`, JSON.stringify({ password, user: newUser }));
      } catch {}
      await window.storage.set('user', JSON.stringify(newUser));
      setUser(newUser);
      setView('dashboard');
      // Prompt new users to choose an avatar
      setTimeout(() => setShowAvatarPicker(true), 300);
      return true;
    } else {
      try {
        const stored = await window.storage.get(`auth:${username}`);
        if (stored) {
          const data = JSON.parse(stored.value);
          if (data.password === password) {
            await window.storage.set('user', JSON.stringify(data.user));
            setUser(data.user);
            setView('dashboard');
            return true;
          }
        }
        showNotification(t.invalidCredentials, 'error');
        return false;
      } catch {
        showNotification(t.invalidCredentials, 'error');
        return false;
      }
    }
  };
  
  const handleSignOut = async () => {
    try { await window.storage.delete('user'); } catch {}
    setUser(null);
    setProjects([]);
    setView('auth');
    setShowLogoutConfirm(false);
  };
  
  const updateUserAvatar = async (avatarId) => {
    const updated = { ...user, avatarId };
    setUser(updated);
    // Also update the auth record so it persists across sign-outs
    try {
      const stored = await window.storage.get(`auth:${user.username}`);
      if (stored) {
        const data = JSON.parse(stored.value);
        await window.storage.set(`auth:${user.username}`, JSON.stringify({ ...data, user: updated }));
      }
    } catch {}
    setShowAvatarPicker(false);
  };
  
  const createProject = (projData) => {
    if (projects.filter(p => !p.completed).length >= 15) {
      showNotification(t.projectLimit, 'error');
      return;
    }
    const targetPerMilestone = Math.floor(projData.projectedWordCount / projData.numberOfMilestones);
    const milestones = Array.from({ length: projData.numberOfMilestones }, (_, i) => ({
      milestoneNumber: i + 1,
      targetWordCount: targetPerMilestone * (i + 1),
      dateAchieved: null,
      isCompleted: false,
    }));
    const newProj = {
      id: Date.now(),
      ...projData,
      achievedWordCount: 0,
      milestones,
      badges: [],
      progressLog: [],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      completed: false,
      suggestions: (projData.categories || []).flatMap(c => SUGGESTED_BOOKS[c] || []).slice(0, 6),
    };
    setProjects([...projects, newProj]);
    setShowNewProject(false);
    showNotification(t.projectCreated);
  };
  
  const updateProject = (id, updates) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates, lastUpdated: new Date().toISOString() } : p));
  };
  
  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    if (selectedProjectId === id) setSelectedProjectId(null);
  };
  
  const addProgress = (projId, wordsAdded) => {
    const proj = projects.find(p => p.id === projId);
    if (!proj) return;
    const newTotal = Math.max(0, proj.achievedWordCount + wordsAdded);
    const updatedMilestones = proj.milestones.map(m => {
      if (!m.isCompleted && newTotal >= m.targetWordCount) {
        return { ...m, isCompleted: true, dateAchieved: new Date().toISOString() };
      }
      return m;
    });
    
    const newBadges = [...proj.badges];
    const third = proj.projectedWordCount / 3;
    const badgeTypes = [
      { type: 'bronze', threshold: third, label: t.firstThird },
      { type: 'silver', threshold: third * 2, label: t.secondThird },
      { type: 'gold', threshold: proj.projectedWordCount, label: t.fullComplete },
    ];
    badgeTypes.forEach(bt => {
      if (newTotal >= bt.threshold && !newBadges.find(b => b.badgeType === bt.type)) {
        newBadges.push({ badgeType: bt.type, dateAwarded: new Date().toISOString(), thresholdRequired: bt.threshold, label: bt.label });
      }
    });
    
    const progressLog = [...proj.progressLog, { date: new Date().toISOString(), wordsAdded, newTotal }];
    
    updateProject(projId, {
      achievedWordCount: newTotal,
      milestones: updatedMilestones,
      badges: newBadges,
      progressLog,
      completed: newTotal >= proj.projectedWordCount,
    });
    
    if (newBadges.length > proj.badges.length) {
      showNotification(`🏅 ${newBadges[newBadges.length - 1].label}`);
    }
  };
  
  const syncProgressFromAnalysis = (projId, absoluteWordCount, source = null) => {
    const proj = projects.find(p => p.id === projId);
    if (!proj) return;
    const newTotal = Math.max(0, Math.round(absoluteWordCount));
    const delta = newTotal - proj.achievedWordCount;
    
    const updatedMilestones = proj.milestones.map(m => {
      const reached = newTotal >= m.targetWordCount;
      return {
        ...m,
        isCompleted: reached,
        dateAchieved: reached ? (m.dateAchieved || new Date().toISOString()) : null,
      };
    });
    
    const newBadges = [...proj.badges];
    const third = proj.projectedWordCount / 3;
    const badgeTypes = [
      { type: 'bronze', threshold: third, label: t.firstThird },
      { type: 'silver', threshold: third * 2, label: t.secondThird },
      { type: 'gold', threshold: proj.projectedWordCount, label: t.fullComplete },
    ];
    badgeTypes.forEach(bt => {
      if (newTotal >= bt.threshold && !newBadges.find(b => b.badgeType === bt.type)) {
        newBadges.push({ badgeType: bt.type, dateAwarded: new Date().toISOString(), thresholdRequired: bt.threshold, label: bt.label });
      }
    });
    
    const progressLog = [...proj.progressLog, {
      date: new Date().toISOString(),
      wordsAdded: delta,
      newTotal,
      source: source || 'sync',
    }];
    
    updateProject(projId, {
      achievedWordCount: newTotal,
      milestones: updatedMilestones,
      badges: newBadges,
      progressLog,
      completed: newTotal >= proj.projectedWordCount,
    });
    
    if (newBadges.length > proj.badges.length) {
      showNotification(`🏅 ${newBadges[newBadges.length - 1].label}`);
    }
    return true;
  };
  
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  
  useEffect(() => {
    if (!projects.length) return;
    projects.forEach(p => {
      const last = new Date(p.lastUpdated);
      const days = Math.floor((Date.now() - last.getTime()) / (1000 * 60 * 60 * 24));
      if (days >= 7 && !p.completed) {
        // Would trigger system notification in real deployment
      }
    });
  }, [projects]);
  
  return (
    <div className={`vizier-app ${theme} ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Cinzel:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Vazirmatn:wght@300;400;500;600;700&display=swap');
        
        /* ========================================================
           NEW PALETTE — Emerald primary + Copper accent
           Modern, literary, trending. Reads "scholarly" but fresh.
           High WCAG contrast in both light and dark modes.
        ======================================================== */
        .vizier-app {
          /* Brand */
          --emerald: #0d7a5f;
          --emerald-deep: #064e3b;
          --emerald-soft: #34a07e;
          --emerald-faint: #e6f4ef;
          --emerald-glow: rgba(13, 122, 95, 0.16);
          
          --copper: #b45a2c;
          --copper-deep: #8a3f1b;
          --copper-soft: #d97a4d;
          --copper-faint: #fbeee2;
          
          /* Neutrals */
          --ink: #0f1916;
          --ink-soft: #2a3733;
          --paper: #fbfaf6;
          --paper-shade: #f1efe7;
          --border: #d8d3c2;
          --border-strong: #b9b3a0;
          
          /* Roles */
          --bg: #fbfaf6;
          --bg-elevated: #ffffff;
          --bg-sunken: #f4f2ea;
          --text: #0f1916;
          --text-muted: #5d6661;
          --text-soft: #8a918c;
          
          /* Brand alias (kept for fallback by some computed styles) */
          --gold: var(--emerald);
          --gold-dark: var(--emerald-deep);
          --gold-light: var(--emerald-soft);
          --gold-faint: var(--emerald-faint);
          --gold-glow: var(--emerald-glow);
          --parchment: var(--paper);
          --parchment-shade: var(--paper-shade);
          
          --shadow-sm: 0 1px 2px rgba(15, 25, 22, 0.05);
          --shadow: 0 4px 16px rgba(13, 122, 95, 0.06), 0 1px 3px rgba(15, 25, 22, 0.04);
          --shadow-lg: 0 16px 40px rgba(15, 25, 22, 0.10), 0 4px 12px rgba(13, 122, 95, 0.06);
          
          --radius: 10px;
          --radius-sm: 6px;
          --radius-lg: 16px;
          
          font-family: 'EB Garamond', 'Noto Naskh Arabic', 'Vazirmatn', serif;
          color: var(--text);
          background: var(--bg);
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow-x: hidden;
        }
        
        .vizier-app.dark {
          --emerald: #4dd4a8;
          --emerald-deep: #34a07e;
          --emerald-soft: #6fe0bb;
          --emerald-faint: #0e1f1a;
          --emerald-glow: rgba(77, 212, 168, 0.14);
          
          --copper: #e89668;
          --copper-deep: #c97a4d;
          --copper-soft: #f0a980;
          --copper-faint: #1f140e;
          
          --ink: #f3f0e7;
          --ink-soft: #c8c2b1;
          --border: #2a3a35;
          --border-strong: #3d4f48;
          
          --bg: #0a1311;
          --bg-elevated: #131c19;
          --bg-sunken: #07100e;
          --text: #f3f0e7;
          --text-muted: #9aa39e;
          --text-soft: #6e7672;
          
          --gold: var(--emerald);
          --gold-dark: var(--emerald-deep);
          --gold-light: var(--emerald-soft);
          --gold-faint: var(--emerald-faint);
          --gold-glow: var(--emerald-glow);
          --parchment: var(--bg-elevated);
          --parchment-shade: var(--bg-sunken);
          
          --shadow: 0 4px 16px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0, 0, 0, 0.3);
          --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.6), 0 4px 12px rgba(0, 0, 0, 0.4);
        }
        
        .vizier-app.rtl { font-family: 'Noto Naskh Arabic', 'Vazirmatn', 'EB Garamond', serif; }
        
        .display-font { font-family: 'Cinzel', 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0.02em; }
        .rtl .display-font { font-family: 'Noto Naskh Arabic', 'Vazirmatn', 'Cinzel', serif; letter-spacing: 0; }
        
        .body-font { font-family: 'Cormorant Garamond', 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        .rtl .body-font { font-family: 'Noto Naskh Arabic', 'Vazirmatn', 'Cormorant Garamond', serif; }
        
        * { box-sizing: border-box; }
        
        ::selection { background: var(--emerald-glow); color: var(--emerald-deep); }
        .dark ::selection { color: var(--emerald-soft); }
        
        .ornament {
          display: inline-block;
          color: var(--emerald);
          font-size: 1.2em;
          opacity: 0.7;
        }
        
        .ornament-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin: 24px 0;
          color: var(--copper);
        }
        .ornament-divider::before,
        .ornament-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border-strong) 50%, transparent);
          max-width: 100px;
        }
        
        /* ======== AUTH SCREEN ======== */
        .auth-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: var(--bg);
          background-image: 
            radial-gradient(ellipse at 20% 0%, var(--emerald-glow), transparent 55%),
            radial-gradient(ellipse at 80% 100%, rgba(180, 90, 44, 0.10), transparent 55%);
          position: relative;
        }
        
        .auth-card {
          max-width: 480px;
          width: 100%;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 56px 44px;
          position: relative;
          box-shadow: var(--shadow-lg);
          animation: fadeUp 0.6s ease-out;
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .auth-logo {
          text-align: center;
          margin-bottom: 32px;
        }
        
        /* Replace the brand image with a typographic + iconic mark.
           The iconic mark is a quill — true to the writing-focused theme. */
        .brand-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 14px;
        }
        .brand-mark-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: linear-gradient(135deg, var(--emerald) 0%, var(--emerald-deep) 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px var(--emerald-glow), inset 0 1px 0 rgba(255,255,255,0.15);
          position: relative;
          flex-shrink: 0;
        }
        .brand-mark-icon::after {
          content: '';
          position: absolute;
          inset: 4px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          pointer-events: none;
        }
        
        .brand-mark-wordmark {
          font-family: 'Cinzel', serif;
          font-size: 32px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--text);
          line-height: 1;
        }
        .rtl .brand-mark-wordmark { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-size: 30px; }
        
        .auth-title {
          font-family: 'Cinzel', serif;
          font-size: 28px;
          font-weight: 500;
          color: var(--text);
          margin: 0 0 8px;
          letter-spacing: 0.06em;
        }
        .rtl .auth-title { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-weight: 600; }
        
        .auth-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: var(--text-muted);
          font-size: 16px;
          margin: 0;
          line-height: 1.5;
        }
        .rtl .auth-tagline { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; }
        
        .form-group { margin-bottom: 18px; }
        
        .form-label {
          display: block;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--emerald-deep);
          margin-bottom: 8px;
          font-weight: 600;
        }
        .dark .form-label { color: var(--emerald); }
        .rtl .form-label { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 13px; font-weight: 700; }
        
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-family: 'EB Garamond', 'Noto Naskh Arabic', 'Vazirmatn', serif;
          font-size: 16px;
          outline: none;
          transition: all 0.2s;
          border-radius: var(--radius-sm);
        }
        .form-input::placeholder { color: var(--text-soft); }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--emerald);
          box-shadow: 0 0 0 3px var(--emerald-glow);
          background: var(--bg-elevated);
        }
        
        /* ======== BUTTONS ======== */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 22px;
          border: 1px solid var(--emerald);
          background: var(--emerald);
          color: #fff;
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 600;
          border-radius: var(--radius-sm);
          white-space: nowrap;
        }
        .rtl .btn { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 14px; font-weight: 600; }
        .dark .btn { color: #0a1311; }
        
        .btn:hover { background: var(--emerald-deep); border-color: var(--emerald-deep); transform: translateY(-1px); box-shadow: 0 6px 16px var(--emerald-glow); }
        .dark .btn:hover { background: var(--emerald-soft); border-color: var(--emerald-soft); color: #0a1311; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        
        .btn-ghost { background: transparent; color: var(--emerald-deep); border-color: var(--border-strong); }
        .dark .btn-ghost { color: var(--emerald); border-color: var(--border-strong); }
        .btn-ghost:hover { background: var(--emerald-faint); color: var(--emerald-deep); border-color: var(--emerald); transform: none; box-shadow: none; }
        .dark .btn-ghost:hover { color: var(--emerald-soft); }
        
        .btn-copper { background: var(--copper); border-color: var(--copper); color: #fff; }
        .btn-copper:hover { background: var(--copper-deep); border-color: var(--copper-deep); box-shadow: 0 6px 16px rgba(180, 90, 44, 0.25); }
        
        .btn-full { width: 100%; }
        .btn-lg { padding: 15px 30px; font-size: 13px; }
        .btn-sm { padding: 7px 14px; font-size: 10.5px; }
        .btn-danger { border-color: #c1442e; background: transparent; color: #c1442e; }
        .btn-danger:hover { background: #c1442e; color: #fff; box-shadow: 0 4px 14px rgba(193, 68, 46, 0.25); }
        .dark .btn-danger { color: #ed7560; border-color: #ed7560; }
        .dark .btn-danger:hover { background: #c1442e; color: #fff; }
        
        .auth-switch {
          text-align: center;
          margin-top: 22px;
          font-size: 15px;
          color: var(--text-muted);
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
        }
        .rtl .auth-switch { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; }
        .auth-switch a { color: var(--emerald-deep); cursor: pointer; text-decoration: underline; text-decoration-style: dotted; text-underline-offset: 4px; margin-left: 6px; font-weight: 600; }
        .dark .auth-switch a { color: var(--emerald); }
        
        /* ======== MAIN LAYOUT ======== */
        .app-shell {
          display: grid;
          grid-template-columns: 248px 1fr;
          min-height: 100vh;
        }
        /* In RTL the root element already has dir set to rtl, so CSS Grid
           mirrors track placement automatically -- sidebar (first track)
           renders on the right, main content (1fr) on the left. We must NOT
           reverse the template here or the browser double-mirrors and the
           sidebar takes the 1fr track (making it absurdly wide) while main
           content gets squeezed into 248px. Only the local direction is
           needed for inline-flow alignment inside descendants. */
        .rtl .app-shell { direction: rtl; }
        
        .sidebar {
          background: var(--bg-elevated);
          border-right: 1px solid var(--border);
          padding: 26px 0 20px;
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .rtl .sidebar { border-right: none; border-left: 1px solid var(--border); }
        
        .sidebar-brand {
          padding: 0 24px 22px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .sidebar-brand-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--emerald) 0%, var(--emerald-deep) 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 14px var(--emerald-glow), inset 0 1px 0 rgba(255,255,255,0.15);
          position: relative;
        }
        .sidebar-brand-icon::after {
          content: '';
          position: absolute;
          inset: 3px;
          border-radius: 7px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          pointer-events: none;
        }
        
        .sidebar-brand-text {
          font-family: 'Cinzel', serif;
          font-size: 17px;
          color: var(--text);
          letter-spacing: 0.06em;
          font-weight: 600;
          line-height: 1.1;
        }
        .rtl .sidebar-brand-text { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-weight: 700; font-size: 19px; }
        
        .nav-item {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 11px 24px;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          border-left: 3px solid transparent;
          font-weight: 500;
          margin: 2px 0;
        }
        .rtl .nav-item { border-left: none; border-right: 3px solid transparent; font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 14px; font-weight: 600; }
        
        .nav-item:hover { color: var(--text); background: var(--bg-sunken); }
        .nav-item.active { color: var(--emerald-deep); border-left-color: var(--emerald); background: var(--emerald-faint); }
        .dark .nav-item.active { color: var(--emerald); }
        .rtl .nav-item.active { border-right-color: var(--emerald); }
        
        .sidebar-footer {
          margin-top: auto;
          padding: 16px 16px 0;
          border-top: 1px solid var(--border);
        }
        
        .user-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 8px;
          font-family: 'EB Garamond', serif;
          font-size: 14px;
          color: var(--text);
          margin-bottom: 4px;
        }
        .rtl .user-chip { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        
        .user-avatar {
          width: 34px;
          height: 34px;
          background: var(--emerald);
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cinzel', serif;
          font-size: 14px;
          font-weight: 600;
          flex-shrink: 0;
        }
        .dark .user-avatar { color: #0a1311; }
        
        .user-avatar.has-glyph {
          font-size: 17px;
          font-family: 'EB Garamond', 'Noto Naskh Arabic', serif;
          line-height: 1;
        }
        
        .main-content {
          padding: 44px 52px;
          overflow-y: auto;
          max-width: 100%;
        }
        
        .page-header { margin-bottom: 36px; }
        
        .page-title {
          font-family: 'Cinzel', serif;
          font-size: 32px;
          font-weight: 600;
          color: var(--text);
          margin: 0 0 6px;
          letter-spacing: 0.02em;
          line-height: 1.15;
        }
        .rtl .page-title { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-weight: 700; font-size: 34px; }
        
        .page-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 18px;
          color: var(--text-muted);
          margin: 0;
        }
        .rtl .page-subtitle { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; font-size: 17px; }
        
        /* ======== DASHBOARD STATS ======== */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }
        
        .stat-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 22px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .stat-card:hover { border-color: var(--emerald); box-shadow: var(--shadow); transform: translateY(-1px); }
        
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 48px;
          height: 3px;
          background: var(--emerald);
          border-radius: 0 0 3px 0;
        }
        .rtl .stat-card::before { left: auto; right: 0; border-radius: 0 0 0 3px; }
        
        .stat-label {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0 0 10px;
          font-weight: 600;
        }
        .rtl .stat-label { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 12px; font-weight: 600; }
        
        .stat-value {
          font-family: 'Cinzel', serif;
          font-size: 32px;
          font-weight: 600;
          color: var(--text);
          margin: 0;
          line-height: 1;
        }
        .rtl .stat-value { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-weight: 700; }
        
        .stat-icon {
          position: absolute;
          top: 22px;
          right: 22px;
          color: var(--emerald);
          opacity: 0.45;
        }
        .rtl .stat-icon { right: auto; left: 22px; }
        
        /* ======== SEARCH & TOOLBAR ======== */
        .toolbar {
          display: flex;
          gap: 14px;
          margin-bottom: 24px;
          align-items: center;
          flex-wrap: wrap;
        }
        
        .search-box { flex: 1; min-width: 240px; position: relative; }
        
        .search-input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          border: 1px solid var(--border);
          background: var(--bg-elevated);
          color: var(--text);
          font-family: 'EB Garamond', serif;
          font-size: 15px;
          outline: none;
          transition: all 0.2s;
          border-radius: var(--radius-sm);
        }
        .rtl .search-input { padding: 12px 42px 12px 14px; font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        .search-input::placeholder { color: var(--text-soft); }
        .search-input:focus { border-color: var(--emerald); box-shadow: 0 0 0 3px var(--emerald-glow); }
        
        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-soft);
        }
        .rtl .search-icon { left: auto; right: 14px; }
        
        /* ======== PROJECTS GRID ======== */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        
        .project-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          cursor: pointer;
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
        }
        
        .project-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--emerald) 0%, var(--copper) 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s;
        }
        .rtl .project-card::before { transform-origin: right; }
        
        .project-card:hover {
          border-color: var(--emerald);
          box-shadow: var(--shadow-lg);
          transform: translateY(-2px);
        }
        .project-card:hover::before { transform: scaleX(1); }
        
        .project-title {
          font-family: 'Cinzel', serif;
          font-size: 19px;
          color: var(--text);
          margin: 0 0 10px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .rtl .project-title { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-weight: 700; font-size: 22px; }
        
        .project-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 18px;
        }
        
        .category-tag {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-style: italic;
          color: var(--emerald-deep);
          padding: 3px 11px;
          border: 1px solid var(--emerald);
          background: var(--emerald-faint);
          border-radius: 999px;
        }
        .dark .category-tag { color: var(--emerald); }
        .rtl .category-tag { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; font-size: 12px; }
        
        .progress-bar {
          width: 100%;
          height: 6px;
          background: var(--bg-sunken);
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--emerald-deep) 0%, var(--emerald) 50%, var(--emerald-soft) 100%);
          transition: width 0.6s ease;
          position: relative;
          border-radius: 999px;
        }
        .progress-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2.5s infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .progress-info {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          font-family: 'EB Garamond', serif;
          font-size: 13px;
          color: var(--text-muted);
        }
        .rtl .progress-info { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        
        .progress-percent {
          font-family: 'Cinzel', serif;
          color: var(--emerald-deep);
          font-weight: 600;
          font-size: 14px;
        }
        .dark .progress-percent { color: var(--emerald); }
        .rtl .progress-percent { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        
        .project-badges {
          display: flex;
          gap: 6px;
          margin-top: 14px;
        }
        
        .badge-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          box-shadow: var(--shadow-sm);
        }
        .badge-icon.bronze { background: linear-gradient(135deg, #cd7f32, #8a4f1c); color: #fff; }
        .badge-icon.silver { background: linear-gradient(135deg, #d4d4d4, #8a8a8a); color: #fff; }
        .badge-icon.gold { background: linear-gradient(135deg, #f0c54a, #b07f1e); color: #fff; }
        
        .empty-state {
          text-align: center;
          padding: 70px 20px;
          color: var(--text-muted);
        }
        
        .empty-state-icon {
          color: var(--emerald);
          opacity: 0.3;
          margin-bottom: 18px;
        }
        
        .empty-state-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 19px;
          margin: 0 0 22px;
          color: var(--text-muted);
        }
        .rtl .empty-state-text { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; font-size: 17px; }
        
        /* ======== MODAL ======== */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 25, 22, 0.55);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 20px;
          animation: fadeIn 0.2s;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .modal {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 36px;
          position: relative;
          box-shadow: var(--shadow-lg);
          animation: fadeUp 0.25s;
        }
        
        .modal-title {
          font-family: 'Cinzel', serif;
          font-size: 23px;
          color: var(--text);
          margin: 0 0 6px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .rtl .modal-title { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-weight: 700; }
        
        .modal-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: var(--text-muted);
          margin: 0 0 20px;
          font-size: 15px;
        }
        .rtl .modal-subtitle { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; }
        
        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: var(--bg-sunken);
          border: 1px solid var(--border);
          color: var(--text-muted);
          cursor: pointer;
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: all 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rtl .modal-close { right: auto; left: 16px; }
        .modal-close:hover { color: var(--copper); border-color: var(--copper); }
        
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 6px;
          max-height: 220px;
          overflow-y: auto;
          padding: 10px;
          border: 1px solid var(--border);
          background: var(--bg);
          border-radius: var(--radius-sm);
        }
        
        .category-chip {
          padding: 7px 10px;
          border: 1px solid var(--border);
          background: var(--bg-elevated);
          color: var(--text-muted);
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.15s;
          text-align: center;
          border-radius: var(--radius-sm);
        }
        .rtl .category-chip { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-size: 13px; }
        
        .category-chip:hover { border-color: var(--emerald); color: var(--emerald-deep); }
        .dark .category-chip:hover { color: var(--emerald); }
        .category-chip.selected { background: var(--emerald); border-color: var(--emerald); color: #fff; font-weight: 500; }
        .dark .category-chip.selected { color: #0a1311; }
        
        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }
        
        /* ======== WORD COUNT CATEGORY PICKER (NEW) ======== */
        .wc-category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
          margin-bottom: 14px;
        }
        
        .wc-category-card {
          padding: 14px 16px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          cursor: pointer;
          transition: all 0.18s;
          border-radius: var(--radius);
          text-align: left;
        }
        .rtl .wc-category-card { text-align: right; }
        .wc-category-card:hover {
          border-color: var(--emerald-soft);
          background: var(--bg-elevated);
          transform: translateY(-1px);
        }
        .wc-category-card.selected {
          border-color: var(--emerald);
          background: var(--emerald-faint);
          box-shadow: 0 0 0 3px var(--emerald-glow);
        }
        
        .wc-category-name {
          font-family: 'Cinzel', serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
          margin: 0 0 4px;
          letter-spacing: 0.04em;
        }
        .rtl .wc-category-name { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-weight: 700; font-size: 16px; }
        
        .wc-category-range {
          font-family: 'EB Garamond', serif;
          font-size: 13px;
          color: var(--emerald-deep);
          margin: 0 0 4px;
          font-weight: 600;
        }
        .dark .wc-category-range { color: var(--emerald); }
        .rtl .wc-category-range { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        
        .wc-category-desc {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 13px;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.4;
        }
        .rtl .wc-category-desc { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; }
        
        /* ======== AVATAR PICKER (NEW) ======== */
        .avatar-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: 12px;
          margin-bottom: 8px;
        }
        
        .avatar-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          cursor: pointer;
          transition: all 0.18s;
          border-radius: var(--radius);
        }
        .avatar-tile:hover { border-color: var(--emerald-soft); transform: translateY(-2px); }
        .avatar-tile.selected {
          border-color: var(--emerald);
          background: var(--emerald-faint);
          box-shadow: 0 0 0 3px var(--emerald-glow);
        }
        
        .avatar-orb {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #fff;
          font-family: 'EB Garamond', 'Noto Naskh Arabic', serif;
          line-height: 1;
          box-shadow: var(--shadow-sm);
          position: relative;
        }
        .avatar-orb::after {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          pointer-events: none;
        }
        
        .avatar-name {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text);
          text-align: center;
          font-weight: 500;
        }
        .rtl .avatar-name { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 13px; font-weight: 600; }
        
        /* ======== PROJECT DETAIL ======== */
        .project-detail { max-width: 1100px; margin: 0 auto; }
        
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--emerald-deep);
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 22px;
          padding: 0;
          font-weight: 600;
        }
        .dark .back-link { color: var(--emerald); }
        .rtl .back-link { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 13px; }
        .back-link:hover { color: var(--copper); }
        
        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .detail-title {
          font-family: 'Cinzel', serif;
          font-size: 38px;
          margin: 0 0 8px;
          font-weight: 600;
          color: var(--text);
          letter-spacing: 0.01em;
          line-height: 1.1;
        }
        .rtl .detail-title { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-weight: 700; }
        
        .detail-actions { display: flex; gap: 10px; }
        
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 28px;
        }
        @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr; } }
        
        .detail-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 26px;
          position: relative;
        }
        
        .detail-card-title {
          font-family: 'Cinzel', serif;
          font-size: 11.5px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--emerald-deep);
          margin: 0 0 18px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dark .detail-card-title { color: var(--emerald); }
        .rtl .detail-card-title { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 14px; font-weight: 700; }
        
        .milestones-list { list-style: none; padding: 0; margin: 0; }
        
        .milestone-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 0;
          border-bottom: 1px dotted var(--border);
          font-family: 'EB Garamond', serif;
          font-size: 15px;
        }
        .rtl .milestone-item { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        .milestone-item:last-child { border-bottom: none; }
        
        .milestone-check {
          width: 24px;
          height: 24px;
          border: 1.5px solid var(--border-strong);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s;
          flex-shrink: 0;
        }
        .milestone-check.done {
          background: var(--emerald);
          border-color: var(--emerald);
          color: #fff;
        }
        .dark .milestone-check.done { color: #0a1311; }
        
        .milestone-info { flex: 1; }
        .milestone-label { color: var(--text); font-weight: 500; }
        
        .milestone-date {
          font-size: 13px;
          color: var(--text-muted);
          font-style: italic;
          font-family: 'Cormorant Garamond', serif;
          margin-top: 2px;
        }
        .rtl .milestone-date { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; }
        
        .add-words-row {
          display: flex;
          gap: 10px;
          margin-top: 14px;
        }
        
        .add-words-row input {
          flex: 1;
          padding: 10px 12px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-family: 'EB Garamond', serif;
          font-size: 15px;
          outline: none;
          border-radius: var(--radius-sm);
        }
        .add-words-row input:focus { border-color: var(--emerald); box-shadow: 0 0 0 3px var(--emerald-glow); }
        .rtl .add-words-row input { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        
        /* ======== VIZIER AGENT ======== */
        .vizier-console { max-width: 900px; margin: 0 auto; }
        
        .vizier-hero {
          background: linear-gradient(135deg, var(--emerald-faint) 0%, var(--bg-elevated) 60%, var(--copper-faint) 100%);
          border: 1px solid var(--emerald);
          padding: 36px;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-lg);
        }
        .dark .vizier-hero {
          background: linear-gradient(135deg, var(--emerald-faint) 0%, var(--bg-elevated) 60%, var(--copper-faint) 100%);
        }
        
        .vizier-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -15%;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, var(--emerald-glow), transparent 70%);
        }
        .rtl .vizier-hero::before { right: auto; left: -15%; }
        
        .vizier-avatar {
          width: 70px;
          height: 70px;
          border: 2px solid var(--emerald);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--emerald-deep);
          margin-bottom: 18px;
          position: relative;
          background: var(--bg-elevated);
          box-shadow: 0 6px 20px var(--emerald-glow);
        }
        .dark .vizier-avatar { color: var(--emerald); }
        .vizier-avatar::before {
          content: '';
          position: absolute;
          inset: -6px;
          border: 1px dashed var(--emerald);
          border-radius: 50%;
          opacity: 0.4;
          animation: spin-slow 80s linear infinite;
        }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        
        .vizier-greeting {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 19px;
          line-height: 1.6;
          color: var(--text);
          margin: 0;
          max-width: 600px;
          position: relative;
        }
        .rtl .vizier-greeting { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; line-height: 1.85; font-size: 18px; }
        
        /* ======== MOTIVATIONAL QUOTE CARD (NEW) ======== */
        .quote-card {
          background: linear-gradient(135deg, var(--copper-faint) 0%, var(--bg-elevated) 100%);
          border: 1px solid var(--copper);
          border-left: 4px solid var(--copper);
          padding: 24px 28px;
          margin-bottom: 24px;
          position: relative;
          border-radius: var(--radius);
          overflow: hidden;
        }
        .rtl .quote-card { border-left: 1px solid var(--copper); border-right: 4px solid var(--copper); }
        
        .quote-card::before {
          content: '"';
          position: absolute;
          top: -10px;
          left: 18px;
          font-family: 'Cinzel', serif;
          font-size: 90px;
          color: var(--copper);
          opacity: 0.18;
          line-height: 1;
          pointer-events: none;
        }
        .rtl .quote-card::before { left: auto; right: 18px; }
        
        .quote-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          gap: 12px;
          position: relative;
        }
        
        .quote-card-label {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--copper-deep);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dark .quote-card-label { color: var(--copper); }
        .rtl .quote-card-label { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 13px; font-weight: 700; }
        
        .quote-refresh {
          background: transparent;
          border: 1px solid var(--copper);
          color: var(--copper-deep);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .dark .quote-refresh { color: var(--copper); }
        .quote-refresh:hover {
          background: var(--copper);
          color: #fff;
          transform: rotate(90deg);
        }
        
        .quote-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 19px;
          line-height: 1.55;
          color: var(--text);
          margin: 0 0 10px;
          position: relative;
          animation: quote-fade 0.5s ease-out;
        }
        .rtl .quote-text { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; font-size: 19px; line-height: 1.85; }
        
        @keyframes quote-fade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .quote-source {
          font-family: 'Cinzel', serif;
          font-size: 12px;
          color: var(--text-muted);
          letter-spacing: 0.06em;
          text-align: right;
          font-weight: 500;
        }
        .rtl .quote-source { text-align: left; font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-size: 14px; }
        .quote-source::before { content: '— '; }
        
        .vizier-tools {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 14px;
          margin-bottom: 28px;
        }
        
        .tool-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 22px;
          cursor: pointer;
          transition: all 0.25s;
          text-align: center;
        }
        
        .tool-card:hover {
          border-color: var(--emerald);
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }
        
        .tool-icon { color: var(--emerald); margin-bottom: 12px; }
        
        .tool-name {
          font-family: 'Cinzel', serif;
          font-size: 13px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--text);
          margin: 0;
          font-weight: 600;
        }
        .rtl .tool-name { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 15px; font-weight: 700; }
        
        .analysis-panel {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px;
          min-height: 280px;
          position: relative;
        }
        
        .insight-item {
          font-family: 'EB Garamond', serif;
          font-size: 16px;
          line-height: 1.7;
          color: var(--text);
          padding: 14px 0;
          border-bottom: 1px dotted var(--border);
          position: relative;
          padding-left: 24px;
        }
        .rtl .insight-item { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; padding-left: 0; padding-right: 24px; line-height: 1.9; }
        .insight-item:last-child { border-bottom: none; }
        
        .insight-item::before {
          content: '◆';
          position: absolute;
          left: 0;
          color: var(--emerald);
          font-size: 9px;
          top: 22px;
        }
        .rtl .insight-item::before { left: auto; right: 0; }
        
        .metric-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
          margin: 18px 0;
          padding: 18px;
          background: var(--emerald-faint);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
        }
        
        .metric { text-align: center; }
        
        .metric-value {
          font-family: 'Cinzel', serif;
          font-size: 22px;
          color: var(--emerald-deep);
          font-weight: 700;
          display: block;
        }
        .dark .metric-value { color: var(--emerald); }
        .rtl .metric-value { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        
        .metric-label {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 13px;
          color: var(--text-muted);
        }
        .rtl .metric-label { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; }
        
        .upload-zone {
          border: 2px dashed var(--emerald);
          padding: 36px;
          text-align: center;
          background: var(--emerald-faint);
          cursor: pointer;
          transition: all 0.25s;
          border-radius: var(--radius);
        }
        .upload-zone:hover {
          background: var(--bg-elevated);
          border-style: solid;
        }
        
        .loading-spinner {
          display: inline-block;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        /* ======== SETTINGS ======== */
        .settings-group {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 26px;
          margin-bottom: 18px;
        }
        
        .settings-label {
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--emerald-deep);
          margin: 0 0 14px;
          font-weight: 600;
        }
        .dark .settings-label { color: var(--emerald); }
        .rtl .settings-label { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 14px; font-weight: 700; }
        
        .theme-toggle {
          display: flex;
          gap: 0;
          border: 1px solid var(--border);
          width: fit-content;
          border-radius: var(--radius-sm);
          overflow: hidden;
        }
        
        .theme-option {
          padding: 10px 18px;
          background: var(--bg);
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.18s;
          font-weight: 500;
        }
        .rtl .theme-option { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 13px; }
        .theme-option:hover { color: var(--text); }
        .theme-option.active {
          background: var(--emerald);
          color: #fff;
        }
        .dark .theme-option.active { color: #0a1311; }
        
        .lang-options {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        
        .lang-btn {
          padding: 10px 18px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text-muted);
          cursor: pointer;
          font-family: 'EB Garamond', serif;
          font-size: 15px;
          transition: all 0.18s;
          border-radius: var(--radius-sm);
          font-weight: 500;
        }
        .lang-btn:hover { color: var(--text); border-color: var(--emerald-soft); }
        .lang-btn.active {
          border-color: var(--emerald);
          background: var(--emerald-faint);
          color: var(--emerald-deep);
          font-weight: 600;
        }
        .dark .lang-btn.active { color: var(--emerald); }
        
        /* ======== PROFILE ======== */
        .profile-hero {
          text-align: center;
          padding: 36px 0 32px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 32px;
        }
        
        .profile-avatar-lg {
          width: 110px;
          height: 110px;
          background: var(--emerald);
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cinzel', serif;
          font-size: 38px;
          margin: 0 auto 16px;
          font-weight: 600;
          box-shadow: 0 0 0 4px var(--bg), 0 0 0 5px var(--emerald), 0 8px 24px var(--emerald-glow);
          position: relative;
          line-height: 1;
        }
        .dark .profile-avatar-lg { color: #0a1311; }
        .profile-avatar-lg.has-glyph {
          font-size: 52px;
          font-family: 'EB Garamond', 'Noto Naskh Arabic', serif;
        }
        
        .profile-avatar-edit {
          position: absolute;
          bottom: -4px;
          right: -4px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--copper);
          color: #fff;
          border: 3px solid var(--bg);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.18s;
        }
        .profile-avatar-edit:hover { background: var(--copper-deep); transform: scale(1.06); }
        
        .profile-name {
          font-family: 'Cinzel', serif;
          font-size: 28px;
          margin: 0 0 4px;
          color: var(--text);
          font-weight: 600;
          letter-spacing: 0.03em;
        }
        .rtl .profile-name { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-weight: 700; }
        
        .profile-since {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: var(--text-muted);
          font-size: 16px;
        }
        .rtl .profile-since { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; }
        
        .badges-display {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 18px;
          margin-top: 16px;
        }
        
        .badge-display-item {
          text-align: center;
          padding: 18px;
          border: 1px solid var(--border);
          background: var(--bg);
          transition: all 0.25s;
          border-radius: var(--radius);
        }
        .badge-display-item:hover { border-color: var(--emerald); transform: translateY(-2px); box-shadow: var(--shadow); }
        
        .badge-display-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 10px;
          box-shadow: var(--shadow-sm);
        }
        .badge-display-icon.bronze { background: linear-gradient(135deg, #cd7f32, #8a4f1c); color: #fff; }
        .badge-display-icon.silver { background: linear-gradient(135deg, #d4d4d4, #808080); color: #fff; }
        .badge-display-icon.gold { background: linear-gradient(135deg, #f0c54a, #b07f1e); color: #fff; }
        
        .badge-display-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          color: var(--text);
          margin: 0;
        }
        .rtl .badge-display-label { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        
        /* ======== SUGGESTIONS ======== */
        .suggestions-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 14px;
        }
        
        .suggestion-item {
          background: var(--bg);
          border: 1px solid var(--border);
          padding: 16px 18px;
          border-left: 3px solid var(--emerald);
          border-radius: var(--radius-sm);
        }
        .rtl .suggestion-item { border-left: 1px solid var(--border); border-right: 3px solid var(--emerald); }
        
        .suggestion-book {
          font-family: 'EB Garamond', serif;
          font-size: 16px;
          color: var(--text);
          margin: 0 0 4px;
          font-weight: 500;
        }
        .rtl .suggestion-book { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        
        .suggestion-author {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: var(--text-muted);
          font-size: 14px;
        }
        .rtl .suggestion-author { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; }
        
        /* ======== NOTIFICATION TOAST ======== */
        .toast {
          position: fixed;
          top: 22px;
          right: 22px;
          background: var(--bg-elevated);
          border: 1px solid var(--emerald);
          border-left: 4px solid var(--emerald);
          padding: 14px 22px;
          box-shadow: var(--shadow-lg);
          z-index: 200;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'EB Garamond', serif;
          color: var(--text);
          animation: slideIn 0.3s;
          max-width: 400px;
          border-radius: var(--radius-sm);
        }
        .rtl .toast {
          right: auto;
          left: 22px;
          border-left: 1px solid var(--emerald);
          border-right: 4px solid var(--emerald);
          font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif;
          animation: slideInRTL 0.3s;
        }
        @keyframes slideIn {
          from { transform: translateX(110%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRTL {
          from { transform: translateX(-110%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .toast.error { border-color: #c1442e; border-left-color: #c1442e; }
        
        /* ======== GOOGLE CONNECT ======== */
        .google-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 18px;
          border-radius: var(--radius);
        }
        
        .google-info {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        
        .google-icon-box {
          width: 44px;
          height: 44px;
          border: 1px solid var(--emerald);
          background: var(--emerald-faint);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--emerald-deep);
          border-radius: var(--radius-sm);
        }
        .dark .google-icon-box { color: var(--emerald); }
        
        .google-label {
          font-family: 'Cinzel', serif;
          font-size: 13px;
          letter-spacing: 0.1em;
          color: var(--text);
          margin: 0 0 4px;
          font-weight: 600;
        }
        .rtl .google-label { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-size: 15px; font-weight: 700; }
        
        .google-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: var(--text-muted);
          font-size: 14px;
          margin: 0;
        }
        .rtl .google-sub { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; }
        
        .google-status-dot {
          width: 8px;
          height: 8px;
          background: var(--emerald);
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
          box-shadow: 0 0 8px var(--emerald);
        }
        .rtl .google-status-dot { margin-right: 0; margin-left: 6px; }
        
        /* ======== LINKED DOCS ROW ======== */
        .linked-doc-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 13px 16px;
          border: 1px solid var(--border);
          background: var(--bg);
          border-left: 3px solid var(--emerald);
          transition: all 0.18s;
          flex-wrap: wrap;
          border-radius: var(--radius-sm);
        }
        .rtl .linked-doc-row { border-left: 1px solid var(--border); border-right: 3px solid var(--emerald); }
        .linked-doc-row:hover { border-color: var(--emerald); background: var(--emerald-faint); }
        
        .linked-doc-info { flex: 1; min-width: 200px; }
        
        .linked-doc-title {
          font-family: 'EB Garamond', serif;
          font-size: 16px;
          color: var(--text);
          font-weight: 500;
          margin-bottom: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .rtl .linked-doc-title { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        
        .linked-doc-meta {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 13px;
          color: var(--text-muted);
        }
        .rtl .linked-doc-meta { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; }
        
        /* ======== ASSIGN PROJECT ROW ======== */
        .assign-project-row {
          padding: 14px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          cursor: pointer;
          transition: all 0.2s;
          border-radius: var(--radius-sm);
        }
        .assign-project-row:hover {
          border-color: var(--emerald-soft);
          background: var(--emerald-faint);
        }
        .assign-project-row.selected {
          border-color: var(--emerald);
          background: var(--emerald-faint);
          box-shadow: 0 0 0 3px var(--emerald-glow);
        }
        
        @media (max-width: 768px) {
          .app-shell { grid-template-columns: 1fr; }
          .sidebar { position: relative; height: auto; }
          .rtl .app-shell { grid-template-columns: 1fr; }
          .main-content { padding: 24px 18px; }
          .detail-title { font-size: 28px; }
          .auth-card { padding: 36px 24px; }
          .modal { padding: 26px; }
        }
      `}</style>
      
      {notification && (
        <div className={`toast ${notification.type === 'error' ? 'error' : ''}`}>
          {notification.type === 'error'
            ? <X size={18} color="#c1442e" />
            : <Check size={18} style={{ color: 'var(--emerald-deep)' }} />}
          <span>{notification.msg}</span>
        </div>
      )}
      
      {view === 'auth' ? (
        <AuthScreen t={t} isRTL={isRTL} authMode={authMode} setAuthMode={setAuthMode} onSubmit={handleAuth} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      ) : (
        <div className="app-shell"> 
          <aside className="sidebar">
            {/* Sidebar brand: writing-focused symbol (PenTool quill) replaces previous logo */}
            <div className="sidebar-brand">
              <div className="sidebar-brand-icon" aria-hidden="true">
                <PenTool size={20} strokeWidth={1.7} />
              </div>
              <div className="sidebar-brand-text">{t.appName}</div>
            </div>

            <nav style={{ flex: 1 }}>
              <div className={`nav-item ${view === 'dashboard' ? 'active' : ''}`} onClick={() => { setView('dashboard'); setSelectedProjectId(null); }}>
                <BookOpen size={16} /> {t.dashboard}
              </div>
              <div className={`nav-item ${view === 'vizier' ? 'active' : ''}`} onClick={() => setView('vizier')}>
                <Sparkles size={16} /> {t.vizier}
              </div>
              <div className={`nav-item ${view === 'profile' ? 'active' : ''}`} onClick={() => setView('profile')}>
                <User size={16} /> {t.profile}
              </div>
              <div className={`nav-item ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')}>
                <Settings size={16} /> {t.settings}
              </div>
            </nav>
            
            <div className="sidebar-footer">
              <div className="user-chip">
                <UserAvatarBadge user={user} size={34} />
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>{user?.username}</div>
              </div>
              <div className="nav-item" onClick={() => setShowLogoutConfirm(true)} style={{ padding: '10px 8px', margin: 0, borderLeft: 'none' }}>
                <LogOut size={16} /> {t.signOut}
              </div>
            </div>
          </aside>
          
          <main className="main-content">
            {view === 'dashboard' && !selectedProjectId && (
              <Dashboard
                t={t} user={user} projects={filteredProjects} allProjects={projects}
                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                onNewProject={() => setShowNewProject(true)}
                onSelectProject={(id) => { setSelectedProjectId(id); setView('dashboard'); }}
                onDeleteProject={deleteProject}
                isRTL={isRTL}
              />
            )}
            
            {view === 'dashboard' && selectedProjectId && selectedProject && (
              <ProjectDetail
                t={t} project={selectedProject}
                onBack={() => setSelectedProjectId(null)}
                onUpdate={(upd) => updateProject(selectedProject.id, upd)}
                onAddProgress={(w) => addProgress(selectedProject.id, w)}
                onDelete={() => { deleteProject(selectedProject.id); setSelectedProjectId(null); }}
                isRTL={isRTL}
                CATEGORIES={CATEGORIES}
              />
            )}
            
            {view === 'vizier' && (
              <VizierConsole t={t} lang={lang} projects={projects} isRTL={isRTL} googleConnected={googleConnected} setGoogleConnected={setGoogleConnected} showNotification={showNotification} syncProgress={syncProgressFromAnalysis} />
            )}
            
            {view === 'profile' && (
              <ProfileView t={t} user={user} projects={projects} isRTL={isRTL} onChangeAvatar={() => setShowAvatarPicker(true)} />
            )}
            
            {view === 'settings' && (
              <SettingsView t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} googleConnected={googleConnected} setGoogleConnected={setGoogleConnected} showNotification={showNotification} />
            )}
          </main>
        </div>
      )}
      
      {showNewProject && (
        <NewProjectModal t={t} onClose={() => setShowNewProject(false)} onCreate={createProject} isRTL={isRTL} CATEGORIES={CATEGORIES} />
      )}
      
      {showAvatarPicker && user && (
        <AvatarPickerModal
          t={t}
          isRTL={isRTL}
          currentAvatarId={user.avatarId}
          username={user.username}
          onSelect={updateUserAvatar}
          onClose={() => setShowAvatarPicker(false)}
        />
      )}
      
      {showLogoutConfirm && (
        <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <h3 className="modal-title">{t.logOut}</h3>
            <div className="ornament-divider">❦</div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowLogoutConfirm(false)}>{t.no}</button>
              <button className="btn btn-danger" onClick={handleSignOut}>{t.yes}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ USER AVATAR BADGE (shared component) ============
// Renders either the chosen character glyph (if any) or the username initial.
// Used in the sidebar chip and other compact spots.
function UserAvatarBadge({ user, size = 34 }) {
  const avatar = AVATARS.find(a => a.id === user?.avatarId);
  if (avatar) {
    return (
      <div
        className="user-avatar has-glyph"
        style={{
          width: size,
          height: size,
          fontSize: Math.round(size * 0.5),
          background: `linear-gradient(135deg, hsl(${avatar.hue}, 55%, 42%), hsl(${avatar.hue}, 60%, 28%))`,
        }}
      >
        {avatar.glyph}
      </div>
    );
  }
  return (
    <div className="user-avatar" style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}>
      {user?.username?.[0]?.toUpperCase()}
    </div>
  );
}

// ============ AUTH SCREEN ============
function AuthScreen({ t, isRTL, authMode, setAuthMode, onSubmit, lang, setLang, theme, setTheme }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const submit = async () => {
    if (!username.trim() || !password) return;
    setLoading(true);
    await onSubmit(username.trim(), password, authMode === 'signup');
    setLoading(false);
  };
  
  return (
    <div className="auth-screen">
      <div style={{ position: 'absolute', top: 18, [isRTL ? 'left' : 'right']: 18, display: 'flex', gap: 8, zIndex: 10 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
        </button>
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="form-select" style={{ padding: '7px 10px', fontSize: 13, width: 'auto' }}>
          <option value="en">English</option>
          <option value="ar">العربية</option>
          <option value="fa">فارسی</option>
        </select>
      </div>
      
      <div className="auth-card">
        <div className="auth-logo">
          <div className="brand-mark">
            <div className="brand-mark-icon" aria-hidden="true">
              <PenTool size={28} strokeWidth={1.6} />
            </div>
            <div className="brand-mark-wordmark">{t.appName}</div>
          </div>
          <p className="auth-tagline">{t.tagline}</p>
        </div>
        
        <div className="ornament-divider">❦</div>
        
        <div>
          <div className="form-group">
            <label className="form-label">{t.username}</label>
            <input className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} />
          </div>
          <div className="form-group">
            <label className="form-label">{t.password}</label>
            <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} />
            {authMode === 'signup' && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6, fontStyle: 'italic' }}>{t.passwordRule}</div>}
          </div>
          
          <button className="btn btn-full btn-lg" onClick={submit} disabled={loading} style={{ marginTop: 6 }}>
            {loading ? <Loader size={16} className="loading-spinner" /> : <>{authMode === 'signup' ? t.signUp : t.signIn}{!isRTL && <ChevronRight size={14} />}</>}
          </button>
          
          <div className="auth-switch">
            {authMode === 'signup' ? t.haveAccount : t.noAccount}
            <a onClick={() => setAuthMode(authMode === 'signup' ? 'signin' : 'signup')}>
              {authMode === 'signup' ? t.signIn : t.signUp}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ DASHBOARD ============
function Dashboard({ t, user, projects, allProjects, searchQuery, setSearchQuery, onNewProject, onSelectProject, onDeleteProject, isRTL }) {
  const active = allProjects.filter(p => !p.completed).length;
  const completed = allProjects.filter(p => p.completed).length;
  const totalWords = allProjects.reduce((s, p) => s + p.achievedWordCount, 0);
  const totalBadges = allProjects.reduce((s, p) => s + p.badges.length, 0);
  
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t.welcome}, {user?.username}</h1>
        <p className="page-subtitle">{t.beginJourney}</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">{t.activeProjects}</p>
          <p className="stat-value">{active}</p>
          <BookOpen size={22} className="stat-icon" />
        </div>
        <div className="stat-card">
          <p className="stat-label">{t.completedWorks}</p>
          <p className="stat-value">{completed}</p>
          <Scroll size={22} className="stat-icon" />
        </div>
        <div className="stat-card">
          <p className="stat-label">{t.totalWords}</p>
          <p className="stat-value">{totalWords.toLocaleString()}</p>
          <Feather size={22} className="stat-icon" />
        </div>
        <div className="stat-card">
          <p className="stat-label">{t.badges}</p>
          <p className="stat-value">{totalBadges}</p>
          <Crown size={22} className="stat-icon" />
        </div>
      </div>
      
      <div className="toolbar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input className="search-input" placeholder={t.searchBooks} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <button className="btn" onClick={onNewProject}>
          <Plus size={16} /> {t.newProject}
        </button>
      </div>
      
      {projects.length === 0 ? (
        <div className="empty-state">
          <Scroll size={56} className="empty-state-icon" />
          <p className="empty-state-text">{t.noProjects}</p>
          <button className="btn" onClick={onNewProject}><Plus size={16} /> {t.newProject}</button>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map(p => {
            const pct = p.projectedWordCount ? Math.min(100, (p.achievedWordCount / p.projectedWordCount) * 100) : 0;
            return (
              <div key={p.id} className="project-card" onClick={() => onSelectProject(p.id)}>
                <h3 className="project-title">{p.title}</h3>
                <div className="project-categories">
                  {p.categories.map(c => <span key={c} className="category-tag">{c}</span>)}
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
                <div className="progress-info">
                  <span>{p.achievedWordCount.toLocaleString()} / {p.projectedWordCount.toLocaleString()}</span>
                  <span className="progress-percent">{pct.toFixed(1)}%</span>
                </div>
                {p.badges.length > 0 && (
                  <div className="project-badges">
                    {p.badges.map((b, i) => <div key={i} className={`badge-icon ${b.badgeType}`}><Award size={14} /></div>)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============ NEW PROJECT MODAL ============
function NewProjectModal({ t, onClose, onCreate, isRTL, CATEGORIES }) {
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [projectedWordCount, setProjectedWordCount] = useState(50000);
  const [numberOfMilestones, setNumberOfMilestones] = useState(5);
  const [error, setError] = useState('');
  
  // Determine which length-category the current word count falls into,
  // so the corresponding card highlights as selected.
  const activeCategoryId = (() => {
    for (const c of WORD_COUNT_CATEGORIES) {
      if (projectedWordCount >= c.min && projectedWordCount <= c.max) return c.id;
    }
    return null;
  })();
  
  const toggleCat = (c) => {
    if (categories.includes(c)) setCategories(categories.filter(x => x !== c));
    else if (categories.length < 3) setCategories([...categories, c]);
  };
  
  const pickWordCategory = (cat) => {
    setProjectedWordCount(cat.typical);
    setError('');
  };
  
  const submit = () => {
    if (!title.trim()) { setError(t.projectName); return; }
    if (categories.length < 1 || categories.length > 3) { setError(t.categoryLimit); return; }
    if (projectedWordCount < 1000 || projectedWordCount > 200000) { setError(`${t.minWords} / ${t.maxWords}`); return; }
    if (numberOfMilestones < 3 || numberOfMilestones > 10) { setError(t.milestoneRange); return; }
    onCreate({ title: title.trim(), categories, projectedWordCount: Number(projectedWordCount), numberOfMilestones: Number(numberOfMilestones) });
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <h2 className="modal-title">{t.newProject}</h2>
        <div className="ornament-divider">❦</div>
        
        <div className="form-group">
          <label className="form-label">{t.projectName}</label>
          <input className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        
        <div className="form-group">
          <label className="form-label">{t.categories} ({categories.length}/3)</label>
          <div className="category-grid">
            {CATEGORIES.map(c => (
              <div key={c} className={`category-chip ${categories.includes(c) ? 'selected' : ''}`} onClick={() => toggleCat(c)}>
                {c}
              </div>
            ))}
          </div>
        </div>
        
        {/* === NEW: Intelligent word-count category picker === */}
        <div className="form-group">
          <label className="form-label">{t.wordCount}</label>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 10, fontFamily: isRTL ? "'Noto Naskh Arabic', 'Vazirmatn', serif" : "'Cormorant Garamond', serif" }}>
            {t.selectCategory}
          </div>
          <div className="wc-category-grid">
            {WORD_COUNT_CATEGORIES.map(c => (
              <div
                key={c.id}
                className={`wc-category-card ${activeCategoryId === c.id ? 'selected' : ''}`}
                onClick={() => pickWordCategory(c)}
              >
                <div className="wc-category-name">{t[c.key]}</div>
                <div className="wc-category-range">
                  {c.min.toLocaleString()}–{c.max.toLocaleString()} {t.wordRange}
                </div>
                <div className="wc-category-desc">{t[c.descKey]}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 8, marginTop: 4, fontFamily: isRTL ? "'Noto Naskh Arabic', 'Vazirmatn', serif" : "'Cormorant Garamond', serif" }}>
            {t.customLength} ({t.minWords} / {t.maxWords})
          </div>
          <input type="number" className="form-input" value={projectedWordCount} onChange={(e) => setProjectedWordCount(Number(e.target.value) || 0)} min={1000} max={200000} step={1000} />
        </div>
        
        <div className="form-group">
          <label className="form-label">{t.milestones} ({t.milestoneRange})</label>
          <input type="number" className="form-input" value={numberOfMilestones} onChange={(e) => setNumberOfMilestones(Number(e.target.value) || 0)} min={3} max={10} />
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6, fontStyle: 'italic' }}>
            ≈ {Math.floor(projectedWordCount / Math.max(1, numberOfMilestones)).toLocaleString()} {t.wordRange} / {t.milestones.toLowerCase()}
          </div>
        </div>
        
        {error && <div style={{ color: '#c1442e', fontSize: 14, marginTop: 8 }}>{error}</div>}
        
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>{t.cancel}</button>
          <button className="btn" onClick={submit}>{t.create}</button>
        </div>
      </div>
    </div>
  );
}

// ============ AVATAR PICKER MODAL (NEW) ============
function AvatarPickerModal({ t, isRTL, currentAvatarId, username, onSelect, onClose }) {
  const [pending, setPending] = useState(currentAvatarId);
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <h2 className="modal-title">{t.chooseAvatar}</h2>
        <p className="modal-subtitle">{t.avatarHint}</p>
        <div className="ornament-divider">❦</div>
        
        <div className="avatar-grid">
          {AVATARS.map(a => {
            const label = t.avatarLabels?.[a.id] || a.id;
            const isSelected = pending === a.id;
            return (
              <div
                key={a.id}
                className={`avatar-tile ${isSelected ? 'selected' : ''}`}
                onClick={() => setPending(a.id)}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
              >
                <div
                  className="avatar-orb"
                  style={{
                    background: `linear-gradient(135deg, hsl(${a.hue}, 55%, 42%), hsl(${a.hue}, 60%, 28%))`,
                  }}
                >
                  {a.glyph}
                </div>
                <div className="avatar-name">{label}</div>
              </div>
            );
          })}
        </div>
        
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>{t.cancel}</button>
          <button className="btn" onClick={() => onSelect(pending)} disabled={!pending}>{t.save}</button>
        </div>
      </div>
    </div>
  );
}

// ============ PROJECT DETAIL ============
function ProjectDetail({ t, project, onBack, onUpdate, onAddProgress, onDelete, isRTL, CATEGORIES }) {
  const [editing, setEditing] = useState(false);
  const [wordsToAdd, setWordsToAdd] = useState('');
  const [editData, setEditData] = useState({ title: project.title, categories: [...project.categories], projectedWordCount: project.projectedWordCount, numberOfMilestones: project.numberOfMilestones });
  
  const pct = Math.min(100, (project.achievedWordCount / project.projectedWordCount) * 100);
  const remaining = Math.max(0, project.projectedWordCount - project.achievedWordCount);
  
  const handleAdd = () => {
    const n = parseInt(wordsToAdd);
    if (!isNaN(n)) {
      onAddProgress(n);
      setWordsToAdd('');
    }
  };
  
  const saveEdit = () => {
    if (editData.categories.length < 1 || editData.categories.length > 3) return;
    if (editData.projectedWordCount < 1000 || editData.projectedWordCount > 200000) return;
    if (editData.numberOfMilestones < 3 || editData.numberOfMilestones > 10) return;
    
    const targetPer = Math.floor(editData.projectedWordCount / editData.numberOfMilestones);
    const newMilestones = Array.from({ length: editData.numberOfMilestones }, (_, i) => {
      const tgt = targetPer * (i + 1);
      const existing = project.milestones[i];
      return {
        milestoneNumber: i + 1,
        targetWordCount: tgt,
        isCompleted: project.achievedWordCount >= tgt,
        dateAchieved: existing?.dateAchieved || (project.achievedWordCount >= tgt ? new Date().toISOString() : null),
      };
    });
    
    onUpdate({ ...editData, milestones: newMilestones });
    setEditing(false);
  };
  
  const toggleEditCat = (c) => {
    if (editData.categories.includes(c)) setEditData({ ...editData, categories: editData.categories.filter(x => x !== c) });
    else if (editData.categories.length < 3) setEditData({ ...editData, categories: [...editData.categories, c] });
  };
  
  return (
    <div className="project-detail">
      <button className="back-link" onClick={onBack}>{isRTL ? '→' : '←'} {t.dashboard}</button>
      
      <div className="detail-header">
        <div>
          {editing ? (
            <input className="form-input" style={{ fontSize: 26, fontFamily: isRTL ? "'Noto Naskh Arabic', serif" : "'Cinzel', serif", fontWeight: 600 }} value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
          ) : (
            <h1 className="detail-title">{project.title}</h1>
          )}
          <div className="project-categories" style={{ marginTop: 8 }}>
            {(editing ? editData.categories : project.categories).map(c => <span key={c} className="category-tag">{c}</span>)}
          </div>
        </div>
        <div className="detail-actions">
          {editing ? (
            <>
              <button className="btn btn-ghost" onClick={() => setEditing(false)}>{t.cancel}</button>
              <button className="btn" onClick={saveEdit}>{t.save}</button>
            </>
          ) : (
            <>
              <button className="btn btn-ghost" onClick={() => setEditing(true)}><Edit3 size={14} /> {t.edit}</button>
              <button className="btn btn-danger" onClick={onDelete}><Trash2 size={14} /></button>
            </>
          )}
        </div>
      </div>
      
      {editing && (
        <div className="detail-card" style={{ marginBottom: 22 }}>
          <div className="form-group">
            <label className="form-label">{t.categories}</label>
            <div className="category-grid">
              {CATEGORIES.map(c => (
                <div key={c} className={`category-chip ${editData.categories.includes(c) ? 'selected' : ''}`} onClick={() => toggleEditCat(c)}>{c}</div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">{t.wordCount}</label>
              <input type="number" className="form-input" value={editData.projectedWordCount} onChange={(e) => setEditData({ ...editData, projectedWordCount: Number(e.target.value) })} min={1000} max={200000} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">{t.milestones}</label>
              <input type="number" className="form-input" value={editData.numberOfMilestones} onChange={(e) => setEditData({ ...editData, numberOfMilestones: Number(e.target.value) })} min={3} max={10} />
            </div>
          </div>
        </div>
      )}
      
      <div className="detail-card" style={{ marginBottom: 22 }}>
        <div className="detail-card-title"><TrendingUp size={14} /> {t.progress}</div>
        <div className="progress-bar" style={{ height: 12 }}><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 18 }}>
          <div><div className="metric-label">{t.totalWords}</div><div className="metric-value">{project.achievedWordCount.toLocaleString()}</div></div>
          <div><div className="metric-label">{t.remaining}</div><div className="metric-value">{remaining.toLocaleString()}</div></div>
          <div><div className="metric-label">{t.completion}</div><div className="metric-value">{pct.toFixed(1)}%</div></div>
        </div>
        <div className="add-words-row">
          <input placeholder={t.addWords} value={wordsToAdd} onChange={(e) => setWordsToAdd(e.target.value)} type="number" />
          <button className="btn" onClick={handleAdd}><Plus size={14} /> {t.addWords}</button>
        </div>
      </div>
      
      <div className="detail-grid">
        <div className="detail-card">
          <div className="detail-card-title"><Target size={14} /> {t.milestones}</div>
          <ul className="milestones-list">
            {project.milestones.map(m => (
              <li key={m.milestoneNumber} className="milestone-item">
                <div className={`milestone-check ${m.isCompleted ? 'done' : ''}`}>
                  {m.isCompleted && <Check size={14} />}
                </div>
                <div className="milestone-info">
                  <div className="milestone-label">#{m.milestoneNumber} — {m.targetWordCount.toLocaleString()} {t.wordRange}</div>
                  {m.dateAchieved && <div className="milestone-date">{new Date(m.dateAchieved).toLocaleDateString()}</div>}
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="detail-card">
          <div className="detail-card-title"><Award size={14} /> {t.badges}</div>
          {project.badges.length === 0 ? (
            <p style={{ fontFamily: isRTL ? "'Noto Naskh Arabic', 'Vazirmatn', serif" : "'Cormorant Garamond', serif", fontStyle: isRTL ? 'normal' : 'italic', color: 'var(--text-muted)', fontSize: 15 }}>
              {t.earnFirstQuill}
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {project.badges.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className={`badge-display-icon ${b.badgeType}`} style={{ width: 40, height: 40, margin: 0 }}><Award size={20} /></div>
                  <div>
                    <div style={{ fontFamily: isRTL ? "'Noto Naskh Arabic', serif" : "'EB Garamond', serif", fontSize: 15, color: 'var(--text)' }}>{b.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: isRTL ? 'normal' : 'italic' }}>{new Date(b.dateAwarded).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {project.suggestions && project.suggestions.length > 0 && (
        <div className="detail-card">
          <div className="detail-card-title"><BookOpen size={14} /> {t.suggestions}</div>
          <div className="suggestions-list">
            {project.suggestions.map((s, i) => (
              <div key={i} className="suggestion-item">
                <div className="suggestion-book">{s.book}</div>
                <div className="suggestion-author">{s.author}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ VIZIER CONSOLE ============
function VizierConsole({ t, lang, projects, isRTL, googleConnected, setGoogleConnected, showNotification, syncProgress }) {
  const [analysis, setAnalysis] = useState(null);
  const [insights, setInsights] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzingStage, setAnalyzingStage] = useState('');
  const [googleDocUrl, setGoogleDocUrl] = useState('');
  const [pendingAnalysis, setPendingAnalysis] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [linkedDocs, setLinkedDocs] = useState([]);
  const [updatingDocId, setUpdatingDocId] = useState(null);
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const fileRef = useRef(null);
  
  const activeProjects = projects.filter(p => !p.completed);
  const quoteList = MOTIVATIONAL_QUOTES[lang] || MOTIVATIONAL_QUOTES.en;
  const currentQuote = quoteList[currentQuoteIdx % quoteList.length];
  
  // Reset quote index whenever language changes (so the displayed quote
  // belongs to the active language and isn't an out-of-range index)
  useEffect(() => {
    setCurrentQuoteIdx(Math.floor(Math.random() * quoteList.length));
  }, [lang]);
  
  // Auto-rotate motivational quote every 30 seconds to keep the page lively
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentQuoteIdx(idx => (idx + 1) % quoteList.length);
    }, 30000);
    return () => clearInterval(id);
  }, [quoteList.length]);
  
  const refreshQuote = () => {
    // Pick a different quote than the current one when possible
    if (quoteList.length <= 1) return;
    let next = currentQuoteIdx;
    while (next === currentQuoteIdx) {
      next = Math.floor(Math.random() * quoteList.length);
    }
    setCurrentQuoteIdx(next);
  };
  
  // Load linked docs from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await window.storage.get('linked_docs');
        if (stored) setLinkedDocs(JSON.parse(stored.value));
      } catch {}
    })();
  }, []);
  
  // Persist linked docs whenever they change
  useEffect(() => {
    try { window.storage.set('linked_docs', JSON.stringify(linkedDocs)); } catch {}
  }, [linkedDocs]);
  
  // ---------- File extraction (preserved verbatim) ----------
  const extractTextFromFile = async (file) => {
    const ext = file.name.split('.').pop().toLowerCase();
    
    if (ext === 'txt') {
      return await file.text();
    }
    
    if (ext === 'docx') {
      setAnalyzingStage(t.extracting);
      const mammoth = await loadMammoth();
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value || '';
    }
    
    if (ext === 'pdf') {
      setAnalyzingStage(t.extracting);
      const arrayBuffer = await file.arrayBuffer();
      const base64 = arrayBufferToBase64(arrayBuffer);
      
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 8000,
          messages: [{
            role: "user",
            content: [
              { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64 } },
              { type: "text", text: "Extract all text from this PDF. Return ONLY the raw extracted text, with no commentary, headers, or formatting markers." }
            ]
          }]
        })
      });
      if (!response.ok) throw new Error(`API error ${response.status}`);
      const data = await response.json();
      return (data.content || []).filter(c => c.type === 'text').map(c => c.text).join('\n');
    }
    
    throw new Error('UNSUPPORTED_FORMAT');
  };
  
  // ---------- Vizier AI insights ----------
  const fetchVizierInsights = async (text, localAnalysis) => {
    try {
      const sample = text.slice(0, 3000);
      const prompt = `You are the Vizier, a wise and poetic literary advisor. Analyze this manuscript excerpt and provide 3-4 concise insights in an elegant, slightly archaic tone. Focus on: prose style, grammar/spelling concerns, narrative consistency, and writing recommendations. Keep each insight to one sentence. Respond in JSON: {"insights": ["...", "...", "...", "..."]}\n\nExcerpt:\n${sample}`;
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      if (!response.ok) throw new Error('api');
      const data = await response.json();
      const textResp = data.content.filter(c => c.type === 'text').map(c => c.text).join('');
      const cleaned = textResp.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return [...(parsed.insights || []), ...(generateVizierInsight(localAnalysis, null) || [])];
    } catch {
      return generateVizierInsight(localAnalysis, null) || [];
    }
  };
  
  // ---------- File upload handler ----------
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['docx', 'txt', 'pdf'].includes(ext)) {
      showNotification(t.unsupportedFormat, 'error');
      e.target.value = '';
      return;
    }
    
    setAnalyzing(true);
    setAnalysis(null);
    setInsights([]);
    setAnalyzingStage(t.extracting);
    
    try {
      const text = await extractTextFromFile(file);
      if (!text || !text.trim()) {
        throw new Error('EMPTY');
      }
      
      setAnalyzingStage(t.analyzing);
      const local = analyzeTextLocally(text);
      setAnalysis(local);
      
      const vizierInsights = await fetchVizierInsights(text, local);
      setInsights(vizierInsights);
      
      setPendingAnalysis({
        wordCount: local.wordCount,
        sourceType: 'file',
        sourceRef: file.name,
      });
      setShowAssignModal(true);
      showNotification(t.manuscriptAnalyzed);
    } catch (err) {
      console.error(err);
      if (err.message === 'UNSUPPORTED_FORMAT') {
        showNotification(t.unsupportedFormat, 'error');
      } else {
        showNotification(t.extractError, 'error');
      }
    } finally {
      setAnalyzing(false);
      setAnalyzingStage('');
      e.target.value = '';
    }
  };
  
  // ---------- Google Docs: connect, fetch, link ----------
  const handleGoogleConnect = () => {
    setGoogleConnected(true);
    window.storage.set('google_connected', JSON.stringify(true));
    showNotification(t.googleConnected);
  };
  
  const handleGoogleFetch = async () => {
    if (!googleDocUrl || !googleDocUrl.trim()) {
      showNotification(t.enterDocUrl, 'error');
      return;
    }
    setAnalyzing(true);
    setAnalysis(null);
    setInsights([]);
    setAnalyzingStage(t.analyzing);
    
    try {
      const { text, title } = await mockGoogleDocFetch(googleDocUrl.trim(), 0);
      const local = analyzeTextLocally(text);
      setAnalysis(local);
      
      const vizierInsights = await fetchVizierInsights(text, local);
      setInsights(vizierInsights);
      
      setPendingAnalysis({
        wordCount: local.wordCount,
        sourceType: 'gdoc',
        sourceRef: googleDocUrl.trim(),
        sourceTitle: title,
      });
      setShowAssignModal(true);
      showNotification(t.docRetrieved);
      setGoogleDocUrl('');
    } catch (err) {
      showNotification(t.extractError, 'error');
    } finally {
      setAnalyzing(false);
      setAnalyzingStage('');
    }
  };
  
  // ---------- Assign analysis → project (preserved verbatim) ----------
  const assignToProject = (projectId) => {
    if (!pendingAnalysis) return;
    const ok = syncProgress(projectId, pendingAnalysis.wordCount, pendingAnalysis.sourceType);
    if (ok) {
      if (pendingAnalysis.sourceType === 'gdoc') {
        const newLink = {
          id: Date.now().toString(),
          url: pendingAnalysis.sourceRef,
          title: pendingAnalysis.sourceTitle || 'Google Document',
          projectId: projectId,
          lastWordCount: pendingAnalysis.wordCount,
          lastSynced: new Date().toISOString(),
        };
        setLinkedDocs(prev => {
          const filtered = prev.filter(d => !(d.url === newLink.url && d.projectId === projectId));
          return [...filtered, newLink];
        });
      }
      showNotification(t.progressSynced);
    }
    setShowAssignModal(false);
    setPendingAnalysis(null);
  };
  
  const skipAssignment = () => {
    setShowAssignModal(false);
    setPendingAnalysis(null);
  };
  
  // ---------- Update a linked Google Doc ----------
  const updateLinkedDoc = async (doc) => {
    setUpdatingDocId(doc.id);
    try {
      const { text, fetchedAt } = await mockGoogleDocFetch(doc.url, doc.lastWordCount);
      const local = analyzeTextLocally(text);
      const ok = syncProgress(doc.projectId, local.wordCount, 'gdoc-update');
      if (ok) {
        setLinkedDocs(prev => prev.map(d => d.id === doc.id ? {
          ...d,
          lastWordCount: local.wordCount,
          lastSynced: fetchedAt,
        } : d));
        showNotification(t.progressSynced);
      }
    } catch {
      showNotification(t.extractError, 'error');
    } finally {
      setUpdatingDocId(null);
    }
  };
  
  const unlinkDoc = (docId) => {
    setLinkedDocs(prev => prev.filter(d => d.id !== docId));
  };
  
  return (
    <div className="vizier-console">
      <div className="page-header">
        <h1 className="page-title">{t.vizier}</h1>
        <p className="page-subtitle">{t.analyzeWriting}</p>
      </div>
      
      {/* Motivational quote card — rotates every 30s, manual refresh available */}
      <div className="quote-card">
        <div className="quote-card-header">
          <div className="quote-card-label">
            <Quote size={14} />
            <span>{t.motivationOfTheDay}</span>
          </div>
          <button className="quote-refresh" onClick={refreshQuote} title={t.refresh} aria-label={t.refresh}>
            <RefreshCw size={14} />
          </button>
        </div>
        <p className="quote-text">{currentQuote.text}</p>
        <p className="quote-source">— {currentQuote.source}</p>
      </div>
      
      <div className="vizier-hero">
        <div className="vizier-avatar"><Sparkles size={36} /></div>
        <p className="vizier-greeting">{t.vizierWelcome}</p>
      </div>
      
      <div className="vizier-tools">
        <div className="tool-card" onClick={() => !analyzing && fileRef.current?.click()}>
          <Upload size={32} className="tool-icon" />
          <div className="tool-name">{t.uploadFile}</div>
          <input ref={fileRef} type="file" accept=".docx,.txt,.pdf" style={{ display: 'none' }} onChange={handleFile} />
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8, fontStyle: isRTL ? 'normal' : 'italic' }}>{t.chooseFile}</div>
        </div>
        
        <div className="tool-card">
          <Link2 size={32} className="tool-icon" />
          <div className="tool-name">{t.connectGoogle}</div>
          {googleConnected ? (
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>
              <span className="google-status-dot"></span>{t.googleConnected}
            </div>
          ) : (
            <button className="btn btn-sm" style={{ marginTop: 10 }} onClick={handleGoogleConnect}>{t.authorize}</button>
          )}
        </div>
      </div>
      
      {googleConnected && (
        <div className="detail-card" style={{ marginBottom: 24 }}>
          <div className="detail-card-title"><Link2 size={14} /> {t.fetchDoc}</div>
          <div className="add-words-row">
            <input placeholder="https://docs.google.com/document/d/..." value={googleDocUrl} onChange={(e) => setGoogleDocUrl(e.target.value)} />
            <button className="btn" onClick={handleGoogleFetch} disabled={analyzing}>{t.fetchDoc}</button>
          </div>
        </div>
      )}
      
      {/* Linked Google Docs list */}
      {googleConnected && (
        <div className="detail-card" style={{ marginBottom: 24 }}>
          <div className="detail-card-title"><FileText size={14} /> {t.linkedDocs}</div>
          {linkedDocs.length === 0 ? (
            <p style={{ fontFamily: isRTL ? "'Noto Naskh Arabic', 'Vazirmatn', serif" : "'Cormorant Garamond', serif", fontStyle: isRTL ? 'normal' : 'italic', color: 'var(--text-muted)', fontSize: 15, margin: 0 }}>
              {t.noLinkedDocs}
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {linkedDocs.map(doc => {
                const proj = projects.find(p => p.id === doc.projectId);
                return (
                  <div key={doc.id} className="linked-doc-row">
                    <div className="linked-doc-info">
                      <div className="linked-doc-title">{doc.title}</div>
                      <div className="linked-doc-meta">
                        {t.linkedToProject} <strong>{proj?.title || '—'}</strong>
                        {' · '}
                        {doc.lastWordCount.toLocaleString()} {t.totalWords.toLowerCase()}
                        {' · '}
                        {t.lastSynced}: {new Date(doc.lastSynced).toLocaleString()}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className="btn btn-sm"
                        onClick={() => updateLinkedDoc(doc)}
                        disabled={updatingDocId === doc.id || !proj}
                      >
                        {updatingDocId === doc.id ? <Loader size={12} className="loading-spinner" /> : <><TrendingUp size={12} /> {t.update}</>}
                      </button>
                      <button className="btn btn-ghost btn-sm" onClick={() => unlinkDoc(doc.id)} title={t.unlink || 'Unlink'}>
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      
      {analyzing && (
        <div className="analysis-panel" style={{ textAlign: 'center' }}>
          <Loader size={32} className="loading-spinner" style={{ color: 'var(--gold)', margin: '60px auto 20px' }} />
          <p style={{ fontFamily: isRTL ? "'Noto Naskh Arabic', 'Vazirmatn', serif" : "'Cormorant Garamond', serif", fontStyle: isRTL ? 'normal' : 'italic', fontSize: 18, color: 'var(--text-muted)' }}>
            {analyzingStage || t.analyzing}
          </p>
        </div>
      )}
      
      {analysis && !analyzing && (
        <div className="analysis-panel">
          <div className="detail-card-title"><BarChart3 size={14} /> {t.insights}</div>
          
          <div className="metric-grid">
            <div className="metric"><span className="metric-value">{analysis.wordCount.toLocaleString()}</span><span className="metric-label">{t.totalWords}</span></div>
            <div className="metric"><span className="metric-value">{analysis.sentenceCount}</span><span className="metric-label">{t.sentences}</span></div>
            <div className="metric"><span className="metric-value">{analysis.paragraphCount}</span><span className="metric-label">{t.paragraphs}</span></div>
            <div className="metric"><span className="metric-value">{analysis.avgWordsPerSentence}</span><span className="metric-label">{t.avgPerSentence}</span></div>
            <div className="metric"><span className="metric-value">{analysis.lexicalDiversity}%</span><span className="metric-label">{t.diversity}</span></div>
          </div>
          
          {insights.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div className="detail-card-title"><Sparkles size={14} /> {t.vizierAdvice}</div>
              {insights.map((ins, i) => <div key={i} className="insight-item">{ins}</div>)}
            </div>
          )}
          
          {analysis.issues && analysis.issues.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div className="detail-card-title"><Feather size={14} /> {t.grammarCheck}</div>
              {analysis.issues.map((iss, i) => <div key={i} className="insight-item">{iss}</div>)}
            </div>
          )}
        </div>
      )}
      
      {/* Assign to Project Modal */}
      {showAssignModal && pendingAnalysis && (
        <AssignProjectModal
          t={t}
          isRTL={isRTL}
          analysis={pendingAnalysis}
          projects={activeProjects}
          onAssign={assignToProject}
          onClose={skipAssignment}
        />
      )}
    </div>
  );
}

// ============ ASSIGN TO PROJECT MODAL ============
function AssignProjectModal({ t, isRTL, analysis, projects, onAssign, onClose }) {
  const [selected, setSelected] = useState(projects[0]?.id || null);
  const headingFont = isRTL ? "'Amiri', 'Noto Naskh Arabic', serif" : "'Cinzel', serif";
  const bodyFont = isRTL ? "'Noto Naskh Arabic', 'Vazirmatn', serif" : "'EB Garamond', serif";
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        <h2 className="modal-title">{t.assignToProject}</h2>
        <div className="ornament-divider">❦</div>
        
        <div style={{
          background: 'var(--gold-faint)',
          border: '1px solid var(--gold)',
          borderRadius: 'var(--radius-sm)',
          padding: 16,
          marginBottom: 20,
          fontFamily: bodyFont,
          fontSize: 15,
          color: 'var(--text)',
          lineHeight: 1.6,
        }}>
          <div style={{ fontFamily: headingFont, fontSize: 11, letterSpacing: isRTL ? '0' : '0.15em', textTransform: isRTL ? 'none' : 'uppercase', color: 'var(--gold-dark)', marginBottom: 6, fontWeight: 600 }}>
            {t.newWords}
          </div>
          <strong style={{ fontSize: 22, fontFamily: headingFont }}>{analysis.wordCount.toLocaleString()}</strong> {t.totalWords.toLowerCase()}
          <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: isRTL ? 'normal' : 'italic', marginTop: 4 }}>
            {analysis.sourceType === 'gdoc' ? (analysis.sourceTitle || 'Google Document') : analysis.sourceRef}
          </div>
        </div>
        
        {projects.length === 0 ? (
          <p style={{ fontFamily: bodyFont, fontStyle: isRTL ? 'normal' : 'italic', color: 'var(--text-muted)', fontSize: 16, textAlign: 'center', padding: '20px 0' }}>
            {t.noActiveProjects}
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 340, overflowY: 'auto' }}>
            {projects.map(p => {
              const pct = Math.min(100, (p.achievedWordCount / p.projectedWordCount) * 100);
              const newPct = Math.min(100, (analysis.wordCount / p.projectedWordCount) * 100);
              const isSelected = selected === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className={`assign-project-row ${isSelected ? 'selected' : ''}`}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: headingFont, fontSize: 16, color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}>
                        {p.title}
                      </div>
                      <div style={{ fontFamily: bodyFont, fontStyle: isRTL ? 'normal' : 'italic', fontSize: 13, color: 'var(--text-muted)' }}>
                        {p.categories.join(' · ')}
                      </div>
                    </div>
                    <div className={`milestone-check ${isSelected ? 'done' : ''}`} style={{ flexShrink: 0 }}>
                      {isSelected && <Check size={14} />}
                    </div>
                  </div>
                  <div className="progress-bar" style={{ height: 4 }}>
                    <div className="progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, fontFamily: bodyFont }}>
                    <span style={{ color: 'var(--text-muted)' }}>
                      {t.currentWords}: {p.achievedWordCount.toLocaleString()} / {p.projectedWordCount.toLocaleString()} ({pct.toFixed(1)}%)
                    </span>
                    {isSelected && (
                      <span style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>
                        → {analysis.wordCount.toLocaleString()} ({newPct.toFixed(1)}%)
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>{t.skip}</button>
          <button className="btn" onClick={() => selected && onAssign(selected)} disabled={!selected || projects.length === 0}>
            {t.assign}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ PROFILE ============
function ProfileView({ t, user, projects, isRTL, onChangeAvatar }) {
  const allBadges = projects.flatMap(p => p.badges.map(b => ({ ...b, project: p.title })));
  const completed = projects.filter(p => p.completed);
  const headingFont = isRTL ? "'Amiri', 'Noto Naskh Arabic', serif" : "'Cinzel', serif";
  const bodyFont = isRTL ? "'Noto Naskh Arabic', 'Vazirmatn', serif" : "'Cormorant Garamond', serif";
  const avatarMeta = user?.avatarId ? AVATARS.find(a => a.id === user.avatarId) : null;
  const avatarLabel = avatarMeta && t.avatarLabels ? t.avatarLabels[avatarMeta.id] : null;
  
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div className="profile-hero">
        {avatarMeta ? (
          <div
            className="profile-avatar-lg has-glyph"
            style={{
              background: `linear-gradient(135deg, ${avatarMeta.hue}, ${avatarMeta.hue}dd)`,
              boxShadow: `0 0 0 4px var(--bg), 0 0 0 5px ${avatarMeta.hue}, 0 8px 24px ${avatarMeta.hue}55`,
            }}
            aria-label={avatarLabel || ''}
          >
            {avatarMeta.glyph}
            <button
              className="profile-avatar-edit"
              onClick={onChangeAvatar}
              title={t.changeAvatar}
              aria-label={t.changeAvatar}
            >
              <Edit3 size={14} />
            </button>
          </div>
        ) : (
          <div className="profile-avatar-lg">
            {user?.username?.[0]?.toUpperCase()}
            <button
              className="profile-avatar-edit"
              onClick={onChangeAvatar}
              title={t.changeAvatar}
              aria-label={t.changeAvatar}
            >
              <Edit3 size={14} />
            </button>
          </div>
        )}
        <h1 className="profile-name">{user?.username}</h1>
        {avatarLabel && (
          <p style={{ fontFamily: bodyFont, fontStyle: isRTL ? 'normal' : 'italic', color: 'var(--text-muted)', fontSize: 15, margin: '4px 0 0' }}>
            {avatarLabel}
          </p>
        )}
        <p className="profile-since">{t.member} {user?.joined ? new Date(user.joined).toLocaleDateString() : '—'}</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">{t.activeProjects}</p>
          <p className="stat-value">{projects.filter(p => !p.completed).length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">{t.completedWorks}</p>
          <p className="stat-value">{completed.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">{t.badges}</p>
          <p className="stat-value">{allBadges.length}</p>
        </div>
      </div>
      
      <div className="detail-card">
        <div className="detail-card-title"><Award size={14} /> {t.achievements}</div>
        {allBadges.length === 0 ? (
          <p style={{ fontFamily: bodyFont, fontStyle: isRTL ? 'normal' : 'italic', color: 'var(--text-muted)', fontSize: 16 }}>
            {t.yourHonors}
          </p>
        ) : (
          <div className="badges-display">
            {allBadges.map((b, i) => (
              <div key={i} className="badge-display-item">
                <div className={`badge-display-icon ${b.badgeType}`}><Award size={26} /></div>
                <p className="badge-display-label"><strong>{b.label}</strong></p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: isRTL ? 'normal' : 'italic', fontFamily: bodyFont, margin: '4px 0 0' }}>{b.project}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {completed.length > 0 && (
        <div className="detail-card" style={{ marginTop: 20 }}>
          <div className="detail-card-title"><Scroll size={14} /> {t.completedWorks}</div>
          {completed.map(p => (
            <div key={p.id} style={{ padding: '12px 0', borderBottom: '1px dotted var(--border)' }}>
              <div style={{ fontFamily: headingFont, fontSize: 16, color: 'var(--text)', fontWeight: 600 }}>{p.title}</div>
              <div style={{ fontFamily: bodyFont, fontStyle: isRTL ? 'normal' : 'italic', color: 'var(--text-muted)', fontSize: 14 }}>
                {p.achievedWordCount.toLocaleString()} {t.wordRange} · {p.categories.join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============ SETTINGS ============
function SettingsView({ t, lang, setLang, theme, setTheme, googleConnected, setGoogleConnected, showNotification }) {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">{t.settings}</h1>
      </div>
      
      <div className="settings-group">
        <div className="settings-label">{t.theme}</div>
        <div className="theme-toggle">
          <button className={`theme-option ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>
            <Sun size={14} /> {t.lightMode}
          </button>
          <button className={`theme-option ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>
            <Moon size={14} /> {t.darkMode}
          </button>
        </div>
      </div>
      
      <div className="settings-group">
        <div className="settings-label"><Globe size={12} style={{ display: 'inline', marginInlineEnd: 6, verticalAlign: 'middle' }} />{t.language}</div>
        <div className="lang-options">
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
          <button className={`lang-btn ${lang === 'ar' ? 'active' : ''}`} onClick={() => setLang('ar')}>العربية</button>
          <button className={`lang-btn ${lang === 'fa' ? 'active' : ''}`} onClick={() => setLang('fa')}>فارسی</button>
        </div>
      </div>
      
      <div className="settings-group">
        <div className="settings-label">Google Docs</div>
        <div className="google-card" style={{ padding: 0, border: 'none' }}>
          <div className="google-info">
            <div className="google-icon-box"><Link2 size={20} /></div>
            <div>
              <div className="google-label">{googleConnected ? t.googleConnected : t.connectGoogle}</div>
              <div className="google-sub">{t.googleConnectPrompt}</div>
            </div>
          </div>
          {googleConnected ? (
            <button className="btn btn-ghost" onClick={() => { setGoogleConnected(false); window.storage.set('google_connected', JSON.stringify(false)); showNotification(t.disconnected); }}>
              {t.disconnect}
            </button>
          ) : (
            <button className="btn" onClick={() => { setGoogleConnected(true); window.storage.set('google_connected', JSON.stringify(true)); showNotification(t.googleConnected); }}>
              {t.authorize}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ HELPERS ============

const loadMammoth = () => {
  return new Promise((resolve, reject) => {
    if (window.mammoth) return resolve(window.mammoth);
    const existing = document.getElementById('mammoth-cdn-script');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.mammoth));
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.id = 'mammoth-cdn-script';
    script.src = 'https://cdn.jsdelivr.net/npm/mammoth@1.4.8/mammoth.browser.min.js';
    script.onload = () => resolve(window.mammoth);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Safe base64 encoding for large binary payloads (avoids the argument-spread limit
// of String.fromCharCode that crashes on files larger than ~100KB).
const arrayBufferToBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);
  const CHUNK = 0x8000; // 32KB at a time
  let binary = '';
  for (let i = 0; i < bytes.length; i += CHUNK) {
    const slice = bytes.subarray(i, Math.min(i + CHUNK, bytes.length));
    binary += String.fromCharCode.apply(null, slice);
  }
  return btoa(binary);
};

// Mock Google Docs fetcher. In production this would call
// https://docs.googleapis.com/v1/documents/{documentId} with the OAuth token.
// For this artifact we deterministically simulate growth between refreshes
// so the "Update" button visibly changes progress.
const mockGoogleDocFetch = async (docUrl, previousWordCount = 0) => {
  await new Promise(r => setTimeout(r, 1200));
  const hash = Array.from(docUrl).reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0);
  const baseSize = Math.abs(hash % 8000) + 4000;
  const growth = previousWordCount > 0 ? (Math.floor(Math.random() * 600) + 200) : 0;
  const targetWords = previousWordCount > 0 ? previousWordCount + growth : baseSize;
  const sample = 'The chapter unfolds with measured pace, each paragraph drawing the reader deeper into the narrative. Characters reveal themselves through dialogue and action, their motivations becoming clearer with every scene. The setting is rendered in careful detail, grounding the story in a world both familiar and strange. ';
  const wordsInSample = sample.trim().split(/\s+/).length;
  const repetitions = Math.ceil(targetWords / wordsInSample);
  const text = (sample.repeat(repetitions).trim().split(/\s+/).slice(0, targetWords)).join(' ');
  const title = docUrl.includes('/d/')
    ? `Document ${docUrl.split('/d/')[1].split('/')[0].slice(0, 10)}`
    : 'Untitled Document';
  return { text, title, fetchedAt: new Date().toISOString() };
};
