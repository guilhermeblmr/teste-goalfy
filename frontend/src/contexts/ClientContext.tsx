import React, { createContext, useState, useCallback } from 'react';
import type { Client } from '../types/Client';
import { clientService } from '../services/api';

interface ClientContextType {
  clients: Client[];
  loading: boolean;
  error: string | null;
  fetchClients: () => Promise<void>;
  addClient: (client: Client) => Promise<void>;
  updateClient: (id: number, client: Client) => Promise<void>;
  deleteClient: (id: number) => Promise<void>;
}

export const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await clientService.getAll();
      setClients(data);
    } catch (err) {
      setError('Erro ao carregar clientes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addClient = useCallback(async (client: Client) => {
    setError(null);
    try {
      await clientService.create(client);
      await fetchClients();
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Erro ao criar cliente';
      setError(errorMessage);
      throw err;
    }
  }, [fetchClients]);

  const updateClient = useCallback(async (id: number, client: Client) => {
    setError(null);
    try {
      await clientService.update(id, client);
      await fetchClients();
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Erro ao atualizar cliente';
      setError(errorMessage);
      throw err;
    }
  }, [fetchClients]);

  const deleteClient = useCallback(async (id: number) => {
    setError(null);
    try {
      await clientService.delete(id);
      await fetchClients();
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Erro ao remover cliente';
      setError(errorMessage);
      throw err;
    }
  }, [fetchClients]);

  return (
    <ClientContext.Provider
      value={{
        clients,
        loading,
        error,
        fetchClients,
        addClient,
        updateClient,
        deleteClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
