import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateEmpresaDto {
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  bairro_endereco: string;

  @IsString()
  @IsNotEmpty()
  numero_endereco: string;

  @IsString()
  @IsNotEmpty()
  rua_endereco: string;

  @IsString()
  @IsNotEmpty()
  @Matches(RegExHelper.hours)
  horario_comercial_inicio: string;

  @IsString()
  @IsNotEmpty()
  @Matches(RegExHelper.hours)
  horario_comercial_final: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;
}
