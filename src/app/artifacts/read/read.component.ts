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
  styleUrl: './read.component.scss'
})
export class ReadComponent implements OnInit {
  artifact: Artifact = new Artifact();
  title: string = 'Peça x';

  constructor(
    private activateRouted: ActivatedRoute,
    private router: Router,
    private artifactService: ArtifactService
  ) {
  }

  ngOnInit(): void {
    const id = this.activateRouted.snapshot.paramMap.get('id'); // pegar na rota atual o parâmetro especificado na rota
    console.log("ID edição:" + id + ":");
    if (id) {
      this.artifactService.getById(parseInt(id)).subscribe(value => {
        const artifactAux = value;
        console.log("INIT FORM:" + JSON.stringify(artifactAux));
        if (artifactAux) {
          this.artifact = artifactAux;
          this.title = 'Alterando peça';
        }
      }, error => {
        console.log("Erro:", JSON.stringify(error));
        alert(`Erro ao buscar os dados: ${error.error}`);
      });
    }
  }

  onSubmit() {
    this.artifactService.save(this.artifact)
      .subscribe(value => {
        console.log("Salvo:", JSON.stringify(value));
        this.router.navigate(['/artifacts']);
      }, error => {
        console.log("Erro:", JSON.stringify(error));
        alert('Erro ao salvar: ' + error.error);
      });
  }
}
