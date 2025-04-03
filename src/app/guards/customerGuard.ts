import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import {AuthService} from '../services/auth-services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class customerGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    canActivate(): boolean {
        if (this.authService.isLoggedIn() && this.authService.hasRole('customer')) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}