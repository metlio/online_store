import React from 'react';

const Quiz2026 = () => {
    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            width: '100vw',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            color: '#FFFFFF',
            boxSizing: 'border-box',
            padding: '1.5rem'
        }}>
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    minWidth: '100%',
                    minHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    zIndex: 0,
                    transform: 'translate(-50%, -50%)',
                    objectFit: 'cover',
                    filter: 'brightness(0.65) contrast(1.05)'
                }}
            >
                <source src="https://imgcdn.stablediffusionweb.com/tmp/2026/9/29/537799df-1ec8-48a4-b3a7-ef1f79c74883.mp4" type="video/mp4" />
            </video>

            {/* Subtle Overlay gradient for depth */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)',
                zIndex: 1,
                pointerEvents: 'none'
            }} />

            {/* Minimalist Card Container */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                maxWidth: '520px',
                width: '100%',
                background: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                borderRadius: '24px',
                padding: '3.5rem 2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    display: 'inline-block',
                    padding: '0.4rem 1rem',
                    background: 'rgba(255, 255, 255, 0.12)',
                    borderRadius: '30px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                }}>
                    ВИКТОРИНА 2026
                </div>

                <h1 style={{
                    fontSize: '3.25rem',
                    fontWeight: 300,
                    letterSpacing: '-0.04em',
                    lineHeight: '1.1',
                    margin: '0 0 1.25rem 0',
                    color: '#FFFFFF',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                }}>
                    Квиз 2026
                </h1>

                <p style={{
                    fontSize: '1.05rem',
                    lineHeight: '1.7',
                    color: 'rgba(255, 255, 255, 0.82)',
                    fontWeight: 300,
                    margin: '0 auto 2.5rem auto',
                    maxWidth: '420px',
                    letterSpacing: '0.01em'
                }}>
                    Приглашаем вас пройти новую викторину. Лаконичный дизайн, интересные вопросы и ничего лишнего.
                </p>

                <button
                    onClick={() => alert('Начало викторины')}
                    style={{
                        padding: '1.15rem 3rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#0D0D0D',
                        backgroundColor: '#FFFFFF',
                        border: 'none',
                        borderRadius: '40px',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: '0 8px 25px rgba(255, 255, 255, 0.25)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 12px 30px rgba(255, 255, 255, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.25)';
                    }}
                >
                    Начать викторину
                </button>
            </div>
        </div>
    );
};

export default Quiz2026;
