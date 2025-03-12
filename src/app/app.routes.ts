import { Component } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
            path: 'dashboard',
            component: DashboardComponent,
            },
            {
                path: 'cart',
                component: CartComponent,
            }
        ]
     }
];

bootstrapApplication(AppComponent, {
   providers: [provideRouter(routes)] 
});