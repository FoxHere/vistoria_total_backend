import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { QuestionarioModule } from './questionario/questionario.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    QuestionarioModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
