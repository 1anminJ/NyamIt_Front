import { useState, useEffect } from 'react';
import '../styles/Fasting.css';

export default function Fasting() {
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const [fastingHistory, setFastingHistory] = useState([
        { day: '월', duration: '15시간 23분' },
        { day: '화', duration: '16시간 00분' },
        { day: '수', duration: '14시간 45분' },
        { day: '목', duration: '-' },
        { day: '금', duration: '-' },
        { day: '토', duration: '-' },
        { day: '일', duration: '-' },
    ]);

    useEffect(() => {
        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isRunning, startTime]);

    const handleStart = () => {
        if (!isRunning) {
            setStartTime(Date.now());
            setElapsedTime(0);
            setIsRunning(true);
        }
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setStartTime(null);
        setElapsedTime(0);
        setIsRunning(false);
    };

    const formatElapsedTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')}시간 ${String(minutes).padStart(2, '0')}분 ${String(seconds).padStart(2, '0')}초`;
    };

    const formattedElapsedTime = formatElapsedTime(elapsedTime);

    return (
        <div className="fasting-main">
            <h1>Fasting</h1>

            <div className="fasting-top">
                <div className="fasting-status-card fasting-card">
                    <p>홍길동님은 간헐적 단식을<br />16:8 비율로 진행 중이십니다.</p>
                    <h2>📌 시작한 지 5일째</h2>
                    <p>지금은 '지방 연소' 구간에 진입했어요!<br />조금만 더 화이팅!</p>
                </div>

                <div className="fasting-timer-card fasting-card">
                    <div className="timer-text">
                        <h2>
                            {startTime
                                ? formattedElapsedTime
                                : '아직 단식 시작 전입니다.'}
                        </h2>
                    </div>

                    <div className="fasting-buttons">
                        <button className="start-btn" onClick={handleStart}>시작하기</button>
                        <button className="stop-btn" onClick={handleStop}>그만하기</button>
                        <button className="reset-btn" onClick={handleReset}>리셋하기</button>
                    </div>
                </div>

                <div className="fasting-history-card fasting-card">
                    <h3>최근 7일 단식 기록</h3>
                    <ul className="history-list">
                        {fastingHistory.map((record, index) => (
                            <li key={index}>
                                {record.day}: {record.duration}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="fasting-info-text">
                <h2>단식이 왜 몸에 좋을까요?</h2>
                <p>
                    간헐적 단식은 인슐린 민감도를 개선하여 혈당 조절에 도움을 주고,<br />
                    세포의 자가포식(Autophagy) 작용을 활성화하여 노화 방지에 긍정적인 영향을 미칩니다.<br />
                    또한 체내 에너지원으로 지방이 더 많이 사용되도록 유도하여 체중 감량에 효과적입니다.<br />
                    장기적으로는 만성 염증 수치 감소, 심혈관 건강 증진, 뇌 기능 개선 등의 다양한 건강상의 이점을 제공합니다.<br />
                    무엇보다도, 식사와 식사 사이의 충분한 공복 시간을 확보함으로써 소화기계에 휴식 시간을 제공하고<br />
                    몸 전체의 항상성 유지에 도움을 줍니다.
                </p>
            </div>
        </div>
    );
}
