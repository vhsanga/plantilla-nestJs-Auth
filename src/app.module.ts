import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DatabaseModule } from './_common/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './home/home.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
    AuthModule,
    UsuarioModule,
    DatabaseModule,
    HomeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
