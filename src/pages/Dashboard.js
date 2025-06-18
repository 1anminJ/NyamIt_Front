import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/Dashboard.css';

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

export default function Dashboard({ userName }) {
    const [chartData, setChartData] = useState([]);
    const [randomMessage, setRandomMessage] = useState('');
    const token = sessionStorage.getItem('jwtToken');

    useEffect(() => {
        setRandomMessage(encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]);
    }, []);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/fasting/weekly', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { records } = response.data;
                const daysKor = ['일', '월', '화', '수', '목', '금', '토'];

                const data = Array(7).fill(null).map((_, i) => ({
                    day: daysKor[i],
                    duration: 0,
                }));

                records.forEach(record => {
                    const date = new Date(record.date);
                    const dayIdx = date.getDay();
                    data[dayIdx].duration = record.durationMinutes;
                });

                setChartData(data);
            } catch (err) {
                console.error('차트 데이터 불러오기 실패:', err);
            }
        };

        fetchChartData();
    }, []);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const minutes = payload[0].value;
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;

            return (
                <div style={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '10px',
                    boxShadow: '0 0 8px rgba(0,0,0,0.15)',
                }}>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
                    <p style={{ margin: 0, color: '#4caf50' }}>
                        단식 시간: {hours}시간 {mins}분
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="dashboard-main">
            <h1>Dashboard</h1>

            <div className="dashboard-card greeting-card">
                <p className="greeting-text">
                    안녕하세요, {userName ? `${userName}님` : '로그인해주세요.'}
                </p>
                <p className="greeting-subtext">오늘도 냠잇과 함께 건강한 하루 보냅시다~</p>
            </div>

            <div className="dashboard-section">
                <Link to="/recipes" className="dashboard-card meal-card">
                    <h2>오늘의 식단 추천</h2>
                    <p>{userName ? `${userName}님` : '고객'}을 위한 건강식단 입니다!</p>
                    <p>아침 - 🍌 오트밀 + 바나나</p>
                    <p>점심 - 🍗 닭가슴살 샐러드</p>
                    <p>저녁 - 🥗 연두부 샐러드</p>
                </Link>

                <div className="dashboard-card fasting-card">
                    <h2>단식 상태</h2>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={chartData}>
                                <XAxis dataKey="day"/>
                                <YAxis
                                    label={{
                                        value: '단식 시간 (분)',
                                        angle: -90,
                                        position: 'insideLeft', // ✅ 안쪽 → 바깥쪽으로 변경
                                        offset: 20,
                                        style: { textAnchor: 'middle', fill: '#555', fontSize: 14 }
                                    }}
                                    width={80} // ✅ 여백 확보
                                    />

                                <Tooltip content={<CustomTooltip/>}/>
                                <Bar dataKey="duration" fill="#B7DFAB"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="fasting-card-text">{randomMessage}</p>
                </div>
            </div>

            <div className="dashboard-card info-card">
                <Link to="/fasting" className="info-card">
                    <h3>단식이 왜 몸에 좋을까요?</h3>
                    <p>
                        단식은 인슐린 민감도를 개선하고, 세포의 자가포식(Autophagy)을 촉진하여 노화 방지 및 체중 관리에 도움을 줍니다.
                    </p>
                </Link>
            </div>
        </div>
    );
}
