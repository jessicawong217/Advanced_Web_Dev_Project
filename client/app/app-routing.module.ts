import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CounterComponent } from './counter/counter.component';
import { WaiterComponent } from './waiter/waiter.component';
import { AdminComponent } from './admin/admin.component';
import { KitchenComponent } from './kitchen/kitchen.component';

const routes: Routes = [
    {
        path: 'waiter',
        component: WaiterComponent
    },
    {
        path: '',
        redirectTo: 'waiter',
        pathMatch: 'full'
    },
    {
        path: 'counter',
        component: CounterComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
        path: 'kitchen',
        component: KitchenComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
