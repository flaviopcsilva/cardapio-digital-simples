import { Routes } from '@angular/router';
import { CozinhaComponent } from './cozinha/cozinha.component';
import { App } from './app';
import { CardapioComponent } from './cardapio/cardapio.component';

export const routes: Routes = [
    { path: '', component: CardapioComponent }, // 👈 CARDÁPIO
  { path: 'cozinha', component: CozinhaComponent }
];
