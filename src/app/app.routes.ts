import { Routes } from '@angular/router';
import {AboutComponent} from "./pages/about/about.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {CreateComponent} from "./artifacts/create/create.component";
import {ListComponent} from "./artifacts/list/list.component";
import {UpdateComponent} from "./artifacts/update/update.component";
import {ReadComponent} from "./artifacts/read/read.component";
import {ArtifactResolve} from "./artifacts/shared/artifact.resolve";
import {CorrectionComponent} from "./artifacts/correction/correction.component";

export const routes: Routes = [
  {path:'about', component: AboutComponent},
  {path:'contact', component: ContactComponent},
  {path:'create', component: CreateComponent},
  {path:'', component: ListComponent,
    resolve:{
    artifactsData:ArtifactResolve,
    }
  },
  {path:'update/:id', component: UpdateComponent},
  {path:'read/:id', component: ReadComponent},
  {path:'correction/:id', component: CorrectionComponent}
];
