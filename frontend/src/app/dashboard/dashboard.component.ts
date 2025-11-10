import { Component, OnInit } from '@angular/core';
import { VinylService, Vinyl } from '../services/vinyl.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName = 'Usuario';
  vinyls: Vinyl[] = [];
  loading = true;
  error = '';
  successMessage = '';
  
  // Formulario para crear/editar
  showForm = false;
  editMode = false;
  currentVinyl: Vinyl = this.getEmptyVinyl();

  constructor(
    private vinylService: VinylService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.currentUserValue;
    if (user) {
      this.userName = user.nombre;
    }
    this.loadVinyls();
  }

  getEmptyVinyl(): Vinyl {
    return {
      categoria: '',
      nombre: '',
      precio: 0,
      stock: 0
    };
  }

  loadVinyls() {
    this.loading = true;
    this.error = '';
    
    this.vinylService.getVinyls().subscribe({
      next: (response) => {
        if (response.success && response.vinyls) {
          this.vinyls = response.vinyls;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar vinilos:', error);
        this.error = 'Error al conectar con el backend. Verifica que esté corriendo en http://localhost:3000';
        this.loading = false;
      }
    });
  }

  openCreateForm() {
    this.showForm = true;
    this.editMode = false;
    this.currentVinyl = this.getEmptyVinyl();
  }

  openEditForm(vinyl: Vinyl) {
    this.showForm = true;
    this.editMode = true;
    this.currentVinyl = { ...vinyl };
  }

  cancelForm() {
    this.showForm = false;
    this.currentVinyl = this.getEmptyVinyl();
  }

  saveVinyl() {
    if (this.editMode && this.currentVinyl.id) {
      // Actualizar
      this.vinylService.updateVinyl(this.currentVinyl.id, this.currentVinyl).subscribe({
        next: (response) => {
          this.successMessage = 'Vinilo actualizado exitosamente';
          this.loadVinyls();
          this.cancelForm();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.error = 'Error al actualizar el vinilo';
        }
      });
    } else {
      // Crear
      this.vinylService.createVinyl(this.currentVinyl).subscribe({
        next: (response) => {
          this.successMessage = 'Vinilo creado exitosamente';
          this.loadVinyls();
          this.cancelForm();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.error = 'Error al crear el vinilo';
        }
      });
    }
  }

  deleteVinyl(id: number | undefined) {
    if (!id) return;
    
    if (confirm('¿Estás seguro de eliminar este vinilo?')) {
      this.vinylService.deleteVinyl(id).subscribe({
        next: (response) => {
          this.successMessage = 'Vinilo eliminado exitosamente';
          this.loadVinyls();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.error = 'Error al eliminar el vinilo';
        }
      });
    }
  }
}
