import { Injectable } from '@nestjs/common';
import { CreateLocacoeDto } from './dto/create-locacoe.dto';
import { UpdateLocacoeDto } from './dto/update-locacoe.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmpresasService } from 'src/empresas/empresas.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Locacao } from '@prisma/client';

@Injectable()
export class LocacoesService {
  constructor(
    private prisma: PrismaService,
    private readonly empresasService: EmpresasService,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(createLocacoeDto: CreateLocacoeDto) {
    await this.empresasService.findOne(createLocacoeDto.empresa_id);
    await this.usuariosService.findOne(createLocacoeDto.usuarioId);

    return this.prisma.locacao.create({ data: createLocacoeDto });
  }

  findAll() {
    return this.prisma.locacao.findMany();
  }

  findOne(id: number) {
    return this.prisma.locacao.findUniqueOrThrow({ where: { id } });
  }

  calculatePartidaTotalValue(locacao: Locacao) {
    let total = 0;
    for (const partida of locacao['Partida']) {
      total += partida.valor;
    }
    return total;
  }

  calculateAluguelColeteTotalValue(locacao: Locacao) {
    let total = 0;
    for (const aluguelColete of locacao['AluguelColete']) {
      total += aluguelColete.valor_quantidade;
    }
    return total;
  }

  async getValor(locacao: Locacao) {
    let totalColete = 0;
    let totalPartida = 0;
    if (locacao['AlguelColete']) {
      totalColete = this.calculateAluguelColeteTotalValue(locacao);
    }
    if (locacao['Partida']) {
      totalPartida = this.calculatePartidaTotalValue(locacao);
    }
    return totalColete + totalPartida;
  }

  async findByUser(id: number) {
    const locacoes = await this.prisma.locacao.findMany({
      where: { usuarioId: id },
      include: {
        AluguelColete: {
          orderBy: { data_final_locacao: 'asc' },
        },
        Partida: {
          orderBy: { data_final_locacao: 'asc' },
        },
      },
      orderBy: { id: 'asc' },
    });

    for (const locacao of locacoes) {
      locacao['valor'] = await this.getValor(locacao);
    }

    return locacoes;
  }

  async update(id: number, updateLocacoeDto: UpdateLocacoeDto) {
    await this.findOne(id);

    return this.prisma.locacao.update({
      where: { id },
      data: updateLocacoeDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.locacao.delete({ where: { id } });
  }
}
