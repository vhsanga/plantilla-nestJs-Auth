import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/_common/constants';
import { UsuarioDTO } from './dto/usuario.dto';
import { Usuario } from './entity/usuario.entity';

@Injectable()
export class UsuarioService {
    constructor(@Inject(USER_REPOSITORY) private readonly usuarioRepo: typeof Usuario) { }

    async create(user: UsuarioDTO): Promise<Usuario> {
        return await this.usuarioRepo.create<Usuario>(user);
    }

    async findOneByEmail(email: string): Promise<Usuario> {
        return await this.usuarioRepo.findOne<Usuario>({ where: { email } });
    }
    async findOneByUsername(username: string): Promise<Usuario> {
        return await this.usuarioRepo.findOne<Usuario>({ where: { username } });
    }

    async findOneById(id: number): Promise<Usuario> {
        return await this.usuarioRepo.findOne<Usuario>({ where: { id } });
    }
}
