import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Plus, Search, Edit3, Trash2, Award, TrendingUp, Settings, LogOut, User, Upload, FileText, Sparkles, Bell, X, Check, Moon, Sun, Globe, Link2, BarChart3, Target, Flame, ChevronRight, Feather, Scroll, Crown, Loader } from 'lucide-react';

// ============ LOCALIZATION ============
const translations = {
  en: {
    appName: 'Book Vizier',
    tagline: 'A scribe for your literary ambitions',
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
    minWords: 'Min 10,000', maxWords: 'Max 200,000',
    activeProjects: 'Active Works', completedWorks: 'Completed Works',
    member: 'Scribe since', chooseFile: 'Choose file (.docx, .txt, .pdf)',
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
  },
  ar: {
    appName: 'وزير الكتاب',
    tagline: 'كاتب لطموحاتك الأدبية',
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
    logOut: 'تسجيل الخروج؟', yes: 'نعم', no: 'لا',
    minWords: 'الحد الأدنى 10,000', maxWords: 'الحد الأقصى 200,000',
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
    passwordRule: '8 أحرف على الأقل، رمز خاص واحد',
    usernameExists: 'هذا الاسم مسجل بالفعل',
    welcome: 'أهلاً، أيها الكاتب',
    beginJourney: 'ابدأ رحلتك الأدبية',
    projectLimit: '15 مخطوطة نشطة كحد أقصى',
    categoryLimit: '1-3 أنواع مطلوبة',
    milestoneRange: '3-10 مراحل',
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
  },
  fa: {
    appName: 'وزیر کتاب',
    tagline: 'منشی برای آرزوهای ادبی شما',
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
    logOut: 'خروج از حساب؟', yes: 'بله', no: 'خیر',
    minWords: 'حداقل ۱۰,۰۰۰', maxWords: 'حداکثر ۲۰۰,۰۰۰',
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
    usernameExists: 'این نام قبلا ثبت شده است',
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
  }
};

const CATEGORIES = [
  'Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction', 'Mystery', 'Thriller',
  'Romance', 'Historical Fiction', 'Literary Fiction', 'Horror', 'Adventure',
  'Biography', 'Autobiography', 'Memoir', 'Self-Help', 'Philosophy', 'Religion',
  'Spirituality', 'Poetry', 'Drama', 'Essay', 'Academic', 'Scientific',
  'Technical', 'Educational', 'Children', 'Young Adult', 'Graphic Novel',
  'Crime', 'Dystopian', 'Utopian', 'Magical Realism', 'Mythology', 'Folklore',
  'Travel', 'Cookbook', 'Art', 'Music', 'Photography', 'Business',
  'Economics', 'Politics', 'History', 'Psychology', 'Sociology', 'Anthropology',
  'Linguistics', 'Literary Criticism', 'Reference', 'Anthology', 'Short Stories'
];

const SUGGESTED_BOOKS = {
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
};

