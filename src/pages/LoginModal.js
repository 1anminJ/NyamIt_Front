import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import '../styles/SimpleModal.css';

console.log('SignUpModal 렌더링됨');
export default function SignUpModal({ isOpen, onClose }) {
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    // 모달 열릴 때마다 input 초기화
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
                userId: userId,
                email: email,
                password: password,
                name: name, // 임시로 userId를 이름으로 — 필요시 별도 name 필드 받을 수 있음
            });

            alert('회원가입 성공!');
            onClose(); // 모달 닫기
        } catch (error) {
            console.error('회원가입 실패:', error.response?.data);
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
            </div>
        </Modal>
    );
}
