import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
   imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  titulo = 'RV Distribuidora 24hs';

  produtos = [
    {
      nome: 'Batata Simples',
      descricao: 'Batata frita simples, crocante e deliciosa',
      preco: 15.00,
      imagem: 'assets/produtos/batata-simples.jpg'
    },
    {
      nome: 'Batata com Calabresa',
      descricao: 'Batata frita com calabresa, sabor irresistível',
      preco: 18.00,
      imagem: 'assets/produtos/batata-com-calabresa.jpg'
    },
    {
      nome: 'Batata com Frango',
      descricao: 'Batata frita com Isca de Frango, sabor irresistível',
      preco: 6.00,
      imagem: 'assets/produtos/batata-frango.jpg'
    },
    {
      nome: 'Isca de Frango',
      descricao: 'Isca de Frango crocante e suculenta, perfeita para petiscar',
      preco: 12.00,
      imagem: 'assets/produtos/frango.jpg'
    }
  ];

  pedir(produto: any) {
    const numero = '5521974863278';

    const mensagem = `Olá, quero pedir:\n${produto.nome} - R$ ${produto.preco.toFixed(2)}`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');
  }
}