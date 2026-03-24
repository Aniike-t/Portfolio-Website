import React, { useEffect, useRef, useState } from 'react';

// ══════════════════════════════════════════════════════
// CONSTANTS & CATALOGS
// ══════════════════════════════════════════════════════
const CW = 274, CH = 224, TS = 20;
const VTX = Math.ceil(CW / TS) + 2, VTY = Math.ceil(CH / TS) + 2;

const COL = {
    black: '#050510', dkGreen: '#1e5414', midGreen: '#2d7a1e', ltGreen: '#50a830',
    paleGrn: '#78c040', sand: '#d4b870', dkSand: '#a08030', water: '#1848b0',
    ltWater: '#3070d8', stone: '#686878', dkStone: '#404050',
    hero: '#e8c848', heroBody: '#1838b8', heroHead: '#f0d898',
    red: '#e02828', dkRed: '#901010', orange: '#e06018', purple: '#8020b0',
    white: '#f8f8f8', cream: '#f0e0b0', ui: '#0e0820', uiBdr: '#4838a0',
    htFull: '#e03040', htEmpty: '#502838', sword: '#ffe860',
    coin: '#ffd700', coinDk: '#c09010',
    en1: '#18b030', en1dk: '#0a6018', en2: '#7878a0', en2dk: '#404060',
    boss: '#c01018', bossDk: '#600010', boss2: '#a008c0', boss2dk: '#500060',
};

const T = { GRASS: 0, WALL: 1, WATER: 2, SAND: 3, STONE: 4, TREE: 5, PATH: 6, FLOWER: 8 };

const WEAPONS = {
    sword: { name: '⚔ SWORD', cost: 0, dmg: 3, range: 18, cooldown: 18, spread: 0, count: 1, speed: 0, type: 'melee', color: '#ffe860', desc: 'Classic blade. Fast.' },
    dagger: { name: '🗡 DAGGER', cost: 80, dmg: 2, range: 14, cooldown: 8, spread: 0, count: 1, speed: 0, type: 'melee', color: '#c0c0e0', desc: 'Lightning fast.' },
    pistol: { name: '🔫 PISTOL', cost: 120, dmg: 4, range: 999, cooldown: 20, spread: 0, count: 1, speed: 5, type: 'bullet', color: '#e0e0e0', desc: 'Reliable sidearm.' },
    shotgun: { name: '💥 SHOTGUN', cost: 200, dmg: 5, range: 999, cooldown: 35, spread: 0.4, count: 5, speed: 5.5, type: 'bullet', color: '#ff8000', desc: '5-pellet spread.' },
    smg: { name: '⚡ SMG', cost: 300, dmg: 3, range: 999, cooldown: 7, spread: 0.12, count: 1, speed: 6, type: 'bullet', color: '#00dfff', desc: 'Rapid fire.' },
    bazooka: { name: '🚀 BAZOOKA', cost: 450, dmg: 18, range: 999, cooldown: 60, spread: 0, count: 1, speed: 4, type: 'rocket', color: '#ff4000', desc: 'Massive AoE!' },
    laser: { name: '🔆 LASER', cost: 380, dmg: 6, range: 999, cooldown: 5, spread: 0, count: 1, speed: 9, type: 'laser', color: '#00ff80', desc: 'Rapid-fire beam.' },
    railgun: { name: '🔩 RAILGUN', cost: 600, dmg: 30, range: 999, cooldown: 90, spread: 0, count: 1, speed: 12, type: 'rail', color: '#a0f0ff', desc: 'Instant kill pierce.' },
};

const ABILITIES = {
    dash: { name: '💨 DASH', cost: 150, cooldown: 120, desc: 'Teleport forward.', passive: false },
    shield: { name: '🛡 SHIELD', cost: 200, cooldown: 300, desc: '3-sec invincibility.', passive: false },
    aura: { name: '🌀 AURA', cost: 180, cooldown: 0, desc: 'Passive damage aura.', passive: true },
    regen: { name: '💚 REGEN', cost: 220, cooldown: 0, desc: 'Slowly regenerate HP.', passive: true },
    magnet: { name: '🧲 MAGNET', cost: 160, cooldown: 0, desc: 'Auto-collect coins.', passive: true },
    multishot: { name: '🎯 M-SHOT', cost: 280, cooldown: 200, desc: 'Fire all directions.', passive: false },
};

