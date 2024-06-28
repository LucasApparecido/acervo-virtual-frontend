import {Component, ViewChild} from '@angular/core';
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
import {MatFormField, MatLabel, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

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
    MatPaginator,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent implements OnInit {
  artifacts: Artifact[] = [];
  sortedArtifacts: Artifact[] = [];
  sortOrder: string = 'artifactName';

  pageSize = 25;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public artifactService: ArtifactService,
    route: ActivatedRoute,
  ) {
    this.artifacts = route.snapshot.data['artifactsData'];
  }

  ngOnInit(): void {
    this.loadArtifacts();
    this.retrieveSortOrder();
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página:';
    this.paginator._intl.nextPageLabel = 'Próxima página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
    this.paginator._intl.changes.next(); // Necessário para atualizar os labels
  }

  loadArtifacts(){
    this.artifacts = [];
    this.artifactService.getAll().subscribe(value => {
      this.artifacts = value;
      this.setupPaginator();
      this.onPageChange({pageIndex: this.pageIndex, pageSize: this.pageSize} as PageEvent);
      this.sortArtifacts();
    });
  }

  onSortOrderChange(order: string) {
    this.sortOrder = order;
    this.sortArtifacts();
  }

  setupPaginator() {
    this.paginator.length = this.artifacts.length;
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = this.pageIndex;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.sortedArtifacts = this.artifacts.slice(
      event.pageIndex * event.pageSize,
      (event.pageIndex + 1) * event.pageSize
    );
  }

  sortArtifacts() {
    this.artifacts.sort((a, b) => {
      switch (this.sortOrder) {
        case 'artifactName':
          return a.artifactName.localeCompare(b.artifactName);
        case 'registrationDate':
          return new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime();
        case 'tombingDate':
          return new Date(a.tombingDate).getTime() - new Date(b.tombingDate).getTime();
        case 'collectionYear':
          return a.collectionYear - b.collectionYear;
        default:
          return 0;
      }
    });
    this.onPageChange({pageIndex: this.pageIndex, pageSize: this.pageSize} as PageEvent);
    this.saveSortOrder();
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
