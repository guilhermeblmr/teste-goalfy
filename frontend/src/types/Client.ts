export interface Client {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  cnpj?: string;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}
