import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmpresasService } from 'src/empresas/empresas.service';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    private prisma: PrismaService,
    private readonly empresasService: EmpresasService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const exists = await this.prisma.usuario.findUnique({
      where: { email: createUsuarioDto.email },
    });

    if (exists) throw new BadRequestException('Email já cadastrado!');

    if (createUsuarioDto?.empresa_id) {
      await this.empresasService.findOne(createUsuarioDto.empresa_id);
    }

    const senhaHash = hashSync(createUsuarioDto.senha, 10);

    createUsuarioDto.senha = senhaHash;

    return this.prisma.usuario.create({
      data: createUsuarioDto,
    });
  }

  findAll() {
    return this.prisma.usuario.findMany();
  }

  findOne(id: number) {
    return this.prisma.usuario.findUniqueOrThrow({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id);

    if (updateUsuarioDto?.senha) {
      const senhaHash = hashSync(updateUsuarioDto.senha, 10);

      updateUsuarioDto.senha = senhaHash;
    }

    return this.prisma.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}
