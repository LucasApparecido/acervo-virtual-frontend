import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Artifact } from '../artifact';
import { ArtifactService } from '../artifact.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RouterLink
  ],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'] // corrigido para 'styleUrls'
})
export class UpdateComponent implements OnInit {
  artifact: Artifact = new Artifact();
  title: string = 'Peça x';
  itemChange: EventEmitter<Artifact> = new EventEmitter<Artifact>();

  constructor(
    private activateRouted: ActivatedRoute,
    private router: Router,
    private artifactService: ArtifactService
  ) { }

  ngOnInit(): void {
    const id = this.activateRouted.snapshot.paramMap.get('id'); // pegar na rota atual o parâmetro especificado na rota
    console.log("ID edição: " + id);

    if (id) {
      const parsedId = parseInt(id, 10);
      if (!isNaN(parsedId)) {
        this.artifactService.getById(parsedId).subscribe({
          next: (value) => {
            if (value) {
              this.artifact = value;
              this.title = 'Alterando peça';
              console.log("INIT FORM: " + JSON.stringify(value));
            } else {
              console.error('Artifact não encontrado.');
              alert('Artifact não encontrado.');
            }
          },
          error: (error) => {
            console.log("Erro: ", error);
            alert(`Erro ao buscar os dados: ${error.message || error}`);
          }
        });
      } else {
        console.error('ID inválido.');
        alert('ID inválido.');
      }
    } else {
      console.error('ID não fornecido.');
      alert('ID não fornecido.');
    }
  }

  onSubmit() {
    this.artifactService.save(this.artifact).subscribe({
      next: (value) => {
        console.log("Salvo:", JSON.stringify(value));
      },
      error: (error) => {
        console.log("Erro:", JSON.stringify(error));
        alert('Erro ao salvar: ' + (error.error || error.message));
      }
    });
  }

  onDelete() {
    this.artifactService.delete(this.artifact.artifactId).subscribe({
      next: () => {
        alert('Excluido com sucesso');
        this.itemChange.emit(this.artifact);
        this.router.navigate(['']);
      },
      error: (error) => {
        alert(`Erro ao excluir: ${error.error}`);
      }
    });
  }
}
