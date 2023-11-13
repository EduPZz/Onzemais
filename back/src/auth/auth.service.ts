import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosServices: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async token(usuario: Usuario) {
    const accessToken = await this.jwtService.signAsync(
      {
        id: usuario.id,
        name: usuario.nome,
        perfil: usuario.perfil,
      },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '1d',
      },
    );

    const token = this.jwtService.decode(accessToken);

    return {
      accessToken,
      expiresIn: token['exp'] as number,
    };
  }

  me({ accessToken: token }: { accessToken: string }) {
    return this.jwtService.decode(token);
  }

  async validateUser(email: string, senha: string) {
    const usuario = await this.usuariosServices.findOneByEmail(email);

    if (!usuario) {
      return null;
    }

    const isSenhaValid = compareSync(senha, usuario.senha);
    if (!isSenhaValid) {
      return null;
    }

    return usuario;
  }
}
