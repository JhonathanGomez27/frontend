import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  respuesta: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public toastService: ToastrService
  ) {
    this.user ={};
   }

  ngOnInit(): void {
  }

  login(){
    console.log(this.user);
    this.authService.login(this.user).subscribe(
      (data)=>{
        this.respuesta = data;
        localStorage.setItem('token', this.respuesta);
        this.router.navigate(['/admin/listarCorrales']);
        this.toastService.success("Inicio de sesion exitoso", "Exito",{
          timeOut: 4000,
        });
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log(this.respuesta);
        
      }
    )
  }

}