// ============ VIZIER AI ENGINE (Heuristic + Claude API fallback) ============
const analyzeTextLocally = (text) => {
  if (!text) return null;
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = sentences.length;
  const avgWordsPerSentence = sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : 0;
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
  
  // Basic grammar/style heuristics
  const issues = [];
  const veryLongSentences = sentences.filter(s => s.trim().split(/\s+/).length > 40);
  if (veryLongSentences.length > 0) issues.push(`${veryLongSentences.length} sentences exceed 40 words — consider splitting for clarity`);
  
  const passivePattern = /\b(was|were|been|being|is|are|am)\s+\w+ed\b/gi;
  const passiveMatches = text.match(passivePattern) || [];
  if (passiveMatches.length > wordCount * 0.05) issues.push(`Passive voice appears ${passiveMatches.length} times — consider active alternatives`);
  
  const fillers = (text.match(/\b(very|really|just|actually|basically|literally|quite|rather|somewhat)\b/gi) || []).length;
  if (fillers > wordCount * 0.02) issues.push(`${fillers} filler words detected — tighten prose where possible`);
  
  // Consistency
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
  const [view, setView] = useState('auth'); // auth, dashboard, project, profile, settings, vizier
  const [authMode, setAuthMode] = useState('signin');
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);
  const [googleConnected, setGoogleConnected] = useState(false);
  
  const t = translations[lang];
  const isRTL = lang === 'ar' || lang === 'fa';
  
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
  
  // Persist settings
  useEffect(() => {
    try { window.storage.set('settings', JSON.stringify({ lang, theme })); } catch {}
  }, [lang, theme]);
  
  // Persist projects
  useEffect(() => {
    if (user) {
      try { window.storage.set('projects', JSON.stringify(projects)); } catch {}
    }
  }, [projects, user]);
  
  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };
  
  const handleAuth = async (username, password, isSignUp) => {
    if (isSignUp) {
      // Rule checks
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
      const newUser = { username, joined: new Date().toISOString(), completedBooks: 0, allBadges: [] };
      try {
        await window.storage.set(`auth:${username}`, JSON.stringify({ password, user: newUser }));
      } catch {}
      await window.storage.set('user', JSON.stringify(newUser));
      setUser(newUser);
      setView('dashboard');
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
        showNotification('Invalid credentials', 'error');
        return false;
      } catch {
        showNotification('Invalid credentials', 'error');
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
    
    // Badge logic: 3 badges at thirds
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
  
  // Sets achieved word count to an absolute value (from file/Doc analysis)
  // instead of adding a delta. Used by file-upload and Google Docs flows.
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
  
  // Notification checker (daily / 7-day absence)
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
        
        .vizier-app {
          --gold: #bc9b5b;
          --gold-dark: #9a7e45;
          --gold-light: #d4b878;
          --gold-faint: #f5ecd7;
          --gold-glow: rgba(188, 155, 91, 0.15);
          --ink: #1a1612;
          --ink-soft: #3d342a;
          --parchment: #faf7f0;
          --parchment-shade: #f0e9d6;
          --border: #e8ddc0;
          --text: #1a1612;
          --text-muted: #6b5d47;
          --bg: #fdfbf5;
          --bg-elevated: #ffffff;
          --shadow: 0 2px 20px rgba(188, 155, 91, 0.08);
          --shadow-lg: 0 10px 40px rgba(26, 22, 18, 0.08);
          
          font-family: 'EB Garamond', 'Noto Naskh Arabic', 'Vazirmatn', serif;
          color: var(--text);
          background: var(--bg);
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow-x: hidden;
        }
        
        .vizier-app.dark {
          --gold: #d4b878;
          --gold-dark: #bc9b5b;
          --gold-light: #e5cf9a;
          --gold-faint: #2a2318;
          --gold-glow: rgba(212, 184, 120, 0.12);
          --ink: #faf7f0;
          --ink-soft: #d4c8ad;
          --parchment: #1a1612;
          --parchment-shade: #241e16;
          --border: #3a2f1f;
          --text: #e8ddc0;
          --text-muted: #9c8a6a;
          --bg: #0f0c08;
          --bg-elevated: #1a1612;
          --shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
          --shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.6);
        }
        
        .vizier-app.rtl { font-family: 'Noto Naskh Arabic', 'Vazirmatn', 'EB Garamond', serif; }
        
        .display-font { font-family: 'Cinzel', 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0.02em; }
        .rtl .display-font { font-family: 'Noto Naskh Arabic', 'Vazirmatn', 'Cinzel', serif; letter-spacing: 0; }
        
        .body-font { font-family: 'Cormorant Garamond', 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        .rtl .body-font { font-family: 'Noto Naskh Arabic', 'Vazirmatn', 'Cormorant Garamond', serif; }
        
        * { box-sizing: border-box; }
        
        .ornament {
          display: inline-block;
          color: var(--gold);
          font-size: 1.2em;
          opacity: 0.6;
        }
        
        .ornament-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin: 28px 0;
          color: var(--gold);
        }
        .ornament-divider::before,
        .ornament-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--gold) 50%, transparent);
          opacity: 0.5;
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
            radial-gradient(ellipse at top left, var(--gold-glow), transparent 50%),
            radial-gradient(ellipse at bottom right, var(--gold-glow), transparent 50%);
          position: relative;
        }
        
        .auth-screen::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(45deg, transparent, transparent 40px, var(--gold-glow) 40px, var(--gold-glow) 41px);
          opacity: 0.08;
          pointer-events: none;
        }
        
        .auth-card {
          max-width: 480px;
          width: 100%;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          padding: 60px 48px;
          position: relative;
          box-shadow: var(--shadow-lg);
          animation: fadeUp 0.8s ease-out;
        }
        
        .auth-card::before,
        .auth-card::after {
          content: '';
          position: absolute;
          width: 28px;
          height: 28px;
          border: 1.5px solid var(--gold);
        }
        .auth-card::before { top: 14px; left: 14px; border-right: none; border-bottom: none; }
        .auth-card::after { bottom: 14px; right: 14px; border-left: none; border-top: none; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .auth-logo {
          text-align: center;
          margin-bottom: 36px;
        }
        
        .logo-icon {
          width: 72px;
          height: 72px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid var(--gold);
          border-radius: 50%;
          position: relative;
          color: var(--gold);
          animation: spin-slow 120s linear infinite;
        }
        .logo-icon::before {
          content: '';
          position: absolute;
          inset: -6px;
          border: 1px solid var(--gold);
          border-radius: 50%;
          opacity: 0.3;
        }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .logo-icon > * { animation: counter-spin 120s linear infinite; }
        @keyframes counter-spin { to { transform: rotate(-360deg); } }
        
        .brand-logo-wordmark {
          display: block;
          max-width: 300px;
          width: 100%;
          height: auto;
          margin: 0 auto 12px;
          /* On light mode the logo is dark-on-dark; subtle drop shadow only */
          filter: drop-shadow(0 2px 8px rgba(188, 155, 91, 0.25));
        }
        /* In light mode the original PNG has a near-black background around the glyphs.
           We treat the logo image as transparent-friendly by placing it on a soft
           parchment plate so the gold wordmark reads cleanly. */
        .brand-logo-plate {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 0;
          margin: 0 auto 18px;
          max-width: 340px;
        }
        .brand-logo-plate img {
          display: block;
          max-width: 100%;
          width: 280px;
          height: auto;
          /* Stacked tight drop-shadows create a faint black stroke around the
             glyphs so the gold reads clearly on both light and dark backgrounds,
             without touching the original PNG. */
          filter:
            drop-shadow(0 0 0.6px rgba(0, 0, 0, 0.9))
            drop-shadow(0 0 0.6px rgba(0, 0, 0, 0.9))
            drop-shadow(0 0 0.6px rgba(0, 0, 0, 0.9))
            drop-shadow(0 2px 6px rgba(188, 155, 91, 0.25));
        }
        .dark .brand-logo-plate img {
          /* In dark mode the logo already reads well — soft gold glow only */
          filter: drop-shadow(0 2px 10px rgba(212, 184, 120, 0.35));
        }
        
        .sidebar-brand-logo {
          display: block;
          max-width: 100%;
          height: auto;
          width: 170px;
          filter:
            drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.85))
            drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.85))
            drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.85));
        }
        .dark .sidebar-brand-logo {
          filter: drop-shadow(0 1px 4px rgba(212, 184, 120, 0.3));
        }
        .sidebar-brand-logo-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 4px 0;
        }
        
        .auth-title {
          font-family: 'Cinzel', serif;
          font-size: 34px;
          font-weight: 500;
          color: var(--text);
          margin: 0 0 8px;
          letter-spacing: 0.08em;
        }
        .rtl .auth-title { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-weight: 600; }
        
        .auth-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: var(--text-muted);
          font-size: 17px;
          margin: 0;
        }
        .rtl .auth-tagline { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; }
        
        .form-group {
          margin-bottom: 22px;
        }
        
        .form-label {
          display: block;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold-dark);
          margin-bottom: 8px;
          font-weight: 500;
        }
        .rtl .form-label { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 13px; }
        
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-family: 'EB Garamond', 'Noto Naskh Arabic', 'Vazirmatn', serif;
          font-size: 16px;
          outline: none;
          transition: all 0.25s;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px var(--gold-glow);
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 24px;
          border: 1px solid var(--gold);
          background: var(--gold);
          color: #fff;
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
          font-weight: 500;
        }
        .rtl .btn { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 14px; }
        
        .btn:hover { background: var(--gold-dark); border-color: var(--gold-dark); transform: translateY(-1px); box-shadow: 0 4px 14px var(--gold-glow); }
        .btn-ghost { background: transparent; color: var(--gold); }
        .btn-ghost:hover { background: var(--gold-faint); color: var(--gold-dark); transform: none; box-shadow: none; }
        .btn-full { width: 100%; }
        .btn-lg { padding: 16px 32px; font-size: 13px; }
        .btn-sm { padding: 8px 14px; font-size: 10px; }
        .btn-danger { border-color: #a04040; background: transparent; color: #a04040; }
        .btn-danger:hover { background: #a04040; color: #fff; }
        
        .auth-switch {
          text-align: center;
          margin-top: 24px;
          font-size: 15px;
          color: var(--text-muted);
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
        }
        .rtl .auth-switch { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; }
        .auth-switch a { color: var(--gold); cursor: pointer; text-decoration: underline; text-decoration-style: dotted; text-underline-offset: 4px; margin-left: 6px; }
        
        /* ======== MAIN LAYOUT ======== */
        .app-shell {
          display: grid;
          grid-template-columns: 260px 1fr;
          min-height: 100vh;
        }
        .rtl .app-shell { grid-template-columns: 1fr 260px; direction: rtl; }
        
        .sidebar {
          background: var(--bg-elevated);
          border-right: 1px solid var(--border);
          padding: 32px 0;
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .rtl .sidebar { border-right: none; border-left: 1px solid var(--border); }
        
        .sidebar-brand {
          padding: 0 28px 28px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .sidebar-brand-icon {
          width: 38px;
          height: 38px;
          border: 1.5px solid var(--gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
        }
        
        .sidebar-brand-text {
          font-family: 'Cinzel', serif;
          font-size: 17px;
          color: var(--text);
          letter-spacing: 0.08em;
          font-weight: 500;
        }
        .rtl .sidebar-brand-text { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-weight: 600; font-size: 19px; }
        
        .nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 28px;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border-left: 3px solid transparent;
          font-weight: 500;
        }
        .rtl .nav-item { border-left: none; border-right: 3px solid transparent; font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 14px; }
        
        .nav-item:hover { color: var(--text); background: var(--gold-faint); }
        .nav-item.active { color: var(--gold); border-left-color: var(--gold); background: var(--gold-faint); }
        .rtl .nav-item.active { border-right-color: var(--gold); }
        
        .sidebar-footer {
          margin-top: auto;
          padding: 20px 28px;
          border-top: 1px solid var(--border);
        }
        
        .user-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          font-family: 'EB Garamond', serif;
          font-size: 14px;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .rtl .user-chip { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        
        .user-avatar {
          width: 32px;
          height: 32px;
          background: var(--gold);
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cinzel', serif;
          font-size: 13px;
          font-weight: 600;
        }
        
        .main-content {
          padding: 48px 56px;
          overflow-y: auto;
          max-width: 100%;
        }
        
        .page-header {
          margin-bottom: 40px;
        }
        
        .page-title {
          font-family: 'Cinzel', serif;
          font-size: 32px;
          font-weight: 500;
          color: var(--text);
          margin: 0 0 8px;
          letter-spacing: 0.04em;
        }
        .rtl .page-title { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-weight: 600; font-size: 34px; }
        
        .page-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 18px;
          color: var(--text-muted);
          margin: 0;
        }
        .rtl .page-subtitle { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; }
        
        /* ======== DASHBOARD STATS ======== */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .stat-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.25s;
        }
        .stat-card:hover { border-color: var(--gold); box-shadow: var(--shadow); }
        
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 1.5px;
          background: var(--gold);
        }
        .rtl .stat-card::before { left: auto; right: 0; }
        
        .stat-label {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0 0 12px;
          font-weight: 500;
        }
        .rtl .stat-label { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 12px; }
        
        .stat-value {
          font-family: 'Cinzel', serif;
          font-size: 34px;
          font-weight: 500;
          color: var(--text);
          margin: 0;
          line-height: 1;
        }
        .rtl .stat-value { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-weight: 600; }
        
        .stat-icon {
          position: absolute;
          top: 24px;
          right: 24px;
          color: var(--gold);
          opacity: 0.4;
        }
        .rtl .stat-icon { right: auto; left: 24px; }
        
        /* ======== SEARCH & TOOLBAR ======== */
        .toolbar {
          display: flex;
          gap: 16px;
          margin-bottom: 28px;
          align-items: center;
          flex-wrap: wrap;
        }
        
        .search-box {
          flex: 1;
          min-width: 240px;
          position: relative;
        }
        
        .search-input {
          width: 100%;
          padding: 12px 14px 12px 44px;
          border: 1px solid var(--border);
          background: var(--bg-elevated);
          color: var(--text);
          font-family: 'EB Garamond', serif;
          font-size: 15px;
          outline: none;
          transition: all 0.2s;
        }
        .rtl .search-input { padding: 12px 44px 12px 14px; font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        .search-input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px var(--gold-glow); }
        
        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .rtl .search-icon { left: auto; right: 14px; }
        
        /* ======== PROJECTS GRID ======== */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
        
        .project-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          padding: 28px;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .project-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s;
        }
        
        .project-card:hover {
          border-color: var(--gold);
          box-shadow: var(--shadow-lg);
          transform: translateY(-2px);
        }
        .project-card:hover::before { transform: scaleX(1); }
        
        .project-title {
          font-family: 'Cinzel', serif;
          font-size: 20px;
          color: var(--text);
          margin: 0 0 8px;
          font-weight: 500;
          letter-spacing: 0.03em;
        }
        .rtl .project-title { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-weight: 600; font-size: 22px; }
        
        .project-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }
        
        .category-tag {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-style: italic;
          color: var(--gold-dark);
          padding: 3px 10px;
          border: 1px solid var(--gold);
          background: var(--gold-faint);
        }
        .rtl .category-tag { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; font-size: 12px; }
        
        .progress-bar {
          width: 100%;
          height: 6px;
          background: var(--parchment-shade);
          border-radius: 0;
          overflow: hidden;
          position: relative;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--gold-dark) 0%, var(--gold) 50%, var(--gold-light) 100%);
          transition: width 0.6s ease;
          position: relative;
        }
        .progress-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
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
          color: var(--gold-dark);
          font-weight: 600;
          font-size: 14px;
        }
        .rtl .progress-percent { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        
        .project-badges {
          display: flex;
          gap: 6px;
          margin-top: 16px;
        }
        
        .badge-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
        .badge-icon.bronze { background: linear-gradient(135deg, #cd7f32, #a06325); color: #fff; }
        .badge-icon.silver { background: linear-gradient(135deg, #c0c0c0, #a0a0a0); color: #fff; }
        .badge-icon.gold { background: linear-gradient(135deg, #ffd700, #bc9b5b); color: #fff; }
        
        .empty-state {
          text-align: center;
          padding: 80px 20px;
          color: var(--text-muted);
        }
        
        .empty-state-icon {
          color: var(--gold);
          opacity: 0.3;
          margin-bottom: 20px;
        }
        
        .empty-state-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 20px;
          margin: 0 0 24px;
        }
        .rtl .empty-state-text { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; }
        
        /* ======== MODAL ======== */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(26, 22, 18, 0.6);
          backdrop-filter: blur(4px);
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
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 40px;
          position: relative;
          box-shadow: var(--shadow-lg);
          animation: fadeUp 0.3s;
        }
        
        .modal::before, .modal::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 24px;
          border: 1.5px solid var(--gold);
        }
        .modal::before { top: 10px; left: 10px; border-right: none; border-bottom: none; }
        .modal::after { bottom: 10px; right: 10px; border-left: none; border-top: none; }
        
        .modal-title {
          font-family: 'Cinzel', serif;
          font-size: 24px;
          color: var(--text);
          margin: 0 0 8px;
          font-weight: 500;
          letter-spacing: 0.04em;
        }
        .rtl .modal-title { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-weight: 600; }
        
        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
        }
        .rtl .modal-close { right: auto; left: 20px; }
        .modal-close:hover { color: var(--gold); }
        
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 6px;
          max-height: 220px;
          overflow-y: auto;
          padding: 12px;
          border: 1px solid var(--border);
          background: var(--bg);
        }
        
        .category-chip {
          padding: 6px 10px;
          border: 1px solid var(--border);
          background: var(--bg-elevated);
          color: var(--text-muted);
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }
        .rtl .category-chip { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-size: 12px; }
        
        .category-chip:hover { border-color: var(--gold); color: var(--gold-dark); }
        .category-chip.selected { background: var(--gold); border-color: var(--gold); color: #fff; }
        
        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }
        
        /* ======== PROJECT DETAIL ======== */
        .project-detail {
          max-width: 1100px;
          margin: 0 auto;
        }
        
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--gold);
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 24px;
          padding: 0;
        }
        .rtl .back-link { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 13px; }
        
        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .detail-title {
          font-family: 'Cinzel', serif;
          font-size: 40px;
          margin: 0 0 10px;
          font-weight: 500;
          color: var(--text);
          letter-spacing: 0.02em;
        }
        .rtl .detail-title { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-weight: 600; }
        
        .detail-actions {
          display: flex;
          gap: 10px;
        }
        
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }
        @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr; } }
        
        .detail-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          padding: 28px;
          position: relative;
        }
        
        .detail-card-title {
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold-dark);
          margin: 0 0 20px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .rtl .detail-card-title { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 14px; }
        
        .milestones-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
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
          border: 1.5px solid var(--border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          flex-shrink: 0;
        }
        .milestone-check.done {
          background: var(--gold);
          border-color: var(--gold);
          color: #fff;
        }
        
        .milestone-info {
          flex: 1;
        }
        
        .milestone-label {
          color: var(--text);
          font-weight: 500;
        }
        
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
          margin-top: 16px;
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
        }
        
        /* ======== VIZIER AGENT ======== */
        .vizier-console {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .vizier-hero {
          background: linear-gradient(135deg, var(--gold-faint) 0%, var(--bg-elevated) 100%);
          border: 1px solid var(--gold);
          padding: 40px;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
        }
        
        .vizier-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, var(--gold-glow), transparent 70%);
        }
        
        .vizier-avatar {
          width: 80px;
          height: 80px;
          border: 2px solid var(--gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          margin-bottom: 20px;
          position: relative;
          background: var(--bg-elevated);
        }
        .vizier-avatar::before {
          content: '';
          position: absolute;
          inset: -6px;
          border: 1px dashed var(--gold);
          border-radius: 50%;
          opacity: 0.5;
          animation: spin-slow 60s linear infinite;
        }
        
        .vizier-greeting {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 19px;
          line-height: 1.6;
          color: var(--text);
          margin: 0;
          max-width: 600px;
        }
        .rtl .vizier-greeting { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; line-height: 1.8; }
        
        .vizier-tools {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }
        
        .tool-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          padding: 24px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
        }
        
        .tool-card:hover {
          border-color: var(--gold);
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }
        
        .tool-icon {
          color: var(--gold);
          margin-bottom: 12px;
        }
        
        .tool-name {
          font-family: 'Cinzel', serif;
          font-size: 13px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text);
          margin: 0;
          font-weight: 500;
        }
        .rtl .tool-name { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 15px; }
        
        .analysis-panel {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          padding: 32px;
          min-height: 300px;
          position: relative;
        }
        
        .analysis-panel::before {
          content: '❦';
          position: absolute;
          top: 16px;
          right: 20px;
          color: var(--gold);
          font-size: 20px;
          opacity: 0.5;
        }
        .rtl .analysis-panel::before { right: auto; left: 20px; }
        
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
          color: var(--gold);
          font-size: 10px;
          top: 20px;
        }
        .rtl .insight-item::before { left: auto; right: 0; }
        
        .metric-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
          margin: 20px 0;
          padding: 20px;
          background: var(--gold-faint);
          border: 1px solid var(--border);
        }
        
        .metric {
          text-align: center;
        }
        
        .metric-value {
          font-family: 'Cinzel', serif;
          font-size: 22px;
          color: var(--gold-dark);
          font-weight: 600;
          display: block;
        }
        .rtl .metric-value { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        
        .metric-label {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 13px;
          color: var(--text-muted);
        }
        .rtl .metric-label { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; }
        
        .upload-zone {
          border: 2px dashed var(--gold);
          padding: 40px;
          text-align: center;
          background: var(--gold-faint);
          cursor: pointer;
          transition: all 0.3s;
        }
        .upload-zone:hover {
          background: var(--bg-elevated);
          border-style: solid;
        }
        
        .upload-icon {
          color: var(--gold);
          margin-bottom: 12px;
        }
        
        .upload-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: var(--text-muted);
          font-size: 16px;
          margin: 0;
        }
        .rtl .upload-text { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; font-style: normal; }
        
        .loading-spinner {
          display: inline-block;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        /* ======== SETTINGS ======== */
        .settings-group {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          padding: 28px;
          margin-bottom: 20px;
        }
        
        .settings-label {
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold-dark);
          margin: 0 0 16px;
          font-weight: 500;
        }
        .rtl .settings-label { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 14px; }
        
        .theme-toggle {
          display: flex;
          gap: 0;
          border: 1px solid var(--border);
          width: fit-content;
        }
        
        .theme-option {
          padding: 10px 20px;
          background: var(--bg);
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .rtl .theme-option { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; text-transform: none; font-size: 13px; }
        .theme-option.active {
          background: var(--gold);
          color: #fff;
        }
        
        .lang-options {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        
        .lang-btn {
          padding: 10px 20px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text-muted);
          cursor: pointer;
          font-family: 'EB Garamond', serif;
          font-size: 15px;
          transition: all 0.2s;
        }
        .lang-btn.active {
          border-color: var(--gold);
          background: var(--gold-faint);
          color: var(--gold-dark);
        }
        
        /* ======== PROFILE ======== */
        .profile-hero {
          text-align: center;
          padding: 40px 0;
          border-bottom: 1px solid var(--border);
          margin-bottom: 40px;
        }
        
        .profile-avatar-lg {
          width: 100px;
          height: 100px;
          background: var(--gold);
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cinzel', serif;
          font-size: 36px;
          margin: 0 auto 20px;
          font-weight: 600;
          box-shadow: 0 0 0 4px var(--bg-elevated), 0 0 0 5px var(--gold);
        }
        
        .profile-name {
          font-family: 'Cinzel', serif;
          font-size: 28px;
          margin: 0 0 6px;
          color: var(--text);
          font-weight: 500;
          letter-spacing: 0.04em;
        }
        .rtl .profile-name { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-weight: 600; }
        
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
          gap: 20px;
          margin-top: 20px;
        }
        
        .badge-display-item {
          text-align: center;
          padding: 20px;
          border: 1px solid var(--border);
          background: var(--bg-elevated);
          transition: all 0.3s;
        }
        .badge-display-item:hover { border-color: var(--gold); transform: translateY(-2px); }
        
        .badge-display-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
        }
        .badge-display-icon.bronze { background: linear-gradient(135deg, #cd7f32, #a06325); color: #fff; }
        .badge-display-icon.silver { background: linear-gradient(135deg, #c0c0c0, #808080); color: #fff; }
        .badge-display-icon.gold { background: linear-gradient(135deg, #ffd700, #bc9b5b); color: #fff; }
        
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
          gap: 16px;
        }
        
        .suggestion-item {
          background: var(--bg);
          border: 1px solid var(--border);
          padding: 18px;
          border-left: 3px solid var(--gold);
        }
        .rtl .suggestion-item { border-left: none; border-right: 3px solid var(--gold); }
        
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
          top: 24px;
          right: 24px;
          background: var(--bg-elevated);
          border: 1px solid var(--gold);
          padding: 16px 24px;
          box-shadow: var(--shadow-lg);
          z-index: 200;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'EB Garamond', serif;
          color: var(--text);
          animation: slideIn 0.3s;
          max-width: 400px;
        }
        .rtl .toast { right: auto; left: 24px; font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .toast.error { border-color: #a04040; }
        
        /* ======== GOOGLE CONNECT ======== */
        .google-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        
        .google-info {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        
        .google-icon-box {
          width: 44px;
          height: 44px;
          border: 1px solid var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
        }
        
        .google-label {
          font-family: 'Cinzel', serif;
          font-size: 13px;
          letter-spacing: 0.12em;
          color: var(--text);
          margin: 0 0 4px;
          font-weight: 500;
        }
        .rtl .google-label { font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif; letter-spacing: 0; font-size: 15px; }
        
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
          background: #4a7c4a;
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
          box-shadow: 0 0 8px #4a7c4a;
        }
        .rtl .google-status-dot { margin-right: 0; margin-left: 6px; }
        
        /* ======== LINKED DOCS ROW ======== */
        .linked-doc-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 16px;
          border: 1px solid var(--border);
          background: var(--bg);
          border-left: 3px solid var(--gold);
          transition: all 0.2s;
          flex-wrap: wrap;
        }
        .rtl .linked-doc-row { border-left: 1px solid var(--border); border-right: 3px solid var(--gold); }
        .linked-doc-row:hover { border-color: var(--gold); background: var(--gold-faint); }
        
        .linked-doc-info {
          flex: 1;
          min-width: 200px;
        }
        
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
          padding: 16px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          cursor: pointer;
          transition: all 0.25s;
        }
        .assign-project-row:hover {
          border-color: var(--gold-light);
          background: var(--gold-faint);
        }
        .assign-project-row.selected {
          border-color: var(--gold);
          background: var(--gold-faint);
          box-shadow: 0 0 0 3px var(--gold-glow);
        }
        
        @media (max-width: 768px) {
          .app-shell { grid-template-columns: 1fr; }
          .sidebar { position: relative; height: auto; }
          .rtl .app-shell { grid-template-columns: 1fr; }
          .main-content { padding: 24px 20px; }
          .detail-title { font-size: 28px; }
          .auth-card { padding: 40px 24px; }
        }
      `}</style>
      
      {notification && (
        <div className={`toast ${notification.type === 'error' ? 'error' : ''}`}>
          {notification.type === 'error' ? <X size={18} color="#a04040" /> : <Check size={18} color={'var(--gold)'} />}
          <span>{notification.msg}</span>
        </div>
      )}
      
      {view === 'auth' ? (
        <AuthScreen t={t} isRTL={isRTL} authMode={authMode} setAuthMode={setAuthMode} onSubmit={handleAuth} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      ) : (
        <div className="app-shell">
          <aside className="sidebar">
            <div className="sidebar-brand" style={{ padding: '0 20px 24px', justifyContent: 'center' }}>
              <div className="sidebar-brand-logo-wrap">
                <img src="/BVLogo.png" alt={t.appName} className="sidebar-brand-logo" />
              </div>
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
                <div className="user-avatar">{user?.username?.[0]?.toUpperCase()}</div>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.username}</div>
              </div>
              <div className="nav-item" onClick={() => setShowLogoutConfirm(true)} style={{ padding: '10px 0' }}>
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
              />
            )}
            
            {view === 'vizier' && (
              <VizierConsole t={t} projects={projects} isRTL={isRTL} googleConnected={googleConnected} setGoogleConnected={setGoogleConnected} showNotification={showNotification} syncProgress={syncProgressFromAnalysis} />
            )}
            
            {view === 'profile' && (
              <ProfileView t={t} user={user} projects={projects} isRTL={isRTL} />
            )}
            
            {view === 'settings' && (
              <SettingsView t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} googleConnected={googleConnected} setGoogleConnected={setGoogleConnected} showNotification={showNotification} />
            )}
          </main>
        </div>
      )}
      
      {showNewProject && (
        <NewProjectModal t={t} onClose={() => setShowNewProject(false)} onCreate={createProject} isRTL={isRTL} />
      )}
      
      {showLogoutConfirm && (
        <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <h3 className="modal-title">{t.logOut}</h3>
            <div className="ornament-divider">❦</div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowLogoutConfirm(false)}>{t.no}</button>
              <button className="btn" onClick={handleSignOut}>{t.yes}</button>
            </div>
          </div>
        </div>
      )}
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
      <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 8, zIndex: 10 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
        </button>
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="form-select" style={{ padding: '6px 10px', fontSize: 13 }}>
          <option value="en">English</option>
          <option value="ar">العربية</option>
          <option value="fa">فارسی</option>
        </select>
      </div>
      
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-icon"><Feather size={32} /></div>
          <div className="brand-logo-plate">
            <img src="/BVLogo.png" alt={t.appName} />
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
          
          <button className="btn btn-full btn-lg" onClick={submit} disabled={loading}>
            {loading ? <Loader size={16} className="loading-spinner" /> : <>{authMode === 'signup' ? t.signUp : t.signIn}<ChevronRight size={14} /></>}
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
          <Scroll size={64} className="empty-state-icon" />
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
function NewProjectModal({ t, onClose, onCreate, isRTL }) {
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [projectedWordCount, setProjectedWordCount] = useState(50000);
  const [numberOfMilestones, setNumberOfMilestones] = useState(5);
  const [error, setError] = useState('');
  
  const toggleCat = (c) => {
    if (categories.includes(c)) setCategories(categories.filter(x => x !== c));
    else if (categories.length < 3) setCategories([...categories, c]);
  };
  
  const submit = () => {
    if (!title.trim()) { setError(t.projectName); return; }
    if (categories.length < 1 || categories.length > 3) { setError(t.categoryLimit); return; }
    if (projectedWordCount < 10000 || projectedWordCount > 200000) { setError(`${t.minWords} / ${t.maxWords}`); return; }
    if (numberOfMilestones < 3 || numberOfMilestones > 10) { setError(t.milestoneRange); return; }
    onCreate({ title: title.trim(), categories, projectedWordCount: Number(projectedWordCount), numberOfMilestones: Number(numberOfMilestones) });
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
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
        
        <div className="form-group">
          <label className="form-label">{t.wordCount} ({t.minWords} / {t.maxWords})</label>
          <input type="number" className="form-input" value={projectedWordCount} onChange={(e) => setProjectedWordCount(e.target.value)} min={10000} max={200000} step={1000} />
        </div>
        
        <div className="form-group">
          <label className="form-label">{t.milestones} ({t.milestoneRange})</label>
          <input type="number" className="form-input" value={numberOfMilestones} onChange={(e) => setNumberOfMilestones(e.target.value)} min={3} max={10} />
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6, fontStyle: 'italic' }}>
            ≈ {Math.floor(projectedWordCount / numberOfMilestones).toLocaleString()} words per milestone
          </div>
        </div>
        
        {error && <div style={{ color: '#a04040', fontSize: 14, marginTop: 8 }}>{error}</div>}
        
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>{t.cancel}</button>
          <button className="btn" onClick={submit}>{t.create}</button>
        </div>
      </div>
    </div>
  );
}

// ============ PROJECT DETAIL ============
function ProjectDetail({ t, project, onBack, onUpdate, onAddProgress, onDelete, isRTL }) {
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
    if (editData.projectedWordCount < 10000 || editData.projectedWordCount > 200000) return;
    if (editData.numberOfMilestones < 3 || editData.numberOfMilestones > 10) return;
    
    // Recalculate milestones
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
      <button className="back-link" onClick={onBack}>← {t.dashboard}</button>
      
      <div className="detail-header">
        <div>
          {editing ? (
            <input className="form-input" style={{ fontSize: 28, fontFamily: 'Cinzel, serif' }} value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
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
        <div className="detail-card" style={{ marginBottom: 24 }}>
          <div className="form-group">
            <label className="form-label">{t.categories}</label>
            <div className="category-grid">
              {CATEGORIES.map(c => (
                <div key={c} className={`category-chip ${editData.categories.includes(c) ? 'selected' : ''}`} onClick={() => toggleEditCat(c)}>{c}</div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">{t.wordCount}</label>
              <input type="number" className="form-input" value={editData.projectedWordCount} onChange={(e) => setEditData({ ...editData, projectedWordCount: Number(e.target.value) })} min={10000} max={200000} />
            </div>
            <div className="form-group">
              <label className="form-label">{t.milestones}</label>
              <input type="number" className="form-input" value={editData.numberOfMilestones} onChange={(e) => setEditData({ ...editData, numberOfMilestones: Number(e.target.value) })} min={3} max={10} />
            </div>
          </div>
        </div>
      )}
      
      <div className="detail-card" style={{ marginBottom: 24 }}>
        <div className="detail-card-title"><TrendingUp size={14} /> {t.progress}</div>
        <div className="progress-bar" style={{ height: 12 }}><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 20 }}>
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
                  <div className="milestone-label">#{m.milestoneNumber} — {m.targetWordCount.toLocaleString()} words</div>
                  {m.dateAchieved && <div className="milestone-date">{new Date(m.dateAchieved).toLocaleDateString()}</div>}
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="detail-card">
          <div className="detail-card-title"><Award size={14} /> {t.badges}</div>
          {project.badges.length === 0 ? (
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: 15 }}>
              Write to earn your first quill...
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {project.badges.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className={`badge-display-icon ${b.badgeType}`} style={{ width: 40, height: 40 }}><Award size={20} /></div>
                  <div>
                    <div style={{ fontFamily: 'EB Garamond, serif', fontSize: 15, color: 'var(--text)' }}>{b.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>{new Date(b.dateAwarded).toLocaleDateString()}</div>
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

// ============ VIZIER AI CONSOLE ============
// Utility: load mammoth.js from CDN lazily (only when a .docx is uploaded)
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
  // On re-fetch, simulate the author having added 200-800 more words
  const growth = previousWordCount > 0 ? (Math.floor(Math.random() * 600) + 200) : 0;
  const targetWords = previousWordCount > 0 ? previousWordCount + growth : baseSize;
  // Build a plausible-looking text body of that word count
  const sample = 'The chapter unfolds with measured pace, each paragraph drawing the reader deeper into the narrative. Characters reveal themselves through dialogue and action, their motivations becoming clearer with every scene. The setting is rendered in careful detail, grounding the story in a world both familiar and strange. ';
  const wordsInSample = sample.trim().split(/\s+/).length;
  const repetitions = Math.ceil(targetWords / wordsInSample);
  const text = (sample.repeat(repetitions).trim().split(/\s+/).slice(0, targetWords)).join(' ');
  const title = docUrl.includes('/d/')
    ? `Document ${docUrl.split('/d/')[1].split('/')[0].slice(0, 10)}`
    : 'Untitled Document';
  return { text, title, fetchedAt: new Date().toISOString() };
};

function VizierConsole({ t, projects, isRTL, googleConnected, setGoogleConnected, showNotification, syncProgress }) {
  const [analysis, setAnalysis] = useState(null);
  const [insights, setInsights] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzingStage, setAnalyzingStage] = useState('');
  const [googleDocUrl, setGoogleDocUrl] = useState('');
  const [pendingAnalysis, setPendingAnalysis] = useState(null); // { wordCount, source, sourceType, sourceRef }
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [linkedDocs, setLinkedDocs] = useState([]);
  const [updatingDocId, setUpdatingDocId] = useState(null);
  const fileRef = useRef(null);
  
  const activeProjects = projects.filter(p => !p.completed);
  
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
  
  // ---------- File extraction (fixed) ----------
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
      
      // Queue the analysis for project assignment
      setPendingAnalysis({
        wordCount: local.wordCount,
        sourceType: 'file',
        sourceRef: file.name,
      });
      setShowAssignModal(true);
      showNotification('Manuscript analyzed');
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
      showNotification('Enter a Google Doc URL', 'error');
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
      
      // Queue for project assignment, tagged as Google Doc source
      setPendingAnalysis({
        wordCount: local.wordCount,
        sourceType: 'gdoc',
        sourceRef: googleDocUrl.trim(),
        sourceTitle: title,
      });
      setShowAssignModal(true);
      showNotification('Document retrieved');
      setGoogleDocUrl('');
    } catch (err) {
      showNotification(t.extractError, 'error');
    } finally {
      setAnalyzing(false);
      setAnalyzingStage('');
    }
  };
  
  // ---------- Assign analysis → project ----------
  const assignToProject = (projectId) => {
    if (!pendingAnalysis) return;
    const ok = syncProgress(projectId, pendingAnalysis.wordCount, pendingAnalysis.sourceType);
    if (ok) {
      // If this was a Google Doc, persist the link so user can click "Update" later
      if (pendingAnalysis.sourceType === 'gdoc') {
        const newLink = {
          id: Date.now().toString(),
          url: pendingAnalysis.sourceRef,
          title: pendingAnalysis.sourceTitle || 'Google Document',
          projectId: projectId,
          lastWordCount: pendingAnalysis.wordCount,
          lastSynced: new Date().toISOString(),
        };
        // Replace existing link for same URL + project if present
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
      
      <div className="vizier-hero">
        <div className="vizier-avatar"><Sparkles size={36} /></div>
        <p className="vizier-greeting">{t.vizierWelcome}</p>
      </div>
      
      <div className="vizier-tools">
        <div className="tool-card" onClick={() => !analyzing && fileRef.current?.click()}>
          <Upload size={32} className="tool-icon" />
          <div className="tool-name">{t.uploadFile}</div>
          <input ref={fileRef} type="file" accept=".docx,.txt,.pdf" style={{ display: 'none' }} onChange={handleFile} />
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8, fontStyle: 'italic' }}>{t.chooseFile}</div>
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
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: 15, margin: 0 }}>
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
                      <button className="btn btn-ghost btn-sm" onClick={() => unlinkDoc(doc.id)} title="Unlink">
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
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 18, color: 'var(--text-muted)' }}>
            {analyzingStage || t.analyzing}
          </p>
        </div>
      )}
      
      {analysis && !analyzing && (
        <div className="analysis-panel">
          <div className="detail-card-title"><BarChart3 size={14} /> {t.insights}</div>
          
          <div className="metric-grid">
            <div className="metric"><span className="metric-value">{analysis.wordCount.toLocaleString()}</span><span className="metric-label">{t.totalWords}</span></div>
            <div className="metric"><span className="metric-value">{analysis.sentenceCount}</span><span className="metric-label">Sentences</span></div>
            <div className="metric"><span className="metric-value">{analysis.paragraphCount}</span><span className="metric-label">Paragraphs</span></div>
            <div className="metric"><span className="metric-value">{analysis.avgWordsPerSentence}</span><span className="metric-label">Avg/Sentence</span></div>
            <div className="metric"><span className="metric-value">{analysis.lexicalDiversity}%</span><span className="metric-label">Diversity</span></div>
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
function AssignProjectModal({ t, analysis, projects, onAssign, onClose }) {
  const [selected, setSelected] = useState(projects[0]?.id || null);
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        <h2 className="modal-title">{t.assignToProject}</h2>
        <div className="ornament-divider">❦</div>
        
        <div style={{
          background: 'var(--gold-faint)',
          border: '1px solid var(--gold)',
          padding: 16,
          marginBottom: 20,
          fontFamily: 'EB Garamond, serif',
          fontSize: 15,
          color: 'var(--text)',
          lineHeight: 1.6,
        }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 6, fontWeight: 500 }}>
            {t.newWords}
          </div>
          <strong style={{ fontSize: 22, fontFamily: 'Cinzel, serif' }}>{analysis.wordCount.toLocaleString()}</strong> {t.totalWords.toLowerCase()}
          <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 4 }}>
            {analysis.sourceType === 'gdoc' ? (analysis.sourceTitle || 'Google Document') : analysis.sourceRef}
          </div>
        </div>
        
        {projects.length === 0 ? (
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: 16, textAlign: 'center', padding: '20px 0' }}>
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
                      <div style={{ fontFamily: 'Cinzel, serif', fontSize: 16, color: 'var(--text)', fontWeight: 500, marginBottom: 4 }}>
                        {p.title}
                      </div>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 13, color: 'var(--text-muted)' }}>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, fontFamily: 'EB Garamond, serif' }}>
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
function ProfileView({ t, user, projects, isRTL }) {
  const allBadges = projects.flatMap(p => p.badges.map(b => ({ ...b, project: p.title })));
  const completed = projects.filter(p => p.completed);
  
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div className="profile-hero">
        <div className="profile-avatar-lg">{user?.username?.[0]?.toUpperCase()}</div>
        <h1 className="profile-name">{user?.username}</h1>
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
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: 16 }}>
            Your honors shall appear here as your manuscripts grow.
          </p>
        ) : (
          <div className="badges-display">
            {allBadges.map((b, i) => (
              <div key={i} className="badge-display-item">
                <div className={`badge-display-icon ${b.badgeType}`}><Award size={26} /></div>
                <p className="badge-display-label"><strong>{b.label}</strong></p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: 'Cormorant Garamond, serif', margin: '4px 0 0' }}>{b.project}</p>
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
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 16, color: 'var(--text)', fontWeight: 500 }}>{p.title}</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: 14 }}>
                {p.achievedWordCount.toLocaleString()} words · {p.categories.join(', ')}
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
        <div className="settings-label"><Globe size={12} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />{t.language}</div>
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
            <button className="btn btn-ghost" onClick={() => { setGoogleConnected(false); window.storage.set('google_connected', JSON.stringify(false)); showNotification('Disconnected'); }}>
              Disconnect
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
