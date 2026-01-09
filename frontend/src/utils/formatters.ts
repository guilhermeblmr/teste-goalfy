/**
 * Formata um número de telefone para o padrão brasileiro
 * Entrada: 11987654321 ou 1187654321
 * Saída: (11) 98765-4321 ou (11) 8765-4321
 */
export const formatPhone = (phone: string | undefined): string => {
  if (!phone) return '—';
  
  // Remove caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos (celular) ou 10 (fixo)
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
};

/**
 * Formata um CNPJ para o padrão brasileiro
 * Entrada: 12345678000195
 * Saída: 12.345.678/0001-95
 */
export const formatCNPJ = (cnpj: string | undefined): string => {
  if (!cnpj) return '—';
  
  // Remove caracteres não numéricos
  const cleaned = cnpj.replace(/\D/g, '');
  
  // Verifica se tem 14 dígitos
  if (cleaned.length === 14) {
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  
  return cnpj;
};

/**
 * Formata um CEP para o padrão brasileiro
 * Entrada: 12345678
 * Saída: 12345-678
 */
export const formatCEP = (cep: string | undefined): string => {
  if (!cep) return '—';
  
  // Remove caracteres não numéricos
  const cleaned = cep.replace(/\D/g, '');
  
  // Verifica se tem 8 dígitos
  if (cleaned.length === 8) {
    return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
  
  return cep;
};
