import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APP_PORT } from './config/config.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>(APP_PORT);
  app.enableCors();
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Lab Cuatro API')
    .setDescription(
      `
      Sistema de administración del laboratorio de Química de la Universidad Tecnológica de Tula Tepeji
      `,
    )
    .setVersion('1.0')
    .addTag('NestJS')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(port);
}
bootstrap();
