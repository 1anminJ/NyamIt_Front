import '../styles/Sidebar.css';
import { Link } from 'react-router-dom';
import settingsIcon from '../assets/settings.png';
import loginIcon from '../assets/login.png';
import logoutIcon from '../assets/logout.png';
import profileIcon from '../assets/profile.png';

export default function Sidebar({ isLoggedIn, onLoginClick, onSignUpClick, onSettingsClick, onLogoutClick, onProfileClick }) {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">냠잇(NyamIt)</h2>
            <nav className="sidebar-nav">
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/recipes">Recipes</Link>
                <Link to="/fasting">Fasting</Link>
                <Link to="/community">Community</Link>
            </nav>

            <div className="sidebar-bottom">
                {isLoggedIn ? (
                    <>
                        <button type="button" className="sidebar-bottom-btn" onClick={onProfileClick}>
                            <img src={profileIcon} alt="Profile" className="sidebar-icon"/>
                            Profile
                        </button>
                        <button type="button" className="sidebar-bottom-btn" onClick={onLogoutClick}>
                            <img src={logoutIcon} alt="Logout" className="sidebar-icon"/>
                            Logout
                        </button>
                    </>
                ) : (
                    <button type="button" className="sidebar-bottom-btn" onClick={onLoginClick}>
                        <img src={loginIcon} alt="Login" className="sidebar-icon"/>
                        Login
                    </button>
                )}
            </div>
        </div>
)
    ;
}
