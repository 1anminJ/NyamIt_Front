import Modal from '../components/Modal';
import '../styles/SimpleModal.css';

export default function SignUpModal({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="simple-modal-content">
                <h2>회원가입</h2>
                <input type="text" placeholder="이름" className="simple-input" />
                <input type="email" placeholder="이메일" className="simple-input" />
                <input type="password" placeholder="비밀번호" className="simple-input" />
                <input type="password" placeholder="비밀번호 확인" className="simple-input" />
                <button className="simple-btn">회원가입</button>
            </div>
        </Modal>
    );
}
