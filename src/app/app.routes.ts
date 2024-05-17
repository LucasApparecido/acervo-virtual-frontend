import { Routes } from '@angular/router';
import {AboutComponent} from "./pages/about/about.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {CreateComponent} from "./artifacts/create/create.component";
import {ListComponent} from "./artifacts/list/list.component";
import {UpdateComponent} from "./artifacts/update/update.component";
import {DeleteComponent} from "./artifacts/delete/delete.component";
import {ReadComponent} from "./artifacts/read/read.component";
import {ArtifactResolve} from "./artifacts/artifact.resolve";

export const routes: Routes = [
  {path:'about', component: AboutComponent},
  {path:'contact', component: ContactComponent},
  {path:'create', component: CreateComponent},
  {path:'list', component: ListComponent,
    resolve:{
    artifactsData:ArtifactResolve,
    }
  },
  {path:'update', component: UpdateComponent},
  {path:'delete', component: DeleteComponent},
  {path:'read', component: ReadComponent}
];
