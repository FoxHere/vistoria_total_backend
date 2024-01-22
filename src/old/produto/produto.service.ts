import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./entities/produto.entity";
import { Repository } from "typeorm";
import { AtualizaProdutoDTO } from "./dto/atualizaProduto.dto";
import { ListaProdutoDTO } from "./dto/ListaProduto.dto";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";


@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ){}

    async onCreateProduto(dadosProduto: CriaProdutoDTO){

        const produto = new ProdutoEntity();
        // produto.nome = dadosProduto.nome;
        // produto.usuarioId = dadosProduto.usuarioId;
        // produto.valor = dadosProduto.valor;
        // produto.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
        // produto.descricao = dadosProduto.descricao;
        // produto.categoria = dadosProduto.categoria;
        // produto.caracteristicas = dadosProduto.caracteristicas;
        // produto.imagens = dadosProduto.imagens;
        // Here! using object assign is the same as using the whole atribution above
        Object.assign(produto, dadosProduto)
        await this.produtoRepository.save(produto);
        return produto;
    }

    async listProdutos() {
        const produtosSalvos = await this.produtoRepository.find({
            relations: {
            imagens: true,
            caracteristicas: true,
            },
        });
        const produtosLista = produtosSalvos.map(
            (produto) =>
            new ListaProdutoDTO(
                produto.id,
                produto.nome,
                produto.valor,
                produto.caracteristicas,
                produto.imagens,
            ),
        );
        return produtosLista;
        }
    
    async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
        const produtoEncontrado = await this.produtoRepository.findOneBy({ id });
        if(produtoEncontrado === null){
            throw new NotFoundException('O produto não foi encontrado');
        }
    
        Object.assign(produtoEncontrado, novosDados);
        return await this.produtoRepository.save(produtoEncontrado);
    }
    
    async deletaProduto(id: string) {
        const resultado = await this.produtoRepository.delete(id);
    
        if (!resultado.affected) {
            throw new NotFoundException('O produto não foi encontrado');
        }
    }



}