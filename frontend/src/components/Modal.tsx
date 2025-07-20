import {
    Overlay,
    ModalContainer,
    ModalHeader,
    ModalTitle,
    CloseButton,
    ModalBody,
} from "@/styles/component-styles/Modal.style";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <Overlay onClick={handleOverlayClick} data-aos="fade-in">
            <ModalContainer
                data-aos="zoom-in"
                data-aos-duration="400"
                data-aos-easing="ease-out-back"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <ModalHeader>
                    <ModalTitle id="modal-title">{title}</ModalTitle>
                    <CloseButton onClick={onClose}>×</CloseButton>
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
            </ModalContainer>
        </Overlay>,
        document.body
    );
};

export default Modal;
