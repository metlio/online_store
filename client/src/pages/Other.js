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

    const questions = [
        {
            questionText: 'What is the capital of France?',
            answerOptions: [
                { answerText: 'New York', isCorrect: false },
                { answerText: 'London', isCorrect: false },
                { answerText: 'Paris', isCorrect: true },
                { answerText: 'Dublin', isCorrect: false },
            ],
        },
        {
            questionText: 'Who is CEO of Tesla?',
            answerOptions: [
                { answerText: 'Jeff Bezos', isCorrect: false },
                { answerText: 'Elon Musk', isCorrect: true },
                { answerText: 'Bill Gates', isCorrect: false },
                { answerText: 'Tony Stark', isCorrect: false },
            ],
        },
        {
            questionText: 'The iPhone was created by which company?',
            answerOptions: [
                { answerText: 'Apple', isCorrect: true },
                { answerText: 'Intel', isCorrect: false },
                { answerText: 'Amazon', isCorrect: false },
                { answerText: 'Microsoft', isCorrect: false },
            ],
        },
        {
            questionText: 'How many Harry Potter books are there?',
            answerOptions: [
                { answerText: '1', isCorrect: false },
                { answerText: '4', isCorrect: false },
                { answerText: '6', isCorrect: false },
                { answerText: '7', isCorrect: true },
            ],
        },
        {
            questionText: 'What is the largest planet in our solar system?',
            answerOptions: [
                { answerText: 'Earth', isCorrect: false },
                { answerText: 'Jupiter', isCorrect: true },
                { answerText: 'Mars', isCorrect: false },
                { answerText: 'Saturn', isCorrect: false },
            ],
        },
    ];

    return (
        <div style={{
            position: 'sticky',
            top: '0',
            width: '100vw',
            height: '100vh',
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
                        <h2>You scored {score} out of {questions.length}</h2>
                        <p>
                            {(() => {
                                const percentage = score / questions.length;
                                if (percentage === 1) return 'Flawless Victory!';
                                if (percentage >= 0.8) return 'Excellent!';
                                if (percentage >= 0.5) return 'Good job!';
                                return 'You can do better. Keep trying!';
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
