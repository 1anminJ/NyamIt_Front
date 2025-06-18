import Modal from '../components/Modal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SimpleModal.css';

export default function ProfileModal({ isOpen, onClose }) {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        height: '',
        weight: '',
    });

    // 프로필 불러오기
    useEffect(() => {
        if (isOpen) {
            const token = sessionStorage.getItem('jwtToken');
            axios.get('http://localhost:8080/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    const data = res.data;
                    setProfile({
                        name: data.name,
                        email: data.email,
                        height: data.height || '',
                        weight: data.weight || '',
                    });
                })
                .catch((err) => {
                    console.error('프로필 불러오기 실패:', err);
                });
        }
    }, [isOpen]);

    // 저장 요청
    const handleSave = () => {
        const token = sessionStorage.getItem('jwtToken');

        // 소수점 1자리까지 강제 포맷
        const formattedHeight = Number(parseFloat(profile.height).toFixed(1));
        const formattedWeight = Number(parseFloat(profile.weight).toFixed(1));

        axios.put('http://localhost:8080/api/users/profile', {
            height: formattedHeight,
            weight: formattedWeight,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                alert('프로필이 저장되었습니다.');
                onClose();
            })
            .catch((err) => {
                alert('프로필 저장 실패');
                console.error(err);
            });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="simple-modal-content">
                <h2>내 프로필</h2>
                <p><strong>이름:</strong> {profile.name}</p>
                <p><strong>이메일:</strong> {profile.email}</p>

                <input
                    type="number"
                    step="0.1"
                    className="simple-input"
                    placeholder="키 (cm)"
                    value={profile.height}
                    onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                />
                <input
                    type="number"
                    step="0.1"
                    className="simple-input"
                    placeholder="몸무게 (kg)"
                    value={profile.weight}
                    onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                />

                <div className="modal-buttons">
                    <button onClick={onClose} className="simple-btn cancel-btn">취소</button>
                    <button onClick={handleSave} className="simple-btn">저장</button>
                </div>
            </div>
        </Modal>
    );
}
