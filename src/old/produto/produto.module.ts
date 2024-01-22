import { Module } from '@nestjs/common';

import { ProdutoController } from './produto.controller';
import { ProdutoRepository } from './produto.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoEntity } from './entities/produto.entity';
import { ProdutoService } from './produto.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity])],
  controllers: [ProdutoController],
  providers: [ProdutoRepository, ProdutoService],
})
export class ProdutoModule {}
