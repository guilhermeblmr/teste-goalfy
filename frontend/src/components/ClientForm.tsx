import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { Client } from '../types/Client';
import { useCEP } from '../hooks/useCEP';
import { useClient } from '../hooks/useClient';

interface ClientFormProps {
  onSubmit: (client: Client) => Promise<void>;
  initialData?: Client;
  isLoading?: boolean;
  error?: string | null;
}

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 24px;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s;
  background-color: #fff;
  color: #333;

  &:focus {
    outline: none;
    border-color: #6d28d9;
  }

  &:disabled {
    background-color: #f0f0f0;
    color: #999;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: #e74c3c;
  margin-top: 4px;
`;

const SuccessMessage = styled.span`
  font-size: 12px;
  color: #27ae60;
  margin-top: 4px;
`;

const ButtonContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;

  &.primary {
    background-color: #6d28d9;
    color: white;

    &:hover {
      background-color: #5b21b6;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  &.secondary {
    background-color: #f0f0f0;
    color: #333;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const CEPInputGroup = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }

  input {
    flex: 1;
    border: none;
    padding: 10px 12px;
    font-size: 14px;
    font-family: inherit;
    border-radius: 0;

    &:focus {
      outline: none;
    }

    &:disabled {
      background-color: #f0f0f0;
      color: #999;
      cursor: not-allowed;
    }
  }
`;

const CEPSearchButton = styled.button`
  padding: 10px 16px;
  background-color: #6d28d9;
  color: white;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #357abd;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ClientForm: React.FC<ClientFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
  error: externalError,
}) => {
  const [formData, setFormData] = useState<Client>(
    initialData || {
      name: '',
      email: '',
      phone: '',
      cnpj: '',
      cep: '',
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      complement: '',
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cepError, setCepError] = useState<string | null>(null);
  const [cepSuccess, setCepSuccess] = useState<string | null>(null);
  const { fetchCEP, loading: cepLoading } = useCEP();
  const { clients } = useClient();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setErrors({});
      setCepError(null);
      setCepSuccess(null);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        cnpj: '',
        cep: '',
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        complement: '',
      });
      setErrors({});
      setCepError(null);
      setCepSuccess(null);
    }
  }, [initialData]);

  const maskPhone = (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  };

  const maskCNPJ = (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18);
  };

  const validateField = (name: string, value: string) => {
    if (!value.trim() && ['name', 'email', 'cep', 'street', 'neighborhood', 'city', 'state'].includes(name)) {
      return 'Campo obrigatório';
    } else if (name === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Email inválido';
      }
      // Verificar se o email já foi cadastrado
      const emailExists = clients.some(
        client => client.email.toLowerCase() === value.toLowerCase() && client.id !== initialData?.id
      );
      if (emailExists) {
        return 'Este email já foi cadastrado';
      }
    } else if (name === 'cep' && value) {
      const cepRegex = /^\d{5}-?\d{3}$/;
      if (!cepRegex.test(value)) {
        return 'CEP deve estar no formato XXXXX-XXX';
      }
    }
    return '';
  };

  const validateAllFields = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    const fieldsToValidate = ['name', 'email', 'cep', 'street', 'neighborhood', 'city', 'state'];
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field as keyof Client] as string);
      if (error) {
        newErrors[field] = error;
      }
    });

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (name === 'phone') {
      value = maskPhone(value);
    } else if (name === 'cnpj') {
      value = maskCNPJ(value);
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchCEP = async () => {
    setCepError(null);
    setCepSuccess(null);

    if (!formData.cep) {
      setCepError('Informe um CEP');
      return;
    }

    const result = await fetchCEP(formData.cep);

    if (result) {
      setFormData(prev => ({
        ...prev,
        street: result.logradouro,
        neighborhood: result.bairro,
        city: result.localidade,
        state: result.uf,
        complement: result.complemento || prev.complement,
      }));
      setCepSuccess('Endereço preenchido automaticamente');
    } else {
      setCepError('CEP não encontrado');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateAllFields();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await onSubmit(formData);
        setFormData({
          name: '',
          email: '',
          phone: '',
          cnpj: '',
          cep: '',
          street: '',
          neighborhood: '',
          city: '',
          state: '',
          complement: '',
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="name">Nome *</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="phone">Telefone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="(XX) XXXXX-XXXX"
          value={formData.phone}
          onChange={handleChange}
          disabled={isLoading}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="cnpj">CNPJ</Label>
        <Input
          id="cnpj"
          name="cnpj"
          type="text"
          placeholder="XX.XXX.XXX/XXXX-XX"
          value={formData.cnpj}
          onChange={handleChange}
          disabled={isLoading}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="cep">CEP *</Label>
        <CEPInputGroup>
          <Input
            id="cep"
            name="cep"
            type="text"
            placeholder="XXXXX-XXX"
            value={formData.cep}
            onChange={handleChange}
            disabled={isLoading || cepLoading}
            style={{ border: 'none' }}
          />
          <CEPSearchButton
            type="button"
            onClick={handleSearchCEP}
            disabled={isLoading || cepLoading || !formData.cep}
          >
            {cepLoading ? 'Buscando...' : 'Buscar'}
          </CEPSearchButton>
        </CEPInputGroup>
        {errors.cep && <ErrorMessage>{errors.cep}</ErrorMessage>}
        {cepError && <ErrorMessage>{cepError}</ErrorMessage>}
        {cepSuccess && <SuccessMessage>{cepSuccess}</SuccessMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="street">Rua *</Label>
        <Input
          id="street"
          name="street"
          type="text"
          value={formData.street}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.street && <ErrorMessage>{errors.street}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="neighborhood">Bairro *</Label>
        <Input
          id="neighborhood"
          name="neighborhood"
          type="text"
          value={formData.neighborhood}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.neighborhood && <ErrorMessage>{errors.neighborhood}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="city">Cidade *</Label>
        <Input
          id="city"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="state">Estado *</Label>
        <Input
          id="state"
          name="state"
          type="text"
          maxLength={2}
          value={formData.state}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="complement">Número</Label>
        <Input
          id="complement"
          name="complement"
          type="text"
          value={formData.complement}
          onChange={handleChange}
          disabled={isLoading}
        />
      </FormGroup>

      {externalError && (
        <FormGroup className="full-width">
          <ErrorMessage>{externalError}</ErrorMessage>
        </FormGroup>
      )}

      <ButtonContainer>
        <Button type="submit" className="primary full-width" disabled={isLoading}>
          {isLoading ? 'Salvando...' : initialData ? 'Atualizar' : ' Novo Registro'}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};
