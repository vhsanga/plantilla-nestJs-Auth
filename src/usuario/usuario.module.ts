import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { usuarioProviders } from './usuario.provider';
import { UsuarioService } from './usuario.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, ...usuarioProviders],
  exports: [UsuarioService]
})
export class UsuarioModule {}
