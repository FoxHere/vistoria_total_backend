import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDTO } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './entities/pedido.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from 'src/old/user/user.entity';
import { StatusPedido } from './enum/status-pedido.enum';
import { ItemPedidoEntity } from './entities/item-pedido.entity';
import { ProdutoEntity } from 'src/old/produto/entities/produto.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>
  ){}

    async create(userId: string, dadosItemPedidos: CreatePedidoDto){
      const user = await this.userRepository.findOneBy({id: userId});
      // pegar todos os Ids dos produtos do dadosItemProdutos que vem do controller
      const produtosIds = dadosItemPedidos.itensPedido.map((itemPedido) => itemPedido.produtoId);
      // trazer todos os produtos no banco baseados no Id
      const produtosRelacionados = await this.produtoRepository.findBy({id: In(produtosIds)})
      const pedido = new PedidoEntity();
      // chumbando valor no código primeiro
      //pedido.valorTotal = 0;
      pedido.status = StatusPedido.EM_PROCESSAMENTO;
      pedido.usuario = user;
      // criando registro na item pedido entity
      const itemPedidoEntidades = dadosItemPedidos.itensPedido.map((itemPedido) => {
        // relacionar produto com o item pedido
        const produtoRelacionado = produtosRelacionados.find((produto) =>
          produto.id === itemPedido.produtoId
        )
        const itemPedidoEntity = new ItemPedidoEntity();
        itemPedidoEntity.produto = produtoRelacionado;
        itemPedidoEntity.precoVenda = produtoRelacionado.valor;
        itemPedidoEntity.quantidade = itemPedido.quantidade;
        // inserindo a regra de negocio diminuindo a quantidade no estoque
        itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;
        return itemPedidoEntity;
      })
      // calculando o valor total
      const valorTotal = itemPedidoEntidades.reduce((total, item) => {
        return total + item.precoVenda * item.quantidade
      }, 0);
      // inserindo os item do pedido no pedido
      pedido.itensPedido = itemPedidoEntidades;
      pedido.valorTotal = valorTotal;
      const pedidoCriado = await this.pedidoRepository.save(pedido);
      return pedidoCriado;
    }

    async findAllPedidos(){
      const allPedidos = await this.pedidoRepository.find({relations: {usuario: true}});
      return allPedidos;
    }

    async findOne(userId: string){
      const allPedidos = await this.pedidoRepository.find({
        where: {
          usuario: { id: userId},
        },
        relations: {
          usuario: true,
        },
      });
      return allPedidos;
    }

    async atualizaPedido(id: string, dto: UpdatePedidoDTO) {
      const pedido = await this.pedidoRepository.findOneBy({ id });
  
      
      if(pedido === null){
        throw new NotFoundException('O pedido não foi encontrado')
      }
  
      Object.assign(pedido, dto);
  
      return this.pedidoRepository.save(pedido);
    }
  // create(createPedidoDto: CreatePedidoDto) {
  //   return 'This action adds a new pedido';
  // }

  // findAll() {
  //   return `This action returns all pedido`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} pedido`;
  // }

  // update(id: number, updatePedidoDto: UpdatePedidoDto) {
  //   return `This action updates a #${id} pedido`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} pedido`;
  // }
}
