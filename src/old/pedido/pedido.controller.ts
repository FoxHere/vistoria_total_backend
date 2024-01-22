import { Controller, Get, Post, Body, Patch, Delete, Query, Param } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDTO } from './dto/update-pedido.dto';


@Controller('/pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async createPedido(
    @Query('userId') userId: string,
    @Body() dadosItemPedidos: CreatePedidoDto,
  ){
    const pedidoCriado = await this.pedidoService.create(userId, dadosItemPedidos);
    return pedidoCriado;
  }

  @Get()
  async findAll(){
    const pedidos = await this.pedidoService.findAllPedidos();
    return pedidos;
  }

  @Get('/findPedido')
  findById(@Query('id') id: string){
    const pedidos = this.pedidoService.findOne(id);

    return pedidos;
  }

  @Patch(':id')
  atualizaPedido(
    @Param('id') pedidoId: string,
    @Body() dadosDeAtualizacao: UpdatePedidoDTO,
  ) {
    return this.pedidoService.atualizaPedido(pedidoId, dadosDeAtualizacao);
  }
  
  // @Post()
  // async create(@Body() createPedidoDto: CreatePedidoDto) {
  //   return this.pedidoService.create(createPedidoDto);
  // }

  // @Get()
  // findAll() {
  //   return this.pedidoService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pedidoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
  //   return this.pedidoService.update(+id, updatePedidoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pedidoService.remove(+id);
  // }
}
