(function () {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    let W, H, DPR;

    function resize() {
        DPR = Math.min(window.devicePixelRatio || 1, 2);
        W = window.innerWidth; H = window.innerHeight;
        canvas.width = W * DPR; canvas.height = H * DPR;
        canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    window.addEventListener('resize', resize);
    resize();

    // ---------- Realistic item art ----------
    // Each draw function renders centered at (0,0), sized around "s" (px).
    // No Math.random() inside draw fns — they run every frame, so any
    // randomness must be baked in at spawn time, not redrawn each frame.

    function drawApple(ctx, s) {
        const r = s / 2;
        let g = ctx.createRadialGradient(-r * 0.3, -r * 0.35, r * 0.15, 0, 0, r);
        g.addColorStop(0, '#FF9E80'); g.addColorStop(0.45, '#F4432E'); g.addColorStop(1, '#B71C1C');
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.85);
        ctx.bezierCurveTo(r * 0.7, -r * 1.05, r * 1.05, r * 0.3, r * 0.55, r * 0.85);
        ctx.bezierCurveTo(r * 0.25, r * 1.15, -r * 0.25, r * 1.15, -r * 0.55, r * 0.85);
        ctx.bezierCurveTo(-r * 1.05, r * 0.3, -r * 0.7, -r * 1.05, 0, -r * 0.85);
        ctx.closePath(); ctx.fillStyle = g; ctx.fill();
        ctx.strokeStyle = 'rgba(120,20,20,0.5)'; ctx.lineWidth = r * 0.05;
        ctx.beginPath(); ctx.moveTo(-r * 0.12, -r * 0.82); ctx.quadraticCurveTo(0, -r * 0.65, r * 0.12, -r * 0.82); ctx.stroke();
        ctx.strokeStyle = '#7a5230'; ctx.lineWidth = r * 0.09;
        ctx.beginPath(); ctx.moveTo(0, -r * 0.82); ctx.quadraticCurveTo(r * 0.05, -r * 1.1, r * 0.15, -r * 1.25); ctx.stroke();
        ctx.fillStyle = '#5CAF50';
        ctx.beginPath(); ctx.ellipse(r * 0.32, -r * 1.05, r * 0.24, r * 0.13, -0.6, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(-r * 0.32, -r * 0.25, r * 0.16, r * 0.28, -0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fill();
    }

    
    function drawBanana(ctx, s) {
        const l = s * 1.15;
        ctx.save(); ctx.rotate(0.15);
        let g = ctx.createLinearGradient(-l / 2, 0, l / 2, 0);
        g.addColorStop(0, '#F9E36B'); g.addColorStop(0.5, '#FBEA6F'); g.addColorStop(1, '#E8C93A');
        ctx.beginPath();
        ctx.moveTo(-l * 0.45, l * 0.05);
        ctx.quadraticCurveTo(0, -l * 0.55, l * 0.45, -l * 0.05);
        ctx.quadraticCurveTo(l * 0.4, l * 0.05, l * 0.32, l * 0.02);
        ctx.quadraticCurveTo(0, -l * 0.32, -l * 0.35, l * 0.15);
        ctx.closePath(); ctx.fillStyle = g; ctx.fill();
        ctx.fillStyle = '#6d5628';
        ctx.beginPath(); ctx.ellipse(l * 0.45, -l * 0.06, l * 0.05, l * 0.04, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(-l * 0.44, l * 0.08, l * 0.05, l * 0.04, 0, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = l * 0.03;
        ctx.beginPath(); ctx.moveTo(-l * 0.28, l * 0.0); ctx.quadraticCurveTo(0, -l * 0.42, l * 0.3, -l * 0.08); ctx.stroke();
        ctx.restore();
    }

    function drawGrapes(ctx, s) {
        const r = s * 0.16;
        const pts = [[0, -r * 1.6], [-r * 1.1, -r * 0.4], [r * 1.1, -r * 0.4], [-r * 2.0, r * 0.9], [0, r * 0.9], [r * 2.0, r * 0.9], [-r * 1.1, r * 2.1], [r * 1.1, r * 2.1], [0, r * 3.1]];
        pts.forEach(([px, py]) => {
            let g = ctx.createRadialGradient(px - r * 0.3, py - r * 0.3, r * 0.1, px, py, r);
            g.addColorStop(0, '#C9A0F5'); g.addColorStop(0.6, '#8E4FC7'); g.addColorStop(1, '#5B2A8C');
            ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        });
        ctx.strokeStyle = '#5C3A1E'; ctx.lineWidth = r * 0.35;
        ctx.beginPath(); ctx.moveTo(0, -r * 2.6); ctx.lineTo(0, -r * 1.7); ctx.stroke();
        ctx.fillStyle = '#5CAF50';
        ctx.beginPath(); ctx.ellipse(r * 0.6, -r * 2.6, r * 0.7, r * 0.4, -0.5, 0, Math.PI * 2); ctx.fill();
    }

    function drawStrawberry(ctx, s) {
        const r = s / 2;
        let g = ctx.createRadialGradient(-r * 0.2, -r * 0.1, r * 0.1, 0, r * 0.1, r * 1.1);
        g.addColorStop(0, '#FF6B81'); g.addColorStop(0.55, '#F0304A'); g.addColorStop(1, '#C2102B');
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.55);
        ctx.bezierCurveTo(r * 0.9, -r * 0.75, r * 0.95, r * 0.5, 0, r * 1.15);
        ctx.bezierCurveTo(-r * 0.95, r * 0.5, -r * 0.9, -r * 0.75, 0, -r * 0.55);
        ctx.closePath(); ctx.fillStyle = g; ctx.fill();
        ctx.fillStyle = '#FCE49B';
        for (let i = 0; i < 10; i++) {
            const t = i / 10, yy = -r * 0.3 + t * r * 1.3, spread = r * 0.55 * (1 - Math.abs(t - 0.4)), xx = ((i % 2 === 0) ? 1 : -1) * spread * 0.6;
            ctx.beginPath(); ctx.ellipse(xx, yy, r * 0.05, r * 0.08, 0, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = '#4CAF50';
        for (let a = -1; a <= 1; a++) {
            ctx.beginPath(); ctx.ellipse(a * r * 0.35, -r * 0.6, r * 0.28, r * 0.16, a * 0.6, 0, Math.PI * 2); ctx.fill();
        }
    }

    function drawOrange(ctx, s) {
        const r = s / 2;
        let g = ctx.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.15, 0, 0, r);
        g.addColorStop(0, '#FFC069'); g.addColorStop(0.55, '#FB8C00'); g.addColorStop(1, '#C15E00');
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        ctx.fillStyle = 'rgba(150,80,0,0.18)';
        for (let i = 0; i < 14; i++) {
            const ang = i * 2.399, rad = Math.min(r * 0.85, r * 0.3 + (i % 5) * r * 0.11);
            ctx.beginPath(); ctx.arc(Math.cos(ang) * rad, Math.sin(ang) * rad, r * 0.035, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = '#4CAF50';
        ctx.beginPath(); ctx.ellipse(r * 0.1, -r * 0.95, r * 0.22, r * 0.12, -0.3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(-r * 0.32, -r * 0.2, r * 0.2, r * 0.32, -0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fill();
    }

    function drawWatermelon(ctx, s) {
        const r = s / 2;
        ctx.save();
        ctx.beginPath(); ctx.arc(0, 0, r, Math.PI * 0.05, Math.PI * 0.95, false); ctx.closePath();
        let g = ctx.createLinearGradient(0, -r, 0, r * 0.3);
        g.addColorStop(0, '#3F8F3B'); g.addColorStop(0.15, '#8BC34A'); g.addColorStop(0.3, '#FF6B81'); g.addColorStop(1, '#F0304A');
        ctx.fillStyle = g; ctx.fill();
        ctx.fillStyle = '#2E1A0A';
        for (let i = 0; i < 6; i++) {
            const t = (i / 5 - 0.5) * 1.4;
            ctx.beginPath(); ctx.ellipse(t * r * 0.55, r * 0.05 + Math.abs(t) * r * 0.1, r * 0.045, r * 0.08, t * 0.4, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
    }

    function drawCarrot(ctx, s) {
        const l = s * 1.2;
        ctx.save();
        let g = ctx.createLinearGradient(0, -l * 0.55, 0, l * 0.5);
        g.addColorStop(0, '#FFA344'); g.addColorStop(1, '#E8730E');
        ctx.beginPath();
        ctx.moveTo(-l * 0.24, -l * 0.5); ctx.lineTo(l * 0.24, -l * 0.5); ctx.lineTo(0, l * 0.55); ctx.closePath();
        ctx.fillStyle = g; ctx.fill();
        ctx.strokeStyle = 'rgba(150,70,0,0.3)'; ctx.lineWidth = l * 0.02;
        for (let i = 1; i < 4; i++) {
            const yy = -l * 0.5 + i * l * 0.22;
            ctx.beginPath(); ctx.moveTo(-l * 0.24 * (1 - i * 0.18), yy); ctx.lineTo(l * 0.24 * (1 - i * 0.18), yy); ctx.stroke();
        }
        ctx.strokeStyle = '#4CAF50'; ctx.lineWidth = l * 0.05; ctx.lineCap = 'round';
        for (let a = -1; a <= 1; a++) {
            ctx.beginPath(); ctx.moveTo(a * l * 0.05, -l * 0.5); ctx.quadraticCurveTo(a * l * 0.25, -l * 0.75, a * l * 0.12, -l * 0.95); ctx.stroke();
        }
        ctx.restore();
    }

    function drawBroccoli(ctx, s) {
        const r = s / 2;
        ctx.fillStyle = '#3E8E41';
        const spots = [[0, -r * 0.5], [-r * 0.5, -r * 0.15], [r * 0.5, -r * 0.15], [-r * 0.25, r * 0.15], [r * 0.25, r * 0.15], [0, -r * 0.9]];
        spots.forEach(([px, py]) => {
            let g = ctx.createRadialGradient(px - r * 0.15, py - r * 0.15, r * 0.05, px, py, r * 0.42);
            g.addColorStop(0, '#7CC576'); g.addColorStop(1, '#356E37');
            ctx.beginPath(); ctx.arc(px, py, r * 0.42, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        });
        let g2 = ctx.createLinearGradient(0, r * 0.1, 0, r * 0.9);
        g2.addColorStop(0, '#DCEBB0'); g2.addColorStop(1, '#B9D488');
        ctx.fillStyle = g2;
        ctx.beginPath();
        ctx.moveTo(-r * 0.22, r * 0.1); ctx.lineTo(r * 0.22, r * 0.1); ctx.lineTo(r * 0.14, r * 0.95); ctx.lineTo(-r * 0.14, r * 0.95);
        ctx.closePath(); ctx.fill();
    }

    function drawBurger(ctx, s) {
        const r = s / 2;
        ctx.fillStyle = '#6CBE45';
        ctx.beginPath();
        ctx.moveTo(-r * 0.95, -r * 0.12);
        for (let i = 0; i <= 8; i++) {
            const t = i / 8, xx = -r * 0.95 + t * r * 1.9, yy = -r * 0.12 + Math.sin(t * Math.PI * 4) * r * 0.06;
            ctx.lineTo(xx, yy);
        }
        ctx.lineTo(r * 0.95, r * 0.02); ctx.lineTo(-r * 0.95, r * 0.02); ctx.closePath(); ctx.fill();
        let pg = ctx.createLinearGradient(0, -r * 0.02, 0, r * 0.28);
        pg.addColorStop(0, '#7B4A2B'); pg.addColorStop(1, '#5A331C');
        ctx.beginPath();
        if (ctx.roundRect) { ctx.roundRect(-r * 0.9, -r * 0.02, r * 1.8, r * 0.28, r * 0.1); } else { ctx.rect(-r * 0.9, -r * 0.02, r * 1.8, r * 0.28); }
        ctx.fillStyle = pg; ctx.fill();
        ctx.fillStyle = '#FFC94A';
        ctx.beginPath();
        ctx.moveTo(-r * 0.95, r * 0.22); ctx.lineTo(r * 0.95, r * 0.22); ctx.lineTo(r * 0.75, r * 0.42); ctx.lineTo(-r * 0.75, r * 0.42);
        ctx.closePath(); ctx.fill();
        let bg = ctx.createLinearGradient(0, r * 0.35, 0, r * 0.85);
        bg.addColorStop(0, '#E9A044'); bg.addColorStop(1, '#C67B2B');
        ctx.beginPath();
        ctx.moveTo(-r * 0.85, r * 0.4); ctx.quadraticCurveTo(-r * 0.85, r * 0.85, 0, r * 0.85); ctx.quadraticCurveTo(r * 0.85, r * 0.85, r * 0.85, r * 0.4);
        ctx.closePath(); ctx.fillStyle = bg; ctx.fill();
        let tg = ctx.createLinearGradient(0, -r, 0, -r * 0.2);
        tg.addColorStop(0, '#F3B156'); tg.addColorStop(1, '#D98A2E');
        ctx.beginPath();
        ctx.moveTo(-r * 0.95, -r * 0.15); ctx.quadraticCurveTo(-r * 0.95, -r * 1.05, 0, -r * 1.05); ctx.quadraticCurveTo(r * 0.95, -r * 1.05, r * 0.95, -r * 0.15);
        ctx.closePath(); ctx.fillStyle = tg; ctx.fill();
        ctx.fillStyle = '#FFF1D0';
        for (let i = 0; i < 7; i++) {
            const xx = (-0.6 + i * 0.2) * r, yy = -r * 0.55 - Math.abs(xx) * 0.15;
            ctx.beginPath(); ctx.ellipse(xx, yy, r * 0.05, r * 0.03, 0.3, 0, Math.PI * 2); ctx.fill();
        }
    }

    function drawFries(ctx, s) {
        const r = s / 2;
        let g = ctx.createLinearGradient(-r * 0.6, 0, r * 0.6, 0);
        g.addColorStop(0, '#E4413C'); g.addColorStop(1, '#C22A26');
        ctx.beginPath();
        ctx.moveTo(-r * 0.55, r * 0.1); ctx.lineTo(r * 0.55, r * 0.1); ctx.lineTo(r * 0.42, r * 0.95); ctx.lineTo(-r * 0.42, r * 0.95);
        ctx.closePath(); ctx.fillStyle = g; ctx.fill();
        ctx.fillStyle = '#FBEFD8';
        ctx.fillRect(-r * 0.55, r * 0.32, r * 1.1, r * 0.14);
        ctx.fillStyle = '#F6C453';
        [-0.35, -0.18, 0, 0.18, 0.35].forEach(fx => {
            ctx.save(); ctx.translate(fx * r, r * 0.05); ctx.rotate(fx * 0.5);
            ctx.fillRect(-r * 0.06, -r * 0.85, r * 0.12, r * 0.85); ctx.restore();
        });
    }

    function drawDonut(ctx, s) {
        const r = s / 2;
        let g = ctx.createRadialGradient(-r * 0.2, -r * 0.2, r * 0.1, 0, 0, r);
        g.addColorStop(0, '#D89B5D'); g.addColorStop(1, '#B06A32');
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        ctx.fillStyle = '#F45D8C';
        ctx.beginPath(); ctx.arc(0, -r * 0.02, r * 0.94, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-r * 0.5, r * 0.55); ctx.quadraticCurveTo(-r * 0.55, r * 0.95, -r * 0.35, r * 0.95); ctx.quadraticCurveTo(-r * 0.3, r * 0.68, -r * 0.18, r * 0.55);
        ctx.closePath(); ctx.fill();
        ctx.save();
        ctx.shadowColor = 'transparent';
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); ctx.arc(0, 0, r * 0.3, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        const colors = ['#4FC3F7', '#FFEB3B', '#8BC34A', '#FFFFFF'];
        for (let i = 0; i < 10; i++) {
            const ang = (i / 10) * Math.PI * 2 + (i % 3) * 0.4, rad = r * 0.45 + ((i % 3) * r * 0.12);
            ctx.save(); ctx.translate(Math.cos(ang) * rad, Math.sin(ang) * rad); ctx.rotate(ang);
            ctx.fillStyle = colors[i % colors.length]; ctx.fillRect(-r * 0.06, -r * 0.015, r * 0.12, r * 0.03); ctx.restore();
        }
    }

    function drawPizza(ctx, s) {
        const r = s * 0.62;
        ctx.save(); ctx.rotate(Math.PI / 2);
        let g = ctx.createLinearGradient(0, -r, 0, r * 0.3);
        g.addColorStop(0, '#F2C14E'); g.addColorStop(1, '#E4A21F');
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.15); ctx.lineTo(-r * 0.55, r * 0.95); ctx.lineTo(r * 0.55, r * 0.95); ctx.closePath();
        ctx.fillStyle = g; ctx.fill();
        ctx.strokeStyle = '#C9862A'; ctx.lineWidth = r * 0.14;
        ctx.beginPath(); ctx.moveTo(-r * 0.58, r * 0.95); ctx.lineTo(r * 0.58, r * 0.95); ctx.stroke();
        ctx.fillStyle = '#C6362C';
        [[0, r * 0.15], [-r * 0.18, r * 0.42], [r * 0.2, r * 0.42], [0, r * 0.68]].forEach(([px, py]) => {
            ctx.beginPath(); ctx.arc(px, py, r * 0.13, 0, Math.PI * 2); ctx.fill();
        });
        ctx.restore();
    }

    function drawChocolate(ctx, s) {
        const w = s * 0.9, h = s * 0.65;
        let g = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
        g.addColorStop(0, '#6B4028'); g.addColorStop(1, '#432315');
        ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.fillStyle = g; ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 2;
        for (let i = 1; i < 3; i++) {
            ctx.beginPath(); ctx.moveTo(-w / 2 + i * w / 3, -h / 2); ctx.lineTo(-w / 2 + i * w / 3, h / 2); ctx.stroke();
        }
        ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(w / 2, 0); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.fillRect(-w / 2, -h / 2, w, h * 0.25);
    }

    function drawSoda(ctx, s) {
        const r = s / 2;
        let g = ctx.createLinearGradient(-r * 0.5, 0, r * 0.5, 0);
        g.addColorStop(0, '#E8453D'); g.addColorStop(1, '#C22A26');
        ctx.beginPath();
        ctx.moveTo(-r * 0.5, -r * 0.7); ctx.lineTo(r * 0.5, -r * 0.7); ctx.lineTo(r * 0.4, r * 0.95); ctx.lineTo(-r * 0.4, r * 0.95);
        ctx.closePath(); ctx.fillStyle = g; ctx.fill();
        ctx.fillStyle = '#FBEFD8'; ctx.fillRect(-r * 0.47, -r * 0.1, r * 0.94, r * 0.28);
        ctx.fillStyle = '#F1F1F1'; ctx.fillRect(-r * 0.52, -r * 0.85, r * 1.04, r * 0.16);
        ctx.strokeStyle = '#4FC3F7'; ctx.lineWidth = r * 0.09;
        ctx.beginPath(); ctx.moveTo(r * 0.1, -r * 0.85); ctx.lineTo(r * 0.25, -r * 1.35); ctx.stroke();
    }

    function drawLollipop(ctx, s) {
        const r = s * 0.4;
        ctx.strokeStyle = '#E8DDBF'; ctx.lineWidth = r * 0.16;
        ctx.beginPath(); ctx.moveTo(0, r * 0.6); ctx.lineTo(0, r * 1.4); ctx.stroke();
        let g = ctx.createRadialGradient(0, 0, r * 0.1, 0, 0, r);
        g.addColorStop(0, '#FFFFFF'); g.addColorStop(1, '#F45D8C');
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        ctx.strokeStyle = '#E0407A'; ctx.lineWidth = r * 0.12;
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 4; a += 0.2) {
            const rr = r * (a / (Math.PI * 4)) * 0.9, xx = Math.cos(a) * rr, yy = Math.sin(a) * rr;
            if (a === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
        }
        ctx.stroke();
    }

    // ---------- Game data ----------
    const HEALTHY_ITEMS = [
        { key: 'apple', draw: drawApple, size: 46, particleColor: '#E53935' },
        { key: 'banana', draw: drawBanana, size: 50, particleColor: '#F9E36B' },
        { key: 'grapes', draw: drawGrapes, size: 44, particleColor: '#8E4FC7' },
        { key: 'strawberry', draw: drawStrawberry, size: 42, particleColor: '#F0304A' },
        { key: 'orange', draw: drawOrange, size: 46, particleColor: '#FB8C00' },
        { key: 'watermelon', draw: drawWatermelon, size: 48, particleColor: '#F0304A' },
        { key: 'carrot', draw: drawCarrot, size: 46, particleColor: '#FB8C00' },
        { key: 'broccoli', draw: drawBroccoli, size: 44, particleColor: '#3E8E41' }
    ];
    const JUNK_ITEMS = [
        { key: 'burger', draw: drawBurger, size: 52, particleColor: '#C67B2B' },
        { key: 'fries', draw: drawFries, size: 48, particleColor: '#F6C453' },
        { key: 'donut', draw: drawDonut, size: 46, particleColor: '#F45D8C' },
        { key: 'chocolate', draw: drawChocolate, size: 48, particleColor: '#6B4028' },
        { key: 'soda', draw: drawSoda, size: 48, particleColor: '#E8453D' },
        { key: 'pizza', draw: drawPizza, size: 50, particleColor: '#E4A21F' }
    ];

    // ---------- Professional Synthesized Sound FX (Web Audio API) ----------
    const AudioEngine = {
        ctx: null,
        muted: localStorage.getItem('fb_muted') === 'true',
        init() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        },
        playCatch(combo = 1) {
            if (this.muted) return;
            this.init();
            if (!this.ctx) return;
            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            const baseFreq = 480 + Math.min(550, (combo - 1) * 70);
            osc.frequency.setValueAtTime(baseFreq, t);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.45, t + 0.1);
            gain.gain.setValueAtTime(0.22, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.15);
        },
        playJunk() {
            if (this.muted) return;
            this.init();
            if (!this.ctx) return;
            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(170, t);
            osc.frequency.exponentialRampToValueAtTime(75, t + 0.22);
            gain.gain.setValueAtTime(0.25, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.22);
        },
        playHurt() {
            if (this.muted) return;
            this.init();
            if (!this.ctx) return;
            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(130, t);
            osc.frequency.linearRampToValueAtTime(45, t + 0.3);
            gain.gain.setValueAtTime(0.35, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.3);
        },
        playGameOver() {
            if (this.muted) return;
            this.init();
            if (!this.ctx) return;
            const t = this.ctx.currentTime;
            [330, 294, 262, 196].forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, t + i * 0.11);
                gain.gain.setValueAtTime(0.2, t + i * 0.11);
                gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.11 + 0.22);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(t + i * 0.11);
                osc.stop(t + i * 0.11 + 0.22);
            });
        },
        playComboFanfare() {
            if (this.muted) return;
            this.init();
            if (!this.ctx) return;
            const t = this.ctx.currentTime;
            [523, 659, 784, 1046].forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, t + i * 0.065);
                gain.gain.setValueAtTime(0.22, t + i * 0.065);
                gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.065 + 0.25);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(t + i * 0.065);
                osc.stop(t + i * 0.065 + 0.25);
            });
        }
    };

    // ---------- Asset preloader & sprite manager ----------
    const ASSETS_MANIFEST = [
        { key: 'background', src: 'background.jpg' },
        { key: 'basket', src: 'images/basket.png', isBasket: true },
        { key: 'apple', src: 'images/apple.png' },
        { key: 'banana', src: 'images/banana.png' },
        { key: 'grapes', src: 'images/grapes.png' },
        { key: 'strawberry', src: 'images/strawberry.png' },
        { key: 'orange', src: 'images/orange.png' },
        { key: 'watermelon', src: 'images/watermelon.png' },
        { key: 'carrot', src: 'images/carrot.png' },
        { key: 'broccoli', src: 'images/brocoli.png' },
        { key: 'burger', src: 'images/burger.png' },
        { key: 'fries', src: 'images/fries.png' },
        { key: 'donut', src: 'images/donut.png' },
        { key: 'chocolate', src: 'images/chocolate1.png' },
        { key: 'soda', src: 'images/soda1.png' },
        { key: 'pizza', src: 'images/pizzaSlice1.png' },
        { key: 'heart', src: 'images/heart1.png' }
    ];

    const SPRITES = {};

    function processTransparentSprite(img, isBasket) {
        try {
            const c = document.createElement('canvas');
            const iw = img.naturalWidth || img.width;
            const ih = img.naturalHeight || img.height;
            if (!iw || !ih) return img;
            c.width = iw;
            c.height = ih;
            const octx = c.getContext('2d', { willReadFrequently: true });
            octx.drawImage(img, 0, 0);
            const imgData = octx.getImageData(0, 0, iw, ih);
            const d = imgData.data;
            const threshold = isBasket ? 240 : 242;

            for (let i = 0; i < d.length; i += 4) {
                const r = d[i], g = d[i + 1], b = d[i + 2];
                const minC = Math.min(r, g, b);
                const maxC = Math.max(r, g, b);
                const diff = maxC - minC;

                if (minC >= threshold && diff < 16) {
                    const fade = (minC - threshold) / (255 - threshold);
                    d[i + 3] = Math.max(0, Math.floor(d[i + 3] * (1 - Math.min(1, fade * 1.6))));
                } else if (minC > 230 && diff < 10) {
                    const br = (r + g + b) / 3;
                    if (br > 232) {
                        const factor = 1 - (br - 232) / 23;
                        d[i + 3] = Math.max(0, Math.floor(d[i + 3] * factor));
                    }
                }
            }
            octx.putImageData(imgData, 0, 0);
            return c;
        } catch (e) {
            return img;
        }
    }

    function preloadGameAssets(onProgress, onComplete) {
        let loaded = 0;
        const total = ASSETS_MANIFEST.length;
        let completed = false;

        function finish() {
            if (completed) return;
            completed = true;
            onComplete();
        }

        const safetyTimer = setTimeout(finish, 4000);

        ASSETS_MANIFEST.forEach(item => {
            const img = new Image();
            img.onload = () => {
                if (item.key === 'background') {
                    SPRITES.background = img;
                } else {
                    SPRITES[item.key] = processTransparentSprite(img, item.isBasket);
                }
                loaded++;
                onProgress(loaded, total, item.key);
                if (loaded >= total) {
                    clearTimeout(safetyTimer);
                    setTimeout(finish, 250);
                }
            };
            img.onerror = () => {
                loaded++;
                onProgress(loaded, total, item.key);
                if (loaded >= total) {
                    clearTimeout(safetyTimer);
                    setTimeout(finish, 250);
                }
            };
            img.src = item.src;
        });
    }

    // ---------- Ambient orchard breeze petals & leaves ----------
    const AMBIENT_PETALS = [];
    function initPetals() {
        AMBIENT_PETALS.length = 0;
        const colors = [
            { fill: 'rgba(255,182,193,0.7)', isLeaf: false },
            { fill: 'rgba(255,225,230,0.75)', isLeaf: false },
            { fill: 'rgba(255,245,180,0.65)', isLeaf: false },
            { fill: 'rgba(125,200,90,0.65)', isLeaf: true },
            { fill: 'rgba(90,175,70,0.6)', isLeaf: true }
        ];
        for (let i = 0; i < 24; i++) {
            const type = colors[Math.floor(Math.random() * colors.length)];
            AMBIENT_PETALS.push({
                x: Math.random() * W,
                y: Math.random() * H,
                size: 5 + Math.random() * 7,
                vx: 20 + Math.random() * 35,
                vy: 12 + Math.random() * 22,
                rot: Math.random() * Math.PI * 2,
                vrot: (Math.random() - 0.5) * 2.5,
                fill: type.fill,
                isLeaf: type.isLeaf,
                swayPhase: Math.random() * Math.PI * 2,
                swaySpeed: 1.2 + Math.random() * 1.6
            });
        }
    }

    function updatePetals(dt) {
        AMBIENT_PETALS.forEach(p => {
            p.swayPhase += dt * p.swaySpeed;
            p.x += (p.vx + Math.sin(p.swayPhase) * 18) * dt;
            p.y += (p.vy + Math.cos(p.swayPhase * 0.8) * 8) * dt;
            p.rot += p.vrot * dt;
            if (p.x > W + 30) p.x = -30;
            if (p.y > H + 30) {
                p.y = -30;
                p.x = Math.random() * W;
            }
        });
    }

    function drawPetals(ctx) {
        AMBIENT_PETALS.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = p.fill;
            ctx.beginPath();
            if (p.isLeaf) {
                ctx.moveTo(0, -p.size);
                ctx.quadraticCurveTo(p.size * 0.6, 0, 0, p.size);
                ctx.quadraticCurveTo(-p.size * 0.6, 0, 0, -p.size);
            } else {
                ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
            }
            ctx.fill();
            ctx.restore();
        });
    }

    let highScore = parseInt(localStorage.getItem('fb_highscore') || '0', 10);
    const bestValEl = document.getElementById('best-val');
    if (bestValEl) bestValEl.textContent = highScore;

    // ---------- Educational food facts ----------
    const FOOD_FACTS = [
        '🍎 Apples are a great source of fiber!',
        '🍌 Bananas give you a quick energy boost!',
        '🍓 Strawberries are packed with vitamin C!',
        '🍉 Watermelon is 92% water — super hydrating!',
        '🥕 Carrots are great for your eyesight!',
        '🥦 Broccoli has more vitamin C than an orange!',
        '🍊 Oranges strengthen your immune system!',
        '🍇 Grapes are full of antioxidants!'
    ];

    // ---------- Encouraging messages ----------
    const CATCH_MSGS = ['Great catch!', 'Nice one!', 'Healthy choice!', 'Keep going!', 'Amazing!', 'Yes! 🎉'];
    const MISS_MSGS  = ['Almost!', 'Next time!', 'Try again!', 'You got this!', 'So close!'];

    // ---------- Mini challenge system ----------
    const CHALLENGES = [
        { text: 'Catch 5 in a row', type: 'streak', target: 5, bonus: 30 },
        { text: 'Score 50 points', type: 'score', target: 50, bonus: 20 },
        { text: 'Catch 3 fruits fast', type: 'quick', target: 3, bonus: 25 }
    ];
    let activeChallenge = null;
    let challengeProgress = 0;
    let lastFactTime = 0;

    const state = {
        running: false, paused: false,
        score: 0, lives: 3, combo: 0, comboBest: 0,
        healthyCaught: 0, junkCaught: 0,
        items: [], particles: [], floaters: [],
        spawnTimer: 0, spawnInterval: 1.0, elapsed: 0,
        level: 1, lastLevelTime: 0,
        basket: { x: 0, y: 0, w: 110, h: 70, targetX: 0, squash: 0, tilt: 0, idlePhase: 0 },
        shake: 0, flash: 0
    };

    function resetGame() {
        state.score = 0; state.lives = 3; state.combo = 0; state.comboBest = 0;
        state.healthyCaught = 0; state.junkCaught = 0;
        state.items = []; state.particles = []; state.floaters = [];
        state.spawnTimer = 0; state.spawnInterval = 1.0; state.elapsed = 0;
        state.level = 1; state.lastLevelTime = 0;
        state.basket.x = W / 2; state.basket.targetX = W / 2; state.basket.y = H - 96;
        state.basket.w = Math.min(120, W * 0.22);
        state.basket.squash = 0; state.basket.tilt = 0; state.basket.idlePhase = 0;
        state.shake = 0; state.flash = 0;
        activeChallenge = null; challengeProgress = 0; lastFactTime = 0;
        document.getElementById('score-val').textContent = '0';
        highScore = parseInt(localStorage.getItem('fb_highscore') || '0', 10);
        if (bestValEl) bestValEl.textContent = highScore;
        updateHearts();
        updateHealthyMeter();
        document.getElementById('combo-tag').classList.remove('show');
        initPetals();
    }

    function updateHealthyMeter() {
        const fill = document.getElementById('healthy-bar-fill');
        if (fill) fill.style.width = Math.min(100, (state.healthyCaught % 10) * 10) + '%';
    }

    function pulseFoodFact() {
        if (state.elapsed - lastFactTime < 18) return;
        lastFactTime = state.elapsed;
        const fact = FOOD_FACTS[Math.floor(Math.random() * FOOD_FACTS.length)];
        const el = document.createElement('div');
        el.className = 'food-fact-toast';
        el.textContent = fact;
        document.getElementById('app').appendChild(el);
        setTimeout(() => el.remove(), 3200);
    }

    function showChallenge() {
        if (activeChallenge) return;
        activeChallenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
        challengeProgress = 0;
        const el = document.createElement('div');
        el.className = 'challenge-toast';
        el.id = 'challenge-toast';
        el.innerHTML = `<span>🎯 Challenge:</span> ${activeChallenge.text}`;
        document.getElementById('app').appendChild(el);
    }

    function tickChallenge(isHealthy, currentScore) {
        if (!activeChallenge) return;
        if (activeChallenge.type === 'streak' && isHealthy) challengeProgress++;
        else if (activeChallenge.type === 'score' && currentScore >= activeChallenge.target) challengeProgress = activeChallenge.target;
        else if (activeChallenge.type === 'quick' && isHealthy) challengeProgress++;
        if (challengeProgress >= activeChallenge.target) {
            state.score += activeChallenge.bonus;
            document.getElementById('score-val').textContent = state.score;
            addFloater(W / 2, H / 2 - 80, '+' + activeChallenge.bonus + ' BONUS! 🎯', '#FFD700');
            AudioEngine.playComboFanfare();
            const old = document.getElementById('challenge-toast');
            if (old) old.remove();
            activeChallenge = null;
        }
    }

    function showLevelUp() {
        const banner = document.getElementById('level-up-banner');
        if (!banner) return;
        banner.classList.remove('show');
        void banner.offsetWidth;
        banner.classList.add('show');
        banner.addEventListener('animationend', () => banner.classList.remove('show'), { once: true });
    }

    function showNewBestBanner() {
        const banner = document.getElementById('new-best-banner');
        if (!banner) return;
        banner.classList.remove('show');
        void banner.offsetWidth;
        banner.classList.add('show');
        banner.addEventListener('animationend', () => banner.classList.remove('show'), { once: true });
    }

    function pulseScore() {
        const el = document.getElementById('score-val');
        if (!el) return;
        el.classList.remove('pulse');
        void el.offsetWidth;
        el.classList.add('pulse');
        setTimeout(() => el.classList.remove('pulse'), 220);
    }

    function updateHearts() {
        const hearts = document.querySelectorAll('#lives .heart-img');
        hearts.forEach((h, i) => {
            if (i < state.lives) {
                h.classList.remove('lost');
                if (state.lives === 1) {
                    h.classList.add('danger');
                } else {
                    h.classList.remove('danger');
                }
            } else {
                h.classList.add('lost');
                h.classList.remove('danger');
            }
        });
    }

    // ---------- Input ----------
    let pointerActive = false;
    function setBasketTarget(clientX) {
        const rect = canvas.getBoundingClientRect();
        state.basket.targetX = clientX - rect.left;
    }
    canvas.addEventListener('mousemove', e => { setBasketTarget(e.clientX); hideHint(); });
    canvas.addEventListener('touchstart', e => { pointerActive = true; setBasketTarget(e.touches[0].clientX); hideHint(); }, { passive: true });
    canvas.addEventListener('touchmove', e => { setBasketTarget(e.touches[0].clientX); }, { passive: true });

    const keys = { left: false, right: false };
    window.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
        if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
        if (e.key === ' ') { togglePause(); }
    });
    window.addEventListener('keyup', e => {
        if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
        if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
    });

    function hideHint() {
        const h = document.getElementById('hint');
        if (!h.classList.contains('hide')) {
            h.classList.add('hide');
            setTimeout(() => h.style.display = 'none', 700);
        }
    }

    // ---------- Spawning ----------
    function spawnItem() {
        const isJunk = Math.random() < 0.32;
        let pool = isJunk ? JUNK_ITEMS : HEALTHY_ITEMS;
        const activePool = pool.filter(it => it.key && SPRITES[it.key]);
        if (activePool.length > 0) {
            pool = activePool;
        }
        const def = pool[Math.floor(Math.random() * pool.length)];
        const size = def.size * (0.82 + Math.random() * 0.32);
        const speedBase = 90 + state.elapsed * 2.1;
        state.items.push({
            x: 50 + Math.random() * (W - 100),
            y: -60,
            vy: speedBase + Math.random() * 40,
            def, isJunk, size,
            rot: Math.random() * Math.PI * 2,
            vr: (Math.random() - 0.5) * 2.0,
            wobble: Math.random() * Math.PI * 2
        });
    }

    // ---------- Particles & floaters ----------
    function burst(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 60 + Math.random() * 160;
            state.particles.push({
                x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 60,
                life: 1, color, size: 3 + Math.random() * 4, shape: 'circle'
            });
        }
    }

    // Food-specific particle effects
    function burstSparkle(x, y) { // apple: gold star sparkles
        for (let i = 0; i < 10; i++) {
            const a = (i / 10) * Math.PI * 2;
            state.particles.push({ x, y, vx: Math.cos(a) * 90, vy: Math.sin(a) * 90 - 40,
                life: 1, color: i % 2 === 0 ? '#FFD700' : '#FFF176', size: 4 + Math.random() * 3, shape: 'star' });
        }
    }
    function burstHearts(x, y) { // strawberry: pink hearts
        for (let i = 0; i < 8; i++) {
            const a = Math.random() * Math.PI * 2;
            state.particles.push({ x, y, vx: (Math.random() - 0.5) * 120, vy: -60 - Math.random() * 80,
                life: 1, color: '#FF6B9D', size: 5 + Math.random() * 4, shape: 'heart' });
        }
    }
    function burstSplash(x, y) { // watermelon: blue-pink drops
        for (let i = 0; i < 10; i++) {
            const a = Math.random() * Math.PI;
            state.particles.push({ x, y, vx: (Math.random() - 0.5) * 140, vy: -Math.random() * 100,
                life: 1, color: i % 2 === 0 ? '#F06292' : '#80DEEA', size: 3 + Math.random() * 4, shape: 'circle' });
        }
    }
    function burstLeaves(x, y) { // carrot: green leaf shapes
        for (let i = 0; i < 8; i++) {
            const a = Math.random() * Math.PI * 2;
            state.particles.push({ x, y, vx: Math.cos(a) * 70, vy: Math.sin(a) * 70 - 30,
                life: 1, color: i % 2 === 0 ? '#4CAF50' : '#8BC34A', size: 5 + Math.random() * 3, shape: 'leaf' });
        }
    }

    function foodBurst(x, y, key, color) {
        if (key === 'apple')       { burstSparkle(x, y); }
        else if (key === 'strawberry') { burstHearts(x, y); }
        else if (key === 'watermelon') { burstSplash(x, y); }
        else if (key === 'carrot')     { burstLeaves(x, y); }
        else { burst(x, y, color, 12); }
    }

    function addFloater(x, y, text, color) {
        state.floaters.push({ x, y, text, color, life: 1 });
    }

    function showEncouragement(isGood) {
        const msgs = isGood ? CATCH_MSGS : MISS_MSGS;
        const msg = msgs[Math.floor(Math.random() * msgs.length)];
        // Only show 1-in-4 chance to avoid spam
        if (Math.random() > 0.25) return;
        addFloater(state.basket.x + (Math.random() - 0.5) * 60,
                   state.basket.y - 55, msg, isGood ? '#2C8A36' : '#B8590A');
    }

    // ---------- Update ----------
    let lastTime = performance.now();
    function loop(now) {
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;
        if (state.running && !state.paused) {
            update(dt);
        }
        draw();
        requestAnimationFrame(loop);
    }

    function update(dt) {
        state.elapsed += dt;

        // --- Level-up system (every 20s) ---
        const newLevel = 1 + Math.floor(state.elapsed / 20);
        if (newLevel > state.level) {
            state.level = newLevel;
            showLevelUp();
            AudioEngine.playComboFanfare();
        }

        // difficulty ramp based on level
        const levelMult = 1 + (state.level - 1) * 0.18;
        state.spawnInterval = Math.max(0.3, (1.05 - state.elapsed * 0.010) / levelMult);
        state.spawnTimer += dt;
        if (state.spawnTimer >= state.spawnInterval) {
            state.spawnTimer = 0;
            spawnItem();
        }

        // --- Idle basket bounce when no items on screen ---
        state.basket.idlePhase += dt * 2.2;
        const idleAmt = state.items.length === 0 ? Math.sin(state.basket.idlePhase) * 4 : 0;
        state.basket.y = (H - 96) + idleAmt;

        // basket movement
        if (keys.left) state.basket.targetX -= 480 * dt;
        if (keys.right) state.basket.targetX += 480 * dt;
        state.basket.targetX = Math.max(state.basket.w / 2, Math.min(W - state.basket.w / 2, state.basket.targetX));
        const diffX = state.basket.targetX - state.basket.x;
        state.basket.x += diffX * Math.min(1, dt * 10);
        state.basket.squash *= 0.88;
        const targetTilt = Math.max(-0.16, Math.min(0.16, diffX * 0.0018));
        state.basket.tilt = (state.basket.tilt || 0) + (targetTilt - (state.basket.tilt || 0)) * Math.min(1, dt * 8);

        // ambient drifting petals
        updatePetals(dt);

        // --- Occasional challenge & food fact ---
        if (state.elapsed > 15 && !activeChallenge && Math.random() < dt * 0.015) showChallenge();
        if (state.elapsed > 10) pulseFoodFact();

        // items
        for (let i = state.items.length - 1; i >= 0; i--) {
            const it = state.items[i];
            it.y += it.vy * dt * levelMult;
            it.rot += it.vr * dt;
            it.wobble += dt * 3;
            it.x += Math.sin(it.wobble) * 0.6;

            const basketTop = state.basket.y - state.basket.h * 0.25;
            const withinX = Math.abs(it.x - state.basket.x) < state.basket.w * 0.46;

            if (it.y + it.size * 0.3 >= basketTop && it.y <= state.basket.y + state.basket.h * 0.4 && withinX) {
                state.items.splice(i, 1);
                state.basket.squash = 1;
                if (it.isJunk) {
                    state.combo = 0;
                    state.junkCaught++;
                    const delta = -10;
                    state.score = Math.max(0, state.score + delta);
                    burst(it.x, state.basket.y, it.def.particleColor, 14);
                    addFloater(it.x, state.basket.y - 20, String(delta), '#D6373C');
                    state.shake = 10;
                    AudioEngine.playJunk();
                } else {
                    state.combo++;
                    state.comboBest = Math.max(state.comboBest, state.combo);
                    state.healthyCaught++;
                    updateHealthyMeter();
                    // Reward every 10 healthy catches
                    if (state.healthyCaught % 10 === 0) {
                        state.score += 25;
                        addFloater(state.basket.x, state.basket.y - 50, '+25 🥗 BONUS!', '#4CAF50');
                        AudioEngine.playComboFanfare();
                    }
                    const mult = state.combo >= 8 ? 3 : state.combo >= 4 ? 2 : 1;
                    const delta = 10 * mult;
                    state.score += delta;
                    foodBurst(it.x, state.basket.y, it.def.key, it.def.particleColor);
                    addFloater(it.x, state.basket.y - 20, '+' + delta, '#2C8A36');
                    showEncouragement(true);
                    AudioEngine.playCatch(state.combo);
                    if (mult > 1) {
                        const tag = document.getElementById('combo-tag');
                        tag.textContent = 'x' + mult + ' COMBO';
                        tag.classList.add('show');
                        clearTimeout(tag._t);
                        tag._t = setTimeout(() => tag.classList.remove('show'), 900);
                        if (state.combo === 4 || state.combo === 8) AudioEngine.playComboFanfare();
                    }
                    // check if new in-game best
                    if (state.score > highScore && state.score > 0) {
                        highScore = state.score;
                        localStorage.setItem('fb_highscore', highScore);
                        if (bestValEl) bestValEl.textContent = highScore;
                        showNewBestBanner();
                    }
                    tickChallenge(true, state.score);
                }
                pulseScore();
                document.getElementById('score-val').textContent = state.score;
                continue;
            }

            if (it.y > H + 40) {
                state.items.splice(i, 1);
                if (!it.isJunk) {
                    state.lives--;
                    state.combo = 0;
                    state.flash = 1;
                    state.shake = 14;
                    showEncouragement(false);
                    AudioEngine.playHurt();
                    updateHearts();
                    if (state.lives <= 0) endGame();
                }
            }
        }

        // particles — draw special shapes
        for (let i = state.particles.length - 1; i >= 0; i--) {
            const p = state.particles[i];
            p.vy += 400 * dt;
            p.x += p.vx * dt; p.y += p.vy * dt;
            p.life -= dt * 1.8;
            if (p.life <= 0) state.particles.splice(i, 1);
        }
        // floaters
        for (let i = state.floaters.length - 1; i >= 0; i--) {
            const f = state.floaters[i];
            f.y -= 44 * dt; f.life -= dt * 1.0;
            if (f.life <= 0) state.floaters.splice(i, 1);
        }

        if (state.shake > 0) state.shake = Math.max(0, state.shake - dt * 40);
        if (state.flash > 0) state.flash = Math.max(0, state.flash - dt * 2.2);
    }

    // ---------- Draw ----------
    function drawBasket() {
        const b = state.basket;
        const squash = b.squash;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.scale(1 + squash * 0.12, 1 - squash * 0.16);
        ctx.rotate(b.tilt || 0);

        const w = b.w, h = b.h;
        // Grounding depth shadow beneath basket on garden path
        ctx.beginPath();
        ctx.ellipse(0, h * 0.48, w * 0.58, 14, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(25, 20, 10, 0.35)';
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(0, h * 0.48, w * 0.38, 7, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(12, 8, 4, 0.25)';
        ctx.fill();

        if (SPRITES.basket) {
            // Realistic woven wicker basket
            const drawSize = w * 1.34;
            ctx.shadowColor = 'rgba(0,0,0,0.18)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetY = 4;
            ctx.drawImage(SPRITES.basket, -drawSize / 2, -drawSize * 0.62, drawSize, drawSize);
        } else {
            // Procedural woven basket fallback
            const grad = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
            grad.addColorStop(0, '#D79B62');
            grad.addColorStop(1, '#7C5335');
            ctx.beginPath();
            ctx.moveTo(-w * 0.42, -h * 0.25);
            ctx.lineTo(w * 0.42, -h * 0.25);
            ctx.lineTo(w * 0.34, h * 0.42);
            ctx.lineTo(-w * 0.34, h * 0.42);
            ctx.closePath();
            ctx.fillStyle = grad;
            ctx.fill();

            // Weave lines
            ctx.strokeStyle = 'rgba(90,55,25,0.35)';
            ctx.lineWidth = 2;
            for (let i = 1; i < 4; i++) {
                const t = i / 4;
                ctx.beginPath();
                ctx.moveTo(-w * 0.42 + t * (w * 0.84 - (w * 0.42 - w * 0.34) * t), -h * 0.25 + t * (h * 0.67));
                ctx.lineTo(-w * 0.34 + t * (w * 0.68 - (w * 0.34 - w * 0.34) * t), h * 0.42 * t * 0 + -h * 0.25 + t * (h * 0.67));
                ctx.stroke();
            }
            for (let j = 1; j < 3; j++) {
                const yy = -h * 0.25 + j * (h * 0.67 / 3);
                const wx = 0.42 - (0.42 - 0.34) * (j / 3);
                ctx.beginPath();
                ctx.moveTo(-w * wx, yy);
                ctx.lineTo(w * wx, yy);
                ctx.stroke();
            }
            ctx.beginPath();
            ctx.ellipse(0, -h * 0.25, w * 0.44, 12, 0, 0, Math.PI * 2);
            const rimGrad = ctx.createLinearGradient(0, -h * 0.25 - 12, 0, -h * 0.25 + 12);
            rimGrad.addColorStop(0, '#E8B583');
            rimGrad.addColorStop(1, '#B67B4A');
            ctx.fillStyle = rimGrad;
            ctx.fill();
            ctx.strokeStyle = 'rgba(90,55,25,0.4)';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        ctx.restore();
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        ctx.save();
        if (state.shake > 0) {
            ctx.translate((Math.random() - 0.5) * state.shake, (Math.random() - 0.5) * state.shake);
        }

        // Drifting orchard blossom petals & leaves
        drawPetals(ctx);

        // Falling food items
        state.items.forEach(it => {
            // Soft contact shadow on ground path
            const groundY = Math.min(H - 30, it.y + it.size * 0.9);
            ctx.beginPath();
            ctx.ellipse(it.x, groundY, it.size * 0.36, it.size * 0.1, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(40,30,15,' + Math.max(0, 0.16 - (groundY - it.y) / 900) + ')';
            ctx.fill();

            ctx.save();
            ctx.translate(it.x, it.y);
            ctx.rotate(it.rot);
            ctx.shadowColor = 'rgba(0,0,0,0.22)';
            ctx.shadowBlur = 10; ctx.shadowOffsetY = 5;

            const sprite = it.def.key && SPRITES[it.def.key];
            if (sprite) {
                const s = it.size;
                ctx.drawImage(sprite, -s, -s, s * 2, s * 2);
            } else {
                it.def.draw(ctx, it.size);
            }
            ctx.restore();
        });

        drawBasket();

        // particles (with shape variants)
        state.particles.forEach(p => {
            ctx.globalAlpha = Math.max(0, p.life);
            ctx.fillStyle = p.color;
            ctx.save();
            ctx.translate(p.x, p.y);
            if (p.shape === 'star') {
                ctx.beginPath();
                for (let j = 0; j < 5; j++) {
                    const a = (j / 5) * Math.PI * 2 - Math.PI / 2;
                    const a2 = a + Math.PI / 5;
                    j === 0 ? ctx.moveTo(Math.cos(a) * p.size, Math.sin(a) * p.size)
                             : ctx.lineTo(Math.cos(a) * p.size, Math.sin(a) * p.size);
                    ctx.lineTo(Math.cos(a2) * p.size * 0.45, Math.sin(a2) * p.size * 0.45);
                }
                ctx.closePath(); ctx.fill();
            } else if (p.shape === 'heart') {
                const s = p.size * 0.7;
                ctx.beginPath();
                ctx.moveTo(0, s * 0.4);
                ctx.bezierCurveTo(s, -s * 0.4, s * 1.5, s * 0.8, 0, s * 1.6);
                ctx.bezierCurveTo(-s * 1.5, s * 0.8, -s, -s * 0.4, 0, s * 0.4);
                ctx.fill();
            } else if (p.shape === 'leaf') {
                ctx.beginPath();
                ctx.moveTo(0, -p.size); ctx.quadraticCurveTo(p.size * 0.7, 0, 0, p.size);
                ctx.quadraticCurveTo(-p.size * 0.7, 0, 0, -p.size);
                ctx.fill();
            } else {
                ctx.beginPath(); ctx.arc(0, 0, p.size, 0, Math.PI * 2); ctx.fill();
            }
            ctx.restore();
        });
        ctx.globalAlpha = 1;

        // floaters
        state.floaters.forEach(f => {
            ctx.globalAlpha = Math.max(0, f.life);
            const sz = f.text.length > 6 ? 16 : 22;
            ctx.font = '700 ' + sz + 'px Baloo 2, sans-serif';
            ctx.fillStyle = f.color;
            ctx.textAlign = 'center';
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 4;
            ctx.fillText(f.text, f.x, f.y);
            ctx.shadowBlur = 0;
        });
        ctx.globalAlpha = 1;

        ctx.restore();

        // flash overlay for lost life
        if (state.flash > 0) {
            ctx.fillStyle = 'rgba(255,60,60,' + (state.flash * 0.28) + ')';
            ctx.fillRect(0, 0, W, H);
        }
    }

    // ---------- Game flow ----------
    function runCountdown(cb) {
        const numEl = document.getElementById('countdown-num');
        const steps = ['3', '2', '1', 'GO! 🍎'];
        let i = 0;
        function step() {
            if (!numEl) { cb(); return; }
            numEl.textContent = steps[i];
            numEl.classList.remove('pop');
            void numEl.offsetWidth;
            numEl.classList.add('pop');
            i++;
            if (i < steps.length) setTimeout(step, 900);
            else setTimeout(cb, 900);
        }
        step();
    }

    function startGame() {
        resetGame();
        hideOverlay('start-screen');
        hideOverlay('gameover-overlay');
        state.paused = false;
        runCountdown(() => {
            state.running = true;
            setPauseIcon();
        });
    }
    function endGame() {
        state.running = false;
        // Clean up any active challenge toast
        const ct = document.getElementById('challenge-toast');
        if (ct) ct.remove();
        AudioEngine.playGameOver();
        // Slow-mo: fade items out
        state.items.forEach(it => { it.vy *= 0.1; });
        setTimeout(() => {
            state.items = [];
            document.getElementById('final-score').textContent = state.score;
            document.getElementById('stat-combo').textContent = 'x' + Math.max(1, state.comboBest);
            const statHealthy = document.getElementById('stat-healthy');
            if (statHealthy) statHealthy.textContent = state.healthyCaught;

            const isNewRecord = state.score > highScore && state.score > 0;
            if (isNewRecord) {
                highScore = state.score;
                localStorage.setItem('fb_highscore', highScore);
                document.getElementById('new-record-badge').classList.remove('hide');
                AudioEngine.playComboFanfare();
            } else {
                document.getElementById('new-record-badge').classList.add('hide');
            }
            document.getElementById('stat-best').textContent = highScore;
            if (bestValEl) bestValEl.textContent = highScore;

            // Pick an encouraging game-over message
            const msgs = ['Great effort! 💪', 'Well played! 🌟', 'Keep it healthy! 🥗', 'You rock! 🎉', 'Amazing run! 🏃'];
            const h2 = document.querySelector('#gameover-overlay h2');
            if (h2) h2.textContent = msgs[Math.floor(Math.random() * msgs.length)];

            showOverlay('gameover-overlay');
        }, 600);
    }
    function togglePause() {
        if (!state.running) return;
        state.paused = !state.paused;
        if (state.paused) showOverlay('pause-overlay'); else hideOverlay('pause-overlay');
        setPauseIcon();
    }
    function setPauseIcon() {
        document.getElementById('pause-btn').textContent = state.paused ? '▶' : '⏸';
    }

    function showOverlay(id) { document.getElementById(id).classList.add('show'); }
    function hideOverlay(id) { document.getElementById(id).classList.remove('show'); }

    // ---------- Buttons ----------
    const soundBtn = document.getElementById('sound-btn');
    function updateSoundBtn() {
        if (soundBtn) soundBtn.textContent = AudioEngine.muted ? '🔇' : '🔊';
    }
    if (soundBtn) {
        soundBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            AudioEngine.init();
            AudioEngine.muted = !AudioEngine.muted;
            localStorage.setItem('fb_muted', AudioEngine.muted);
            updateSoundBtn();
        });
        updateSoundBtn();
    }

    document.getElementById('play-btn').addEventListener('click', () => {
        AudioEngine.init();
        startGame();
    });
    document.getElementById('rules-from-start').addEventListener('click', (e) => {
        e.stopPropagation();
        showOverlay('help-overlay');
    });

    // Tap/click anywhere on the start or game-over overlay (outside the card's
    // buttons) also starts a new game — handy for kids on mobile.
    function bindTapToStart(overlayId) {
        const overlay = document.getElementById(overlayId);
        overlay.addEventListener('click', (e) => {
            // ignore clicks that originated on a button inside the card
            if (e.target.closest('button')) return;
            AudioEngine.init();
            startGame();
        });
    }
    bindTapToStart('start-screen');
    bindTapToStart('gameover-overlay');
    document.getElementById('help-btn').addEventListener('click', () => {
        if (state.running && !state.paused) togglePause();
        showOverlay('help-overlay');
    });
    document.getElementById('close-help').addEventListener('click', () => hideOverlay('help-overlay'));
    document.getElementById('pause-btn').addEventListener('click', togglePause);
    document.getElementById('resume-btn').addEventListener('click', togglePause);
    document.getElementById('restart-from-pause').addEventListener('click', () => {
        hideOverlay('pause-overlay');
        startGame();
    });
    document.getElementById('restart-from-over').addEventListener('click', startGame);

    // ---------- Preload & Start ----------
    const loaderBar = document.getElementById('loader-bar');
    const loaderPct = document.getElementById('loader-pct');
    const loaderStatus = document.getElementById('loader-status');
    const loaderScreen = document.getElementById('loader-screen');

    preloadGameAssets(
        (loaded, total, key) => {
            const pct = Math.round((loaded / total) * 100);
            if (loaderBar) loaderBar.style.width = pct + '%';
            if (loaderPct) loaderPct.textContent = pct + '%';
            if (loaderStatus) loaderStatus.textContent = 'Unpacking fresh ' + key + '...';
        },
        () => {
            if (loaderBar) loaderBar.style.width = '100%';
            if (loaderPct) loaderPct.textContent = '100%';
            if (loaderStatus) loaderStatus.textContent = 'Harvest ready!';
            setTimeout(() => {
                if (loaderScreen) {
                    loaderScreen.classList.remove('show');
                    setTimeout(() => { loaderScreen.style.display = 'none'; }, 500);
                }
                showOverlay('start-screen');
            }, 300);
        }
    );

    resetGame();
    requestAnimationFrame(loop);
})();
