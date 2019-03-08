import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { OrderPanelComponent } from './order-panel/order-panel.component';
import { WaiterComponent } from './waiter/waiter.component';
import { WaiterService } from './waiter/waiter.service';
import { KitchenComponent } from './kitchen/kitchen.component';
import { OrderService } from "./shared/order.service";
import { AdminComponent } from './admin/admin.component';

@NgModule({
    declarations: [
        AppComponent,
        WaiterComponent,
        CounterComponent,
        OrderPanelComponent,
        KitchenComponent,
        AdminComponent
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
    providers: [WaiterService, OrderService],
    bootstrap: [AppComponent]
})
export class AppModule {}
