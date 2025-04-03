import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { AppComponent } from './app.component'; 
import { FrontpageComponent } from './frontpage/frontpage.component'; 
import { NavbarCustomerComponent } from './component/navbar-customer/navbar-customer.component';
import { QuestionsComponent } from './component/questions-customer/questions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from './services/customer-services/customer-appointment-services/appointment.service';
import { NewAppointmentFormComponent } from './customer/new-appointment-form/new-appointment-form.component';
import { DeleteModalComponent } from './component/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes), 
    FrontpageComponent, 
    QuestionsComponent,
    NavbarCustomerComponent,
    ReactiveFormsModule,
    FormsModule,
    DeleteModalComponent

  ],
  providers: [AppointmentService],
  bootstrap: []
})
export class AppModule {}