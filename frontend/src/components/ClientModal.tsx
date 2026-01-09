import React from 'react';
import styled from 'styled-components';
import type { Client } from '../types/Client';
import { ClientForm } from './ClientForm';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (client: Client) => Promise<void>;
  initialData?: Client;
  isLoading?: boolean;
  error?: string | null;
}

const TitleIcon = styled(FaArrowUpRightFromSquare)`
  color: #6d28d9;
  font-size: 18px;
  margin-right: 8px;
`;

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
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
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

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 22px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const ModalBody = styled.div`
  padding: 24px;
`;

export const ClientModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
  error,
}) => {
  const handleSubmit = async (client: Client) => {
    await onSubmit(client);
    onClose();
  };

  return (
    <Overlay className={isOpen ? 'open' : ''} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>
        <ModalBody>
          <TitleContainer>
            <TitleIcon />
            <ModalTitle>{initialData ? 'Editar Cliente' : 'Novo Cliente'}</ModalTitle>
          </TitleContainer>
          <ClientForm
            onSubmit={handleSubmit}
            initialData={initialData}
            isLoading={isLoading}
            error={error}
          />
        </ModalBody>
      </ModalContent>
    </Overlay>
  );
};
