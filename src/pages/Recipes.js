import { Link, useLocation } from 'react-router-dom';
import '../styles/Recipes.css';

export default function Recipes() {

    const location = useLocation();
    return (
        <div className="recipes-main">
            <h1>Recipes</h1>

            {/* Tabs */}
            <div className="recipes-tabs">
                <Link
                    to="/recipes"
                    className={location.pathname === '/recipes' ? 'active-tab' : ''}
                >
                    오늘의 식단
                </Link>
                <Link
                    to="/recipes/all"
                    className={location.pathname === '/recipes/all' ? 'active-tab' : ''}
                >
                    전체 레시피
                </Link>
            </div>

            {/* Meal Section */}
            <div className="meal-section-wrapper">
                <h3 className="section-title">냠잇이 추천하는 오늘의 맛있는 식단 🍽️</h3>
                <div className="meal-section">
                    <div className="meal-card">
                        <h3>아침</h3>
                        <p>🍌 오트밀 + 바나나</p>
                        <button className="recipe-link">레시피 보기 ➜</button>
                    </div>

                    <div className="meal-card">
                        <h3>점심</h3>
                        <p>🍗 닭가슴살 샐러드</p>
                        <button className="recipe-link">레시피 보기 ➜</button>
                    </div>

                    <div className="meal-card">
                        <h3>저녁</h3>
                        <p>🥗 연두부 샐러드</p>
                        <button className="recipe-link">레시피 보기 ➜</button>
                    </div>
                </div>
            </div>

            {/* Snack Section */}
            <div className="snack-section-wrapper">
                <h3 className="section-title">냠잇이 추천하는 건강한 간식 🍭</h3>
                <div className="snack-section">
                    <div className="snack-card">
                        <p>🥕 당근스틱 + 요거트</p>
                        <button className="recipe-link">레시피 보기 ➜</button>
                    </div>

                    <div className="snack-card">
                        <p>🍎 사과 슬라이스 + 땅콩버터</p>
                        <button className="recipe-link">레시피 보기 ➜</button>
                    </div>

                    <div className="snack-card">
                        <p>🥖 구운 병아리콩 한 줌</p>
                        <button className="recipe-link">레시피 보기 ➜</button>
                    </div>

                    <div className="snack-card">
                        <p>🥒 오이 + 발사믹 드레싱</p>
                        <button className="recipe-link">레시피 보기 ➜</button>
                    </div>

                    <div className="snack-card">
                        <p>🍅 방울토마토 한 줌</p>
                        <button className="recipe-link">레시피 보기 ➜</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
