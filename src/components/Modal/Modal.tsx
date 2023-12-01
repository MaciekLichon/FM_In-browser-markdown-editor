import React from 'react';
import './Modal.scss';
import { useModalToggleContext } from '../../context/modalContext';

interface IProps {
    title: string;
    message: string;
    buttonPrimaryText: string;
    actionPrimary: () => void;
    buttonSecondaryText?: string;
    actionSecondary?: () => void;
}

const Modal: React.FC<IProps> = ({title, message, buttonPrimaryText, actionPrimary, buttonSecondaryText, actionSecondary}) => {

    const setModalStatus = useModalToggleContext();

    const closeModal = () => {
        setModalStatus('closed');
    }

    return (
        <div className="modal">
            <div className="modal__background" onClick={closeModal}></div>
            <div className="modal__content">
                <div className="modal__header">
                    <h4 className="modal__title">{title}</h4>
                    <button className="modal__button-close" onClick={closeModal}></button>
                </div>
                <p className="modal__message">{message}</p>
                <div className="modal__buttons">
                    <button onClick={actionPrimary} className="button-action text_body_l">{buttonPrimaryText}</button>
                    {(actionSecondary && buttonSecondaryText) && (
                        <button className="modal__button-decline text_body_s" onClick={actionSecondary}>
                            {buttonSecondaryText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;