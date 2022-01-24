import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ){ }

  canActivate(): boolean{
    if(this.authService.isLogged()){
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  };
  
}
