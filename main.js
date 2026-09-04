// ==========================================
// 1. إعداد خلفية الجسيمات التفاعلية Three.js (3D Canvas)
// ==========================================
const canvas = document.getElementById('bg3d');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// إنشاء شبكة الجسيمات (Particles)
const particlesCount = 700;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// مظهر الجسيمات
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.025,
    color: 0x00f2fe,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 3;

// تتبع حركة الماوس أو اللمس
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
});

document.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
        mouseX = (event.touches[0].clientX / window.innerWidth) - 0.5;
        mouseY = (event.touches[0].clientY / window.innerHeight) - 0.5;
    }
});

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.03;

    particlesMesh.rotation.y += mouseX * 0.05;
    particlesMesh.rotation.x += mouseY * 0.05;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// ==========================================
// 2. التحكم في القائمة المنسدلة (Mobile Navigation)
// ==========================================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}


// ==========================================
// 3. التبديل بين الوضع الليلي والنهاري (Theme Toggle)
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeToggleBtn.textContent = '☀️';
            particlesMaterial.color.setHex(0x0066ff);
        } else {
            themeToggleBtn.textContent = '🌙';
            particlesMaterial.color.setHex(0x00f2fe);
        }
    });
}


// ==========================================
// 4. نظام الترجمة متعدد اللغات (English / العربية)
// ==========================================
const translations = {
    ar: {
        pageTitle: "باسم مرسي | Basem Morsi - Portfolio",
        navHome: "الرئيسية",
        navAbout: "عني",
        navSkills: "المهارات",
        navExperience: "الخبرات",
        navProjects: "الأعمال",
        navContact: "تواصل معي",
        langBtnText: "EN",
        greeting: "أهلاً بك، أنا",
        heroName: "باسم مرسي",
        heroBio: "طالب نظم معلومات الأعمال (BIS) ومطور ويب متكامل (Full-Stack) وأخصائي أودو، بالإضافة إلى صناعة محتوى الجرافيك والـ CGI والأنيميشن ثلاثي الأبعاد.",
        btnProjects: "استكشف أعمالي",
        btnCv: "تحميل السيرة الذاتية 📄",
        aboutTitle: "الملخص المهني والتعليم",
        eduTitle: "التعليم الأكاديمي",
        eduDegree: "بكالوريوس نظم معلومات الأعمال (BIS)",
        eduUniv: "جامعة العبور للعلوم والتكنولوجيا (2023 - 2027)",
        eduDesc: "أجمع بين الفهم العملي للهيكل الإداري والمحاسبي وسلاسل الإمداد، والقدرة البرمجية المتقدمة.",
        fullstackTitle: "تطوير الويب المتكامل (Full-Stack)",
        fullstackDesc: "بناء وتطوير تطبيقات الويب الكاملة من الواجهات الأمامية بالـ Front-End حتى السيرفرات وقواعد البيانات بالـ Back-End باستخدام Vue.js و Laravel و MySQL.",
        odooTitle: "تطوير أودو والـ 3D",
        odooDesc: "تخصيص موديولات Odoo المخصصة، وربط الأنظمة عبر RESTful APIs، بالإضافة إلى إنشاء الموديلات والأنيميشن ثلاثي الأبعاد (Blender & CGI).",
        skillsTitle: "المهارات والقدرات الأساسية",
        skillFront: "الواجهات الأمامية (Front-End)",
        skillBack: "الواجهات الخلفية (Back-End)",
        skillOdoo: "تطوير Odoo والـ 3D",
        expTitle: "الخبرة المهنية",
        expDate: "أكتوبر 2025 - حتى الآن",
        expRole: "أخصائي ومطور أودو وتطبيقات ويب",
        expCompany: "شركة تك للحلول والأنظمة الرقمية (Tech Solutions)",
        expTask1: "تحليل وتخطيط دورات العمل للشركات ومطابقتها مع موديولات أودو القياسية.",
        expTask2: "برمجة وتطوير موديولات وإضافات مخصصة بلغة Python و XML.",
        expTask3: "تصميم تقارير QWeb مخصصة للطباعة (فواتير، عروض أسعار، أذونات مخزون).",
        expTask4: "بناء APIs لربط بيانات أودو مع منصات الويب والمتاجر الإلكترونية.",
        projectsTitle: "أبرز المشاريع المنفذة",
        p1Title: "تطبيق ويب متكامل (Laravel & Vue.js)",
        p1Desc: "تطوير موقع ويب كامل باستخدام Vue.js للواجهة الأمامية و Laravel مع قواعد بيانات MySQL للربط والعمليات الخلفية.",
        p2Title: "تطبيق وتخصيص نظام ERP",
        p2Desc: "تهيئة الدورة المستندية الكاملة (شراء - مخزن - مبيعات - فوترة) مع موديول لتتبع حركات الأصناف والتنبيه الآلي.",
        p3Title: "لوحة تحكم تفاعلية Analytics",
        p3Desc: "تصميم لوحة تحكم لعرض تقارير المبيعات ومعدلات حركة المخزون والربحية بشكل لحظي للإدارة.",
        p4Title: "أعمال CGI وإعلانات 3D",
        p4Desc: "تصميم أنيميشن وموديلات 3D وهويات بصرية باستخدام Blender وأدوات الذكاء الاصطناعي البصري.",
        contactTitle: "تواصل معي",
        contactDesc: "هل لديك مشروع أو تريد تطوير أنظمة لشركتك؟ يسعدني التواصل معك مباشرة:",
        contactLoc: "📍 الشرقية، العاشر من رمضان / الزقازيق، مصر"
    },
    en: {
        pageTitle: "Basem Morsi | Portfolio",
        navHome: "Home",
        navAbout: "About",
        navSkills: "Skills",
        navExperience: "Experience",
        navProjects: "Projects",
        navContact: "Contact",
        langBtnText: "AR",
        greeting: "Welcome, I'm",
        heroName: "Basem Morsi",
        heroBio: "Business Information Systems (BIS) student, Full-Stack Developer, Odoo Specialist, and 3D CGI & Motion Graphics Creator.",
        btnProjects: "Explore My Work",
        btnCv: "Download CV 📄",
        aboutTitle: "Professional Summary & Education",
        eduTitle: "Academic Education",
        eduDegree: "Bachelor in Business Information Systems (BIS)",
        eduUniv: "Al-Obour Higher Institute for Tech (2023 - 2027)",
        eduDesc: "Combining practical understanding of ERP, accounting, and supply chain with advanced software development skills.",
        fullstackTitle: "Full-Stack Web Development",
        fullstackDesc: "Building complete web applications from Front-End interfaces to Back-End servers & databases using Vue.js, Laravel, and MySQL.",
        odooTitle: "Odoo Development & 3D",
        odooDesc: "Customizing Odoo modules, RESTful API integrations, and creating 3D CGI models & animations using Blender.",
        skillsTitle: "Core Skills & Abilities",
        skillFront: "Front-End Development",
        skillBack: "Back-End Development",
        skillOdoo: "Odoo & 3D Development",
        expTitle: "Professional Experience",
        expDate: "Oct 2025 - Present",
        expRole: "Odoo Specialist & Web Developer",
        expCompany: "Tech Solutions for Digital Systems",
        expTask1: "Analyzing business workflows and mapping them to standard Odoo modules.",
        expTask2: "Developing custom Python & XML Odoo modules.",
        expTask3: "Designing printable QWeb reports (Invoices, Quotations, Inventory Notes).",
        expTask4: "Building RESTful APIs to integrate Odoo with web platforms & e-commerce stores.",
        projectsTitle: "Featured Projects",
        p1Title: "Full-Stack Web App (Laravel & Vue.js)",
        p1Desc: "Developed a full web application using Vue.js for UI and Laravel with MySQL for backend operations.",
        p2Title: "ERP System Implementation",
        p2Desc: "Configured full document cycles (Purchase, Inventory, Sales, Invoicing) with stock alerts.",
        p3Title: "Interactive Odoo Dashboard",
        p3Desc: "Designed real-time analytics dashboards for sales metrics and inventory movement.",
        p4Title: "CGI & 3D Commercial Ads",
        p4Desc: "3D animations and visual branding created using Blender and generative AI visual tools.",
        contactTitle: "Get In Touch",
        contactDesc: "Have a project or want to develop systems for your business? Feel free to contact me:",
        contactLoc: "📍 Sharqia, 10th of Ramadan / Zagazig, Egypt"
    }
};

let currentLang = localStorage.getItem('portfolio_lang') || 'ar';
const langToggleBtn = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');

function updateLanguage(lang) {
    const translation = translations[lang];

    // تحديث لغة ومسار اتجاه الصفحة
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // ترجمة كافة العناصر الحاملة لـ data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translation[key]) {
            element.textContent = translation[key];
        }
    });

    // تحديث عنوان الصفحة ونص الزر
    document.getElementById('page-title').textContent = translation.pageTitle;
    if (langText) langText.textContent = translation.langBtnText;

    // حفظ التفضيل
    localStorage.setItem('portfolio_lang', lang);
}

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        updateLanguage(currentLang);
    });
}

// تطبيق اللغة المخزنة عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage(currentLang);
});
