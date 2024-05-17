import { Injectable } from '@angular/core';
import { Artifact } from './artifact';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {
  private http!: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAll(): Observable<Artifact[]> {
    console.log('Inicio getAll');
    return this.http.get<Artifact[]>('http://localhost:8080/api/v1/artefacts');
  }

  getById(id: number): Observable<Artifact> {
    console.log('Inicio getAll');
    return this.http.get<Artifact>(`http://localhost:8080/api/v1/artefacts/${id}`);
  }

  save(artifact: Artifact): Observable<Artifact> {
    let response : Observable<Artifact>;
    if (artifact.artifactId) {
      console.log('Alterar:' + JSON.stringify(artifact));
      response = this.http.put<Artifact>(`http://localhost:8080/api/v1/artefacts/${artifact.artifactId}`, artifact);
    } else {
      console.log('Incluir:' + JSON.stringify(artifact));
      response = this.http.post<Artifact>('http://localhost:8080/api/v1/artefacts', artifact);
    }
    return response;
  }

  delete(id: number): Observable<Artifact> {
    console.log('Alterar:' + id);
    return this.http.delete<Artifact>(`http://localhost:8080/api/v1/artefacts/${id}`);
  }
}
