import Modal from '../components/Modal';
import '../styles/SimpleModal.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function SignUpModal({ isOpen, onClose, onSwitchToLogin }) {
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        if (isOpen) {
            setUserId('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setName('');
        }
    }, [isOpen]);

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/users/signup', {
                userId,
                email,
                password,
                name,
            });

            alert('회원가입 성공! 로그인 해주세요.');
            onSwitchToLogin(); // 로그인 모달로 전환
        } catch (error) {
            alert(`회원가입 실패: ${error.response?.data?.message || '서버 오류'}`);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="simple-modal-content">
                <h2>회원가입</h2>
                <input
                    type="text"
                    placeholder="이름"
                    className="simple-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="아이디"
                    className="simple-input"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="이메일"
                    className="simple-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    className="simple-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    className="simple-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="simple-btn" onClick={handleSignUp}>
                    회원가입
                </button>

                <p style={{ marginTop: '12px', fontSize: '14px' }}>
                    이미 계정이 있으신가요?{' '}
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#4caf50',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            padding: 0,
                        }}
                    >
                        로그인
                    </button>
                </p>
            </div>
        </Modal>
    );
}
