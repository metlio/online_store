import React, { useState, useRef, useEffect } from 'react';
import musicFile from '../components/m.mp3';

const BACKGROUND_VIDEO = 'https://imgcdn.stablediffusionweb.com/tmp/2026/9/29/537799df-1ec8-48a4-b3a7-ef1f79c74883.mp4';
const LOGO_IMAGE = 'https://i.postimg.cc/Ss8QDkqF/3423222.gif';
const AMBIENT_AUDIO = 'https://zvukogram.com/mp3/32/atmosphere-of-outer-space-6.mp3';

const QUIZ_SECTIONS = [
    {
        id: 'intro',
        type: 'intro',
        badge: "Video Quiz '26",
        subtitle: 'Добро пожаловать! Рады до вас донести, что наша команда обновила Квиззи App. Только чистый дух и AI Intellegence by Google & Mixosya'
    },
    {
        id: 'q1',
        type: 'question',
        videoPosition: 'right',
        hasSpotlightMask: true,
        badge: 'ВОПРОС 1 ИЗ 4',
        question: 'Правда ли что адвокат сделал олли с первой попытки после того, как Рауль Дюк выдал ему красненькую из чемоданчика?',
        options: [
            'Да',
            'Ннет'
        ],
        correct: 0,
        video: 'https://imgcdn.stablediffusionweb.com/tmp/2026/9/25/1c7fdfdb-391c-498f-9fca-2176453cfcde.mp4'
    },
    {
        id: 'q2',
        type: 'question',
        videoPosition: 'right',
        hasSpotlightMask: true,
        badge: 'ВОПРОС 2 ИЗ 4',
        question: 'Быль али небыль',
        options: [
            'Быль',
            'Ннебыль'
        ],
        correct: 0,
        video: 'https://imgcdn.stablediffusionweb.com/tmp/2026/9/29/78a21ffd-4ea0-44c9-b444-e7e629716564.mp4'
    },
    {
        id: 'q3',
        type: 'question',
        videoPosition: 'left',
        hasSpotlightMask: true,
        badge: 'ВОПРОС 3 ИЗ 4',
        question: 'Что является главным приоритетом при проектировании современных веб-интерфейсов?',
        options: [
            'Лаконичность, отзывчивость и чистота кода',
            'Максимальное количество сложных скриптов',
            'Скрытые ссылки',
            'Автопроигрывание звука на 100%'
        ],
        correct: 0,
        video: 'https://imgcdn.stablediffusionweb.com/tmp/2026/9/29/e1dfa3b5-3003-432e-a8f3-26e0ccb1359d.mp4'
    },
    {
        id: 'q4',
        type: 'question',
        videoPosition: 'right',
        hasSpotlightMask: true,
        badge: 'ВОПРОС 4 ИЗ 4',
        question: 'Как синтез ИИ и генеративного видео трансформирует пользовательский опыт?',
        options: [
            'Создает персонализированное и динамическое погружение',
            'Заменяет текстовые описания статичными картинками',
            'Ограничивает возможность интерактива',
            'Используется только в рекламных баннерах'
        ],
        correct: 0,
        video: 'https://imgcdn.stablediffusionweb.com/tmp/2026/9/30/1e3ad4f6-18ef-4798-af98-e9a7844aa357.mp4'
    },
    {
        id: 'outro',
        type: 'outro',
        badge: 'ФИНАЛ',
        title: 'Спасибо за участие!',
        subtitle: 'Вы прошли весь лендинг Квиз 2026.'
    }
];

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
                                padding: '1rem 1.25rem',
                                fontSize: '0.925rem',
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
                            {opt}
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

    useEffect(() => {
        // Trigger smooth fade-in after mount
        const fadeInTimer = setTimeout(() => {
            setFadeIn(true);
        }, 50);

        // Slow down preloader display and fade out
        const timer1 = setTimeout(() => {
            setFadeOut(true);
        }, 2200);

        const timer2 = setTimeout(() => {
            if (onFinish) onFinish();
        }, 3400);

        return () => {
            clearTimeout(fadeInTimer);
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
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
            transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
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

            {/* Spinning Rainbow Spinner Ring */}
            <div style={{
                position: 'relative',
                width: '90px',
                height: '90px',
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
                    WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #fff calc(100% - 3px))',
                    mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #fff calc(100% - 3px))'
                }} />

                {/* Inner glowing core */}
                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,229,255,0.3) 0%, rgba(123,44,191,0.1) 70%, transparent 100%)',
                    animation: 'pulseGlow 1.5s ease-in-out infinite'
                }} />
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
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.45)',
                textTransform: 'uppercase'
            }}>
                Загрузка интерактивного опыта...
            </div>
        </div>
    );
};

