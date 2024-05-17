import { Injectable } from '@angular/core';
import { Artifact } from './artifact';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  private apiUrl = 'http://localhost:8080/api/v1/artefacts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Artifact[]> {
    console.log('Inicio getAll');
    return this.http.get<Artifact[]>(this.apiUrl);
  }

  getById(id: number): Observable<Artifact> {
    console.log('Inicio getById');
    return this.http.get<Artifact>(`${this.apiUrl}/${id}`);
  }

  save(artifact: Artifact): Observable<Artifact> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let response: Observable<Artifact>;
    if (artifact.artifactId) {
      console.log('Alterar:', JSON.stringify(artifact));
      response = this.http.put<Artifact>(`${this.apiUrl}/${artifact.artifactId}`, artifact, { headers });
    } else {
      console.log('Incluir:', JSON.stringify(artifact));
      response = this.http.post<Artifact>(this.apiUrl, artifact, { headers });
    }
    return response;
  }

  delete(id: number): Observable<void> {
    console.log('Deletar:', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
