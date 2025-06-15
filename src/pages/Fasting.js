import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Fasting.css';

export default function Fasting() {
    const userId = 1; // 테스트용, 이후 로그인된 사용자 정보로 교체
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const [fastingHistory, setFastingHistory] = useState([]);
    const [fastingDays, setFastingDays] = useState(0);


    useEffect(() => {
        const fetchWeeklyFasting = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/fasting/weekly/1'); // userId 하드코딩

                const { records, fastingDays } = response.data;

                const daysKor = ['일', '월', '화', '수', '목', '금', '토'];

                const updatedHistory = Array(7).fill(null).map((_, i) => ({
                    day: daysKor[i],
                    duration: '-',
                }));

                records.forEach(record => {
                    const date = new Date(record.date);
                    const weekday = date.getDay(); // 0~6 (일~토)

                    const hours = Math.floor(record.durationMinutes / 60);
                    const minutes = record.durationMinutes % 60;

                    updatedHistory[weekday] = {
                        day: daysKor[weekday],
                        duration: `${hours}시간 ${minutes}분`
                    };
                });

                setFastingHistory(updatedHistory);
                setFastingDays(fastingDays); // "시작한 지 n일째"에 사용할 변수
            } catch (err) {
                console.error('단식 기록 조회 실패:', err);
            }
        };

        fetchWeeklyFasting();
    }, []);


    // ⏱ 단식 타이머 효과
    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, startTime]);

    // 📡 단식 기록 조회 (7일)
    const fetchWeeklyFasting = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/fasting/weekly/${userId}`);
            const { records, fastingDays } = response.data;
            setFastingHistory(records);
            setFastingDays(fastingDays);
        } catch (error) {
            console.error('단식 기록 조회 실패:', error);
        }
    };

    useEffect(() => {
        fetchWeeklyFasting();
    }, []);

    const handleStart = () => {
        if (!isRunning) {
            setStartTime(Date.now());
            setElapsedTime(0);
            setIsRunning(true);
        }
    };

    const handleStop = async () => {
        setIsRunning(false);
        const minutes = Math.floor(elapsedTime / 60000);
        try {
            await axios.post(`http://localhost:8080/api/fasting/record`, {
                userId: userId,
                durationMinutes: minutes,
            });
            alert('단식 기록이 저장되었습니다!');
            fetchWeeklyFasting(); // 갱신
        } catch (error) {
            console.error('단식 기록 저장 실패:', error);
        }
    };

    const handleReset = () => {
        setStartTime(null);
        setElapsedTime(0);
        setIsRunning(false);
    };

    const formatElapsedTime = (ms) => {
        const totalSec = Math.floor(ms / 1000);
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        return `${String(h).padStart(2, '0')}시간 ${String(m).padStart(2, '0')}분 ${String(s).padStart(2, '0')}초`;
    };

    return (
        <div className="fasting-main">
            <h1>Fasting</h1>
            <div className="fasting-top">
                <div className="fasting-status-card fasting-card">
                    <p>홍길동님은 간헐적 단식을<br />16:8 비율로 진행 중이십니다.</p>
                    <h2>📌 시작한 지 {fastingDays}일째</h2>
                    <p>지금은 '지방 연소' 구간에 진입했어요!<br />조금만 더 화이팅!</p>
                </div>

                <div className="fasting-timer-card fasting-card">
                    <div className="timer-text">
                        <h2>
                            {startTime ? formatElapsedTime(elapsedTime) : '아직 단식 시작 전입니다.'}
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
                        {fastingHistory.map((record, idx) => (
                            <li key={idx}>{record.day}: {record.duration}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="fasting-info-text">
                <h2>단식이 왜 몸에 좋을까요?</h2>
                <p>
                    간헐적 단식은 인슐린 민감도를 개선하고 세포의 자가포식(Autophagy)을 촉진하여<br />
                    노화 방지 및 체중 관리에 도움을 줍니다.
                </p>
            </div>
        </div>
    );
}