export default function QuestBlade() {
    const canvasRef = useRef(null);

    // React State for UI Overlays
    const [uiState, setUiState] = useState('start'); // start, playing, dead, shop
    const [stats, setStats] = useState({ score: 0, coins: 0 });
    const [shopFlag, setShopFlag] = useState(0); // For forcing re-render of shop contents
    const [dialogMsg, setDialogMsg] = useState('');

    // Mutable Game Engine State
    const keysRef = useRef({});
    const audioRef = useRef(null);
    const G = useRef(null);
    const animId = useRef(null);
    const dialogTimer = useRef(null);

    // ══════════════════════════════════════════════════════
    // AUDIO ENGINE
    // ══════════════════════════════════════════════════════
    const getAudio = () => {
        if (!audioRef.current) audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
        if (audioRef.current.state === 'suspended') audioRef.current.resume();
        return audioRef.current;
    };

    const beep = (freq, dur, type = 'square', vol = 0.18, delay = 0) => {
        try {
            const a = getAudio(); const o = a.createOscillator(); const g = a.createGain();
            o.connect(g); g.connect(a.destination);
            o.type = type; o.frequency.setValueAtTime(freq, a.currentTime + delay);
            g.gain.setValueAtTime(0, a.currentTime + delay);
            g.gain.linearRampToValueAtTime(vol, a.currentTime + delay + 0.01);
            g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + delay + dur);
            o.start(a.currentTime + delay); o.stop(a.currentTime + delay + dur + 0.05);
        } catch (e) { }
    };

    const noiseSfx = (dur, vol = 0.12) => {
        try {
            const a = getAudio(); const buf = a.createBuffer(1, a.sampleRate * dur, a.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1);
            const src = a.createBufferSource(); src.buffer = buf;
            const g = a.createGain(); g.gain.setValueAtTime(vol, a.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + dur);
            src.connect(g); g.connect(a.destination); src.start();
        } catch (e) { }
    };

    const SFX = {
        sword: () => { beep(320, .08, 'sawtooth', .2); beep(200, .12, 'sawtooth', .15, .06); },
        pistol: () => { noiseSfx(.05, .25); beep(180, .04, 'sawtooth', .1); },
        shotgun: () => { noiseSfx(.08, .4); beep(120, .07, 'sawtooth', .15); },
        bazooka: () => { noiseSfx(.18, .5); beep(80, .2, 'sawtooth', .2); beep(60, .25, 'sine', .15, .1); },
        laser: () => { beep(800, .03, 'square', .1); beep(400, .08, 'square', .12, .02); },
        hit: () => { beep(150, .07, 'square', .15); noiseSfx(.04, .1); },
        die: () => { [400, 300, 200, 120].forEach((f, i) => beep(f, .12, 'square', .2, i * .08)); },
        coin: () => { beep(880, .06, 'square', .12); beep(1100, .08, 'square', .12, .07); },
        buy: () => { [523, 659, 784, 1047].forEach((f, i) => beep(f, .1, 'square', .15, i * .07)); },
        ability: () => { beep(600, .06, 'square', .2); beep(900, .1, 'square', .2, .06); },
        dash: () => { beep(300, .04, 'sawtooth', .2); beep(700, .04, 'sawtooth', .1, .08); },
        bossHit: () => { beep(100, .15, 'sawtooth', .3); noiseSfx(.08, .2); }
    };

    // ══════════════════════════════════════════════════════
    // INFINITE MAP GENERATOR
    // ══════════════════════════════════════════════════════
    const pseudoRandom = (x, y) => {
        let n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
        return n - Math.floor(n);
    };

    const smoothNoise = (x, y) => {
        return (
            pseudoRandom(x, y) * 0.5 +
            pseudoRandom(x - 1, y) * 0.125 + pseudoRandom(x + 1, y) * 0.125 +
            pseudoRandom(x, y - 1) * 0.125 + pseudoRandom(x, y + 1) * 0.125
        );
    };

    const getTile = (tx, ty) => {
        // Guaranteed safe zone at origin
        if (tx >= -3 && tx <= 3 && ty >= -3 && ty <= 3) return T.GRASS;

        const val = smoothNoise(tx, ty);
        if (val < 0.18) return T.WATER;
        if (val < 0.28) return T.SAND;
        if (val < 0.40) return T.TREE;
        if (val > 0.92) return T.STONE;
        if (val > 0.85) return T.FLOWER;
        return T.GRASS;
    };

    const isSolid = (px, py) => {
        const pts = [{ x: px + 4, y: py + 11 }, { x: px + 12, y: py + 11 }, { x: px + 4, y: py + 18 }, { x: px + 12, y: py + 18 }];
        return pts.some(p => {
            const tx = Math.floor(p.x / TS), ty = Math.floor(p.y / TS);
            const t = getTile(tx, ty);
            return t === T.WATER || t === T.STONE || t === T.TREE;
        });
    };

    // ══════════════════════════════════════════════════════
    // RENDER HELPERS
    // ══════════════════════════════════════════════════════
    const px = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), w, h); };

    const drawTile = (ctx, tile, sx, sy) => {
        switch (tile) {
            case T.GRASS: px(ctx, sx, sy, TS, TS, COL.midGreen); break;
            case T.FLOWER: px(ctx, sx, sy, TS, TS, COL.midGreen); px(ctx, sx + 8, sy + 7, 2, 2, '#fff'); px(ctx, sx + 7, sy + 8, 4, 1, '#fff'); px(ctx, sx + 9, sy + 8, 1, 1, COL.coin); break;
            case T.WATER: px(ctx, sx, sy, TS, TS, COL.water); px(ctx, sx + 2, sy + 6, 8, 2, COL.ltWater); px(ctx, sx + 12, sy + 13, 6, 2, COL.ltWater); break;
            case T.SAND: px(ctx, sx, sy, TS, TS, COL.sand); px(ctx, sx + 3, sy + 3, 2, 1, COL.dkSand); px(ctx, sx + 13, sy + 14, 2, 1, COL.dkSand); break;
            case T.STONE: px(ctx, sx, sy, TS, TS, COL.midGreen); px(ctx, sx + 2, sy + 3, TS - 4, TS - 5, COL.stone); px(ctx, sx + 4, sy + 5, TS - 8, TS - 9, COL.dkStone); break;
            case T.TREE: px(ctx, sx, sy, TS, TS, COL.midGreen); px(ctx, sx + 2, sy + 2, TS - 4, TS - 4, COL.dkGreen); px(ctx, sx + 5, sy + 1, TS - 10, TS - 8, COL.ltGreen); break;
            default: px(ctx, sx, sy, TS, TS, COL.midGreen);
        }
    };

    const drawHero = (ctx, hx, hy, dir, wAtk, wTimer, frame, invTimer, curWeapon) => {
        const x = Math.round(hx), y = Math.round(hy);
        ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.beginPath(); ctx.ellipse(x + 8, y + 18, 7, 3, 0, 0, Math.PI * 2); ctx.fill();
        const lg = Math.floor(frame / 6) % 2;
        px(ctx, x + 3, y + 13, 4, 5, COL.heroBody); px(ctx, x + 9, y + 13 + (lg ? 1 : 0), 4, 5, COL.heroBody);
        px(ctx, x + 2, y + 6, 12, 9, COL.heroBody);
        const shc = '#c03030';
        if (dir === 3) px(ctx, x - 2, y + 7, 4, 8, shc);
        else if (dir === 1) px(ctx, x + 14, y + 7, 4, 8, shc);
        else px(ctx, x - 2, y + 8, 4, 6, shc);
        px(ctx, x + 3, y + 1, 10, 7, COL.heroHead);
        px(ctx, x + 2, y, 12, 4, COL.heroBody); px(ctx, x + 12, y, 4, 6, COL.heroBody);
        px(ctx, x + 5, y + 3, 2, 2, COL.black); px(ctx, x + 9, y + 3, 2, 2, COL.black);

        if (wAtk) {
            ctx.shadowBlur = 8; ctx.shadowColor = curWeapon.color;
            if (curWeapon.type === 'melee') {
                const c = curWeapon.name.includes('DAGGER') ? COL.stone : COL.sword;
                const sw = dir === 0 || dir === 2 ? 3 : 16, sh = dir === 0 || dir === 2 ? 16 : 3;
                const ox = dir === 1 ? 14 : dir === 3 ? -16 : 4, oy = dir === 2 ? 14 : dir === 0 ? -16 : 4;
                px(ctx, x + ox, y + oy, sw, sh, c);
            }
            ctx.shadowBlur = 0;
        }
    };

    const drawEnemy = (ctx, ex, ey, type, hp, maxHp, frame, flash) => {
        const x = Math.round(ex), y = Math.round(ey);
        ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(x + 8, y + 18, 7, 3, 0, 0, Math.PI * 2); ctx.fill();
        const b = Math.sin(frame * .12) * 2;
        const fc = flash > 0 ? '#ffffff' : null;
        if (type === 'slime') {
            const c = fc || COL.en1, d = fc ? '#aaa' : COL.en1dk;
            ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(x + 8, y + 11 + b, 9, 9, 0, 0, Math.PI * 2); ctx.fill();
            px(ctx, x + 3, y + 8 + b, 4, 2, d); px(ctx, x + 10, y + 8 + b, 4, 2, d);
        } else if (type === 'orc') {
            const c = fc || '#50a830', d = fc ? '#aaa' : '#207010';
            px(ctx, x + 2, y + 6 + b, 12, 10, c); px(ctx, x + 3, y + 14 + b, 10, 6, d);
            px(ctx, x + 5, y + 4 + b, 2, 2, '#222'); px(ctx, x + 9, y + 4 + b, 2, 2, '#222');
        } else if (type === 'knight' || type === 'wizard') {
            const c = fc || (type === 'wizard' ? '#9030d0' : COL.en2);
            px(ctx, x + 3, y + 3 + b, 10, 8, c);
            px(ctx, x + 5, y + 5 + b, 2, 2, '#fff'); px(ctx, x + 9, y + 5 + b, 2, 2, '#fff');
        } else if (type.includes('boss')) {
            const c = fc || (type === 'boss2' ? COL.boss2 : COL.boss);
            px(ctx, x - 1, y + 3 + b, 18, 14, c);
            px(ctx, x + 3, y + 4 + b, 2, 2, '#000'); px(ctx, x + 11, y + 4 + b, 2, 2, '#000');
        }
        px(ctx, x, y - 7, 16, 3, '#400010');
        px(ctx, x, y - 7, Math.max(0, Math.round(16 * (hp / maxHp))), 3, hp / maxHp > .5 ? COL.htFull : '#ff8000');
    };

    // ══════════════════════════════════════════════════════
    // GAME ENGINE
    // ══════════════════════════════════════════════════════
    const triggerDialog = (txt) => {
        setDialogMsg(txt);
        clearTimeout(dialogTimer.current);
        dialogTimer.current = setTimeout(() => setDialogMsg(''), 3000);
    };

    const spawnEnemy = () => {
        if (!G.current || G.current.enemies.length >= 25) return;

        const { hero, frame } = G.current;
        const minsAlive = frame / 3600; // 60 fps

        // Spawn in a circle outside the screen view
        const angle = Math.random() * Math.PI * 2;
        const dist = CW + Math.random() * 50;
        const ex = hero.x + Math.cos(angle) * dist;
        const ey = hero.y + Math.sin(angle) * dist;

        // Progression Logic
        let type = 'slime';
        const roll = Math.random();

        if (minsAlive > 0.5 && roll < 0.4) type = 'orc';
        if (minsAlive > 1.0 && roll < 0.6) type = roll < 0.3 ? 'knight' : 'wizard';
        if (minsAlive > 2.0 && roll < 0.1 && !G.current.enemies.some(e => e.isBoss)) {
            type = Math.random() > 0.5 ? 'boss1' : 'boss2';
        }

        const tData = {
            slime: { hp: 8, spd: 0.8, score: 40, coins: [1, 3], ai: 'wander', aggro: 150 },
            orc: { hp: 16, spd: 1.0, score: 80, coins: [2, 5], ai: 'chase', aggro: 200 },
            knight: { hp: 25, spd: 1.2, score: 120, coins: [3, 7], ai: 'chase', aggro: 250 },
            wizard: { hp: 20, spd: 0.9, score: 150, coins: [4, 8], ai: 'range', aggro: 250 },
            boss1: { hp: 150, spd: 1.3, score: 500, coins: [15, 25], ai: 'boss', aggro: 500, isBoss: true },
            boss2: { hp: 200, spd: 1.4, score: 800, coins: [25, 40], ai: 'boss2', aggro: 500, isBoss: true }
        };

        G.current.enemies.push({
            id: Math.random(), type, x: ex, y: ey, vx: 0, vy: 0,
            hp: tData[type].hp, maxHp: tData[type].hp, spd: tData[type].spd,
            score: tData[type].score, coins: tData[type].coins, ai: tData[type].ai, aggroR: tData[type].aggro,
            isBoss: tData[type].isBoss,
            dir: 2, aiTimer: 0, flashTimer: 0, shootTimer: 0, _patrolAngle: angle
        });
    };

    const update = () => {
        if (!G.current || G.current.shopOpen) return;
        const { hero, enemies, projectiles, explosions, particles, coins } = G.current;
        const wp = WEAPONS[G.current.equippedWeapon];
        G.current.frame++;

        // Spawning Logic (faster over time)
        const spawnRate = Math.max(40, 150 - G.current.frame / 60);
        G.current.spawnTimer++;
        if (G.current.spawnTimer >= spawnRate) {
            G.current.spawnTimer = 0;
            spawnEnemy();
        }

        // Input -> Movement
        let moved = false; let nx = hero.x, ny = hero.y;
        if (keysRef.current['ArrowUp'] || keysRef.current['KeyW']) { ny -= hero.speed; hero.dir = 0; moved = true; }
        if (keysRef.current['ArrowDown'] || keysRef.current['KeyS']) { ny += hero.speed; hero.dir = 2; moved = true; }
        if (keysRef.current['ArrowLeft'] || keysRef.current['KeyA']) { nx -= hero.speed; hero.dir = 3; moved = true; }
        if (keysRef.current['ArrowRight'] || keysRef.current['KeyD']) { nx += hero.speed; hero.dir = 1; moved = true; }

        if (!isSolid(nx, hero.y)) hero.x = nx;
        if (!isSolid(hero.x, ny)) hero.y = ny;
        if (moved) hero.moveFrame++;

        // Shop Key
        if (keysRef.current['KeyE'] && !keysRef.current['_ePrev']) handleOpenShop();
        keysRef.current['_ePrev'] = keysRef.current['KeyE'];

        // Attacking
        if (hero.wCooldown > 0) hero.wCooldown--;
        if ((keysRef.current['Space'] || keysRef.current['KeyX'] || keysRef.current['KeyZ']) && hero.wCooldown === 0) {
            hero.wCooldown = wp.cooldown; hero.wAtk = true; hero.wTimer = wp.cooldown;
            hero._swingId = (hero._swingId || 0) + 1;

            if (wp.type === 'melee') SFX.sword();
            else {
                if (wp.name.includes('LASER')) SFX.laser(); else SFX.pistol();
                const baseA = Math.atan2([0, 1, 0, -1][hero.dir], [-1, 0, 1, 0][(hero.dir + 3) % 4] * -1);
                // directional calc fix
                const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
                const [dx, dy] = dirs[hero.dir];
                const ang = Math.atan2(dy, dx);

                for (let i = 0; i < wp.count; i++) {
                    projectiles.push({
                        x: hero.x + 8, y: hero.y + 8,
                        vx: Math.cos(ang + (Math.random() - .5) * wp.spread) * wp.speed,
                        vy: Math.sin(ang + (Math.random() - .5) * wp.spread) * wp.speed,
                        dmg: wp.dmg, type: wp.type, color: wp.color, life: 100, owner: 'hero'
                    });
                }
            }
        }
        if (hero.wAtk && --hero.wTimer <= 0) hero.wAtk = false;

        // Abilities (Q)
        if (keysRef.current['KeyQ'] && !keysRef.current['_qPrev']) {
            const actAb = G.current.ownedAbilities.find(k => !ABILITIES[k].passive);
            if (actAb && hero.abCooldowns[actAb] <= 0) {
                hero.abCooldowns[actAb] = ABILITIES[actAb].cooldown;
                SFX.ability();
                if (actAb === 'dash') {
                    const [dx, dy] = [[0, -1], [1, 0], [0, 1], [-1, 0]][hero.dir];
                    hero.x += dx * 60; hero.y += dy * 60; SFX.dash();
                } else if (actAb === 'shield') {
                    hero.invTimer = 180;
                } else if (actAb === 'multishot') {
                    for (let i = 0; i < 8; i++) projectiles.push({
                        x: hero.x + 8, y: hero.y + 8, vx: Math.cos(Math.PI / 4 * i) * 5, vy: Math.sin(Math.PI / 4 * i) * 5,
                        dmg: wp.dmg * 1.5, type: 'laser', color: wp.color, life: 100, owner: 'hero'
                    });
                }
            }
        }
        keysRef.current['_qPrev'] = keysRef.current['KeyQ'];

        // Cooldowns & Passives
        Object.keys(hero.abCooldowns).forEach(k => { if (hero.abCooldowns[k] > 0) hero.abCooldowns[k]--; });
        if (hero.invTimer > 0) hero.invTimer--;

        if (G.current.ownedAbilities.includes('regen') && G.current.frame % 300 === 0 && hero.hp < hero.maxHp) hero.hp++;
        if (G.current.ownedAbilities.includes('aura') && G.current.frame % 60 === 0) {
            enemies.forEach(e => { if (Math.hypot(e.x - hero.x, e.y - hero.y) < 45) { e.hp--; e.flashTimer = 6; } });
        }

        // Melee Hits
        if (hero.wAtk && wp.type === 'melee') {
            const [ddx, ddy] = [[0, -1], [1, 0], [0, 1], [-1, 0]][hero.dir];
            const hbx = hero.x + 8 + ddx * wp.range - 8, hby = hero.y + 8 + ddy * wp.range - 8;
            enemies.forEach(e => {
                if (e.hitThisSwing !== hero._swingId && hbx < e.x + 16 && hbx + 16 > e.x && hby < e.y + 20 && hby + 16 > e.y) {
                    e.hitThisSwing = hero._swingId; e.hp -= wp.dmg; e.flashTimer = 8; SFX.hit();
                }
            });
        }

        // Update Enemies
        for (let i = enemies.length - 1; i >= 0; i--) {
            const e = enemies[i];
            if (e.hp <= 0) {
                // Die
                G.current.hero.score += e.score;
                const drops = e.coins[0] + Math.floor(Math.random() * (e.coins[1] - e.coins[0]));
                for (let c = 0; c < drops; c++) coins.push({ x: e.x + 8 + (Math.random() - 0.5) * 20, y: e.y + 8 + (Math.random() - 0.5) * 20, value: 1 });
                if (e.isBoss) {
                    triggerDialog(`💀 BOSS SLAIN! Scavenged +30 Coins & +3 HP!`);
                    G.current.hero.coins += 30;
                    G.current.hero.hp = Math.min(G.current.hero.maxHp, G.current.hero.hp + 3);
                    SFX.coin();
                } else {
                    SFX.die();
                }
                enemies.splice(i, 1);
                continue;
            }

            if (e.flashTimer > 0) e.flashTimer--;
            const dx = hero.x - e.x, dy = hero.y - e.y;
            const dist = Math.hypot(dx, dy);
            const len = Math.max(1, dist);

            if (e.ai === 'wander') {
                if (dist < e.aggroR) e.ai = 'chase';
                if (--e.aiTimer <= 0) { e._patrolAngle += (Math.random() - .5); e.vx = Math.cos(e._patrolAngle) * e.spd; e.vy = Math.sin(e._patrolAngle) * e.spd; e.aiTimer = 60; }
            } else if (e.ai === 'chase' || e.ai === 'boss') {
                e.vx = (dx / len) * e.spd; e.vy = (dy / len) * e.spd;
            }

            const nx = e.x + e.vx, ny = e.y + e.vy;
            if (!isSolid(nx, e.y)) e.x = nx; else e._patrolAngle += Math.PI;
            if (!isSolid(e.x, ny)) e.y = ny; else e._patrolAngle += Math.PI;

            // Hurt Hero
            if (hero.invTimer === 0 && Math.hypot((hero.x + 8) - (e.x + 8), (hero.y + 8) - (e.y + 8)) < 14) {
                hero.hp -= 1; hero.invTimer = 60; SFX.hit();
                if (hero.hp <= 0) handleGameOver();
            }
        }

        // Update Projectiles
        for (let i = projectiles.length - 1; i >= 0; i--) {
            const p = projectiles[i];
            p.x += p.vx; p.y += p.vy; p.life--;

            let hit = false;
            if (isSolid(p.x, p.y)) hit = true;
            else if (p.owner === 'hero') {
                const tgt = enemies.find(e => Math.hypot((e.x + 8) - p.x, (e.y + 8) - p.y) < 14);
                if (tgt) { tgt.hp -= p.dmg; tgt.flashTimer = 8; hit = p.type !== 'rail'; if (tgt.isBoss) SFX.bossHit(); else SFX.hit(); }
            }

            if (hit || p.life <= 0) projectiles.splice(i, 1);
        }

        // Update Coins
        const mag = G.current.ownedAbilities.includes('magnet') ? 80 : 25;
        for (let i = coins.length - 1; i >= 0; i--) {
            const c = coins[i];
            const dist = Math.hypot((hero.x + 8) - c.x, (hero.y + 8) - c.y);
            if (dist < mag) {
                const spd = dist < 20 ? 8 : 3;
                c.x += ((hero.x + 8) - c.x) / Math.max(1, dist) * spd;
                c.y += ((hero.y + 8) - c.y) / Math.max(1, dist) * spd;
            }
            if (dist < 12) {
                hero.coins += c.value; SFX.coin(); coins.splice(i, 1);
            }
        }

        // Camera
        G.current.camX += (hero.x + 8 - CW / 2 - G.current.camX) * 0.15;
        G.current.camY += (hero.y + 8 - CH / 2 - G.current.camY) * 0.15;
    };

    const draw = () => {
        if (!canvasRef.current || !G.current) return;
        const ctx = canvasRef.current.getContext('2d');
        const { hero, enemies, coins, projectiles, camX, camY, frame } = G.current;
        const wp = WEAPONS[G.current.equippedWeapon];

        ctx.fillStyle = COL.black; ctx.fillRect(0, 0, CW, CH);

        const stX = Math.floor(camX / TS), stY = Math.floor(camY / TS);
        const offX = -(camX % TS), offY = -(camY % TS);

        // Tiles
        for (let ty = stY; ty < stY + VTY; ty++) {
            for (let tx = stX; tx < stX + VTX; tx++) {
                drawTile(ctx, getTile(tx, ty), (tx - stX) * TS + offX, (ty - stY) * TS + offY);
            }
        }

        // Coins & Entities
        coins.forEach(c => {
            const sx = c.x - camX, sy = c.y - camY, b = Math.sin(frame * .15 + c.x) * 2;
            ctx.fillStyle = COL.coin; ctx.fillRect(sx - 3, sy - 3 + b, 6, 6);
        });

        enemies.forEach(e => drawEnemy(ctx, e.x - camX, e.y - camY, e.type, e.hp, e.maxHp, frame, e.flashTimer));

        projectiles.forEach(p => {
            ctx.fillStyle = p.color; ctx.fillRect(p.x - camX - 2, p.y - camY - 2, 4, 4);
        });

        if (hero.invTimer === 0 || Math.floor(frame / 4) % 2 === 0) {
            drawHero(ctx, hero.x - camX, hero.y - camY, hero.dir, hero.wAtk, hero.wTimer, Math.floor(hero.moveFrame / 5), hero.invTimer, wp);
        }

        // HUD
        ctx.fillStyle = 'rgba(14,8,32,.9)'; ctx.fillRect(0, 0, CW, 17);
        for (let i = 0; i < hero.maxHp; i++) {
            ctx.fillStyle = i < hero.hp ? COL.htFull : COL.htEmpty;
            ctx.fillRect(2 + i * 10, 5, 8, 8);
        }
        ctx.fillStyle = wp.color; ctx.font = 'bold 6px monospace';
        ctx.fillText(wp.name.substring(0, 12), 2, CH - 4);
        ctx.fillStyle = COL.coin; ctx.fillText(`💰${hero.coins}`, 102, 11);
        ctx.fillStyle = '#ffe860'; ctx.fillText(`⭐${hero.score}`, 180, 11);

        // Cooldown bar
        const cdProg = 1 - hero.wCooldown / wp.cooldown;
        ctx.fillStyle = '#302050'; ctx.fillRect(0, CH - 3, CW, 3);
        ctx.fillStyle = cdProg >= 1 ? '#40ff80' : wp.color;
        ctx.fillRect(0, CH - 3, Math.round(CW * Math.min(1, cdProg)), 3);
    };

    const gameLoop = () => {
        if (G.current && !G.current.shopOpen) {
            update();
            draw();
        }
        animId.current = requestAnimationFrame(gameLoop);
    };

    // ══════════════════════════════════════════════════════
    // UI & STATE HANDLERS
    // ══════════════════════════════════════════════════════
    const startGame = () => {
        getAudio();
        G.current = {
            shopOpen: false, frame: 0, spawnTimer: 0,
            hero: { x: 0, y: 0, vx: 0, vy: 0, speed: 2.0, dir: 2, hp: 10, maxHp: 10, coins: 0, score: 0, wAtk: false, wTimer: 0, wCooldown: 0, invTimer: 0, moveFrame: 0, abCooldowns: {}, _swingId: 0 },
            enemies: [], projectiles: [], explosions: [], particles: [], coins: [],
            camX: -CW / 2, camY: -CH / 2,
            ownedWeapons: ['sword'], equippedWeapon: 'sword', ownedAbilities: []
        };
        Object.keys(ABILITIES).forEach(k => G.current.hero.abCooldowns[k] = 0);
        setUiState('playing');
        triggerDialog('Endless run started! Survive as long as you can.');
    };

    const handleGameOver = () => {
        setStats({ score: G.current.hero.score, coins: G.current.hero.coins });
        setUiState('dead');
        G.current = null;
    };

    const handleOpenShop = () => {
        if (uiState !== 'playing' || !G.current) return;
        G.current.shopOpen = true;
        setShopFlag(f => f + 1);
        setUiState('shop');
    };

    const handleCloseShop = () => {
        if (!G.current) return;
        G.current.shopOpen = false;
        setUiState('playing');
    };

    const handleBuyWp = (k) => {
        const wp = WEAPONS[k];
        if (G.current.hero.coins >= wp.cost && !G.current.ownedWeapons.includes(k)) {
            G.current.hero.coins -= wp.cost;
            G.current.ownedWeapons.push(k);
            G.current.equippedWeapon = k;
            SFX.buy();
            setShopFlag(f => f + 1);
        } else SFX.hit(); // error sound
    };

    const handleEquipWp = (k) => {
        G.current.equippedWeapon = k;
        SFX.coin();
        setShopFlag(f => f + 1);
    };

    const handleBuyAb = (k) => {
        const ab = ABILITIES[k];
        if (G.current.hero.coins >= ab.cost && !G.current.ownedAbilities.includes(k)) {
            G.current.hero.coins -= ab.cost;
            G.current.ownedAbilities.push(k);
            SFX.buy();
            setShopFlag(f => f + 1);
        } else SFX.hit();
    };

    const pk = (code) => { keysRef.current[code] = true; getAudio(); };
    const rk = (code) => { keysRef.current[code] = false; };

    // Mount/Unmount hooks
    useEffect(() => {
        const onKd = (e) => { keysRef.current[e.code] = true; getAudio(); };
        const onKu = (e) => { keysRef.current[e.code] = false; };
        window.addEventListener('keydown', onKd);
        window.addEventListener('keyup', onKu);

        animId.current = requestAnimationFrame(gameLoop);
        return () => {
            window.removeEventListener('keydown', onKd);
            window.removeEventListener('keyup', onKu);
            cancelAnimationFrame(animId.current);
            clearTimeout(dialogTimer.current);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={styles.container}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        .qb-overlay { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:10px; z-index:40; }
        .qb-btn { background:#ffe860; color:#0a0a18; border:none; padding:8px 16px; font-family:'Press Start 2P', monospace; font-size:8px; cursor:pointer; box-shadow:3px 3px 0 #b0a030; transition:.08s; }
        .qb-btn:active { transform:translate(2px,2px); box-shadow:1px 1px 0 #b0a030; }
        .qb-title { font-size:12px; color:#ffe860; text-align:center; text-shadow:0 0 14px #ffe860, 2px 2px 0 #8030c0; animation:qbGlow 1.5s ease-in-out infinite alternate; }
        @keyframes qbGlow { from { text-shadow:0 0 8px #ffe860, 2px 2px 0 #8030c0; } to { text-shadow:0 0 24px #ffe860, 0 0 35px #ffe860, 2px 2px 0 #8030c0; } }
        
        .qb-shop { background:rgba(8,8,24,.95); border:2px solid #ffe860; padding:8px; overflow-y:auto; justify-content:flex-start; gap:4px; }
        .qb-grid { display:grid; grid-template-columns:1fr 1fr; gap:5px; width:100%; margin-top:4px; }
        .qb-item { background:#181030; border:1px solid #4838a0; padding:5px 4px; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:3px; }
        .qb-item:hover { border-color:#ffe860; background:#201840; }
        .qb-item.owned { border-color:#20c040; opacity:.7; }
        .qb-item.active { border-color:#ff8000; box-shadow:0 0 8px #ff8000; }
        
        .qb-dpad { position:relative; width:90px; height:90px; }
        .qb-dp-btn { position:absolute; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#2a2040,#181028); color:#a090d0; font-size:9px; cursor:pointer; width:28px; height:28px; box-shadow:2px 2px 0 rgba(0,0,0,.5); user-select:none; }
        .qb-dp-btn:active { transform:scale(.9); box-shadow:none; }
        
        .qb-act { width:42px; height:42px; border-radius:50%; display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:8px; font-weight:900; cursor:pointer; box-shadow:3px 3px 0 rgba(0,0,0,.5); user-select:none; }
        .qb-act span { font-size:5px; opacity:.7; }
        .qb-act:active { transform:translate(2px,2px); box-shadow:1px 1px 0 rgba(0,0,0,.5); }
      `}</style>

            <div style={styles.case}>
                <div style={styles.brand}>◈ QUEST BLADE ENDLESS</div>

                <div style={styles.bezel}>
                    <div style={styles.screenWrapper}>

                        {/* START SCREEN */}
                        {uiState === 'start' && (
                            <div className="qb-overlay" style={{ background: 'rgba(8,8,20,.97)' }}>
                                <div className="qb-title">⚔ QUEST BLADE</div>
                                <div style={{ fontSize: '6px', color: '#a090d0', textAlign: 'center', lineHeight: 2 }}>
                                    ENDLESS SURVIVAL<br />NO BOUNDARIES
                                </div>
                                <button className="qb-btn" onClick={startGame}>▶ START RUN</button>
                            </div>
                        )}

                        {/* DEAD SCREEN */}
                        {uiState === 'dead' && (
                            <div className="qb-overlay" style={{ background: 'rgba(20,0,0,.97)' }}>
                                <div className="qb-title" style={{ color: '#ff4040' }}>💀 YOU DIED</div>
                                <div style={{ fontSize: '6px', color: '#e0e0e0', textAlign: 'center', lineHeight: 2 }}>
                                    SCORE: {stats.score}<br />COINS: {stats.coins}
                                </div>
                                <button className="qb-btn" style={{ background: '#e03030', color: '#fff' }} onClick={startGame}>↩ TRY AGAIN</button>
                            </div>
                        )}

                        {/* SHOP SCREEN */}
                        {uiState === 'shop' && G.current && (
                            <div className="qb-overlay qb-shop">
                                <div style={{ fontSize: '9px', color: '#ffe860', marginTop: '4px' }}>⚔ WEAPON SHOP</div>
                                <div style={{ fontSize: '7px', color: '#ffd700', marginBottom: '4px' }}>💰 {G.current.hero.coins} COINS</div>

                                <div className="qb-grid">
                                    {Object.entries(WEAPONS).map(([k, wp]) => {
                                        const owned = G.current.ownedWeapons.includes(k);
                                        const active = G.current.equippedWeapon === k;
                                        return (
                                            <div key={k} className={`qb-item ${owned ? 'owned' : ''} ${active ? 'active' : ''}`} onClick={() => owned ? handleEquipWp(k) : handleBuyWp(k)}>
                                                <div style={{ fontSize: '6px', color: '#e0d0ff' }}>{wp.name}</div>
                                                <div style={{ fontSize: '6px', color: '#ffd700' }}>{owned ? '✓ OWNED' : `💰${wp.cost}`}</div>
                                                <div style={{ fontSize: '5px', color: '#7868a0', textAlign: 'center' }}>{wp.desc}</div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div style={{ fontSize: '9px', color: '#ffe860', marginTop: '8px' }}>✨ ABILITIES</div>
                                <div className="qb-grid">
                                    {Object.entries(ABILITIES).map(([k, ab]) => {
                                        const owned = G.current.ownedAbilities.includes(k);
                                        return (
                                            <div key={k} className={`qb-item ${owned ? 'owned' : ''}`} onClick={() => !owned && handleBuyAb(k)}>
                                                <div style={{ fontSize: '6px', color: '#c0e0ff' }}>{ab.name}</div>
                                                <div style={{ fontSize: '5px', color: owned ? '#80d080' : '#ffd700' }}>{owned ? 'ACTIVE' : `💰${ab.cost}`}</div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <button className="qb-btn" style={{ marginTop: '8px' }} onClick={handleCloseShop}>✕ CLOSE</button>
                            </div>
                        )}

                        {/* DIALOG BOX */}
                        {dialogMsg && (
                            <div style={{ position: 'absolute', bottom: '6px', left: '4px', right: '4px', background: '#0e0820', border: '2px solid #ffe860', color: '#ffe860', fontSize: '5.5px', padding: '5px 7px', zIndex: 50, lineHeight: 1.8 }}>
                                {dialogMsg}
                            </div>
                        )}

                        <canvas ref={canvasRef} width={CW} height={CH} style={{ width: '100%', height: '100%', display: 'block', imageRendering: 'pixelated' }} />
                    </div>
                </div>

                {/* CONTROLS */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0 2px', gap: '4px' }}>

                    <div className="qb-dpad">
                        <div className="qb-dp-btn" style={{ top: 0, left: 31, borderRadius: '4px 4px 0 0' }} onPointerDown={() => pk('ArrowUp')} onPointerUp={() => rk('ArrowUp')} onPointerLeave={() => rk('ArrowUp')}>▲</div>
                        <div className="qb-dp-btn" style={{ bottom: 0, left: 31, borderRadius: '0 0 4px 4px' }} onPointerDown={() => pk('ArrowDown')} onPointerUp={() => rk('ArrowDown')} onPointerLeave={() => rk('ArrowDown')}>▼</div>
                        <div className="qb-dp-btn" style={{ top: 31, left: 0, borderRadius: '4px 0 0 4px' }} onPointerDown={() => pk('ArrowLeft')} onPointerUp={() => rk('ArrowLeft')} onPointerLeave={() => rk('ArrowLeft')}>◀</div>
                        <div className="qb-dp-btn" style={{ top: 31, right: 0, borderRadius: '0 4px 4px 0' }} onPointerDown={() => pk('ArrowRight')} onPointerUp={() => rk('ArrowRight')} onPointerLeave={() => rk('ArrowRight')}>▶</div>
                        <div style={{ position: 'absolute', top: 31, left: 31, width: 28, height: 28, background: '#1a1030', borderRadius: 3 }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '28px' }}>
                        <button onClick={handleOpenShop} style={{ background: '#2a1a48', color: '#9080c8', border: '1px solid #483878', borderRadius: 20, padding: '4px 8px', fontSize: '5px', fontFamily: '"Press Start 2P", monospace' }}>SHOP(E)</button>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', transform: 'rotate(-20deg)', marginTop: '6px', width: '96px', justifyContent: 'center' }}>
                        <div className="qb-act" style={{ background: 'linear-gradient(135deg,#40a040,#106010)', color: '#d0ffd0' }} onPointerDown={() => pk('KeyQ')} onPointerUp={() => rk('KeyQ')}>Y<br /><span>ABIL</span></div>
                        <div className="qb-act" style={{ background: 'linear-gradient(135deg,#c04040,#901010)', color: '#ffd0d0' }} onPointerDown={() => pk('Space')} onPointerUp={() => rk('Space')}>B<br /><span>ATK</span></div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════════════
// REACT STYLES
// ══════════════════════════════════════════════════════
const styles = {
    container: {
        minHeight: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'radial-gradient(ellipse at 30% 40%, #1a0a2e 0%, #0a0410 60%, #000 100%)',
        fontFamily: '"Press Start 2P", monospace',
        margin: 0, padding: 0, boxSizing: 'border-box', touchAction: 'none'
    },
    case: {
        position: 'relative', width: '360px',
        background: 'linear-gradient(160deg,#c8c0d8 0%,#a89ab8 45%,#9080a8 100%)',
        borderRadius: '18px 18px 90px 18px',
        border: '3px solid #7060a0',
        boxShadow: 'inset 0 3px 6px rgba(255,255,255,.35), inset 0 -4px 8px rgba(0,0,0,.3), 10px 10px 0 #604880, 0 40px 100px rgba(0,0,0,.8)',
        padding: '16px 16px 24px',
        userSelect: 'none'
    },
    brand: {
        textAlign: 'center', color: '#483870', fontSize: '6px', letterSpacing: '2px', marginBottom: '8px', textShadow: '0 1px 0 rgba(255,255,255,.3)'
    },
    bezel: {
        background: '#1a1030', borderRadius: '10px', padding: '8px', margin: '0 auto 16px', width: '290px',
        boxShadow: 'inset 0 4px 14px rgba(0,0,0,.7), 0 2px 4px rgba(255,255,255,.1)', border: '2px solid #100820'
    },
    screenWrapper: {
        position: 'relative', width: '274px', height: '224px', background: '#080c08', borderRadius: '4px', overflow: 'hidden', boxShadow: 'inset 0 0 40px rgba(0,0,0,.9)'
    }
};