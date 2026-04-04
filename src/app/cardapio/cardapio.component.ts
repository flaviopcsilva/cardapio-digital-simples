import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css'],
})
export class CardapioComponent implements OnInit {
  titulo = 'RV Distribuidora 24hs';
  mesa: string = '';
  garcom: string = '';

  socket: any;
  carrinho: any[] = [];

  // 👉 NOTIFICAÇÃO
  notificacao: string = '';
  mostrarNotificacao = false;

  constructor(private zone: NgZone) {}

  produtos = [
    {
      nome: 'Batata Simples',
      descricao: 'Batata frita crocante',
      preco: 15.0,
      imagem: 'assets/produtos/batata-simples.jpg',
    },
    {
      nome: 'Batata com Calabresa',
      descricao: 'Batata com calabresa',
      preco: 20.0,
      imagem: 'assets/produtos/batata-com-calabresa.jpg',
    },
    {
      nome: 'Batata com Frango',
      descricao: 'Batata com frango empanado',
      preco: 30.0,
      imagem: 'assets/produtos/batata-frango.jpg',
    },
    {
      nome: 'Frango Empanado',
      descricao: 'Frango crocante',
      preco: 25.0,
      imagem: 'assets/produtos/frango.jpg',
    },
  ];

  ngOnInit() {
    this.socket = io('https://cardapio-backend-6uc6.onrender.com');

    this.socket.on('pedido-pronto', (data: any) => {
      this.zone.run(() => {
        // 👉 só avisa o garçom certo
        if (data.garcom === this.garcom) {
          this.notificacao = `Pedido da mesa ${data.mesa} está pronto!`;
          this.mostrarNotificacao = true;

          this.tocarSom();

          setTimeout(() => {
            this.mostrarNotificacao = false;
          }, 5000);
        }
      });
    });
  }

  tocarSom() {
    const audio = new Audio('assets/som.mp3');
    audio.play().catch(() => {});
  }

  adicionar(produto: any) {
    this.carrinho.push(produto);
  }

  remover(index: number) {
    this.carrinho.splice(index, 1);
  }

  get total() {
    return this.carrinho.reduce((soma, item) => soma + item.preco, 0);
  }

  async enviarPedido() {
    if (!this.mesa) {
      alert('Informe a mesa');
      return;
    }

    if (!this.garcom) {
      alert('Informe o garçom');
      return;
    }

    if (this.carrinho.length === 0) {
      alert('Adicione itens');
      return;
    }

    const pedido = {
      mesa: this.mesa,
      garcom: this.garcom,
      itens: this.carrinho.map((p) => ({
        nome: p.nome,
        preco: p.preco,
      })),
      total: this.total,
    };

    await fetch('https://cardapio-backend-6uc6.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido),
    });

    this.carrinho = [];
  }
}
