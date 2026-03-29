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
      descricao: 'Pão, carne, queijo e molho especial',
      preco: 15.00,
      imagem: 'assets/produtos/batata-simples.jpg'
    },
    {
      nome: 'Batata com Calabresa',
      descricao: 'Pão, carne, queijo, alface e tomate',
      preco: 18.00,
      imagem: 'assets/produtos/batata-com-calabresa.jpg'
    },
    {
      nome: 'Batata com Frango',
      descricao: 'Lata 350ml',
      preco: 6.00,
      imagem: 'assets/produtos/batata-frango.jpg'
    },
    {
      nome: 'Isca de Frango',
      descricao: 'Porção média crocante',
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