import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Artifact } from '../artifact';
import { ArtifactService } from '../artifact.service';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input()
  artifact!: Artifact;
  @Output()
  itemChange: EventEmitter<Artifact> = new EventEmitter<Artifact>();

  constructor(private artifactService: ArtifactService) {}


}
