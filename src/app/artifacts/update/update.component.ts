import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Artifact } from '../shared/artifact';
import { ArtifactService } from '../shared/artifact.service';
import { MatDialog } from '@angular/material/dialog';
import {MessageService} from "../../core/message.service";
import {DataMessageConfirm} from "../../core/data-message-confirm";
import {DialogMessageConfirmComponent} from "../../core/dialog-message-confirm/dialog-message-confirm.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  artifact: Artifact = new Artifact();
  title: string = 'Peça x';
  itemChange: EventEmitter<Artifact> = new EventEmitter<Artifact>();
  todayDate: string;

  constructor(
    private activateRouted: ActivatedRoute,
    private router: Router,
    private artifactService: ArtifactService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    this.todayDate = yyyy + '-' + mm + '-' + dd;
  }

  ngOnInit(): void {
    const id = this.activateRouted.snapshot.paramMap.get('id');
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
              this.messageService.showMessage('Artifact não encontrado.');
            }
          },
          error: (error) => {
            console.error("Erro: ", error);
            this.messageService.showMessage(`Erro ao buscar os dados: ${error.message || error}`);
          }
        });
      } else {
        console.error('ID inválido.');
        this.messageService.showMessage('ID inválido.');
      }
    } else {
      console.error('ID não fornecido.');
      this.messageService.showMessage('ID não fornecido.');
    }
  }

  onSubmit() {
    this.artifactService.save(this.artifact).subscribe({
      next: (value) => {
        console.log("Salvo:", JSON.stringify(value));
        this.messageService.showMessage('Artefato alterado com sucesso!');
        this.itemChange.emit(this.artifact); // Emitir evento de mudança
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error("Erro:", JSON.stringify(error));
        this.messageService.showMessage('Erro ao salvar: ' + (error.error || error.message));
      }
    });
  }

  onDelete() {
    const dataConfirm: DataMessageConfirm = {
      message: 'Você tem certeza que deseja excluir este artefato?',
      okLabel: 'Excluir',
      okAction: () => {
        this.artifactService.delete(this.artifact.artifactId).subscribe({
          next: () => {
            this.messageService.showMessage('Excluído com sucesso');
            //this.itemChange.emit(this.artifact);
            this.router.navigate(['']);
          },
          error: (error) => {
            this.messageService.showMessage(`Erro ao excluir: ${error.error}`);
          }
        });
      },
      cancelLabel: 'Cancelar',
      cancelAction: () => {
        console.log('Ação de exclusão cancelada.');
      }
    };

    this.dialog.open(DialogMessageConfirmComponent, {
      data: dataConfirm
    });
  }
}
