import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './entities/pedido.entity';
import { UserEntity } from 'src/old/user/user.entity';
import { ProdutoEntity } from 'src/old/produto/entities/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity, UserEntity, ProdutoEntity])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
