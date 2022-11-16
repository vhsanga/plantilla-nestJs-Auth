import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Usuario } from 'src/usuario/entity/usuario.entity';
var AWS = require('aws-sdk');
var nodemailer = require('nodemailer');

AWS.config.update({region: 'us-east-1'});


@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(usuario: Usuario,  pass:string, contextUrl:string) {

        await this.mailerService.sendMail({
            to: usuario.email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Registro de usuario',
            template: './confirmation', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                name: usuario.username,
                url:contextUrl,
                pass
            },
        });
    }



}
