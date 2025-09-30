import React, { useState } from 'react';
import PaintIcon from "../components/logo.png";
import CartIcon from "../components/cart.png";

const Other = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const resultBackgroundImage = 'url(https://i.pinimg.com/originals/04/fc/a4/04fca40971c99476080805fd7f0a09a1.gif)';

    const questions = [
        {
            questionText: 'Как назывался пират, состоящий на службе у короны?',
            answerOptions: [
                { answerText: 'Капер', isCorrect: true },
                { answerText: 'Кемпер', isCorrect: false },
                { answerText: 'Бретёр', isCorrect: false },
                { answerText: 'Буханьер', isCorrect: false },
            ],
            backgroundImage: 'url(https://i.postimg.cc/dDdsvPvz/3.gif)',
        },
        {
            questionText: 'Какой стране принадлежал остров Тортуга?',
            answerOptions: [
                { answerText: 'Испании', isCorrect: false },
                { answerText: 'Голландии', isCorrect: false },
                { answerText: 'Франции', isCorrect: true },
                { answerText: 'России', isCorrect: false },
            ],
            backgroundImage: 'url(https://i.postimg.cc/H8GT534g/4.gif)',
        },
        {
            questionText: 'Сколько мачт у фрегата?',
            answerOptions: [
                { answerText: 'Четыре', isCorrect: false },
                { answerText: 'Три', isCorrect: true },
                { answerText: 'Две', isCorrect: false },
                { answerText: 'Одна', isCorrect: false },
            ],
            backgroundImage: 'url(https://i.postimg.cc/4KNyN8wb/pro.gif)',
        },
        {
            questionText: 'Что такое книппель?',
            answerOptions: [
                { answerText: 'Блюдо которым кормили моряков в XVIII веке', isCorrect: false },
                { answerText: 'Абордажная сабля', isCorrect: false },
                { answerText: 'Снаряд для разрушения такелажа и парусов', isCorrect: true },
                { answerText: 'Не знаю', isCorrect: false },
            ],
            backgroundImage: 'url(https://i.postimg.cc/sGpsJSwD/2.gif)',
        },
        {
            questionText: 'Что самое важное для настоящего пирата:',
            answerOptions: [
                { answerText: 'Бутылка рома', isCorrect: false },
                { answerText: 'Свистать всех наверх', isCorrect: false },
                { answerText: 'Избежать цинги', isCorrect: true },
                { answerText: 'Сьесть больше Цинго-Догов', isCorrect: false },
            ],
            backgroundImage: 'url(https://i.postimg.cc/vgxQcCnZ/5.gif)',
        },
    ];

    return (
        <div style={{
            position: 'sticky',
            top: '0',
            width: '100vw',
            height: '100vh',
            backgroundImage: showScore ? resultBackgroundImage : questions[currentQuestion].backgroundImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: '99'
        }}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <img src={PaintIcon} alt="My Image"/>
                <img src={CartIcon} alt="My Image"/>
            </div>
            <div style={{
                perspective: '50px',
                paddingTop: '10vh',
                fontSize: '24pt',
                fontFamily: "'Neucha', sans-serif",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'white',
                textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
            }}>
                {showScore ? (
                    <div className='score-section' style={{textAlign: 'center'}}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                            {Array.from({ length: score }).map((_, index) => (
                                <img
                                    key={index}
                                    src="https://media.tenor.com/jX0Ytn_JLcIAAAAj/mario-coins.gif"
                                    alt="coin"
                                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                />
                            ))}
                        </div>
                        <h2>Ты набрал {score} из {questions.length} монет</h2>
                        <p>
                            {(() => {
                                const percentage = score / questions.length;
                                if (percentage === 1) return 'Безупречная победа!';
                                if (percentage >= 0.8) return 'Отлично!';
                                if (percentage >= 0.5) return 'Хорошая работа!';
                                return 'Можно и лучше. Попробуй еще!';
                            })()}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className='question-section' style={{width: '100%', textAlign: 'center'}}>
                            <div className='question-text' style={{marginBottom: '20px'}}>{questions[currentQuestion].questionText}</div>
                        </div>
                        <div className='answer-section' style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                                    style={{
                                        fontFamily: "'Neucha', sans-serif",
                                        width: '50%',
                                        marginBottom: '10px',
                                        fontSize: '16pt',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        border: '2px solid #ffffff',
                                        backgroundColor: 'rgba(0,0,0,0.3)' ,
                                        color: 'white'
                                    }}
                                >
                                    {answerOption.answerText}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Other;
