import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { NgClass } from '@angular/common';
import { NgIf } from '@angular/common';
import {Artifact} from "../artifact";
import {ArtifactService} from "../artifact.service";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  artifacts: Artifact[] = [];

  constructor(
    public artifactService: ArtifactService,
    route: ActivatedRoute,
  ) {
    this.artifacts = route.snapshot.data['artifactsData'];
  }

  ngOnInit(): void {
  }

  reload() {
    this.artifacts = [];
    this.artifactService.getAll().subscribe(value => {
      this.artifacts = value;
    });
  }

  refresh(artifact: Artifact) {
    const artifactIndex = this.artifacts.findIndex( (value) => value.artifactId == artifact.artifactId);
    this.artifacts.splice(artifactIndex, 1);
  }
}
