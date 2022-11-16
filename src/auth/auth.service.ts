import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { MailService } from 'src/_mail/_mail.service';
var randomstring = require("randomstring");

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsuarioService,
        private readonly jwtService: JwtService,
        private mailService: MailService,
    ) { }

    async validateUser(username: string, pass: string) {
        // find if user exist with this email
        const user = await this.userService.findOneByUsername(username);
        if (!user) {
            throw new NotFoundException('Este usuario no existe');
        }

        // find if user password match
        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = user['dataValues'];
        return result;
    }

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }


    public async login(user) {
        const token = await this.generateToken(user);
        return { user, token };
    }

    public async create(user, contextUrl) {

        const claveTemporal= randomstring.generate(4);
        const pass = await this.hashPassword(claveTemporal);
        // create the user
        const newUser = await this.userService.create({ id:uuid(),  ...user, password:pass });

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = newUser['dataValues'];
        contextUrl =contextUrl+"/login";
        await this.mailService.sendUserConfirmation(user, claveTemporal, contextUrl);

        // return the user and the token
        return { /*user: result,*/  msg:  `Se ha enviado las credenciales temporales al correo  ${user.email} para que pueda completar su registro.`};
    }


    public async confirmateCreate(user) {
        // hash the password
        const pass = await this.hashPassword(user.password);

        // create the user
        const newUser = await this.userService.create({ id:uuid(),  ...user, password: pass });

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = newUser['dataValues'];

        // generate token
        const token = await this.generateToken(result);

        // return the user and the token
        return { user: result, token };
    }

    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

}
