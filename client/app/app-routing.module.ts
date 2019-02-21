import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WaiterComponent } from './waiter/waiter.component';

const routes: Routes = [
    {
        path: 'waiter',
        component: WaiterComponent
    },
    {
        path: '',
        redirectTo: 'waiter',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
