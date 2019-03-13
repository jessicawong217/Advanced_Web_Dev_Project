import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CounterComponent } from './counter/counter.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { WaiterComponent } from './waiter/waiter.component';
<<<<<<< HEAD
import { AdminComponent } from './admin/admin.component';
import { KitchenComponent } from './kitchen/kitchen.component';
=======
import { UsersIdGuard } from './users/guards/users-id-guard.service';
import { LoginComponent } from './users/login/login.component';
>>>>>>> f289149939e27f8e4767b1e005b8db2e16f962ad

const routes: Routes = [
    {
        path: 'waiter',
        component: WaiterComponent,
        canActivate: [UsersIdGuard]
    },
    {
        path: '',
        redirectTo: 'waiter',
        pathMatch: 'full'
    },
    {
        path: 'counter',
        component: CounterComponent,
        canActivate: [UsersIdGuard]
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'kitchen',
        component: KitchenComponent
<<<<<<< HEAD
=======
    },
    {
        path: 'login',
        component: LoginComponent
>>>>>>> f289149939e27f8e4767b1e005b8db2e16f962ad
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
