import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AllRecipes from './pages/AllRecipes';
import Recipes from './pages/Recipes';
import Fasting from './pages/Fasting';
import './App.css';

// 모달 import
import LoginModal from './pages/LoginModal';
import SignUpModal from './pages/SignUpModal';
import SettingsModal from './pages/SettingsModal';

function App() {
    // 모달 상태 관리
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // 로그인 여부 상태
    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('jwtToken')); // 초기값 → 세션에 토큰 있으면 true

    // 로그인 성공 시 호출할 핸들러
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setIsLoginOpen(false); // 모달 닫기
    };

    // 로그아웃 핸들러
    const handleLogout = () => {
        sessionStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
    };

    return (
        <BrowserRouter>
            <div className="app">
                <Sidebar
                    isLoggedIn={isLoggedIn}
                    onLoginClick={() => setIsLoginOpen(true)}
                    onSignUpClick={() => setIsSignUpOpen(true)}
                    onSettingsClick={() => setIsSettingsOpen(true)}
                    onLogoutClick={handleLogout} // 로그아웃 핸들러 추가
                />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/recipes/all" element={<AllRecipes />} />
                    <Route path="/fasting" element={<Fasting />} />
                    <Route path="/community" />
                </Routes>

                {/* 모달 컴포넌트 */}
                <LoginModal
                    isOpen={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                    onLoginSuccess={handleLoginSuccess} // 로그인 성공 핸들러 추가
                />
                <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
                <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            </div>
        </BrowserRouter>
    );
}

export default App;
