import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Vinyl {
  id?: number;
  categoria: string;
  nombre: string;
  precio?: number;
  stock?: number;
}

export interface ContactForm {
  nombre: string;
  email: string;
  mensaje: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  vinyls?: T[];
  vinyl?: T;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class VinylService {
  private apiUrl = environment.apiUrl || 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // ===== VINYLS CRUD =====

  // GET - Obtener todos los vinilos
  getVinyls(): Observable<ApiResponse<Vinyl>> {
    return this.http.get<ApiResponse<Vinyl>>(`${this.apiUrl}/vinyls`);
  }

  // GET - Obtener vinilo por ID
  getVinylById(id: number): Observable<ApiResponse<Vinyl>> {
    return this.http.get<ApiResponse<Vinyl>>(`${this.apiUrl}/vinyls/${id}`);
  }

  // POST - Crear nuevo vinilo
  createVinyl(vinyl: Vinyl): Observable<ApiResponse<Vinyl>> {
    return this.http.post<ApiResponse<Vinyl>>(`${this.apiUrl}/vinyls`, vinyl);
  }

  // PUT - Actualizar vinilo
  updateVinyl(id: number, vinyl: Vinyl): Observable<ApiResponse<Vinyl>> {
    return this.http.put<ApiResponse<Vinyl>>(`${this.apiUrl}/vinyls/${id}`, vinyl);
  }

  // DELETE - Eliminar vinilo
  deleteVinyl(id: number): Observable<ApiResponse<Vinyl>> {
    return this.http.delete<ApiResponse<Vinyl>>(`${this.apiUrl}/vinyls/${id}`);
  }

  // ===== CONTACT =====

  // POST - Enviar formulario de contacto
  sendContactForm(data: ContactForm): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, data);
  }

  // GET - Obtener mensajes de contacto
  getContactMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/contact`);
  }
}
