import Modal from '../components/Modal';
import '../styles/SimpleModal.css'; // 공통 사용 (SignUp, Settings 도 이거 같이 사용)

export default function LoginModal({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="simple-modal-content">
                <h2>로그인</h2>
                <input type="email" placeholder="이메일" className="simple-input" />
                <input type="password" placeholder="비밀번호" className="simple-input" />
                <button className="simple-btn">로그인</button>
            </div>
        </Modal>
    );
}
