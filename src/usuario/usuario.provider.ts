import { Usuario } from './entity/usuario.entity';
import { USER_REPOSITORY } from '../_common/constants';

export const usuarioProviders = [{
    provide: USER_REPOSITORY,
    useValue: Usuario,
}];