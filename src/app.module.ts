import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} from './config/config.constants';
import { AuthModule } from './app/auth/auth.module';
import { MapperModule } from './common/mapper/mapper.module';
import { UsuarioModule } from './app/usuario/usuario.module';
import { RolModule } from './app/rol/rol.module';
import { MarcaModule } from './app/marca/marca.module';
import { UnidadMedidaModule } from './app/unidad-medida/unidad-medida.module';
import { UbicacionModule } from './app/ubicacion/ubicacion.module';
import { TipoEnvaseModule } from './app/tipo-envase/tipo-envase.module';
import { TipoMaterialModule } from './app/tipo-material/tipo-material.module';
import { MaterialModule } from './app/material/material.module';
import { SkuModule } from './app/sku/sku.module';
import { ReactivoModule } from './app/reactivo/reactivo.module';

@Module({
  imports: [
    AuthModule,
    MapperModule,
    UsuarioModule,
    RolModule,
    MarcaModule,
    UnidadMedidaModule,
    UbicacionModule,
    TipoEnvaseModule,
    TipoMaterialModule,
    MaterialModule,
    SkuModule,
    ReactivoModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(DATABASE_HOST),
        port: configService.get<number>(DATABASE_PORT),
        username: configService.get<string>(DATABASE_USERNAME),
        password: configService.get<string>(DATABASE_PASSWORD),
        database: configService.get<string>(DATABASE_NAME),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
