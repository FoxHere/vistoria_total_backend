import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsUUID, ValidateNested } from 'class-validator';


class ItemPedidoDTO {
    @IsUUID()
    produtoId: string;

    @IsInt()
    quantidade: number;
}

export class CreatePedidoDto {

    @ValidateNested()
    @ArrayMinSize(1)
    @IsArray()
    @Type(() => ItemPedidoDTO)
    itensPedido: ItemPedidoDTO[]
}
