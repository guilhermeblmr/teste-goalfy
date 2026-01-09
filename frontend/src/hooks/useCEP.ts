import { useState } from 'react';
import type { CEPResponse } from '../types/Client';
import { cepService } from '../services/api';

export const useCEP = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCEP = async (cep: string): Promise<CEPResponse | null> => {
    setLoading(true);
    setError(null);
    
    try {
      if (!/^\d{5}-?\d{3}$/.test(cep)) {
        setError('CEP inválido. Use o formato XXXXX-XXX');
        setLoading(false);
        return null;
      }

      const data = await cepService.fetchByCEP(cep);
      
      if (data.erro) {
        setError('CEP não encontrado');
        setLoading(false);
        return null;
      }

      return data;
    } catch (err) {
      setError('Erro ao buscar CEP');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fetchCEP, loading, error };
};
