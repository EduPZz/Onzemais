import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmpresasService {
  constructor(private prisma: PrismaService) {}

  async create(createEmpresaDto: CreateEmpresaDto) {
    const exist = await this.prisma.empresa.findUnique({
      where: { cnpj: createEmpresaDto.cnpj },
    });

    if (exist) {
      throw new BadRequestException('CPNJ já existe!');
    }

    return this.prisma.empresa.create({ data: createEmpresaDto });
  }

  findAll() {
    return this.prisma.empresa.findMany();
  }

  findOne(id: number) {
    return this.prisma.empresa.findUniqueOrThrow({
      where: { id },
      include: { Colete: true, EspacoEsportivo: true },
    });
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    await this.findOne(id);

    return this.prisma.empresa.update({
      where: { id },
      data: updateEmpresaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.empresa.delete({
      where: { id },
    });
  }
}
