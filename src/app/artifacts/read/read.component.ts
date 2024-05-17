import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Artifact} from "../artifact";
import {ActivatedRoute, Router, RouterLink, RouterModule} from "@angular/router";
import {ArtifactService} from "../artifact.service";

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RouterLink
  ],
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']  // Corrigido: styleUrl para styleUrls
})
export class ReadComponent implements OnInit {
  artifact: Artifact = new Artifact();
  title: string = 'Visualizar Peça';

  constructor(
    private activatedRoute: ActivatedRoute,  // Corrigido: activateRouted para activatedRoute
    private router: Router,
    private artifactService: ArtifactService
  ) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // pegar na rota atual o parâmetro especificado na rota
    console.log("ID visualização:" + id + ":");
    if (id) {
      this.artifactService.getById(parseInt(id)).subscribe(value => {
        console.log("Dados carregados:", value);
        if (value) {
          this.artifact = value;
          this.title = 'Visualizando Peça';
        }
      }, error => {
        console.log("Erro ao buscar os dados:", error);
        alert(`Erro ao buscar os dados: ${error.error}`);
      });
    }
  }

  onSubmit() {
    this.artifactService.save(this.artifact)
      .subscribe(value => {
        console.log("Salvo:", value);
        this.router.navigate(['/artifacts']);
      }, error => {
        console.log("Erro ao salvar:", error);
        alert('Erro ao salvar: ' + error.error);
      });
  }
}
