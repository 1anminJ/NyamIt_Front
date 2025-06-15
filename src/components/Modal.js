import '../styles/Modal.css';
import closeIcon from '../assets/close.png'

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <img src={closeIcon}/>
                </button>
                {children}
            </div>
        </div>
    );
}