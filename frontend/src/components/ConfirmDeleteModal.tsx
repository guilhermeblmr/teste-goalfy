import React from 'react';
import styled from 'styled-components';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: fadeIn 0.2s;

  &.open {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  animation: slideIn 0.3s;

  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const Message = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid #eee;
  background-color: #f9f9f9;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 100px;

  &.cancel {
    background-color: #f0f0f0;
    color: #333;

    &:hover {
      background-color: #e0e0e0;
    }

    &:disabled {
      background-color: #f0f0f0;
      color: #ccc;
      cursor: not-allowed;
    }
  }

  &.confirm {
    background-color: #dc2626;
    color: white;

    &:hover {
      background-color: #b91c1c;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: #f0f0f0;
    color: #333;
  }
`;

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  return (
    <Overlay className={isOpen ? 'open' : ''} onClick={onCancel}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <CloseButton onClick={onCancel}>✕</CloseButton>
        </ModalHeader>
        <ModalBody>
          <Message>{message}</Message>
        </ModalBody>
        <ButtonContainer>
          <Button
            className="cancel"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            className="confirm"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deletando...' : 'Remover'}
          </Button>
        </ButtonContainer>
      </ModalContent>
    </Overlay>
  );
};
