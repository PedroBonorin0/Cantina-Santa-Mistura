import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Lanches from '../views/Lanches.vue';
import LanchesDia from '../views/LanchesDia.vue';
import Clientes from '../views/Clientes.vue';
import Produtos from '../views/Produtos.vue';
import Turmas from '../views/Turmas.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lanches',
    name: 'Lanches',
    component: Lanches
  },
  {
    path: '/lanchesdia',
    name: 'LanchesDia',
    component: LanchesDia
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: Clientes
  },
  {
    path: '/produtos',
    name: 'Produtos',
    component: Produtos
  },
  {
    path: '/turmas',
    name: 'Turmas',
    component: Turmas
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;