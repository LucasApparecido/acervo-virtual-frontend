import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ListComponent} from "./list/list.component";
import {CreateComponent} from "./create/create.component";
import {ReadComponent} from "./read/read.component";
import {UpdateComponent} from "./update/update.component";



@NgModule({
  declarations: [
    ],
  imports: [
    CommonModule,
    FormsModule,
    CreateComponent,
    ListComponent,
    ReadComponent,
    UpdateComponent,
  ],
  exports: [
    ListComponent,
    CreateComponent,
    ReadComponent,
    UpdateComponent
  ]
})
export class ArtifactsModule { }
