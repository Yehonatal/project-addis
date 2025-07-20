import styled from "@emotion/styled";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
    backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div`
    background: white;
    border-radius: 12px;
    box-shadow:
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    animation: modalSlideIn 0.3s ease-out;
    border: 2px solid #131314;
    border-bottom: 6px solid #131314;

    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
`;

const ModalHeader = styled.div`
    padding: 1.5rem 1.5rem 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ModalTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: #212529;
    margin: 0;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6c757d;
    padding: 0.25rem;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
        background: #f8f9fa;
        color: #495057;
    }
`;

const ModalBody = styled.div`
    padding: 1.5rem;
`;

export {
    Overlay,
    ModalContainer,
    ModalHeader,
    ModalTitle,
    CloseButton,
    ModalBody,
};
