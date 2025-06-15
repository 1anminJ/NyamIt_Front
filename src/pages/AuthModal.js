import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import '../styles/SimpleModal.css';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName('');
            setUserId('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setIsSignUpMode(false); // 열릴 때 기본은 로그인
        }
    }, [isOpen]);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                userId,
                password,
            });
            const token = response.data;
            sessionStorage.setItem('jwtToken', token);
            alert('로그인 성공!');
            onLoginSuccess();
            onClose();
        } catch (error) {
            alert(`로그인 실패: ${error.response?.data?.message || '서버 오류'}`);
        }
    };

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/users/signup', {
                userId,
                name,
                email,
                password,
            });
            alert('회원가입 성공! 이제 로그인해주세요.');
            setIsSignUpMode(false);
        } catch (error) {
            alert(`회원가입 실패: ${error.response?.data?.message || '서버 오류'}`);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="simple-modal-content">
                <h2>{isSignUpMode ? '회원가입' : '로그인'}</h2>

                {isSignUpMode && (
                    <input
                        type="text"
                        placeholder="이름"
                        className="simple-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                )}
                <input
                    type="text"
                    placeholder="아이디"
                    className="simple-input"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                {isSignUpMode && (
                    <input
                        type="email"
                        placeholder="이메일"
                        className="simple-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                )}
                <input
                    type="password"
                    placeholder="비밀번호"
                    className="simple-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUpMode && (
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        className="simple-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                )}

                <button className="simple-btn" onClick={isSignUpMode ? handleSignUp : handleLogin}>
                    {isSignUpMode ? '회원가입' : '로그인'}
                </button>

                <p style={{ marginTop: '12px', fontSize: '14px' }}>
                    {isSignUpMode ? '이미 계정이 있으신가요? ' : '계정이 없으신가요? '}
                    <button
                        type="button"
                        onClick={() => setIsSignUpMode(!isSignUpMode)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#4caf50',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            padding: 0,
                        }}
                    >
                        {isSignUpMode ? '로그인' : '회원가입'}
                    </button>
                </p>
            </div>
        </Modal>
    );
}
