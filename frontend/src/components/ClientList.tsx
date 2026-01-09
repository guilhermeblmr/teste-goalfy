import React, { useState } from 'react';
import styled from 'styled-components';
import type { Client } from '../types/Client';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { formatPhone, formatCNPJ, formatCEP } from '../utils/formatters';
import { FiPlusCircle } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

interface ClientListProps {
  clients: Client[];
  loading: boolean;
  onEdit: (client: Client) => void;
  onDelete: (id: number) => Promise<void>;
  onCreate?: () => void;
}

const Page = styled.div`
  padding: 24px;
`;

const ButtonIcon = styled(FiPlusCircle)`
  font-size: 18px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #1f2937;
`;

const NewButton = styled.button`

  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background-color: #6d28d9;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #5b21b6;
  }
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 280px;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #9ca3af;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px 8px 36px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background-color: #fff;
  color: #333;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #6d28d9;
  }
`;

const Counter = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  border: 1px solid #e5e7eb;

  thead {
    background-color: #FFF;
    border-bottom: 1px solid #e5e7eb;
  }

  th {
    padding: 14px 16px;
    text-align: left;
    font-weight: 500;
    color: #374151;
    white-space: nowrap;
  }

  td {
    padding: 14px 16px;
    border-bottom: 1px solid #f1f1f1;
    color: #4b5563;
  }

  tbody tr:hover {
    background-color: #f9fafb;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

const ActionsCell = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ variant?: 'edit' | 'delete' }>`
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  ${({ variant }) =>
    variant === 'delete'
      ? `background-color: #fee2e2; color: #b91c1c;`
      : `background-color: #ede9fe; color: #5b21b6;`}

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  padding: 48px 24px;
  text-align: center;
  color: #9ca3af;
`;

export const ClientList: React.FC<ClientListProps> = ({
  clients,
  loading,
  onEdit,
  onDelete,
  onCreate,
}) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<number | null>(null);

  const filteredClients = clients.filter(client => {
    if (!searchTerm.trim()) return true;

    const searchLower = searchTerm.toLowerCase();

    return (
      client.name.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      (client.phone && client.phone.toLowerCase().includes(searchLower)) ||
      (client.cnpj && client.cnpj.toLowerCase().includes(searchLower)) ||
      (client.street && client.street.toLowerCase().includes(searchLower)) ||
      client.city.toLowerCase().includes(searchLower) ||
      client.state.toLowerCase().includes(searchLower) ||
      (client.neighborhood && client.neighborhood.toLowerCase().includes(searchLower)) ||
      (client.complement && client.complement.toLowerCase().includes(searchLower))
    );
  });

  const handleDeleteClick = (id: number) => {
    setClientToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (clientToDelete === null) return;

    setDeletingId(clientToDelete);
    try {
      await onDelete(clientToDelete);
      setDeleteConfirmOpen(false);
      setClientToDelete(null);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setClientToDelete(null);
  };

  return (
    <Page>
      <Header>
        <Title>Registro de Clientes</Title>
      </Header>

      <Filters>
        <NewButton onClick={onCreate}>
          <ButtonIcon /> Novo Registro
        </NewButton>
        <SearchWrapper>
          <SearchIcon aria-hidden></SearchIcon>
          <SearchInput 
            placeholder="Pesquisar..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>
        <Counter>{filteredClients.length} Registros</Counter>
      </Filters>

      {loading && clients.length === 0 ? (
        <EmptyState>Carregando clientes...</EmptyState>
      ) : filteredClients.length === 0 ? (
        <EmptyState>
          {searchTerm ? 'Nenhum cliente encontrado com esses critérios' : 'Nenhum cliente cadastrado'}
        </EmptyState>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Nome do Cliente</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>CNPJ</th>
                <th>CEP</th>
                <th>Endereço</th>
                <th>Cidade</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(client => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{formatPhone(client.phone)}</td>
                  <td>{formatCNPJ(client.cnpj)}</td>
                  <td>{formatCEP(client.cep)}</td>
                  <td>{client.street ? `${client.street}${client.complement ? `, ${client.complement}` : ''}` : '—'}</td>
                  <td>{client.city}</td>
                  <td>
                    <ActionsCell>
                      <ActionButton onClick={() => onEdit(client)}>Editar</ActionButton>
                      <ActionButton
                        variant="delete"
                        disabled={deletingId === client.id}
                        onClick={() => handleDeleteClick(client.id!)}
                      >
                        {deletingId === client.id ? 'Removendo...' : 'Remover'}
                      </ActionButton>
                    </ActionsCell>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}

      <ConfirmDeleteModal
        isOpen={deleteConfirmOpen}
        title="Remover Cliente"
        message="Tem certeza que deseja remover este cliente?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={deletingId !== null}
      />
    </Page>
  );
};
