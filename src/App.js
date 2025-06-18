import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AllRecipes from './pages/AllRecipes';
import Recipes from './pages/Recipes';
import Fasting from './pages/Fasting';
import AuthModal from './pages/AuthModal';
import SettingsModal from './pages/SettingsModal';
import './App.css';
import ProfileModal from './pages/ProfileModal';

import { jwtDecode } from 'jwt-decode';
import Community from "./pages/Community";

function App() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('jwtToken'));
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const [userName, setUserName] = useState(() => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                return decodedToken.name || decodedToken.sub || '';
            } catch (error) {
                console.error('JWT 디코딩 오류:', error);
            }
        }
        return '';
    });

    const handleLoginSuccess = () => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserName(decodedToken.name || decodedToken.sub || '');
            } catch (error) {
                console.error('JWT 디코딩 오류:', error);
            }
        }
        setIsLoggedIn(true);
        setIsAuthOpen(false);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        setUserName('');
    };

    return (
        <BrowserRouter>
            <div className="app">
                <Sidebar
                    isLoggedIn={isLoggedIn}
                    onLoginClick={() => setIsAuthOpen(true)}
                    onSettingsClick={() => setIsSettingsOpen(true)}
                    onLogoutClick={handleLogout}
                    onProfileClick={() => setIsProfileOpen(true)}
                />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard userName={userName} />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/recipes/all" element={<AllRecipes />} />
                    <Route path="/fasting" element={<Fasting userName={userName} />} />
                    <Route path="/community" element={<Community/>}/>
                </Routes>

                <AuthModal
                    isOpen={isAuthOpen}
                    onClose={() => setIsAuthOpen(false)}
                    onLoginSuccess={handleLoginSuccess}
                />

                <SettingsModal
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                />

                <ProfileModal
                    isOpen={isProfileOpen}
                    onClose={() => setIsProfileOpen(false)}
                    userId={1} // 실제론 JWT에서 userId를 파싱해서 넣는 게 좋음
                />
            </div>
        </BrowserRouter>
    );
}

export default App;