const Quiz2026 = () => {
    const [answers, setAnswers] = useState({});
    const [isPastScreen1, setIsPastScreen1] = useState(false);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        document.title = 'Quizzy AI™';
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const scrollTop = containerRef.current.scrollTop;
            const clientHeight = containerRef.current.clientHeight;
            if (scrollTop >= clientHeight * 0.4) {
                setIsPastScreen1(true);
            } else {
                setIsPastScreen1(false);
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
        if (isPastScreen1 && audioRef.current) {
            audioRef.current.play().catch(err => {
                console.log('Audio playback prevented:', err);
            });
        }
    }, [isPastScreen1]);

    const handleSelectAnswer = (sectionId, idx) => {
        setAnswers(prev => ({ ...prev, [sectionId]: idx }));
    };

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
                backgroundColor: isPastScreen1 ? '#0A0C10' : '#FFFFFF',
                transition: 'background-color 0.8s ease',
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
            `}</style>

            {/* Ambient Background Music */}
            <audio ref={audioRef} src={AMBIENT_AUDIO} loop />

            {/* Continuous Fixed Background Video (Visible on Screen 2+) */}
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
                    opacity: isPastScreen1 ? 1 : 0,
                    transition: 'opacity 0.8s ease-in-out',
                    pointerEvents: 'none'
                }}
            >
                <source src={BACKGROUND_VIDEO} type="video/mp4" />
            </video>

            {QUIZ_SECTIONS.map((section) => {
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
                                maxWidth: '920px',
                                width: '100%',
                                background: 'transparent',
                                backdropFilter: 'none',
                                WebkitBackdropFilter: 'none',
                                borderRadius: '0px',
                                padding: '2rem 1rem',
                                border: 'none',
                                textAlign: 'center',
                                boxShadow: 'none'
                            }}>
                                {/* Logo Image FIRST */}
                                <img
                                    src={LOGO_IMAGE}
                                    alt="Quizzy AI Logo"
                                    style={{
                                        maxWidth: '380px',
                                        width: '80%',
                                        height: 'auto',
                                        objectFit: 'contain',
                                        margin: '0 auto 2.5rem auto',
                                        display: 'block',
                                        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))'
                                    }}
                                />

                                {/* Animated Multi-color Title SECOND in rounded border container with blur */}
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.85rem 2.8rem',
                                    borderRadius: '50px',
                                    background: 'rgba(255, 255, 255, 0.75)',
                                    backdropFilter: 'blur(20px) saturate(180%)',
                                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                    border: '1.5px solid rgba(0, 0, 0, 0.08)',
                                    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.08), 0 0 20px rgba(0, 0, 0, 0.04), inset 0 0 15px rgba(255, 255, 255, 0.9)',
                                    margin: '0 auto 2rem auto'
                                }}>
                                    <h1 style={{
                                        fontSize: 'clamp(2.5rem, 6.5vw, 4.8rem)',
                                        fontFamily: "'Fascinate Inline', cursive, sans-serif",
                                        fontWeight: 400,
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        margin: 0,
                                        background: 'linear-gradient(120deg, #FF2A85, #FF7300, #FFEB00, #00FF88, #00E5FF, #7B2CBF, #FF2A85)',
                                        backgroundSize: '300% 300%',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        animation: 'rainbowGlow 6s ease infinite',
                                        lineHeight: 1.15
                                    }}>
                                        {section.badge}
                                    </h1>
                                </div>

                                <p style={{
                                    fontSize: '1.2rem',
                                    lineHeight: '1.75',
                                    color: '#1F2937',
                                    fontWeight: 400,
                                    margin: '0 auto 2.5rem auto',
                                    maxWidth: '720px'
                                }}>
                                    {section.subtitle}
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#4B5563' }}>
                                    <span style={{ fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Проскролльте вниз</span>
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
                                    margin: '0 auto',
                                    maxWidth: '420px'
                                }}>
                                    {section.subtitle}
                                </p>
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
