import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

let isLoggedIn = false;

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        if (localStorage.getItem('currentUser') === null) {
            this.router.navigateByUrl('login');
            return false;
        }
        return true;
    }

    login(): void {
        isLoggedIn = true;
    }

    logout(): void {
        isLoggedIn = false;
    }
}