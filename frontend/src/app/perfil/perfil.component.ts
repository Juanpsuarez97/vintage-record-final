import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VinylService } from '../services/vinyl.service';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: any = {
    nombre: '',
    email: '',
    miembro_desde: '2024'
  };

  contactForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private vinylService: VinylService,
    private authService: AuthService
  ) {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    // Obtener usuario del localStorage vía AuthService
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.usuario.nombre = currentUser.nombre;
      this.usuario.email = currentUser.email;
      
      // Pre-fill form with user data
      this.contactForm.patchValue({
        nombre: currentUser.nombre,
        email: currentUser.email
      });
    }
  }

  get f() { return this.contactForm.controls; }

  enviarMensaje() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.contactForm.invalid) {
      return;
    }

    this.loading = true;
    const formData = this.contactForm.value;

    this.vinylService.sendContactForm(formData).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        this.successMessage = '¡Mensaje enviado exitosamente al backend!';
        this.loading = false;
        this.submitted = false;
        this.contactForm.patchValue({ mensaje: '' });
        
        setTimeout(() => this.successMessage = '', 5000);
      },
      error: (error) => {
        console.error('Error al enviar mensaje:', error);
        this.errorMessage = 'Error al conectar con el backend. Verifica que esté corriendo en http://localhost:3000';
        this.loading = false;
      }
    });
  }
}
