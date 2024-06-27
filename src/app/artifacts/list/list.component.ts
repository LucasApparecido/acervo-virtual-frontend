import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { NgClass } from '@angular/common';
import { NgIf } from '@angular/common';
import {Artifact} from "../shared/artifact";
import {ArtifactService} from "../shared/artifact.service";
import {ListItemComponent} from "../list-item/list-item.component";
import {MatOption} from "@angular/material/autocomplete";
import {MatFormField, MatLabel, MatSelect, MatSelectChange} from "@angular/material/select";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgClass,
    NgIf,
    ListItemComponent,
    MatOption,
    MatSelect,
    MatLabel,
    MatFormField,
    FormsModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  artifacts: Artifact[] = [];
  sortedArtifacts: Artifact[] = [];
  sortOrder: string = 'artifactName'; // Valor padrão de ordenação

  constructor(
    public artifactService: ArtifactService,
    route: ActivatedRoute,
  ) {
    this.artifacts = route.snapshot.data['artifactsData'];
  }

  ngOnInit(): void {
    this.loadArtifacts();
    this.retrieveSortOrder(); // Recupera a última ordenação ao inicializar o componente
  }

  loadArtifacts(){
    this.artifacts = [];
    this.artifactService.getAll().subscribe(value => {
      this.artifacts = value;
      this.sortArtifacts();// Chama a função para ordenar os artefatos
    });
  }

  onSortOrderChange(order: string) {
    this.sortOrder = order;
    this.sortArtifacts();
  }
  sortArtifacts() {
    this.sortedArtifacts = [...this.artifacts].sort((a, b) => {
      switch (this.sortOrder) {
        case 'artifactName':
          return a.artifactName.localeCompare(b.artifactName);
        case 'registrationDate':
          return new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime();
        case 'artifactNumber':
          return a.artifactNumber.localeCompare(b.artifactNumber);
        case 'collectionYear':
          return a.collectionYear - b.collectionYear;
        case 'provenance':
          return a.provenance.localeCompare(b.provenance);
        case 'collectorDonor':
          return a.collectorDonor.localeCompare(b.collectorDonor);
        case 'familyTaxon':
          return a.familyTaxon.localeCompare(b.familyTaxon);
        case 'locationInCollection':
          return a.locationInCollection.localeCompare(b.locationInCollection);
        case 'periodEpochAge':
          return a.periodEpochAge.localeCompare(b.periodEpochAge);
        case 'status':
          return (a.status === b.status) ? 0 : a.status ? -1 : 1;
        default:
          return 0;
      }
    });
    this.saveSortOrder(); // Salva o estado da ordenação após reordenar
  }
  reload() {
    /*this.artifacts = [];
    this.artifactService.getAll().subscribe(value => {
      this.artifacts = value;
    });*/
    this.loadArtifacts();
  }

  refresh(artifact: Artifact) {
    const artifactIndex = this.artifacts.findIndex( (value) => value.artifactId == artifact.artifactId);
    this.artifacts.splice(artifactIndex, 1);
  }

  private retrieveSortOrder() {
    const lastSortOrder = localStorage.getItem('lastSortOrder');
    if (lastSortOrder) {
      this.sortOrder = lastSortOrder;
    }
  }

  private saveSortOrder() {
    localStorage.setItem('lastSortOrder', this.sortOrder);//mantem a ultima escolha de ordenaçao
  }
}
