// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(-5px, 6px)' : '';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(-5px, -6px)' : '';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'linear-gradient(180deg, rgba(10, 10, 10, 0.98) 0%, rgba(10, 10, 10, 0.85) 100%)';
        navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
    } else {
        navbar.style.background = 'linear-gradient(180deg, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.7) 100%)';
        navbar.style.backdropFilter = 'blur(20px) saturate(150%)';
    }
    
    // Hide/Show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 300) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .timeline-item, .skill-category, .education-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Advanced name animation with letter splitting
const heroTitle = document.querySelector('.hero-title span');
const originalText = heroTitle.textContent;
heroTitle.innerHTML = '';

// Split text into individual letters
originalText.split('').forEach((letter, index) => {
    const span = document.createElement('span');
    span.textContent = letter === ' ' ? '\u00A0' : letter;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(50px) rotateZ(' + (Math.random() * 20 - 10) + 'deg)';
    span.style.animation = `letterFadeIn 0.6s ease ${index * 0.05}s forwards`;
    heroTitle.appendChild(span);
});

// Add CSS for letter animation
const style = document.createElement('style');
style.textContent = `
    @keyframes letterFadeIn {
        to {
            opacity: 1;
            transform: translateY(0) rotateZ(0deg);
        }
    }
    
    .hero-title span span {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 300;
    }
    
    .hero-title:hover span span {
        transform: translateY(-2px);
        font-weight: 400;
        letter-spacing: 0.05em;
    }
    
    .hero-title span span:nth-child(odd) {
        transition-delay: calc(var(--i) * 0.02s);
    }
    
    .hero-title span span:nth-child(even) {
        transition-delay: calc(var(--i) * 0.03s);
    }
`;
document.head.appendChild(style);

// Add dynamic hover effect with index
heroTitle.addEventListener('mouseenter', () => {
    const letters = heroTitle.querySelectorAll('span');
    letters.forEach((letter, index) => {
        letter.style.setProperty('--i', index);
    });
});

// Subtle mouse follow effect on hero title
const heroContainer = document.querySelector('.hero-content');
heroContainer.addEventListener('mousemove', (e) => {
    const rect = heroContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    heroTitle.style.transform = `
        perspective(1000px)
        rotateY(${deltaX * 3}deg)
        rotateX(${-deltaY * 3}deg)
    `;
});

// Reset on mouse leave
heroContainer.addEventListener('mouseleave', () => {
    heroTitle.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Add hover effect to timeline items
document.querySelectorAll('.timeline-content').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add counter animation to stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers[0] && animateCounter(statNumbers[0], 7);
            statNumbers[1] && animateCounter(statNumbers[1], 15);
            statNumbers[2] && animateCounter(statNumbers[2], 10);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Enhanced Particle Animation with DNA-like strands
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 120;
const mouse = { x: null, y: null, radius: 150 };

// Neural network nodes
const nodes = [];
const nodeCount = 8;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.baseSize = this.size;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = this.getGradientColor();
        this.angle = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.connections = [];
    }

    getGradientColor() {
        const colors = ['#e0e0e0', '#f0f0f0', '#d0d0d0', '#c0c0c0', '#ffffff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.pulseSpeed;

        // Pulse effect
        this.size = this.baseSize + Math.sin(this.angle) * 0.5;

        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * force * 2;
                this.y -= Math.sin(angle) * force * 2;
            }
        }

        // Boundary check with smooth wrapping
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.y > canvas.height + 50) this.y = -50;
        if (this.y < -50) this.y = canvas.height + 50;

        // Update connections
        this.connections = [];
        particles.forEach(particle => {
            const distance = Math.hypot(particle.x - this.x, particle.y - this.y);
            if (distance < 120 && distance > 0) {
                this.connections.push({
                    particle: particle,
                    distance: distance
                });
            }
        });
    }

    draw() {
        // Draw connections first (behind particles)
        this.connections.forEach(connection => {
            const opacity = (1 - connection.distance / 120) * 0.3;
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            
            // Create curved connections
            const midX = (this.x + connection.particle.x) / 2;
            const midY = (this.y + connection.particle.y) / 2;
            const curveX = midX + (Math.random() - 0.5) * 20;
            const curveY = midY + (Math.random() - 0.5) * 20;
            
            ctx.quadraticCurveTo(curveX, curveY, connection.particle.x, connection.particle.y);
            ctx.stroke();
            ctx.restore();
        });

        // Draw particle
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Create gradient for each particle
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.5, this.color + '80');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Core particle
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class NeuralNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.angle = Math.random() * Math.PI * 2;
        this.orbitRadius = Math.random() * 30 + 20;
        this.orbitSpeed = Math.random() * 0.02 + 0.01;
        this.pulseAngle = 0;
        this.color = '#ffffff';
    }

    update() {
        this.angle += this.orbitSpeed;
        this.pulseAngle += 0.05;
        
        this.x = this.baseX + Math.cos(this.angle) * this.orbitRadius;
        this.y = this.baseY + Math.sin(this.angle) * this.orbitRadius;
    }

    draw() {
        const pulseSize = 5 + Math.sin(this.pulseAngle) * 2;
        
        ctx.save();
        ctx.globalAlpha = 0.8;
        
        // Outer glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, pulseSize * 3);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.5, this.color + '40');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseSize * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Core
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function initParticles() {
    particles.length = 0;
    nodes.length = 0;
    
    // Create regular particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Create neural nodes in a pattern
    for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.3;
        const x = canvas.width / 2 + Math.cos(angle) * radius;
        const y = canvas.height / 2 + Math.sin(angle) * radius;
        nodes.push(new NeuralNode(x, y));
    }
}

function drawNeuralConnections() {
    // Connect neural nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            ctx.save();
            ctx.globalAlpha = 0.1;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 0.5;
            
            // Create curved connections between nodes
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            
            const cp1x = (nodes[i].x + nodes[j].x) / 2 + (Math.random() - 0.5) * 50;
            const cp1y = (nodes[i].y + nodes[j].y) / 2 + (Math.random() - 0.5) * 50;
            
            ctx.quadraticCurveTo(cp1x, cp1y, nodes[j].x, nodes[j].y);
            ctx.stroke();
            ctx.restore();
        }
    }
}

function animateParticles() {
    // Create trailing effect
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw neural nodes
    drawNeuralConnections();
    nodes.forEach(node => {
        node.update();
        node.draw();
    });
    
    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
    });
    
    // Draw particles (connections are drawn in the particle draw method)
    particles.forEach(particle => {
        particle.draw();
    });
    
    requestAnimationFrame(animateParticles);
}

// Mouse tracking
canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();