import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Artifact } from '../artifact';
import { ArtifactService } from '../artifact.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  standalone: true,
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input()
  artifact!: Artifact;
  @Output()
  itemChange: EventEmitter<Artifact> = new EventEmitter<Artifact>();

  constructor(private artifactService: ArtifactService) {}

  delete() {
    this.artifactService.delete(this.artifact.artifactId).subscribe({
      next: () => {
        alert('Excluido com sucesso');
        this.itemChange.emit(this.artifact);
      },
      error: error => {
        alert(`Erro ao excluir: ${error.error}`);
      }
    });
  }
}
