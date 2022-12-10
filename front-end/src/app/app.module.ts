import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuNavBarComponent } from './menunav-bar/menunav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthInterceptor } from "./Auth/auth-interceptor";
import { NgImageSliderModule } from 'ng-image-slider';
import { ProfileComponent } from './profile/profile.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterdashComponent } from './footerdash/footerdash.component';
import { HeaderComponent } from './header/header.component';
import { ListsProduitsComponent } from './lists-produits/lists-produits.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuNavBarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    AjoutProduitComponent,
    DashboardComponent,
    FooterdashComponent,
    HeaderComponent,
    ListsProduitsComponent,
    NotFoundComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgImageSliderModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
