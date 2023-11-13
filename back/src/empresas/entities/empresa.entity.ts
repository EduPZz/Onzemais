import { Empresa } from '@prisma/client';

export class EmpresaEntity implements Empresa {
  id: number;
  cnpj: string;
  cep: string;
  bairro_endereco: string;
  numero_endereco: string;
  rua_endereco: string;
  horario_comercial_inicio: string;
  horario_comercial_final: string;
  nome: string;
  descricao: string;
}
