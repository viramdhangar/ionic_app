import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private authService: AuthenticationService) { }

  canActivate() : boolean{
    return this.authService.isAuthenticated();
  }
}
