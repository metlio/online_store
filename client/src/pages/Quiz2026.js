import React from 'react';

const Quiz2026 = () => {
    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            backgroundColor: '#F4F3EF', // Warm Nordic off-white/light gray
            color: '#1C1C1C',
            fontFamily: "'Inter', sans-serif",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            boxSizing: 'border-box'
        }}>
            <div style={{
                maxWidth: '560px',
                width: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '4rem 3rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                border: '1px solid #EAE8E1',
                textAlign: 'center',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    display: 'inline-block',
                    padding: '0.35rem 0.85rem',
                    backgroundColor: '#EDECE6',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#666560',
                    marginBottom: '1.75rem'
                }}>
                    ВИКТОРИНА 2026
                </div>

                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: 300,
                    letterSpacing: '-0.03em',
                    lineHeight: '1.15',
                    margin: '0 0 1.25rem 0',
                    color: '#111111'
                }}>
                    Квиз
                </h1>

                <p style={{
                    fontSize: '1.05rem',
                    lineHeight: '1.65',
                    color: '#666660',
                    fontWeight: 400,
                    margin: '0 auto 2.75rem auto',
                    maxWidth: '400px'
                }}>
                    Приглашаем вас пройти новую викторину. Лаконичный дизайн, интересные вопросы и ничего лишнего.
                </p>

                <button
                    onClick={() => alert('Начало викторины')}
                    style={{
                        padding: '1.1rem 2.75rem',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                        backgroundColor: '#111111',
                        border: 'none',
                        borderRadius: '30px',
                        transition: 'transform 0.2s ease, opacity 0.2s ease',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.9';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    Начать викторину
                </button>
            </div>
        </div>
    );
};

export default Quiz2026;
