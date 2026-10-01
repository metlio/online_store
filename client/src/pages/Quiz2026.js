import React, { useState, useRef, useEffect } from 'react';
import { $host } from '../http';
import musicFile from '../components/m.mp3';

const BACKGROUND_VIDEO = '/media/bg_q5.mp4';
const LOGO_IMAGE = 'https://i.postimg.cc/2SzYwD9r/3343.gif';
const AMBIENT_AUDIO = '/media/ambient.mp3';
const BIRTHDAY_FIREWORKS_SOUND = '/media/fireworks.mp3';

const QUIZ_SECTIONS = [
    {
        id: 'intro',
        type: 'intro',
        badge: 'Video Quiz 26',
        subtitle: 'Добро пожаловать! Рады до вас донести, что наша команда обновила Квиззи App. Только чистый дух и AI Intellegence by Google & Mixosya'
    },
    {
        id: 'rules',
        type: 'rules',
        badge: 'Правила викторины',
        sound: '/media/crow.mp3',
        rules: [
            {
                icon: 'https://i.postimg.cc/8cNp5pzD/4232222.png',
                text: '1. Рассмотрите видео и ответьте на главный вопрос - правда данное действие или вымысел. Звучит глупо, но ничего интереснее мы не придумали :-}'
            },
            {
                icon: 'https://i.postimg.cc/ZnHTvGWt/543333.png',
                text: '2. Результаты состязания жестко влияют на ваш призз. Отвертеться не выйдет. Мы учли горький опыт предыдущей версии, и внесли корневые измерения. Ой что это я говорю.. - Джуулс!! Есть работёнка!'
            },
            {
                icon: 'https://i.postimg.cc/MH5WfCnS/3453434.png',
                text: '3. Не проявляйте неактивность и хитрость. Мы все тщательно проработали, но не гарантируем корректность соревнования! Все ситуации субьективны. Джулс никого не хочет обидеть по расовой национальности, полу или внешнему виду. Ни одно животное не пострадало. Кроме осьминога (О-хОХО)'
            }
        ]
    },
    {
        id: 'q1',
        type: 'question',
        videoPosition: 'right',
        hasSpotlightMask: true,
        badge: 'ВОПРОС 1 ИЗ 5',
        question: 'Правда ли что адвокат сделал олли с первой попытки после того, как Рауль Дюк выдал ему красненькую из чемоданчика?',
        options: [
            'Да',
            'Ннет'
        ],
        correct: 1, // Ннет
        sound: '/media/laugh1.mp3',
        video: '/media/q1.mp4'
    },
    {
        id: 'q2',
        type: 'question',
        videoPosition: 'right',
        hasSpotlightMask: true,
        badge: 'ВОПРОС 2 ИЗ 5',
        question: 'Быль али небыль',
        options: [
            'Быль',
            'Ннебыль'
        ],
        correct: 0, // Быль
        sound: '/media/laugh2.mp3',
        video: '/media/q2.mp4'
    },
    {
        id: 'q3',
        type: 'question',
        videoPosition: 'left',
        hasSpotlightMask: true,
        badge: 'ВОПРОС 3 ИЗ 5',
        question: 'Действительность или вымысел?',
        options: [
            'Реальность',
            'Фантазия'
        ],
        correct: 1, // Фантазия
        sound: '/media/laugh3.mp3',
        video: '/media/q3.mp4'
    },
    {
        id: 'q4',
        type: 'question',
        videoPosition: 'right',
        hasSpotlightMask: true,
        badge: 'ВОПРОС 4 ИЗ 5',
        question: 'Правда или ложь?',
        options: [
            'Праавда',
            'Лоожь'
        ],
        correct: 0, // Праавда
        sound: '/media/laugh4.mp3',
        video: '/media/q4.mp4'
    },
    {
        id: 'q5',
        type: 'question',
        videoPosition: 'left',
        hasSpotlightMask: true,
        badge: 'ВОПРОС 5 ИЗ 5',
        question: 'Истина коль неправда?',
        options: [
            'Истина',
            'Неправда'
        ],
        correct: 0, // Истина
        sound: '/media/laugh1.mp3',
        video: '/media/q5.mp4'
    },
    {
        id: 'outro',
        type: 'outro',
        badge: 'ФИНАЛ',
        title: 'Спасибо за участие!',
        subtitle: 'Фууух... Вы справились! Что ж, подведем итог...'
    },
    {
        id: 'results',
        type: 'results',
        badge: 'РЕЗУЛЬТАТЫ',
        title: 'Итоги викторины'
    },
    {
        id: 'birthday',
        type: 'birthday',
        badge: 'С ДНЕМ РОЖДЕНИЯ'
    }
];

const FireworksCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let fireworks = [];
        let particles = [];

        class Firework {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height;
                this.targetY = Math.random() * (canvas.height * 0.55) + canvas.height * 0.1;
                this.speed = Math.random() * 4 + 8;
                this.angle = -Math.PI / 2 + (Math.random() * 0.4 - 0.2);
                this.vx = Math.cos(this.angle) * this.speed;
                this.vy = Math.sin(this.angle) * this.speed;
                this.hue = Math.floor(Math.random() * 360);
                this.exploded = false;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.08;

                if (this.vy >= 0 || this.y <= this.targetY) {
                    this.exploded = true;
                    this.explode();
                }
            }

            explode() {
                const particleCount = Math.floor(Math.random() * 60) + 70;
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle(this.x, this.y, this.hue));
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = `hsl(${this.hue}, 100%, 80%)`;
                ctx.fill();
            }
        }

        class Particle {
            constructor(x, y, hue) {
                this.x = x;
                this.y = y;
                this.hue = hue + (Math.random() * 40 - 20);
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 8 + 2;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.friction = 0.95;
                this.gravity = 0.12;
                this.alpha = 1;
                this.decay = Math.random() * 0.02 + 0.012;
                this.size = Math.random() * 3.5 + 2;
            }

            update() {
                this.vx *= this.friction;
                this.vy *= this.friction;
                this.vy += this.gravity;
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= this.decay;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = Math.max(0, this.alpha);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsl(${this.hue}, 100%, 75%)`;
                ctx.shadowColor = `hsl(${this.hue}, 100%, 60%)`;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.restore();
            }
        }

        let spawnTimer = 0;

        const render = () => {
            ctx.fillStyle = 'rgba(255, 20, 147, 0.25)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            spawnTimer++;
            if (spawnTimer % 15 === 0 || Math.random() < 0.1) {
                fireworks.push(new Firework());
            }

            fireworks = fireworks.filter(f => !f.exploded);
            fireworks.forEach(f => {
                f.update();
                f.draw();
            });

            particles = particles.filter(p => p.alpha > 0);
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1
            }}
        />
    );
};

const VerticalVideoFrame = ({ videoSrc }) => {
    return (
        <div style={{
            position: 'relative',
            height: '80vh',
            maxHeight: '760px',
            aspectRatio: '9 / 16',
            maxWidth: '100%',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backgroundColor: 'rgba(0,0,0,0.4)',
            flexShrink: 0
        }}>
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                }}
            >
                <source src={videoSrc} type="video/mp4" />
            </video>
        </div>
    );
};

const SpotlightVideoFrame = ({ videoSrc }) => {
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const spotlightX = isHovering ? `${mousePos.x}%` : '50%';
    const spotlightY = isHovering ? `${mousePos.y}%` : '50%';
    const maskOpacity = isHovering ? 1 : 0.35;

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'relative',
                height: '80vh',
                maxHeight: '760px',
                aspectRatio: '9 / 16',
                maxWidth: '100%',
                borderRadius: '28px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                cursor: 'crosshair',
                userSelect: 'none',
                flexShrink: 0
            }}
        >
            {/* Blurred background video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'blur(18px) brightness(0.75) contrast(1.1)',
                    transform: 'scale(1.08)'
                }}
            >
                <source src={videoSrc} type="video/mp4" />
            </video>

            {/* Clear video layer revealed by circular mask spotlight */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(1.05)',
                    maskImage: `radial-gradient(circle 140px at ${spotlightX} ${spotlightY}, black 0%, black 50%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(circle 140px at ${spotlightX} ${spotlightY}, black 0%, black 50%, transparent 100%)`,
                    opacity: maskOpacity,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none'
                }}
            >
                <source src={videoSrc} type="video/mp4" />
            </video>

            {/* Outer glass ring accent */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    background: `radial-gradient(circle 145px at ${spotlightX} ${spotlightY}, transparent 78%, rgba(255,255,255,0.45) 92%, transparent 100%)`,
                    opacity: isHovering ? 1 : 0.4,
                    transition: 'opacity 0.3s ease'
                }}
            />

        </div>
    );
};

const QuestionBox = ({ section, answers, onSelectAnswer }) => {
    const selectedAnswer = answers[section.id];

    return (
        <div style={{
            flex: '1 1 380px',
            maxWidth: '520px',
            background: 'rgba(255, 255, 255, 0.07)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            borderRadius: '24px',
            padding: '3rem 2.25rem',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.35)',
            boxSizing: 'border-box'
        }}>
            <div style={{
                display: 'inline-block',
                padding: '0.35rem 1rem',
                background: 'rgba(255, 255, 255, 0.12)',
                borderRadius: '30px',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.15)'
            }}>
                {section.badge}
            </div>

            <h2 style={{
                fontSize: '1.65rem',
                fontWeight: 400,
                lineHeight: '1.35',
                margin: '0 0 1.75rem 0',
                color: '#FFFFFF'
            }}>
                {section.question}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {section.options.map((opt, idx) => {
                    const isSelected = selectedAnswer === idx;
                    return (
                        <button
                            key={idx}
                            onClick={() => onSelectAnswer(section.id, idx)}
                            style={{
                                padding: '0.8rem 1.25rem',
                                minHeight: '52px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                fontSize: '0.925rem',
                                lineHeight: '1.2',
                                fontWeight: isSelected ? 600 : 400,
                                color: isSelected ? '#0A0A0A' : '#FFFFFF',
                                backgroundColor: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)',
                                border: '1px solid',
                                borderColor: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '16px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                                boxShadow: isSelected ? '0 8px 20px rgba(255, 255, 255, 0.25)' : 'none'
                            }}
                        >
                            <span style={{ transform: 'translateY(-1px)' }}>{opt}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const Preloader = ({ onFinish }) => {
    const [fadeIn, setFadeIn] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setFadeIn(true);

        const videoUrls = [
            BACKGROUND_VIDEO,
            ...QUIZ_SECTIONS.filter(s => s.video).map(s => s.video)
        ];
        const audioUrls = [
            AMBIENT_AUDIO,
            BIRTHDAY_FIREWORKS_SOUND,
            ...QUIZ_SECTIONS.filter(s => s.sound).map(s => s.sound)
        ];

        let loadedCount = 0;
        const totalItems = videoUrls.length + audioUrls.length;

        const updateProgress = () => {
            loadedCount += 1;
            const pct = Math.min(100, Math.round((loadedCount / totalItems) * 100));
            setProgress(pct);

            if (loadedCount >= totalItems) {
                setTimeout(() => setFadeOut(true), 400);
                setTimeout(() => {
                    if (onFinish) onFinish();
                }, 1400);
            }
        };

        // Fallback safety timeout so user isn't stuck forever on slow networks
        const safetyTimeout = setTimeout(() => {
            setProgress(100);
            setFadeOut(true);
            setTimeout(() => {
                if (onFinish) onFinish();
            }, 1000);
        }, 7000);

        videoUrls.forEach(url => {
            const video = document.createElement('video');
            video.preload = 'auto';
            video.src = url;
            video.onloadeddata = () => updateProgress();
            video.onerror = () => updateProgress();
        });

        audioUrls.forEach(url => {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.src = url;
            audio.oncanplaythrough = () => updateProgress();
            audio.onerror = () => updateProgress();
        });

        return () => clearTimeout(safetyTimeout);
    }, [onFinish]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            backgroundColor: '#0A0C10',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: fadeOut ? 0 : (fadeIn ? 1 : 0),
            transform: fadeOut ? 'scale(1.05)' : (fadeIn ? 'scale(1)' : 'scale(0.96)'),
            transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: fadeOut ? 'none' : 'auto'
        }}>
            <style>{`
                @keyframes preloaderSpin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes pulseGlow {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.1); opacity: 1; }
                }
            `}</style>

            {/* Spinning Rainbow Spinner Ring with Percentage in Center */}
            <div style={{
                position: 'relative',
                width: '110px',
                height: '110px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, #FF2A85, #FF7300, #00FF88, #00E5FF, #7B2CBF, #FF2A85)',
                    animation: 'preloaderSpin 1.2s linear infinite',
                    padding: '4px',
                    WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 5px), #fff calc(100% - 4px))',
                    mask: 'radial-gradient(farthest-side, transparent calc(100% - 5px), #fff calc(100% - 4px))'
                }} />

                {/* Inner glowing core with Percentage */}
                <div style={{
                    width: '82px',
                    height: '82px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,229,255,0.2) 0%, rgba(123,44,191,0.1) 70%, transparent 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    letterSpacing: '0.02em',
                    boxShadow: 'inset 0 0 15px rgba(255,255,255,0.1)'
                }}>
                    {progress}%
                </div>
            </div>

            <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1rem',
                letterSpacing: '0.25em',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#FFFFFF',
                opacity: 0.9,
                marginBottom: '0.5rem'
            }}>
                QUIZZY AI™ 2026
            </div>

            <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.8)',
                textTransform: 'uppercase',
                marginBottom: '0.4rem'
            }}>
                Джулс думает...
            </div>

            <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.7rem',
                letterSpacing: '0.05em',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.4)',
                textAlign: 'center',
                maxWidth: '280px'
            }}>
                У вас должен быть лучший впн чтобы игра заработала
            </div>
        </div>
    );
};

const Quiz2026 = () => {
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [audioStarted, setAudioStarted] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: 'Пользователь', id: 'USR-2026' });
    const containerRef = useRef(null);
    const audioRef = useRef(null);
    const questionAudioRef = useRef(null);
    const birthdayAudioRef = useRef(null);
    const activeSectionRef = useRef('intro');

    const handleToggleAudio = () => {
        if (audioRef.current) {
            if (!audioStarted || isAudioMuted) {
                audioRef.current.muted = false;
                audioRef.current.play().then(() => {
                    setAudioStarted(true);
                    setIsAudioMuted(false);
                }).catch(err => console.log('Audio toggle play error:', err));
            } else {
                audioRef.current.muted = true;
                setIsAudioMuted(true);
            }
        }
    };

    useEffect(() => {
        // Generate or retrieve user info
        let storedId = localStorage.getItem('quiz_user_id');
        let storedName = localStorage.getItem('quiz_user_name');

        if (!storedId) {
            const randomHash = Math.random().toString(36).substring(2, 8).toUpperCase();
            storedId = `ID-${randomHash}`;
            localStorage.setItem('quiz_user_id', storedId);
        }

        if (!storedName) {
            const platform = navigator.platform ? navigator.platform : 'Web Browser';
            storedName = `Игрок (${platform})`;
            localStorage.setItem('quiz_user_name', storedName);
        }

        setUserInfo({ name: storedName, id: storedId });
    }, []);

    useEffect(() => {
        document.title = 'Quizzy AI™';
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const scrollTop = containerRef.current.scrollTop;
            const clientHeight = containerRef.current.clientHeight;

            // Detect current active section index
            const currentIndex = Math.round(scrollTop / clientHeight);
            const currentSection = QUIZ_SECTIONS[currentIndex];

            if (currentSection && currentSection.id !== activeSectionRef.current) {
                activeSectionRef.current = currentSection.id;

                // Handle birthday fireworks section sound loop
                if (currentSection.type === 'birthday') {
                    if (birthdayAudioRef.current) {
                        birthdayAudioRef.current.currentTime = 0;
                        birthdayAudioRef.current.play().catch(err => console.log('Birthday audio error:', err));
                    }
                } else {
                    if (birthdayAudioRef.current) {
                        birthdayAudioRef.current.pause();
                    }
                }

                // Play specific question/section sound if present
                if (currentSection.sound) {
                    if (questionAudioRef.current) {
                        questionAudioRef.current.src = currentSection.sound;
                        questionAudioRef.current.play().catch(err => console.log('Question audio play error:', err));
                    }
                }
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll, { passive: true });
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        const startAudio = () => {
            if (audioRef.current) {
                audioRef.current.play().catch(err => {
                    console.log('Audio playback prevented:', err);
                });
            }
        };

        startAudio();
        window.addEventListener('click', startAudio, { once: true });
        window.addEventListener('touchstart', startAudio, { once: true });
        window.addEventListener('scroll', startAudio, { once: true });

        return () => {
            window.removeEventListener('click', startAudio);
            window.removeEventListener('touchstart', startAudio);
            window.removeEventListener('scroll', startAudio);
        };
    }, []);

    const handleSelectAnswer = (sectionId, idx) => {
        setAnswers(prev => ({ ...prev, [sectionId]: idx }));
    };

    // Determine if all 5 questions are answered
    const questionSections = QUIZ_SECTIONS.filter(s => s.type === 'question');
    const allQuestionsAnswered = questionSections.length > 0 && questionSections.every(q => answers[q.id] !== undefined);

    // Filter QUIZ_SECTIONS to hide outro, results, and birthday until all questions are answered
    const visibleSections = QUIZ_SECTIONS.filter(s => {
        if (['outro', 'results', 'birthday'].includes(s.type)) {
            return allQuestionsAnswered;
        }
        return true;
    });

    return (
        <>
            {loading && <Preloader onFinish={() => setLoading(false)} />}
            <div
                id="quiz-2026-container"
                ref={containerRef}
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
                backgroundColor: '#0A0C10',
                fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                color: '#FFFFFF'
            }}
        >
            <style>{`
                @keyframes rainbowGlow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes blackGreyGradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>

            {/* Ambient Background Music, Question Sounds & Birthday Fireworks Audio */}
            <audio ref={audioRef} src={AMBIENT_AUDIO} loop preload="auto" />
            <audio ref={questionAudioRef} preload="auto" />
            <audio ref={birthdayAudioRef} src={BIRTHDAY_FIREWORKS_SOUND} loop preload="auto" />


            {/* Continuous Fixed Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    objectFit: 'cover',
                    filter: 'brightness(0.45) contrast(1.05)',
                    zIndex: 0,
                    opacity: 1,
                    pointerEvents: 'none'
                }}
            >
                <source src={BACKGROUND_VIDEO} type="video/mp4" />
            </video>

            {visibleSections.map((section) => {
                if (section.type === 'intro') {
                    return (
                        <div
                            key={section.id}
                            style={{
                                height: '100vh',
                                width: '100vw',
                                scrollSnapAlign: 'start',
                                scrollSnapStop: 'always',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                padding: '2rem',
                                boxSizing: 'border-box',
                                zIndex: 1
                            }}
                        >
                            <div style={{
                                position: 'relative',
                                zIndex: 2,
                                maxWidth: '780px',
                                width: '100%',
                                background: '#FFFFFF',
                                borderRadius: '28px',
                                padding: '3.5rem 2.5rem',
                                border: '1px solid rgba(255, 255, 255, 0.6)',
                                textAlign: 'center',
                                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.5)'
                            }}>
                                {/* Logo Image FIRST - Larger */}
                                <img
                                    src={LOGO_IMAGE}
                                    alt="Quizzy AI Logo"
                                    style={{
                                        maxWidth: '480px',
                                        width: '90%',
                                        height: 'auto',
                                        objectFit: 'contain',
                                        margin: '0 auto 2rem auto',
                                        display: 'block',
                                        filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.2))'
                                    }}
                                />

                                {/* Display Font Title SECOND with Black-Grey Animated Gradient */}
                                <h1 style={{
                                    fontSize: 'clamp(2.2rem, 6vw, 4.2rem)',
                                    fontFamily: "'Oi', sans-serif",
                                    fontWeight: 'normal',
                                    letterSpacing: '0.02em',
                                    textTransform: 'uppercase',
                                    margin: '0 auto 1.75rem auto',
                                    lineHeight: 1.15,
                                    background: 'linear-gradient(135deg, #0A0C10 0%, #4A5568 50%, #1A202C 100%)',
                                    backgroundSize: '200% 200%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    animation: 'blackGreyGradient 4s ease infinite'
                                }}>
                                    {section.badge}
                                </h1>

                                <p style={{
                                    fontSize: '1.15rem',
                                    lineHeight: '1.75',
                                    color: '#222222',
                                    fontWeight: 400,
                                    margin: '0 auto 2rem auto',
                                    maxWidth: '680px'
                                }}>
                                    Добро пожаловать! Рады <strong style={{ fontWeight: 700, color: '#000000' }}>до вас донести</strong>, что наша команда обновила Квиззи App. Только чистый дух и AI Intellegence by Google & Mixosya
                                </p>

                                {/* Sound Toggle Button centered above scroll prompt, 75x75px */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                    <button
                                        onClick={handleToggleAudio}
                                        style={{
                                            width: '75px',
                                            height: '75px',
                                            borderRadius: '50%',
                                            backgroundColor: 'rgba(0, 0, 0, 0.06)',
                                            border: '1px solid rgba(0, 0, 0, 0.15)',
                                            color: '#0A0C10',
                                            fontSize: '2rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.12)',
                                            transition: 'all 0.2s ease'
                                        }}
                                        title={audioStarted && !isAudioMuted ? 'Выключить звук' : 'Включить звук'}
                                    >
                                        <span style={{ transform: 'translateY(-1px)', lineHeight: 1 }}>
                                            {audioStarted && !isAudioMuted ? '🔊' : '🔇'}
                                        </span>
                                    </button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#555555' }}>
                                    <span style={{ fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>Проскролльте вниз</span>
                                    <span style={{ fontSize: '1.5rem' }}>↓</span>
                                </div>
                            </div>
                        </div>
                    );
                }

                if (section.type === 'rules') {
                    return (
                        <div
                            key={section.id}
                            style={{
                                height: '100vh',
                                width: '100vw',
                                scrollSnapAlign: 'start',
                                scrollSnapStop: 'always',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                padding: '2rem',
                                boxSizing: 'border-box',
                                zIndex: 1
                            }}
                        >
                            <div style={{
                                position: 'relative',
                                zIndex: 2,
                                maxWidth: '780px',
                                width: '100%',
                                background: 'rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(28px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                                borderRadius: '28px',
                                padding: '3rem 2.5rem',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                textAlign: 'left',
                                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)'
                            }}>
                                <div style={{
                                    textAlign: 'center',
                                    marginBottom: '2rem'
                                }}>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '0.4rem 1.2rem',
                                        background: 'rgba(255, 255, 255, 0.12)',
                                        borderRadius: '30px',
                                        fontSize: '0.85rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                        color: '#FFFFFF',
                                        border: '1px solid rgba(255, 255, 255, 0.2)'
                                    }}>
                                        {section.badge}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {section.rules.map((ruleObj, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                borderRadius: '20px',
                                                padding: '1.5rem 1.75rem',
                                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                gap: '1rem'
                                            }}
                                        >
                                            <img
                                                src={ruleObj.icon}
                                                alt={`Rule ${idx + 1}`}
                                                style={{
                                                    width: '85px',
                                                    height: '85px',
                                                    objectFit: 'contain',
                                                    flexShrink: 0,
                                                    borderRadius: '12px',
                                                    marginBottom: '0.25rem'
                                                }}
                                            />
                                            <div style={{
                                                fontSize: '1.05rem',
                                                lineHeight: '1.6',
                                                color: 'rgba(255, 255, 255, 0.95)',
                                                fontWeight: 300
                                            }}>
                                                {ruleObj.text}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginTop: '2rem', color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
                                    <span style={{ fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Проскролльте далее</span>
                                    <span style={{ fontSize: '1.5rem' }}>↓</span>
                                </div>
                            </div>
                        </div>
                    );
                }

                if (section.type === 'question') {
                    const isVideoLeft = section.videoPosition === 'left';
                    const hasSpotlight = section.hasSpotlightMask;

                    return (
                        <div
                            key={section.id}
                            style={{
                                height: '100vh',
                                width: '100vw',
                                scrollSnapAlign: 'start',
                                scrollSnapStop: 'always',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '2.5rem',
                                boxSizing: 'border-box',
                                position: 'relative',
                                zIndex: 1
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '2.5rem',
                                maxWidth: hasSpotlight ? '1280px' : '1000px',
                                width: '100%',
                                flexWrap: 'wrap-reverse'
                            }}>
                                {isVideoLeft ? (
                                    <>
                                        {hasSpotlight ? <SpotlightVideoFrame videoSrc={section.video} /> : <VerticalVideoFrame videoSrc={section.video} />}
                                        <QuestionBox section={section} answers={answers} onSelectAnswer={handleSelectAnswer} />
                                    </>
                                ) : (
                                    <>
                                        <QuestionBox section={section} answers={answers} onSelectAnswer={handleSelectAnswer} />
                                        {hasSpotlight ? <SpotlightVideoFrame videoSrc={section.video} /> : <VerticalVideoFrame videoSrc={section.video} />}
                                    </>
                                )}
                            </div>
                        </div>
                    );
                }

                if (section.type === 'outro') {
                    return (
                        <div
                            key={section.id}
                            style={{
                                height: '100vh',
                                width: '100vw',
                                scrollSnapAlign: 'start',
                                scrollSnapStop: 'always',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                padding: '2rem',
                                boxSizing: 'border-box',
                                zIndex: 1
                            }}
                        >
                            <div style={{
                                position: 'relative',
                                zIndex: 2,
                                maxWidth: '540px',
                                width: '100%',
                                background: 'rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(28px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                                borderRadius: '28px',
                                padding: '3.5rem 2.5rem',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                textAlign: 'center',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.4)'
                            }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.4rem 1.1rem',
                                    background: 'rgba(255, 255, 255, 0.12)',
                                    borderRadius: '30px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: '#FFFFFF',
                                    marginBottom: '1.75rem',
                                    border: '1px solid rgba(255, 255, 255, 0.18)'
                                }}>
                                    {section.badge}
                                </div>
                                <h1 style={{
                                    fontSize: '3rem',
                                    fontWeight: 300,
                                    lineHeight: '1.15',
                                    margin: '0 0 1.25rem 0',
                                    color: '#FFFFFF'
                                }}>
                                    {section.title}
                                </h1>
                                <p style={{
                                    fontSize: '1.05rem',
                                    lineHeight: '1.7',
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    fontWeight: 300,
                                    margin: '0 auto 2rem auto',
                                    maxWidth: '420px'
                                }}>
                                    {section.subtitle}
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>
                                    <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Результаты ниже</span>
                                    <span style={{ fontSize: '1.25rem' }}>↓</span>
                                </div>
                            </div>
                        </div>
                    );
                }

                if (section.type === 'results') {
                    // Calculate score
                    const questions = QUIZ_SECTIONS.filter(s => s.type === 'question');
                    let correctCount = 0;
                    questions.forEach(q => {
                        if (answers[q.id] === q.correct) {
                            correctCount++;
                        }
                    });

                    // Determine prize info based on score
                    let prizeImg = '';
                    let prizeTitle = '';

                    if (correctCount >= 5) {
                        prizeImg = 'https://api.skvot.com/storage/products/24225/8nq6gxlm5hn3.png';
                        prizeTitle = 'Премиальные лимитированные подшипники';
                    } else if (correctCount >= 3) {
                        prizeImg = 'https://strgimgr.b-cdn.net/sized/280/337513-b59ce32015453e0dfc07dbabbfc813ba.jpg';
                        prizeTitle = 'Набор для винтажного бритья';
                    } else {
                        prizeImg = 'https://api.skvot.com/storage/products/23964/4rbwvy6gjpvj.png';
                        prizeTitle = 'Премиальный скейт тул';
                    }

                    return (
                        <div
                            key={section.id}
                            style={{
                                height: '100vh',
                                width: '100vw',
                                scrollSnapAlign: 'start',
                                scrollSnapStop: 'always',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                padding: '2rem',
                                boxSizing: 'border-box',
                                zIndex: 1
                            }}
                        >
                            <div style={{
                                position: 'relative',
                                zIndex: 2,
                                maxWidth: '580px',
                                width: '100%',
                                background: '#FFFFFF',
                                borderRadius: '28px',
                                padding: '3.5rem 2.5rem',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                textAlign: 'center',
                                boxShadow: '0 30px 70px rgba(0,0,0,0.5)'
                            }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.4rem 1.2rem',
                                    background: 'rgba(0, 0, 0, 0.06)',
                                    borderRadius: '30px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: '#0A0C10',
                                    marginBottom: '1.5rem',
                                    border: '1px solid rgba(0, 0, 0, 0.1)'
                                }}>
                                    {section.badge}
                                </div>

                                <h2 style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 700,
                                    lineHeight: '1.2',
                                    margin: '0 0 1.5rem 0',
                                    color: '#0A0C10'
                                }}>
                                    {section.title}
                                </h2>

                                {/* User info card */}
                                <div style={{
                                    background: 'rgba(0, 0, 0, 0.04)',
                                    borderRadius: '20px',
                                    padding: '1.25rem 1.5rem',
                                    border: '1px solid rgba(0, 0, 0, 0.08)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '1rem',
                                    marginBottom: '1.5rem'
                                }}>
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0A0C10', marginBottom: '0.25rem' }}>
                                            {userInfo.name}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#666666', fontFamily: 'monospace' }}>
                                            {userInfo.id}
                                        </div>
                                    </div>

                                    <div style={{
                                        background: '#0A0C10',
                                        padding: '0.65rem 1.25rem',
                                        borderRadius: '16px',
                                        fontWeight: 800,
                                        fontSize: '1.3rem',
                                        color: '#FFFFFF',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.3rem'
                                    }}>
                                        <span>{correctCount}</span>
                                        <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>/ {questions.length}</span>
                                    </div>
                                </div>

                                {/* Prize Display Box */}
                                <div style={{
                                    background: '#F8FAFC',
                                    borderRadius: '20px',
                                    padding: '1.5rem',
                                    border: '1px solid #E2E8F0',
                                    marginBottom: '1.75rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.12em',
                                        color: '#64748B',
                                        marginBottom: '0.75rem'
                                    }}>
                                        Ваш приз:
                                    </div>

                                    <img
                                        src={prizeImg}
                                        alt="Prize"
                                        style={{
                                            width: '140px',
                                            height: '140px',
                                            objectFit: 'contain',
                                            marginBottom: '0.75rem',
                                            borderRadius: '12px'
                                        }}
                                    />

                                    <div style={{
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        color: '#1E293B',
                                        lineHeight: 1.4
                                    }}>
                                        {prizeTitle}
                                    </div>
                                </div>

                                <button
                                    onClick={async () => {
                                        const resultData = {
                                            score: correctCount,
                                            total: questions.length,
                                            userId: userInfo.id,
                                            userName: userInfo.name,
                                            timestamp: Date.now()
                                        };
                                        try {
                                            await $host.post('/api/quiz/result', resultData);
                                        } catch (e) {
                                            console.error('Error posting quiz result to server:', e);
                                        }
                                        localStorage.setItem('quiz_2026_submitted_result', JSON.stringify(resultData));
                                        setSubmitted(true);
                                    }}
                                    style={{
                                        padding: '1rem 2.2rem',
                                        height: '52px',
                                        fontSize: '0.95rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.05em',
                                        color: '#FFFFFF',
                                        backgroundColor: submitted ? '#10B981' : '#0A0C10',
                                        border: 'none',
                                        borderRadius: '30px',
                                        cursor: 'pointer',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.18)',
                                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        lineHeight: 1,
                                        margin: '0 auto'
                                    }}
                                >
                                    <span style={{ transform: 'translateY(0px)', display: 'inline-block', lineHeight: '1' }}>
                                        {submitted ? '✓ Результат сохранен' : 'Отправить результат'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    );
                }

                if (section.type === 'birthday') {
                    return (
                        <div
                            key={section.id}
                            style={{
                                height: '100vh',
                                width: '100vw',
                                scrollSnapAlign: 'start',
                                scrollSnapStop: 'always',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                backgroundColor: '#FF1493',
                                padding: '2rem',
                                boxSizing: 'border-box',
                                zIndex: 1,
                                overflow: 'hidden'
                            }}
                        >
                            <FireworksCanvas />
                            <div style={{
                                position: 'relative',
                                zIndex: 2,
                                textAlign: 'center',
                                width: '100%',
                                maxWidth: '100vw',
                                padding: '0 1rem',
                                boxSizing: 'border-box',
                                pointerEvents: 'none'
                            }}>
                                <h1 style={{
                                    fontFamily: "'Oi', 'Rubik Mono One', 'Russo One', sans-serif",
                                    fontSize: 'clamp(2.5rem, 9vw, 7.5rem)',
                                    fontWeight: 'normal',
                                    color: '#FFFFFF',
                                    textShadow: '0 8px 30px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 255, 255, 0.6)',
                                    margin: 0,
                                    lineHeight: '1.1',
                                    textTransform: 'uppercase',
                                    wordBreak: 'break-word'
                                }}>
                                    С ДНЕМ
                                </h1>
                                <h1 style={{
                                    fontFamily: "'Oi', 'Rubik Mono One', 'Russo One', sans-serif",
                                    fontSize: 'clamp(2.2rem, 8vw, 6.8rem)',
                                    fontWeight: 'normal',
                                    color: '#FFFFFF',
                                    textShadow: '0 8px 30px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 255, 255, 0.6)',
                                    margin: 0,
                                    lineHeight: '1.1',
                                    textTransform: 'uppercase',
                                    wordBreak: 'break-word'
                                }}>
                                    РОЖДЕНИЯ!🎂
                                </h1>
                            </div>
                        </div>
                    );
                }

                return null;
            })}
        </div>
        </>
    );
};

export default Quiz2026;
