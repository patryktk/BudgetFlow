import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {httpTokenInterceptor} from "./services/interceptor/accessToken/http-token.interceptor";
import {LoginComponent} from './pages/login/login.component';
import {MenuComponent} from './modules/expense/components/menu/menu.component';
import {MainComponent} from './modules/expense/pages/main/main.component';
import {FormsModule} from "@angular/forms";
import {RegisterComponent} from './pages/register/register.component';
import {AccountActivationComponent} from './pages/account-activation/account-activation.component';
import {CodeInputModule} from "angular-code-input";
import {FullCalendarModule} from "@fullcalendar/angular";

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
    CodeInputModule,
    FullCalendarModule
  ],
  providers: [
    provideHttpClient(withInterceptors([httpTokenInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
