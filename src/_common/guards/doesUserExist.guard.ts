import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/usuario/usuario.service';


@Injectable()
export class DoesUserExist implements CanActivate {
    constructor(private readonly userService: UsuarioService) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        let userExist = await this.userService.findOneByEmail(request.body.email);
        if (userExist) {
            throw new ForbiddenException('Este correo ya existe');
        }
        userExist = await this.userService.findOneByUsername(request.body.username);
        if (userExist) {
            throw new ForbiddenException('Este usuario ya existe');
        }
        return true;
    }
}