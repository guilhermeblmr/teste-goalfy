import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ClientProvider } from './contexts/ClientContext';
import { useClient } from './hooks/useClient';
import { ClientModal } from './components/ClientModal';
import { ClientList } from './components/ClientList';
import type { Client } from './types/Client';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

const TopBar = styled.header`
  height: 64px;
  background-color: #fff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

const TopBarTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
`;

const TopBarLogo = styled.h1`
  font-size: 18px;
  font-weight: 400;
  color: #111827;
`;

const TopBarSeparator = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin: 0 16px;
  color: #E6E6E6;
`;

const TopBarIcon = styled(FaArrowUpRightFromSquare)`
  color: #6d28d9;
  font-size: 18px;
  margin-right: 8px;
`;

const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

function AppContent() {
  const {
    clients,
    loading,
    error,
    fetchClients,
    addClient,
    updateClient,
    deleteClient,
  } = useClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const handleOpenModal = (client?: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClient(undefined);
  };

  const handleSubmit = async (client: Client) => {
    setIsSubmitting(true);
    try {
      if (selectedClient?.id) {
        await updateClient(selectedClient.id, client);
      } else {
        await addClient(client);
      }
      // Só fecha o modal se não houver erro
      handleCloseModal();
    } catch (err) {
      // Erro é capturado, modal permanece aberto
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteClient(id);
  };

  return (
    <AppContainer>
      <TopBar>
        <TopBarLogo>Goalfy</TopBarLogo>
        <TopBarSeparator> | </TopBarSeparator>
        <TopBarIcon />
        <TopBarTitle>Registro de Clientes</TopBarTitle>
      </TopBar>

      <Content>
        <ClientList
          clients={clients}
          loading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
          onCreate={() => handleOpenModal()}
        />
      </Content>

      <ClientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={selectedClient}
        isLoading={isSubmitting}
        error={error}
      />
    </AppContainer>
  );
}

export default function App() {
  return (
    <ClientProvider>
      <AppContent />
    </ClientProvider>
  );
}
