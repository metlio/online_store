
import React, { useState } from 'react';
import PaintIcon from "../components/logo.gif";
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

    const resultBackgroundImage = 'url(https://i.pinimg.com/originals/e4/15/c4/e415c48c6387706cc02f92b09501cab5.gif)';

    const questions = [
        {
            questionText: 'Как назывался пират, состоящий на службе у короны?',
            answerOptions: [
                { answerText: 'Капер', isCorrect: true },
                { answerText: 'Кемпер', isCorrect: false },
                { answerText: 'Бретёр', isCorrect: false },
                { answerText: 'Буханьер', isCorrect: false },
            ],
            backgroundImage: 'url(https://64.media.tumblr.com/f81cdad7521ff144861c006eff3e39bc/19415e9c6221e0f4-e7/s1280x1920/2268169d1ea0fd62d3082f6b52714dbc67adbbfb.gif)',
        },
        {
            questionText: 'Какой стране принадлежал остров Тортуга?',
            answerOptions: [
                { answerText: 'Испании', isCorrect: false },
                { answerText: 'Голландии', isCorrect: false },
                { answerText: 'Франции', isCorrect: true },
                { answerText: 'России', isCorrect: false },
            ],
            backgroundImage: 'url(https://f.simpleminecraft.ru/uploads/monthly_2020_01/624058593_TinderHeader.gif.3c34e00467139834d99d9b52413670e4.gif)',
        },
        {
            questionText: 'Сколько мачт у фрегата?',
            answerOptions: [
                { answerText: 'Четыре', isCorrect: false },
                { answerText: 'Три', isCorrect: true },
                { answerText: 'Две', isCorrect: false },
                { answerText: 'Одна', isCorrect: false },
            ],
            backgroundImage: 'url(https://gifdb.com/images/high/sailing-vessel-in-the-ocean-a4n7xwhsukx7jgwm.gif)',
        },
        {
            questionText: 'Что такое книппель?',
            answerOptions: [
                { answerText: 'Блюдо которым кормили моряков в XVIII веке', isCorrect: false },
                { answerText: 'Абордажная сабля', isCorrect: false },
                { answerText: 'Снаряд для разрушения такелажа и парусов', isCorrect: true },
                { answerText: 'Не знаю', isCorrect: false },
            ],
            backgroundImage: 'url(https://i.imgur.com/aYJ6ZYV.gif)',
        },
        {
            questionText: 'Что самое важное для настоящего пирата:',
            answerOptions: [
                { answerText: 'Бутылка рома', isCorrect: false },
                { answerText: 'Свистать всех наверх', isCorrect: false },
                { answerText: 'Избежать цинги', isCorrect: true },
                { answerText: 'Сьесть больше Цинго-Догов', isCorrect: false },
            ],
            backgroundImage: 'url(https://i.pinimg.com/originals/4c/1a/4d/4c1a4d9cdaef56ab9cd11052364fbc19.gif)',
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
                        <h2>
                            {(() => {
                                const percentage = score / questions.length;
                                if (percentage === 1) return 'Невероятные познания, вам позавидует даже Антон Ночевной';
                                if (percentage >= 0.8) return 'Прекрасно, прекрасно! Вы невероятны, капитан!';
                                if (percentage >= 0.5) return 'Аргххх! Попей-ка ещё рома, старина! Прийди в себя!';
                                return 'Давай-ка сьедим по кусочку апельсина, я всё обьясню!';
                            })()}
                        </h2>
                    </div>
                ) : (
                    <>
                        <div className='question-section' style={{width: '100%', textAlign: 'center'}}>
                            <div className='question-text' style={{padding: '10px', marginBottom: '40px'}}>{questions[currentQuestion].questionText}</div>
                        </div>
                        <div className='answer-section' style={{padding: '10px', marginBottom:'10px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
