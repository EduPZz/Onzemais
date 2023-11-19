import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EmpresasModule } from './empresas/empresas.module';
import { EspacosEsportivosModule } from './espacos-esportivos/espacos-esportivos.module';
import { ColetesModule } from './coletes/coletes.module';
import { LocacoesModule } from './locacoes/locacoes.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AlugueisColetesModule } from './alugueis_coletes/alugueis_coletes.module';
import { CampeonatosModule } from './campeonatos/campeonatos.module';
import { PartidasModule } from './partidas/partidas.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AlugueisColetesController } from './alugueis_coletes/alugueis_coletes.controller';
import { ConfigModule } from '@nestjs/config';
import { LogsModule } from './logs/logs.module';
import { CampeonatosController } from './campeonatos/campeonatos.controller';
import { ColetesController } from './coletes/coletes.controller';
import { EmpresasController } from './empresas/empresas.controller';
import { EspacosEsportivosController } from './espacos-esportivos/espacos-esportivos.controller';
import { LocacoesController } from './locacoes/locacoes.controller';
import { PartidasController } from './partidas/partidas.controller';
import { UsuariosController } from './usuarios/usuarios.controller';
import { RelatoriosModule } from './relatorios/relatorios.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    EmpresasModule,
    EspacosEsportivosModule,
    ColetesModule,
    LocacoesModule,
    UsuariosModule,
    AlugueisColetesModule,
    CampeonatosModule,
    PartidasModule,
    AuthModule,
    LogsModule,
    RelatoriosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        AlugueisColetesController,
        CampeonatosController,
        ColetesController,
        EmpresasController,
        EspacosEsportivosController,
        LocacoesController,
        PartidasController,
        UsuariosController,
      );
  }
}
