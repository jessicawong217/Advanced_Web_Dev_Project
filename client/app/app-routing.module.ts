import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { CounterComponent } from './counter/counter.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { UsersIdGuard } from './users/guards/users-id-guard.service';
import { LoginComponent } from './users/login/login.component';
import { WaiterComponent } from './waiter/waiter.component';

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
        component: AdminComponent,
        canActivate: [UsersIdGuard],
        data: { userType: 'Admin' }
    },
    {
        path: 'kitchen',
        component: KitchenComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
