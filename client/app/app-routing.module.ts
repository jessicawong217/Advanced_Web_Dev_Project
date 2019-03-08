import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CounterComponent } from './counter/counter.component';
import { WaiterComponent } from './waiter/waiter.component';
<<<<<<< HEAD
import { AdminComponent } from './admin/admin.component';
=======
import { KitchenComponent } from "./kitchen/kitchen.component";
>>>>>>> 680dae7898f5d6670e9365823821b01d9eb9a75b

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
<<<<<<< HEAD
        path: 'admin',
        component: AdminComponent
    }
=======
        path: 'kitchen',
        component: KitchenComponent
    },
>>>>>>> 680dae7898f5d6670e9365823821b01d9eb9a75b
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
