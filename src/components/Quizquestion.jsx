import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import he from "he";
import { onValue, ref, runTransaction, update } from "firebase/database";
import { db } from "../Firebase/Firebase";
import { useNavigate } from "react-router";

const Quizquestion = () => {
    const [timeLeft, setTimeLeft] = useState(15); // Timer (hardcoded to 15 seconds)
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [selectedOption, setSelectedOption] = useState()
    const { loading, error } = useSelector((state) => state.room);
    const room = useSelector((state) => state.room.room);
    const roomCode = sessionStorage.getItem("roomCode")
    const navigate = useNavigate()
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            updateQuestion()
            updateScoreIfCorrect()
        }
    }, [timeLeft]);


    useEffect(() => {
        if (!room) return
        setQuestions(room.questionDB.results)
        const currentQuestionRef = ref(db, 'rooms/' + roomCode + '/currentQuestion');
        onValue(currentQuestionRef, (snapshot) => {
            const data = snapshot.val();
            setCurrentQuestion(data)
            setCurrentIndex(data.index)
            console.log(currentQuestion, currentIndex)

        });
    }, [roomCode, room])

    const updateQuestion = async () => {
        if (questions.length === 0) return;

        const nextIndex = currentIndex + 1 // Loop back if end reached
        if (nextIndex === questions.length) {
            navigate('/Winnerpage')
        }

        const updateQue = {
            [`rooms/${roomCode}/currentQuestion`]: questions[nextIndex],
        };

        try {
            await update(ref(db), updateQue);
            console.log("Room Updated: Next Question Set");
        } catch (error) {
            console.error("Failed to update question:", error);
        }
        const updateIndex = {
            [`rooms/${roomCode}/currentQuestion/index`]: nextIndex
        };

        try {
            await update(ref(db), updateIndex);
            console.log("Room Updated: Next Question Set");
        } catch (error) {
            console.error("Failed to update question:", error);
        }

        // Reset timer
        setTimeLeft(15)
    }

    const updateScoreIfCorrect = async () => {
        const playerID = localStorage.getItem("currentPlayerID")
        if (selectedOption !== currentQuestion.correct_answer) return; // ✅ No update if the answer is wrong

        const scoreRef = ref(db, `rooms/${roomCode}/players/${playerID}/score`);

        // Transaction ensures the score updates correctly even if multiple users are updating
        await runTransaction(scoreRef, (currentScore) => (currentScore || 0) + 10);

        console.log(`✅ Score updated for Player: ${playerID}`);
    };
    useEffect(() => {
        if (currentQuestion) {
            const allAnswers = [currentQuestion.correct_answer].concat(currentQuestion.incorrect_answers);
            setShuffledAnswers(shuffleArray(allAnswers))
        }
    }, [currentQuestion])


    function shuffleArray(allOptions) {
        for (let i = allOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]]; // Swap elements
        }
        return allOptions;
    }

    // console.log(allAnswers)


    // Handle loading state
    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-lg font-bold text-gray-700">Loading...</p>
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-lg font-bold text-red-500">
                    Error: {error || "Unable to load room details"}
                </p>
            </div>
        );
    }

    // Handle case when room data is not available yet
    if (!room) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-lg font-bold text-gray-500">Room data is not available.</p>
            </div>
        );
    }
    return (
        currentQuestion && (
            <div className="relative bg-white/90 rounded-lg shadow-2xl h-[90%] w-11/12 lg:w-3/4 flex flex-col justify-between p-6">
                {/* BrainBrew Heading */}

                {/* Timer and Question */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold text-[#333333]">Question {currentQuestion.index}</h2>
                    <div className="bg-red-500 text-white font-bold text-lg px-4 py-2 rounded-full">
                        {timeLeft} sec
                    </div>
                </div>

                {/* Question */}
                <div className="mb-6">
                    <p className="text-2xl font-medium text-[#333333]">
                        {he.decode(currentQuestion.question)}
                    </p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {shuffledAnswers.map((answer, index) => (
                        <button
                            key={index}
                            value={answer}
                            className={`font-semibold py-3 px-4 rounded-lg transition-colors duration-200 ${selectedOption === answer ? "bg-yellow-400 text-black" : "bg-blue-500 text-white hover:bg-blue-600"
                                }`}
                            onClick={(e) => setSelectedOption(e.target.value)}
                        >
                            {String.fromCharCode(65 + index)}. {he.decode(answer)}
                        </button>
                    ))}
                </div>
            </div>
        )
    );
};

export default Quizquestion;