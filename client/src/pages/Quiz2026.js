import React, { useState, useRef } from 'react';

const QUIZ_SECTIONS = [
    {
        id: 'intro',
        type: 'intro',
        badge: 'ВИКТОРИНА 2026',
        title: 'Квиз 2026',
        subtitle: 'Добро пожаловать! Рады до вас донести, что наша команда обновила Квиззи App. Вопросы больше не пугают до усрачки,  а после прохождения нет ощущения что нахлебался дерьма. Только чистый дух и AI Intellegence by Google & Mixosya',
        video: 'https://imgcdn.stablediffusionweb.com/tmp/2026/9/29/537799df-1ec8-48a4-b3a7-ef1f79c74883.mp4'
    },
    {
        id: 'q1',
        type: 'question',
        videoPosition: 'right', // Question on left, video on right occupying main right area
        hasSpotlightMask: true,
        badge: 'ВОПРОС 1 ИЗ 3',
        question: 'Какой ключевой элемент определяет эстетику 2026 года?',
        options: [
            'Минимализм и живой видеоконтент',
            'Громоздкие всплывающие баннеры',
            'Перегруженный интернациональный стиль 90-х',
            'Монохромный открытый код'
        ],
        correct: 0,
        video: 'https://imgcdn.stablediffusionweb.com/tmp/2026/9/25/1c7fdfdb-391c-498f-9fca-2176453cfcde.mp4'
    },
    {
        id: 'q2',
        type: 'question',
        videoPosition: 'right', // Question on left, video on right
        badge: 'ВОПРОС 2 ИЗ 3',
        question: 'Как вертикальное видео влияет на вовлеченность в интерактивных лендингах?',
        options: [
            'Увеличивает фокус и глубину просмотра',
            'Затрудняет восприятие',
            'Никак не влияет',
            'Уменьшает скорость загрузки'
        ],
        correct: 0,
        video: 'https://imgcdn.stablediffusionweb.com/tmp/2026/9/29/78a21ffd-4ea0-44c9-b444-e7e629716564.mp4'
    },
    {
        id: 'q3',
        type: 'question',
        videoPosition: 'left', // Video on left, question on right
        badge: 'ВОПРОС 3 ИЗ 3',
        question: 'Что является главным приоритетом при проектировании современных веб-интерфейсов?',
        options: [
            'Лаконичность, отзывчивость и чистота кода',
            'Максимальное количество сложных скриптов',
            'Скрытые ссылки',
            'Автопроигрывание звука на 100%'
        ],
        correct: 0,
        video: 'https://imgcdn.stablediffusionweb.com/tmp/2026/9/29/537799df-1ec8-48a4-b3a7-ef1f79c74883.mp4'
    },
    {
        id: 'outro',
        type: 'outro',
        badge: 'ФИНАЛ',
        title: 'Спасибо за участие!',
        subtitle: 'Вы прошли весь лендинг Квиз 2026.',
        video: 'https://imgcdn.stablediffusionweb.com/tmp/2026/9/29/537799df-1ec8-48a4-b3a7-ef1f79c74883.mp4'
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

            {/* Hint overlay */}
            <div style={{
                position: 'absolute',
                bottom: '18px',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '8px 18px',
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '20px',
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.85)',
                pointerEvents: 'none',
                letterSpacing: '0.04em',
                border: '1px solid rgba(255,255,255,0.15)'
            }}>
                🔍 Наведите мышью, чтобы рассмотреть четкий кадр
            </div>
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

const Quiz2026 = () => {
    const [answers, setAnswers] = useState({});

    const handleSelectAnswer = (sectionId, idx) => {
        setAnswers(prev => ({ ...prev, [sectionId]: idx }));
    };

    return (
        <div
            id="quiz-2026-container"
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
                                boxSizing: 'border-box'
                            }}
                        >
                            {/* Intro section full background video */}
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
                                    filter: 'brightness(0.55) contrast(1.05)',
                                    zIndex: 0
                                }}
                            >
                                <source src={section.video} type="video/mp4" />
                            </video>

                            <div style={{
                                position: 'relative',
                                zIndex: 2,
                                maxWidth: '640px',
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
                                    fontSize: '3.5rem',
                                    fontWeight: 300,
                                    letterSpacing: '-0.04em',
                                    lineHeight: '1.1',
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
                                    margin: '0 auto 2.5rem auto',
                                    maxWidth: '520px'
                                }}>
                                    {section.subtitle}
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.8 }}>
                                    <span style={{ fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Проскролльте вниз</span>
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
                                background: '#0D0F14'
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
                                {hasSpotlight ? (
                                    <>
                                        <QuestionBox section={section} answers={answers} onSelectAnswer={handleSelectAnswer} />
                                        <SpotlightVideoFrame videoSrc={section.video} />
                                    </>
                                ) : isVideoLeft ? (
                                    <>
                                        <VerticalVideoFrame videoSrc={section.video} />
                                        <QuestionBox section={section} answers={answers} onSelectAnswer={handleSelectAnswer} />
                                    </>
                                ) : (
                                    <>
                                        <QuestionBox section={section} answers={answers} onSelectAnswer={handleSelectAnswer} />
                                        <VerticalVideoFrame videoSrc={section.video} />
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
                                boxSizing: 'border-box'
                            }}
                        >
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
                                    filter: 'brightness(0.55) contrast(1.05)',
                                    zIndex: 0
                                }}
                            >
                                <source src={section.video} type="video/mp4" />
                            </video>

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
    );
};

export default Quiz2026;
