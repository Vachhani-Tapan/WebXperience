// Product Data - Premium Curation
const products = [
    {
        id: 1,
        name: "Titan Grip Adjustable Dumbbells",
        category: "weights",
        price: "$349.99",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Olympic Rogue Steel Plates",
        category: "weights",
        price: "$199.00",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Kevlar-Infused Knee Sleeves",
        category: "gear",
        price: "$85.00",
        image: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Carbon Nano Training Watch",
        category: "gear",
        price: "$499.99",
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2127&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Apex Power Squat Rack",
        category: "machines",
        price: "$1299.00",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Iso-Lateral Chest Press",
        category: "machines",
        price: "$849.50",
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 7,
        name: "Elite Iron Kettlebells",
        category: "weights",
        price: "$119.99",
        image: "https://images.unsplash.com/photo-1606889464198-fcb18894cf50?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 8,
        name: "Tapered Leather Lever Belt",
        category: "gear",
        price: "$145.00",
        image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 9,
        name: "Professional Resistance Bands Set",
        category: "gear",
        price: "$59.99",
        image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 10,
        name: "High-Density Foam Roller",
        category: "gear",
        price: "$39.99",
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=2080&auto=format&fit=crop"
    },
    {
        id: 11,
        name: "Premium Yoga Mat - 6mm",
        category: "gear",
        price: "$79.99",
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 12,
        name: "Insulated Protein Shaker",
        category: "gear",
        price: "$24.99",
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop"
    }
];

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    generateStars();
    renderProducts(products);
    initCharts();
    initNutritionCharts();
    setupFilters();
    createFloatingPlates();
    initGSAPAnimations();
    setupDumbbellPress();
    startBreathingLoop();
    setupMobileMenu();
    setupScrollHeader();
    setupSmoothScrollLinks();
    setupContactForm();
});

// Contact Form Validation
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (name && email && subject && message) {
            // Show success message
            const btn = form.querySelector('.btn');
            const originalText = btn.textContent;
            btn.textContent = '✓ Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';

            // Reset form
            form.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        }
    });
}


// Smooth Scroll for Navigation Links
function setupSmoothScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}



// Initialize Lenis Smooth Scroll (Advanced Integration v3)
function initLenis() {
    const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        lerp: 0.05, // Lower lerp = smoother transition
        infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

// Atmospheric Effects
function generateStars() {
    const container = document.getElementById('stars-container');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        container.appendChild(star);

        // Twinkle effect
        gsap.to(star, {
            opacity: Math.random(),
            duration: 1 + Math.random() * 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

function triggerLightning() {
    const bolt = document.getElementById('lightning-bolt');
    const xPos = 10 + Math.random() * 80;
    bolt.style.left = `${xPos}%`;

    const tl = gsap.timeline();
    tl.to(bolt, { opacity: 1, duration: 0.05 })
        .to(bolt, { opacity: 0, duration: 0.05 })
        .to(bolt, { opacity: 0.8, duration: 0.05 })
        .to(bolt, { opacity: 0, duration: 0.2 });

    // Flash background
    gsap.to("body", { backgroundColor: "#1a1a2e", duration: 0.1, yoyo: true, repeat: 1 });
}

// Breathing Loop
function startBreathingLoop() {
    gsap.to(".ribcage", {
        scale: 1.1,
        opacity: 0.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// Dumbbell Press Logic (Enhanced)
function setupDumbbellPress() {
    const btn = document.getElementById('press-btn');
    const countDisplay = document.getElementById('rep-count');
    const character = document.querySelector('.press-container');
    let count = 0;
    let isAnimating = false;

    btn.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;

        count++;
        countDisplay.textContent = count;

        // Trigger lightning on every 5th rep
        if (count % 3 === 0) triggerLightning();

        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
                character.classList.remove('strained');
            }
        });

        character.classList.add('strained');

        // The Press Sequence (Controlled Lift)
        tl.to(".dumbbell", {
            y: -80, // Reduced height for realism
            duration: 0.8,
            ease: "power3.out"
        }, 0)
            .to(".left-arm", {
                rotation: -40,
                scaleY: 1.2,
                duration: 0.8,
                ease: "power3.out"
            }, 0)
            .to(".right-arm", {
                rotation: 40,
                scaleY: 1.2,
                duration: 0.8,
                ease: "power3.out"
            }, 0)
            .to(".chest-flesh", {
                scale: 1.2,
                backgroundColor: "#ff3366",
                duration: 0.8,
                ease: "power3.out"
            }, 0)
            .to(".ribcage", {
                scale: 1.3,
                duration: 0.8,
                ease: "power3.out"
            }, 0)

            // Return Sequence (Controlled Lowing)
            .to(".dumbbell", {
                y: 0,
                duration: 1,
                ease: "power2.inOut"
            }, "+=0.2")
            .to(".left-arm", {
                rotation: -15,
                scaleY: 1,
                duration: 1,
                ease: "power2.inOut"
            }, "<")
            .to(".right-arm", {
                rotation: 15,
                scaleY: 1,
                duration: 1,
                ease: "power2.inOut"
            }, "<")
            .to(".chest-flesh", {
                scale: 1,
                backgroundColor: "#252525",
                duration: 1,
                ease: "power2.inOut"
            }, "<")
            .to(".ribcage", {
                scale: 1,
                duration: 1,
                ease: "power2.inOut"
            }, "<");
    });
}



// GSAP Animations (Advanced + Maximum)
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax logic for [data-speed]
    const parallaxItems = document.querySelectorAll('[data-speed]');
    parallaxItems.forEach(item => {
        const speed = parseFloat(item.getAttribute('data-speed'));
        gsap.to(item, {
            y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
            ease: "none",
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Animate-in class for section headers
    const animateInElements = document.querySelectorAll('.animate-in');
    animateInElements.forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 80, scale: 0.9 },
            {
                opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Reveal animations
    const revealUp = document.querySelectorAll('.reveal-up');
    revealUp.forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 100 },
            {
                opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 90%" }
            }
        );
    });

    gsap.fromTo(".reveal-right",
        { opacity: 0, x: -100 },
        {
            opacity: 1, x: 0, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: ".reveal-right", start: "top 85%" }
        }
    );

    gsap.fromTo(".reveal-left",
        { opacity: 0, x: 100 },
        {
            opacity: 1, x: 0, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: ".reveal-left", start: "top 85%" }
        }
    );

    // Stagger animation for nutrition tips
    const tipCards = document.querySelectorAll('.animate-stagger .tip-card');
    gsap.fromTo(tipCards,
        { opacity: 0, y: 60, scale: 0.8 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.animate-stagger',
                start: "top 80%"
            }
        }
    );

    // Chart card animations
    const chartCards = document.querySelectorAll('.animate-chart');
    chartCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, scale: 0.8, rotateY: 45 },
            {
                opacity: 1,
                scale: 1,
                rotateY: 0,
                duration: 1,
                delay: index * 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%"
                }
            }
        );
    });

    // Hero title animation
    gsap.from(".hero-content h1", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
    });

    // Hero buttons animation
    gsap.from(".hero-btns .btn", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        delay: 0.5,
        ease: "power3.out"
    });
}

