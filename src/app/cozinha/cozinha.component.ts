import { Component, OnInit, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-cozinha',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cozinha.component.html',
  styleUrls: ['./cozinha.component.css']
})
export class CozinhaComponent implements OnInit {

  pedidos: any[] = [];
  socket: any;

  somLiberado = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone // 👈 AQUI
  ) {}

 ngOnInit() {

  this.socket = io('http://localhost:3000');

  this.socket.on('connect', () => {
    console.log('Socket conectado 🔥');
  });

  this.socket.on('novo-pedido', (pedido: any) => {

    this.zone.run(() => {

      console.log('Novo pedido chegou:', pedido);

      pedido.status = 'novo';
      pedido.novo = true;

      // 👉 FORÇA atualização REAL
      this.pedidos = [pedido, ...this.pedidos];

      this.tocarSom();

      // 🔥 força ciclo Angular (hack necessário às vezes)
      setTimeout(() => {
        pedido.novo = false;
      }, 10);

    });

  });

  this.buscarPedidos();
}
  async buscarPedidos() {
  const res = await fetch('http://localhost:3000/pedidos');
  const dados = await res.json();

  this.zone.run(() => {
    this.pedidos = [...dados]; // 👈 importante
  });
}

  ativarSom() {
    this.somLiberado = true;
    alert('Som ativado 🔊');
  }

  tocarSom() {
    if (isPlatformBrowser(this.platformId) && this.somLiberado) {
      const audio = new Audio('assets/som.mp3');
      audio.play().catch(() => {});
    }
  }

  preparar(pedido: any) {
    pedido.status = 'preparando';
  }

 async pronto(pedido: any) {

  pedido.status = 'pronto';

  await fetch('http://localhost:3000/pedido-pronto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mesa: pedido.mesa,
      garcom: pedido.garcom
    })
  });

}

  remover(index: number) {
    this.pedidos.splice(index, 1);
  }
}