import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from './employee/employee.component';
import { RequestInterceptor } from './request.interceptor';
import { InitService } from './init.service';
import { AppNavComponent } from './app-nav/app-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NotfoundComponent } from './notfound/notfound.component';
import { RoomsBookingComponent } from './rooms/rooms-booking/rooms-booking.component';
import { RoomAddComponent } from './rooms/room-add/room-add.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HoverDirective } from './hover.directive';
import { EmailValidatorDirective } from './emailValidator/email-validator.directive';

function initFactory(initService: InitService){
  return () => initService.init();
}


@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    RoomsListComponent,
    HeaderComponent,
    ContainerComponent,
    EmployeeComponent,
    AppNavComponent,
    NotfoundComponent,
    RoomsBookingComponent,
    RoomAddComponent,
    LoginComponent,
    HoverDirective,
    EmailValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    FormsModule,
    MatListModule
  ],
  providers: [{
  provide: HTTP_INTERCEPTORS,
  useClass: RequestInterceptor,
  multi: true
  }, 
  {
    provide: APP_INITIALIZER,
        useFactory: initFactory,
        deps: [InitService],
        multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
