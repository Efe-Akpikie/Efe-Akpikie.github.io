// Theme Toggle
(function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    html.setAttribute('data-theme', currentTheme);
    
    // Update icon based on theme
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            updateThemeIcon(e.matches ? 'dark' : 'light');
        }
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('.theme-icon');
        if (theme === 'dark') {
            // Moon icon
            icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        } else {
            // Sun icon
            icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        }
    }
})();

// Typing Animation for Hero Title
(function initTypingAnimation() {
    const heroTitle = document.getElementById('heroTitle');
    if (!heroTitle) return;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        // Just show the text without animation
        return;
    }
    
    const fullText = heroTitle.textContent.trim();
    heroTitle.textContent = ''; // Clear the text initially
    heroTitle.style.opacity = '1'; // Make sure it's visible
    
    let charIndex = 0;
    const typingSpeed = 100; // milliseconds per character
    
    function typeCharacter() {
        if (charIndex < fullText.length) {
            heroTitle.textContent += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(typeCharacter, typingSpeed);
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(() => {
        typeCharacter();
    }, 300);
})();

// Mobile Navigation
(function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (!isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            navToggle.focus();
        }
    });
})();

// Smooth Scrolling
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
})();

// Active Section Highlighting
(function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return; // Skip if user prefers reduced motion
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
})();

// Scroll Reveal Animations
(function initScrollReveal() {
    const elements = document.querySelectorAll('.project-card, .experience-item, .skill-group, .coursework-group, .highlight-item, .strengths-section, .about-education');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Just make everything visible without animation
        elements.forEach(el => el.classList.add('visible'));
        return;
    }
    
    elements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    elements.forEach(el => {
        observer.observe(el);
    });
})();

// Email Copy Functionality
(function initEmailCopy() {
    const emailLink = document.getElementById('emailLink');
    const toast = document.getElementById('toast');
    const email = 'eakpikie@gmail.com';
    
    if (!emailLink || !toast) return;
    
    emailLink.addEventListener('click', async (e) => {
        e.preventDefault();
        
        try {
            // Use the Clipboard API if available
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(email);
                showEmailToast('Email copied to clipboard!');
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    showEmailToast('Email copied to clipboard!');
                } catch (err) {
                    showEmailToast('Failed to copy email. Please copy manually: ' + email);
                }
                
                document.body.removeChild(textArea);
            }
        } catch (err) {
            showEmailToast('Failed to copy email. Please copy manually: ' + email);
        }
    });
    
    function showEmailToast(message) {
        toast.textContent = message;
        toast.className = 'toast success show';
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
})();

// Handle reduced motion preference on page load
(function initReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Disable smooth scrolling
        document.documentElement.style.scrollBehavior = 'auto';
    }
})();

