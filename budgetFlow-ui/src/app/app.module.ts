import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {httpTokenInterceptor} from "./services/interceptor/http-token.interceptor";
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './modules/expense/components/menu/menu.component';
import { MainComponent } from './modules/expense/pages/main/main.component';
import {FormsModule} from "@angular/forms";
import { RegisterComponent } from './pages/register/register.component';
import { AccountActivationComponent } from './pages/account-activation/account-activation.component';
import {CodeInputModule} from "angular-code-input";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    MainComponent,
    RegisterComponent,
    AccountActivationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CodeInputModule
  ],
  providers: [
    provideHttpClient(withInterceptors([httpTokenInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
