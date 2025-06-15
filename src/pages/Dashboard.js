import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

export default function Dashboard({ userName }) {
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
                    <p>아침 - 현미밥 1공기 + 달걀 프라이 1개 + 방울토마토 + 두유</p>
                    <p>점심 - 닭가슴살 샐러드 + 고구마 100g + 미소된장국</p>
                    <p>저녁 - 보리밥 + 고등어구이 + 나물 반찬 2종 + 김치</p>
                </Link>

                <div className="dashboard-card fasting-card">
                    <h2>단식 상태</h2>
                    <div className="chart-placeholder">여기에 차트 들어감</div>
                    <p>
                        간헐적 단식(16:8)을 시작한 지 5일째입니다.
                        <br />
                        지금은 '지방 연소' 구간에 진입했어요!
                    </p>
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
