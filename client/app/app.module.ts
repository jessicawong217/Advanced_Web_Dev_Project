import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterSortPipe } from './counter/counter-sort.pipe';
import { CounterComponent } from './counter/counter.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { MenuSelectionComponent } from './menu/selection/menu-selection.component';
import { OrderPanelComponent } from './order-panel/order-panel.component';
import { OrderService } from './shared/order.service';
import { UsersIdGuard } from './users/guards/users-id-guard.service';
import { LoginComponent } from './users/login/login.component';
import { UsersService } from './users/users.service';
import { WaiterComponent } from './waiter/waiter.component';
import { WaiterService } from './waiter/waiter.service';
import { AdminComponent } from './admin/admin.component';
import { WaitingTimeComponent } from './waiting-time/waiting-time.component';

@NgModule({
    declarations: [
        AppComponent,
        WaiterComponent,
        CounterComponent,
        OrderPanelComponent,
        KitchenComponent,
        AdminComponent,
        CounterSortPipe,
        KitchenComponent,
        MenuSelectionComponent,
        LoginComponent,
        WaitingTimeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        SocketIoModule
    ],
    providers: [WaiterService, OrderService, UsersService, UsersIdGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
