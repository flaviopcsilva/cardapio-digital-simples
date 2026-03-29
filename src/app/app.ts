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
      preco: 20.00,
      imagem: 'assets/produtos/batata-com-calabresa.jpg'
    },
    {
      nome: 'Batata com Frango',
      descricao: 'Batata frita com  Frango Empanado, sabor irresistível',
      preco: 30.00,
      imagem: 'assets/produtos/batata-frango.jpg'
    },
    {
      nome: 'Frango Empanado',
      descricao: 'Frango empanado crocante e suculento, perfeito para petiscar',
      preco: 25.00,
      imagem: 'assets/produtos/frango.jpg'
    }
  ];

  pedir(produto: any) {
    const numero = '5521920001798';

    const mensagem = `Olá, quero pedir:\n${produto.nome} - R$ ${produto.preco.toFixed(2)}`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');
  }
}