// Hero background: Central Limit Theorem — sample means from a skewed population → bell curve
(function initHeroCltCanvas() {
    const canvas = document.getElementById('heroCltCanvas');
    const hero = document.getElementById('hero');
    if (!canvas || !hero || !canvas.getContext) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const SAMPLE_N = 32;
    const BIN_LO = 1;
    const BIN_HI = 10;
    const BIN_COUNT = 44;
    const BUF_CAP = 380;
    const SKEW_VALS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const SKEW_RAW = [48, 36, 26, 18, 12, 8, 5, 3, 2, 1];
    const SKEW_W = SKEW_RAW.map((x) => x / SKEW_RAW.reduce((a, b) => a + b, 0));

    let muPop = 0;
    let sigPop = 0;
    for (let i = 0; i < SKEW_VALS.length; i++) muPop += SKEW_VALS[i] * SKEW_W[i];
    let vPop = 0;
    for (let i = 0; i < SKEW_VALS.length; i++) {
        const d = SKEW_VALS[i] - muPop;
        vPop += d * d * SKEW_W[i];
    }
    sigPop = Math.sqrt(vPop);
    const sigMean = sigPop / Math.sqrt(SAMPLE_N);

    const buf = new Float32Array(BUF_CAP);
    let bufWrite = 0;
    let bufFill = 0;
    let lastReset = performance.now();
    let rafId = 0;
    let wCss = 0;
    let hCss = 0;

    function parseCssColor(cs) {
        cs = (cs || '').trim();
        if (!cs) return [30, 35, 45, 1];
        if (cs.startsWith('#')) {
            let h = cs.slice(1);
            if (h.length === 3) h = h.split('').map((c) => c + c).join('');
            const n = parseInt(h, 16);
            return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1];
        }
        const m = cs.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i);
        if (m) return [+m[1], +m[2], +m[3], m[4] !== undefined ? +m[4] : 1];
        return [30, 35, 45, 1];
    }

    function rgbaFromVar(prop, a) {
        const v = getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
        const [r, g, b] = parseCssColor(v);
        return `rgba(${r},${g},${b},${a})`;
    }

    function sampleSkewed() {
        let r = Math.random();
        for (let i = 0; i < SKEW_W.length; i++) {
            r -= SKEW_W[i];
            if (r <= 0) return SKEW_VALS[i];
        }
        return SKEW_VALS[SKEW_VALS.length - 1];
    }

    function sampleMean() {
        let s = 0;
        for (let i = 0; i < SAMPLE_N; i++) s += sampleSkewed();
        return s / SAMPLE_N;
    }

    function pushMean(m) {
        buf[bufWrite] = m;
        bufWrite = (bufWrite + 1) % BUF_CAP;
        bufFill = Math.min(BUF_CAP, bufFill + 1);
    }

    function meanHistogram() {
        const counts = new Array(BIN_COUNT).fill(0);
        const bw = (BIN_HI - BIN_LO) / BIN_COUNT;
        if (bufFill === 0) return counts;
        const start = (bufWrite - bufFill + BUF_CAP) % BUF_CAP;
        for (let i = 0; i < bufFill; i++) {
            const v = buf[(start + i) % BUF_CAP];
            if (v < BIN_LO || v > BIN_HI) continue;
            let b = Math.floor((v - BIN_LO) / bw);
            if (b < 0) b = 0;
            if (b >= BIN_COUNT) b = BIN_COUNT - 1;
            counts[b]++;
        }
        return counts;
    }

    function normalPdf(x) {
        const z = (x - muPop) / sigMean;
        return Math.exp(-0.5 * z * z) / (sigMean * Math.sqrt(2 * Math.PI));
    }

    function resize() {
        const rect = hero.getBoundingClientRect();
        wCss = Math.max(1, Math.floor(rect.width));
        hCss = Math.max(1, Math.floor(rect.height));
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(wCss * dpr);
        canvas.height = Math.floor(hCss * dpr);
        canvas.style.width = `${wCss}px`;
        canvas.style.height = `${hCss}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawChart() {
        const W = wCss;
        const H = hCss;
        ctx.clearRect(0, 0, W, H);

        const accent = rgbaFromVar('--accent', 0.85);
        const accent2 = rgbaFromVar('--accent-2', 0.75);
        const muted = rgbaFromVar('--text-muted', 0.35);
        const fg = rgbaFromVar('--text-primary', 0.5);

        const y0 = H * 0.54;
        const y1 = H * 0.92;
        const axisY = y1 + 4;

        ctx.strokeStyle = muted;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(W * 0.04, axisY);
        ctx.lineTo(W * 0.96, axisY);
        ctx.stroke();

        const popX0 = W * 0.06;
        const popX1 = W * 0.2;
        const popW = (popX1 - popX0) / SKEW_VALS.length;
        const maxW = Math.max(...SKEW_W);
        for (let i = 0; i < SKEW_VALS.length; i++) {
            const hBar = (y1 - y0) * (0.12 + 0.88 * (SKEW_W[i] / maxW));
            const x = popX0 + i * popW + popW * 0.12;
            const bw = popW * 0.76;
            ctx.fillStyle = accent2;
            ctx.globalAlpha = 0.35;
            ctx.fillRect(x, y1 - hBar, bw, hBar);
            ctx.globalAlpha = 1;
        }

        const hx0 = W * 0.24;
        const hx1 = W * 0.94;
        const hBw = (hx1 - hx0) / BIN_COUNT;
        const counts = meanHistogram();
        const maxC = Math.max(1, ...counts);
        for (let i = 0; i < BIN_COUNT; i++) {
            const hBar = (y1 - y0) * (0.08 + 0.92 * (counts[i] / maxC));
            const x = hx0 + i * hBw + hBw * 0.08;
            const bw = hBw * 0.84;
            ctx.fillStyle = accent;
            ctx.globalAlpha = 0.28 + 0.45 * (counts[i] / maxC);
            ctx.fillRect(x, y1 - hBar, bw, hBar);
            ctx.globalAlpha = 1;
        }

        const pdfPeak = normalPdf(muPop) || 1e-6;
        ctx.beginPath();
        ctx.strokeStyle = fg;
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 1.5;
        const steps = 140;
        for (let s = 0; s <= steps; s++) {
            const t = s / steps;
            const xv = BIN_LO + t * (BIN_HI - BIN_LO);
            const nh = normalPdf(xv) / pdfPeak;
            const yv = y1 - (y1 - y0) * (0.1 + 0.88 * nh);
            const x = hx0 + t * (hx1 - hx0);
            if (s === 0) ctx.moveTo(x, yv);
            else ctx.lineTo(x, yv);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.font = '500 11px "JetBrains Mono", ui-monospace, monospace';
        ctx.fillStyle = rgbaFromVar('--text-secondary', 0.65);
        ctx.textAlign = 'left';
        ctx.fillText('Population (skewed)', popX0, y0 - 10);
        ctx.fillText(`Means of samples (n = ${SAMPLE_N})`, hx0, y0 - 10);
        ctx.font = '500 10px "JetBrains Mono", ui-monospace, monospace';
        ctx.fillStyle = rgbaFromVar('--text-muted', 0.55);
        ctx.fillText('CLT: distribution of x\u0304 approaches normal', hx0, y0 - 26);
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function seedBuffer(n) {
        for (let i = 0; i < n; i++) pushMean(sampleMean());
    }

    function tick() {
        if (document.hidden) {
            rafId = 0;
            return;
        }
        const now = performance.now();
        if (now - lastReset > 5600) {
            bufFill = 0;
            bufWrite = 0;
            lastReset = now;
        }
        const batch = bufFill < 40 ? 5 : 3;
        for (let i = 0; i < batch; i++) pushMean(sampleMean());
        drawChart();
        rafId = requestAnimationFrame(tick);
    }

    resize();
    if (reduced) {
        seedBuffer(BUF_CAP);
        drawChart();
    } else {
        lastReset = performance.now();
        seedBuffer(12);
        rafId = requestAnimationFrame(tick);
    }

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => {
        resize();
        drawChart();
    }) : null;
    if (ro) ro.observe(hero);
    window.addEventListener('resize', () => {
        resize();
        drawChart();
    });

    document.addEventListener('visibilitychange', () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (document.hidden) {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = 0;
        } else if (rafId === 0) {
            rafId = requestAnimationFrame(tick);
        }
    });

    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
        }
        if (e.matches) {
            bufFill = 0;
            bufWrite = 0;
            seedBuffer(BUF_CAP);
            drawChart();
        } else {
            bufFill = 0;
            bufWrite = 0;
            lastReset = performance.now();
            seedBuffer(12);
            rafId = requestAnimationFrame(tick);
        }
    });
})();

// Discrete 2D lattice random walk (orthogonal steps, fixed grid spacing) — projects + coursework
(function initRandomWalkSections() {
    const MAX_POINTS = 2400;
    const MAX_DPR = 1.2;
    const TICK_MS = 58;
    const STEPS_PER_TICK = 2;

    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function parseCssColor(cs) {
        cs = (cs || '').trim();
        if (!cs) return [30, 35, 45, 1];
        if (cs.startsWith('#')) {
            let h = cs.slice(1);
            if (h.length === 3) h = h.split('').map((c) => c + c).join('');
            const n = parseInt(h, 16);
            return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1];
        }
        const m = cs.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i);
        if (m) return [+m[1], +m[2], +m[3], m[4] !== undefined ? +m[4] : 1];
        return [30, 35, 45, 1];
    }

    function mulberry32(seed) {
        let a = seed >>> 0;
        return function () {
            a |= 0;
            a = (a + 0x6d2b79f5) | 0;
            let t = Math.imul(a ^ (a >>> 15), 1 | a);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    const layers = [];
    let tickId = 0;

    function anyLayerVisible() {
        return layers.some((l) => l.getVisible());
    }

    function stopTick() {
        if (tickId) {
            clearInterval(tickId);
            tickId = 0;
        }
    }

    function runTick() {
        const t = performance.now();
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].getVisible()) layers[i].drawHeat(t);
        }
    }

    function startTick() {
        if (prefersReducedMotion() || document.hidden || tickId || !anyLayerVisible()) return;
        runTick();
        tickId = window.setInterval(runTick, TICK_MS);
    }

    function createLayer(section, canvas) {
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return null;

        let wCss = 0;
        let hCss = 0;
        let visible = false;
        let seed = 1;
        for (let i = 0; i < section.id.length; i++) seed = (Math.imul(seed, 31) + section.id.charCodeAt(i)) | 0;

        /** Polyline vertices for one lattice walk */
        let points = [];

        function gridStepLen() {
            const s = Math.min(wCss, hCss);
            const scale = Math.max(1.15, Math.min(2.1, s / 440));
            return Math.max(14, Math.min(34, Math.round(17 * scale)));
        }

        function initPaths() {
            points = [];
            const W = wCss;
            const H = hCss;
            const cx = Math.round(W * 0.5);
            const cy = Math.round(H * 0.5);
            const jx = ((seed * 3) & 15) - 7;
            const jy = ((seed * 5) & 11) - 5;
            points.push({ x: cx + jx, y: cy + jy });
        }

        function resize() {
            const rect = section.getBoundingClientRect();
            const nw = Math.max(1, Math.floor(rect.width));
            const nh = Math.max(1, Math.floor(rect.height));
            const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
            const nextCw = Math.floor(nw * dpr);
            const nextCh = Math.floor(nh * dpr);
            if (nw === wCss && nh === hCss && canvas.width === nextCw && canvas.height === nextCh) {
                return;
            }
            wCss = nw;
            hCss = nh;
            canvas.width = nextCw;
            canvas.height = nextCh;
            canvas.style.width = `${wCss}px`;
            canvas.style.height = `${hCss}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initPaths();
        }

        function readBgRgb() {
            const root = getComputedStyle(document.documentElement);
            return parseCssColor(root.getPropertyValue('--bg-primary').trim());
        }

        function motionScale() {
            const s = Math.min(wCss, hCss);
            return Math.max(1.2, Math.min(2.2, s / 440));
        }

        const DIRS = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];

        function latticeStep(rand) {
            if (points.length === 0) return;
            const W = wCss;
            const H = hCss;
            const step = gridStepLen();
            const pad = step + 8;
            const last = points[points.length - 1];

            for (let attempt = 0; attempt < 16; attempt++) {
                const u = rand ? rand() : Math.random();
                const d = DIRS[(u * 4) | 0];
                let x = last.x + d[0] * step;
                let y = last.y + d[1] * step;
                x = Math.min(W - pad, Math.max(pad, x));
                y = Math.min(H - pad, Math.max(pad, y));
                if (x !== last.x || y !== last.y) {
                    points.push({ x, y });
                    if (points.length > MAX_POINTS) points.shift();
                    return;
                }
            }
        }

        /** Solid section background + full path (reference-style crisp lattice trace). */
        function paintFullPath() {
            const W = wCss;
            const H = hCss;
            if (W < 2 || H < 2) return;
            const [br, bg, bb] = readBgRgb();
            ctx.fillStyle = `rgb(${br},${bg},${bb})`;
            ctx.fillRect(0, 0, W, H);
            if (points.length < 2) return;
            const root = getComputedStyle(document.documentElement);
            const lineVar = section.id === 'coursework' ? '--accent-2' : '--accent';
            const [r, g, b] = parseCssColor(root.getPropertyValue(lineVar).trim());
            const lm = 0.44;
            const lr = Math.round(r + (255 - r) * lm);
            const lg = Math.round(g + (255 - g) * lm);
            const lb = Math.round(b + (255 - b) * lm);
            const lw = Math.max(2.1, Math.min(3.4, 2.25 * motionScale()));
            ctx.strokeStyle = `rgba(${lr},${lg},${lb},0.72)`;
            ctx.lineWidth = lw;
            ctx.lineJoin = 'miter';
            ctx.miterLimit = 2;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.stroke();
        }

        function warmStartSteps(n) {
            for (let i = 0; i < n; i++) latticeStep(null);
        }

        function drawHeat() {
            if (wCss < 2 || hCss < 2) return;
            for (let s = 0; s < STEPS_PER_TICK; s++) latticeStep(null);
            paintFullPath();
        }

        function drawStatic() {
            if (wCss < 2 || hCss < 2) return;
            initPaths();
            const rand = mulberry32(seed ^ 0x9e3779b9);
            const n = Math.min(MAX_POINTS, 1600);
            for (let i = 0; i < n; i++) latticeStep(rand);
            paintFullPath();
        }

        resize();

        return {
            section,
            getVisible() {
                return visible;
            },
            setVisible(v) {
                visible = v;
                if (prefersReducedMotion()) {
                    if (v) drawStatic();
                    return;
                }
                if (v) {
                    if (points.length < 10) {
                        warmStartSteps(160);
                        paintFullPath();
                    }
                    if (tickId) drawHeat();
                    else startTick();
                } else if (!anyLayerVisible()) {
                    stopTick();
                }
            },
            resize,
            drawHeat,
            drawStatic,
        };
    }

    const layerSpecs = [
        ['projects', 'projectsRandomWalkCanvas'],
        ['coursework', 'courseworkRandomWalkCanvas'],
    ];

    let resizeDebounce = 0;
    window.addEventListener(
        'resize',
        () => {
            clearTimeout(resizeDebounce);
            resizeDebounce = setTimeout(() => {
                layers.forEach((L) => {
                    L.resize();
                    if (prefersReducedMotion()) L.drawStatic();
                    else if (L.getVisible() && !document.hidden) L.drawHeat();
                });
            }, 140);
        },
        { passive: true }
    );

    document.addEventListener('visibilitychange', () => {
        if (prefersReducedMotion()) return;
        if (document.hidden) stopTick();
        else if (anyLayerVisible()) startTick();
    });

    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        stopTick();
        layers.forEach((L) => {
            L.resize();
            if (e.matches) L.drawStatic();
        });
        if (!e.matches && anyLayerVisible()) startTick();
    });

    layerSpecs.forEach(([sectionId, canvasId]) => {
        const sec = document.getElementById(sectionId);
        const cvs = document.getElementById(canvasId);
        const L = sec && cvs && cvs.getContext ? createLayer(sec, cvs) : null;
        if (!L) return;
        layers.push(L);

        if (prefersReducedMotion()) {
            L.drawStatic();
        }

        const ro =
            typeof ResizeObserver !== 'undefined'
                ? new ResizeObserver(() => {
                      L.resize();
                      if (prefersReducedMotion()) L.drawStatic();
                  })
                : null;
        if (ro) ro.observe(L.section);

        const io = typeof IntersectionObserver !== 'undefined'
            ? new IntersectionObserver(
                  (entries) => {
                      const vis = entries.some((e) => e.isIntersecting);
                      L.setVisible(vis);
                  },
                  { root: null, rootMargin: '80px 0px', threshold: 0 }
              )
            : null;
        if (io) io.observe(L.section);
        else L.setVisible(true);
    });
})();

