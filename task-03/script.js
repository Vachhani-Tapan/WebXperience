// AirPods Pro Experience - Task 03
// Using GSAP, ScrollTrigger, and Canvas for Scrollytelling

document.addEventListener('DOMContentLoaded', () => {
    // Particle System
    const particleCanvas = document.getElementById('particle-canvas');
    const particleCtx = particleCanvas.getContext('2d');
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > particleCanvas.width) this.x = 0;
            if (this.x < 0) this.x = particleCanvas.width;
            if (this.y > particleCanvas.height) this.y = 0;
            if (this.y < 0) this.y = particleCanvas.height;
        }

        draw() {
            particleCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            particleCtx.beginPath();
            particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            particleCtx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Waveform Canvas Animation
    const waveformCanvas = document.getElementById('waveform-canvas');
    if (waveformCanvas) {
        const waveCtx = waveformCanvas.getContext('2d');
        let waveOffset = 0;

        function drawWaveform() {
            waveCtx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
            waveCtx.strokeStyle = '#0071e3';
            waveCtx.lineWidth = 3;
            waveCtx.beginPath();

            for (let x = 0; x < waveformCanvas.width; x++) {
                const y = waveformCanvas.height / 2 +
                    Math.sin((x + waveOffset) * 0.02) * 50 +
                    Math.sin((x + waveOffset) * 0.05) * 30;
                if (x === 0) {
                    waveCtx.moveTo(x, y);
                } else {
                    waveCtx.lineTo(x, y);
                }
            }
            waveCtx.stroke();
            waveOffset += 2;
            requestAnimationFrame(drawWaveform);
        }
        drawWaveform();
    }

    // Resize particle canvas
    window.addEventListener('resize', () => {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    });

    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Canvas Animation Setup
    const canvas = document.getElementById('airpods-canvas');
    const context = canvas.getContext('2d');

    // Canvas sizing
    canvas.width = 1158;
    canvas.height = 770;

    // Frame configuration - EXTENDED FOR HACKATHON
    // Using longer sequence for more dramatic effect
    const frameCount = 300; // Increased from 147 to 300 frames

    // Alternative sequences to try (uncomment to test):
    // Option 1: AirPods Pro (original 147 frames)
    const currentFrame = index => (
        `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index % 147).toString().padStart(4, '0')}.jpg`
    );

    // Option 2: For even longer sequences, we loop and blend
    // This creates a 300-frame experience by cycling through the sequence twice

    const images = [];
    const airpods = {
        frame: 0
    };

    // Preload images
    let loadedCount = 0;
    let errorCount = 0;
    const loaderPercent = document.querySelector('.loader-percent');
    const loaderFill = document.querySelector('.loader-bar-fill');
    const loader = document.querySelector('.loader');

    const handleLoadProgress = () => {
        let totalProcessed = loadedCount + errorCount;
        let progress = Math.round((totalProcessed / frameCount) * 100);
        loaderPercent.innerText = `${progress}%`;
        loaderFill.style.width = `${progress}%`;

        if (totalProcessed === frameCount) {
            console.log(`Loading complete. Success: ${loadedCount}, Errors: ${errorCount}`);
            // Remove loader
            setTimeout(() => {
                loader.classList.add('hidden');
                if (loadedCount > 0) {
                    // Find the first successfully loaded image to render
                    for (let i = 0; i < images.length; i++) {
                        if (images[i].complete && images[i].naturalWidth > 0) {
                            airpods.frame = i;
                            render();
                            break;
                        }
                    }
                }
                startGSAPAnimations();
            }, 500);
        }
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.crossOrigin = "anonymous"; // Important for CORS
        img.src = currentFrame(i);
        img.onload = () => {
            loadedCount++;
            handleLoadProgress();
        };
        img.onerror = () => {
            console.warn(`Failed to load frame ${i}`);
            errorCount++;
            handleLoadProgress();
        };
        images.push(img);
    }

    function render() {
        if (images[airpods.frame] && images[airpods.frame].complete && images[airpods.frame].naturalWidth > 0) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(images[airpods.frame], 0, 0);
        }
    }

    // 3. GSAP Scrollytelling
    function startGSAPAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Frame update on scroll
        gsap.to(airpods, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
            },
            onUpdate: render // Render the canvas on every update
        });

        // Overlay text and side-info animations
        const overlays = [
            { id: "#overlay-1", info: "#overlay-1 .side-info", start: 0, end: 0.2, dir: -50 },
            { id: "#overlay-2", info: "#overlay-2 .side-info", start: 0.25, end: 0.45, dir: 50 },
            { id: "#overlay-3", info: "#overlay-3 .side-info", start: 0.5, end: 0.7, dir: -50 },
            { id: "#overlay-4", info: "#overlay-4 .side-info", start: 0.75, end: 0.95, dir: 50 }
        ];

        overlays.forEach(overlay => {
            gsap.fromTo(overlay.info,
                { opacity: 0, x: overlay.dir },
                {
                    opacity: 1,
                    x: 0,
                    scrollTrigger: {
                        trigger: ".hero",
                        start: `${overlay.start * 100}% top`,
                        end: `${(overlay.start + 0.08) * 100}% top`,
                        scrub: true,
                    }
                }
            );

            gsap.to(overlay.info, {
                opacity: 0,
                x: -overlay.dir,
                scrollTrigger: {
                    trigger: ".hero",
                    start: `${overlay.end * 100}% top`,
                    end: `${(overlay.end + 0.08) * 100}% top`,
                    scrub: true,
                }
            });
        });

        // AirPods Emergence & 3D Rotation Animation
        // Synchronized with the case lid flip (approx frame 15-20% through sequence)
        const podsTL = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero",
                start: "15% top",
                end: "70% top",
                scrub: 1.2,
            }
        });

        podsTL
            .to(".pod-left-wrapper", {
                opacity: 1,
                x: -380,
                y: -180,
                z: 150,
                rotationX: 360,
                rotationY: -160,
                scale: 1,
                ease: "power1.inOut"
            }, 0)
            .to(".pod-right-wrapper", {
                opacity: 1,
                x: 350,
                y: -100,
                z: 150,
                rotationX: -360,
                rotationY: 160,
                scale: 1,
                ease: "power1.inOut"
            }, 0)
            .to(".pod-marker", {
                opacity: 1,
                duration: 0.5,
                stagger: 0.2
            }, 0.5)
            // Enhanced floating effect at the end
            .to(".pod-wrapper", {
                y: "+=30",
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }, ">");

        // Exploded View Component Animations
        gsap.utils.toArray('.component-layer').forEach((layer, index) => {
            gsap.to(layer, {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: layer,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 1,
                }
            });
        });

        // Feature Card Animations
        gsap.utils.toArray('.feature-card').forEach((card, index) => {
            gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                scrollTrigger: {
                    trigger: card,
                    start: "top 75%",
                    end: "top 40%",
                    scrub: 1,
                }
            });
        });
    }

    // Handle Resize
    window.addEventListener('resize', () => {
        // Redraw on resize if needed
        render();
    });
});
