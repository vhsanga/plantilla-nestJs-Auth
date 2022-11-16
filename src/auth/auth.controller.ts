import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsuarioDTO } from 'src/usuario/dto/usuario.dto';
import { DoesUserExist } from 'src/_common/guards/doesUserExist.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @UseGuards(DoesUserExist)
    @Post('signup')
    async signUp(@Body() user: UsuarioDTO, @Request() req) {
        //const contextUrl = req.headers['x-forwarded-proto']+'://'+req.hostname+req.url;
        var contextUrl = req.get('origin');
        console.log(req.hostname);
        return await this.authService.create(user, contextUrl);
    }
}
