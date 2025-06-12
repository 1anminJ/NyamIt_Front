import Modal from '../components/Modal';
import '../styles/SimpleModal.css';

export default function SettingsModal({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="simple-modal-content">
                <h2>설정</h2>
                <div className="simple-settings-item">
                    <label>알림 설정</label>
                    <input type="checkbox" />
                </div>
                <div className="simple-settings-item">
                    <label>다크 모드</label>
                    <input type="checkbox" />
                </div>
                <button className="simple-btn">저장</button>
            </div>
        </Modal>
    );
}
