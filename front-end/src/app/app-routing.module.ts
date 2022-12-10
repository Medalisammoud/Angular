import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from "./Auth/auth.guard";
import { ProfileComponent } from './profile/profile.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { ListsProduitsComponent } from './lists-produits/lists-produits.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditComponent } from './edit/edit.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,

  },
  {
    path: 'ajout',
    component: AjoutProduitComponent,

  }
  ,
  {
    path: 'edit/:postId',
    component: EditComponent,

  },
  {
    path: 'lists',
    component: ListsProduitsComponent,

  }
  ,
  {
    path: '**',
    component: NotFoundComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
