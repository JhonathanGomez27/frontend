import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  register(){
    console.log(this.user);
    this.authService.register(this.user).subscribe(
      (data)=>{
        this.respuesta = data;
        this.router.navigate(['/auth/login']);
        this.toastService.success("Registro exitoso", "Exito",{
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
