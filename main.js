// 1. إعداد Three.js
const canvas = document.getElementById('bg3d');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 25;

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 2. المجسم ثلاثي الأبعاد
const geometry = new THREE.IcosahedronGeometry(9, 2);
const material = new THREE.MeshStandardMaterial({ 
    color: 0x00f2fe, 
    wireframe: true,
    roughness: 0.3,
    metalness: 0.8
});
const sphere3D = new THREE.Mesh(geometry, material);
scene.add(sphere3D);

// 3. الإضاءة
const pointLight = new THREE.PointLight(0x00f2fe, 2, 100);
pointLight.position.set(10, 10, 10);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(pointLight, ambientLight);

// 4. التفاعل مع الماوس واللمس
let targetX = 0;
let targetY = 0;

function updatePosition(clientX, clientY) {
    targetX = (clientX - window.innerWidth / 2) * 0.0015;
    targetY = (clientY - window.innerHeight / 2) * 0.0015;
}

document.addEventListener('mousemove', (e) => {
    updatePosition(e.clientX, e.clientY);
});

document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    }
}, { passive: true });

function animate() {
    requestAnimationFrame(animate);

    sphere3D.rotation.x += 0.002;
    sphere3D.rotation.y += 0.004;

    sphere3D.rotation.y += 0.05 * (targetX - sphere3D.rotation.y);
    sphere3D.rotation.x += 0.05 * (targetY - sphere3D.rotation.x);

    renderer.render(scene, camera);
}

animate();

// 5. زر تبديل الثيم
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');

    const isLight = body.classList.contains('light-theme');
    themeToggleBtn.textContent = isLight ? '☀️' : '🌙';

    if (isLight) {
        material.color.setHex(0x0066ff);
        pointLight.color.setHex(0x0066ff);
    } else {
        material.color.setHex(0x00f2fe);
        pointLight.color.setHex(0x00f2fe);
    }
});

// 6. قائمة الموبايل
const menuToggleBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 7. إعادة التكيف عند تغيير المقاس
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});