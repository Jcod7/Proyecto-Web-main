import { ValidarcedulaService } from './../../services/validarcedula.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { NotificationService } from 'src/app/services/notification.service';
import { NavComponent } from "../renta/nav/nav.component";


@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [CommonModule, ReactiveFormsModule, RouterLink, FooterComponent, NavComponent]
})

export class RegisterComponent {

  disableSubmitButton = false; // Agrega esta propiedad
  [x: string]: any;

  /**get nombre() { return this.FormUser.get('nombre') as FormControl }
  get apellidos() { return this.FormUser.get('apellidos')as FormControl }
  get CorreoElectronico() { return this.FormUser.get('CorreoElectronico')as FormControl }
  get telefono() { return this.FormUser.get('telefono')as FormControl }
  get emailConfirm() { return this.FormUser.get('emailConfirm')as FormControl }
  get Contraseña() { return this.FormUser.get('Contraseña')as FormControl }
  get passwordConfirm() { return this.FormUser.get('passwordConfirm')as FormControl }
  get provincia() { return this.FormUser.get('provincia')as FormControl }
  get terminos() { return this.FormUser.get('terminos')as FormControl }
  get Direccion() { return this.FormUser.get('Direccion')as FormControl }
  get cedula() { return this.FormUser.get('cedula')as FormControl }**/



  FormUser = new FormGroup({
    'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'apellidos': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'CorreoElectronico': new FormControl('', [Validators.required, Validators.email]),
    'telefono': new FormControl('', [Validators.required,Validators.minLength(10),Validators.pattern(/^[0-9]\d*$/)]),
    'emailConfirm': new FormControl('', [Validators.required,Validators.email]),
    'Contraseña': new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/), Validators.minLength(8)]),
    'passwordConfirm': new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/), Validators.minLength(8)]),
    'provincia': new FormControl('', [Validators.required]),
    'terminos': new FormControl('', [Validators.required]),
    'Direccion': new FormControl('', [Validators.required,Validators.maxLength(300)]),
    'cedula': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]{10}$/)]),
    //'ruc': new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]{10}$/)]),
  });

  constructor(

    private _userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private validarcedulaService: ValidarcedulaService,


  ) { }

  isValidField(field: string): boolean {
    const control = this.FormUser.get(field) as FormControl;

    if (control instanceof FormControl) {
      const isValid = control.valid && control.touched;

      if (!isValid) {
        console.log(`Campo ${field} no es válido`);
      }

      return isValid;
    }

    return false;
  }

  onSubmit() {
    const user: User = {
      Cedula: this.FormUser.value.cedula ?? '',
      Nombre: this.FormUser.value.nombre ?? '',
      Apellido: this.FormUser.value.apellidos ?? '',
      CorreoElectronico: this.FormUser.value.CorreoElectronico ?? '',
      Contraseña: this.FormUser.value.Contraseña ?? '',
      Direccion: this.FormUser.value.Direccion ?? '',
      Telefono: this.FormUser.value.telefono ?? '',
    }
    if (this.FormUser.value.Contraseña != this.FormUser.value.passwordConfirm ||
      this.FormUser.value.CorreoElectronico != this.FormUser.value.emailConfirm
    ) {
      return
    }
    this._userService.singin(user).subscribe(data => {
      this.notificationService.notify('Registrado correctamente.', 2000);
      this.router.navigate(['/login'])
    })
  }
}
