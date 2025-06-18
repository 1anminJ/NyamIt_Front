import { Link, useLocation } from 'react-router-dom';

export default function AllRecipes() {
    const location = useLocation();

    return (
        <div className="recipes-main">
            <h1>Recipes</h1>

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

            <div className="section-title">전체 레시피 목록 🍽️</div>

            <div className="recipes-section">
                <div className="recipes-card">
                    <h3>🥪 햄치즈 토스트</h3>
                    <button className="recipe-link">레시피 보기 ➜</button>
                </div>
                <div className="recipes-card">
                    <h3>🍗 닭가슴살 샐러드</h3>
                    <button className="recipe-link">레시피 보기 ➜</button>
                </div>
                <div className="recipes-card">
                    <h3>🥗 연두부 샐러드</h3>
                    <button className="recipe-link">레시피 보기 ➜</button>
                </div>
                <div className="recipes-card">
                    <h3>🥗 연어 샐러드</h3>
                    <button className="recipe-link">레시피 보기 ➜</button>
                </div>
            </div>
        </div>
    );
}