// Mobile Menu Setup
function setupMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Scroll Header Effect
function setupScrollHeader() {
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}


// Create Background Elements (Moving Gym Plates)
function createFloatingPlates() {
    const container = document.getElementById('bg-elements-container');
    const plateCount = 10;

    for (let i = 0; i < plateCount; i++) {
        const plate = document.createElement('div');
        plate.className = 'floating-plate';

        // Random starting positions
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        plate.style.left = `${startX}px`;
        plate.style.top = `${startY}px`;

        container.appendChild(plate);

        // Animate them continuously
        animatePlate(plate);
    }
}

function animatePlate(plate) {
    const duration = 15 + Math.random() * 20;
    const moveX = (Math.random() - 0.5) * 400;
    const moveY = (Math.random() - 0.5) * 400;

    gsap.to(plate, {
        x: `+=${moveX}`,
        y: `+=${moveY}`,
        rotation: Math.random() * 360,
        duration: duration,
        ease: "none",
        onComplete: () => animatePlate(plate)
    });
}

// Render Products with Stagger Animation
function renderProducts(productsToRender) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    productsToRender.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.opacity = '0';
        card.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3>${product.name}</h3>
                <div class="product-price">${product.price}</div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Stagger animation for product cards
    gsap.fromTo('.product-card',
        { opacity: 0, y: 80, scale: 0.8 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.products-grid',
                start: "top 80%"
            }
        }
    );
}

// Setup Filters
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            if (filter === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === filter);
                renderProducts(filtered);
            }
        });
    });
}

// Chart initialization
function initCharts() {
    // Usage Chart
    const usageCtx = document.getElementById('usageChart').getContext('2d');
    new Chart(usageCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Gym Traffic (%)',
                data: [45, 60, 85, 70, 95, 80, 50],
                backgroundColor: 'rgba(0, 255, 204, 0.6)',
                borderColor: 'rgba(0, 255, 204, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { color: '#b0b0b0' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#b0b0b0' }
                }
            },
            plugins: {
                legend: { labels: { color: '#fff' } }
            }
        }
    });

    // Performance Chart
    const perfCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(perfCtx, {
        type: 'radar',
        data: {
            labels: ['Strength', 'Endurance', 'Flexibility', 'Speed', 'Agility', 'Power'],
            datasets: [{
                label: 'IronForge Average',
                data: [85, 90, 75, 80, 85, 95],
                fill: true,
                backgroundColor: 'rgba(255, 51, 102, 0.3)',
                borderColor: 'rgba(255, 51, 102, 1)',
                pointBackgroundColor: 'rgba(255, 51, 102, 1)',
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    angleLines: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { display: false },
                    pointLabels: { color: '#b0b0b0', font: { size: 12 } }
                }
            },
            plugins: {
                legend: { labels: { color: '#fff' } }
            }
        }
    });
}

// Nutrition Charts initialization
function initNutritionCharts() {
    // Nutrition Trend Chart
    const nutCtx = document.getElementById('nutritionChart').getContext('2d');
    new Chart(nutCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Calories (kcal)',
                data: [2800, 2750, 2900, 3100],
                borderColor: 'rgba(0, 255, 204, 1)',
                backgroundColor: 'rgba(0, 255, 204, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#fff' } } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#b0b0b0' } },
                x: { grid: { display: false }, ticks: { color: '#b0b0b0' } }
            }
        }
    });

    // Macro Breakdown Chart
    const macroCtx = document.getElementById('macroChart').getContext('2d');
    new Chart(macroCtx, {
        type: 'doughnut',
        data: {
            labels: ['Protein', 'Carbs', 'Fats'],
            datasets: [{
                data: [30, 45, 25],
                backgroundColor: ['#ff3366', '#00ffcc', '#ff9900'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom', labels: { color: '#fff' } } }
        }
    });
}

