import { Component, OnInit } from '@angular/core';
import { Artifact } from "../shared/artifact";
import { ActivatedRoute, Router, RouterLink, RouterModule } from "@angular/router";
import { ArtifactService } from "../shared/artifact.service";
import { FormsModule } from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {config} from "rxjs";
import {DialogMessageOkComponent} from "../../core/dailog-message-ok/dialog-message-ok.component";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RouterLink
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  artifact: Artifact = new Artifact();
  title: string = 'Nova peça';

  private dialogRef!: MatDialogRef<any>;
  constructor(
    private activateRouted: ActivatedRoute,
    private router: Router,
    private artifactService: ArtifactService,
    private  dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.activateRouted.snapshot.paramMap.get('id');
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
        console.error("Erro ao buscar os dados:", error);
        alert(`Erro ao buscar os dados: ${error.error}`);
      });
    }
  }

  onSubmit() {
    console.log("Dados a serem enviados:", JSON.stringify(this.artifact));
    this.artifactService.save(this.artifact).subscribe({
      next: (value) => {
        console.log("Salvo:", JSON.stringify(value));

        this.showMessage("Artefato salvo com sucesso!");

        this.router.navigate(['']);
      },
      error: (error) => {
        console.error("Erro ao salvar:", error);
        this.showMessage('Erro ao salvar:\n' + error.error);
      }
    });
  }

  private showMessage(message: string) {
    this.dialogRef = this.dialog.open(DialogMessageOkComponent, {
      minWidth: "2em",
      minHeight: "2em",
      disableClose: true,
      data: message
    });
    this.dialogRef.afterClosed().subscribe(value => {
      console.log("Botão fechar acionado");
    })
  }
}
