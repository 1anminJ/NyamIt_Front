import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Fasting.css';
import { FaSyncAlt } from 'react-icons/fa';

export default function Fasting({ userName }) {
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [randomMessage, setRandomMessage] = useState('');

    const [fastingHistory, setFastingHistory] = useState([]);
    const [fastingDays, setFastingDays] = useState(0);

    const token = sessionStorage.getItem('jwtToken');

    const encouragementMessages = [
        "🔥 오늘도 지방 불태우자! 파이어~",
        "⏳ 공복은 잠자는 세포를 깨운다! 깨어나라 자가포식!",
        "💪 단식은 멘탈 게임! 넌 할 수 있어!",
        "😎 간헐적 단식? 이건 나한테 간식이지~",
        "🚫 먹지 않는 것도 선택이야. 건강한 선택!",
        "🥇 단식 챔피언 예약 중~ 오늘도 기록 갱신!",
        "🍵 물 많이 마시고 화이팅!",
        "🐷 단식 중이니까 돼지꿈 꿔도 괜찮아~",
        "📉 체지방이 줄어드는 소리 들리나요?",
        "🎯 목표는 건강! 오늘도 꾸준히 GO!",
    ];

    useEffect(() => {
        if (token) fetchWeeklyFasting();
    }, [token]);

    useEffect(() => {
        setRandomMessage(encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]);
    }, []);

    const fetchWeeklyFasting = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/fasting/weekly`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { records, fastingDays } = response.data;
            const daysKor = ['일', '월', '화', '수', '목', '금', '토'];

            const updatedHistory = Array(7).fill(null).map((_, i) => ({
                day: daysKor[i],
                duration: '-',
            }));

            records.forEach(record => {
                const date = new Date(record.date);
                const weekday = date.getDay();

                const hours = Math.floor(record.durationMinutes / 60);
                const minutes = record.durationMinutes % 60;

                updatedHistory[weekday] = {
                    day: daysKor[weekday],
                    duration: `${hours}시간 ${minutes}분`
                };
            });

            setFastingHistory(updatedHistory);
            setFastingDays(fastingDays);
            console.log('단식 기록 조회 성공!');
        } catch (error) {
            console.error('단식 기록 조회 실패:', error);
        }
    };

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

    const handleStop = async () => {
        setIsRunning(false);
        const minutes = Math.floor(elapsedTime / 60000);
        try {
            await axios.post(`http://localhost:8080/api/fasting/record`, {
                durationMinutes: minutes
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('단식 기록이 저장되었습니다!');
            fetchWeeklyFasting();
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
                    <p>{userName ? `${userName}님` : '로그인해주세요.'}은 간헐적 단식을<br />16:8 비율로 진행 중이십니다.</p>
                    <h2>📌 시작한 지 {fastingDays}일째</h2>
                    <p>{randomMessage}</p>
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
                    <div className="card-header">
                        <h3>최근 7일 단식 기록</h3>
                        <FaSyncAlt
                            onClick={fetchWeeklyFasting}
                            className="refresh-icon"
                            title="새로고침"
                        />
                    </div>

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
                단식은 단순히 음식을 제한하는 것을 넘어, 신체 기능을 재조정하고 건강을 회복하는 데 도움을 주는 효과적인 방법입니다.
                일정 시간 공복을 유지하면 인슐린 수치가 낮아지고 인슐린 민감도가 향상되어 혈당 조절과 체지방 연소에 유리한 환경이 조성됩니다.
                또한 단식 중에는 세포의 자가포식(Autophagy) 작용이 활성화되어 손상된 세포 구성 요소를 분해하고, 노폐물을 제거함으로써
                세포 재생을 촉진하고 노화를 늦추는 데 도움이 됩니다. 이 외에도 염증 감소, 심장 및 뇌 건강 증진, 면역력 향상 등 다양한 이점이 보고되고 있으며,
                꾸준한 간헐적 단식은 일상 속에서 실천 가능한 건강 관리 습관으로 주목받고 있습니다.
            </p>

            <div className="fasting-info-table">
                <table>
                    <thead>
                        <tr>
                            <th>효과</th>
                            <th>설명</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>혈당 조절</strong></td>
                            <td>인슐린 민감도를 높여 혈당 수치를 안정적으로 유지하고 제2형 당뇨 예방에 기여</td>
                        </tr>
                        <tr>
                            <td><strong>체중 감량</strong></td>
                            <td>체내 에너지로 저장된 지방을 효과적으로 연소시켜 체중을 줄이는 데 도움</td>
                        </tr>
                        <tr>
                            <td><strong>세포 재생</strong></td>
                            <td>자가포식(Autophagy) 작용을 통해 손상된 세포를 정리하고 새로운 세포 생성을 촉진</td>
                        </tr>
                        <tr>
                            <td><strong>노화 방지</strong></td>
                            <td>세포 노폐물 제거와 산화 스트레스 감소로 피부와 전신 노화 속도 감소</td>
                        </tr>
                        <tr>
                            <td><strong>염증 억제</strong></td>
                            <td>염증 수치(CRP 등)를 감소시켜 만성 질환 예방 및 면역력 향상</td>
                        </tr>
                        <tr>
                            <td><strong>심혈관 건강</strong></td>
                            <td>중성지방과 콜레스테롤 수치 감소로 심장 질환 예방</td>
                        </tr>
                        <tr>
                            <td><strong>뇌 기능 개선</strong></td>
                            <td>신경세포 보호 및 뇌유래신경영양인자(BDNF) 증가로 기억력, 집중력 향상</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        </div>
    );
}
