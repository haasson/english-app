import {Login} from "./components/Auth/Login";
import Glossary from "./pages/glossary";
import Train from "./pages/train";
import {TrainManager} from "./components/Train/TrainManager/TrainManager";


export const publicRoutes = [
  {
    path: '/login',
    component: Login
  }
]

export const privateRoutes = [
  {
    path: '/glossary',
    component: Glossary
  },
  {
    path: '/train',
    component: Train
  },
  {
    path: '/train/:mode',
    component: TrainManager
  },
  {
    path: '/',
    component: Glossary
  },
]