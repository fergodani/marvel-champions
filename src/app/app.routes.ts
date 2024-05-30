import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { SelectGameComponent } from './components/select-game/select-game.component';

export const routes: Routes = [
    {
        path: '',
        component: GameComponent
    },
    {
        path: 'game',
        component: GameComponent
    },
];
