import '../styles/Sidebar.css';
import { Link } from 'react-router-dom';
import settingsIcon from '../assets/settings.png';
import loginIcon from '../assets/login.png';

export default function Sidebar({ onLoginClick, onSignUpClick, onSettingsClick }) {
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
                <button type="button" className="sidebar-bottom-btn" onClick={onSettingsClick}>
                    <img src={settingsIcon} alt="Settings" className="sidebar-icon" /> Settings
                </button>
                <button type="button" className="sidebar-bottom-btn" onClick={onLoginClick}>
                    <img src={loginIcon} alt="Login" className="sidebar-icon" /> Login
                </button>
                {/*<button type="button" className="sidebar-bottom-btn" onClick={onSignUpClick}>*/}
                {/*    🔑 Sign up*/}
                {/*</button>*/}
            </div>
        </div>
    );
}
