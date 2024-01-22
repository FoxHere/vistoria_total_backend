import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './create-pedido.dto';
import { StatusPedido } from '../enum/status-pedido.enum';
import { IsEnum } from 'class-validator';

export class UpdatePedidoDTO extends PartialType(CreatePedidoDto) {
    @IsEnum(StatusPedido)
    status: StatusPedido;
}
