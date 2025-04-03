import { Routes } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { AdminComponent } from "./admin/admin.component"
import { CustomerLayoutComponent } from './customer/customer-layout/customer-layout.component';
import { CompletedServicesComponent} from './customer/customer-intervention/intervention.component';
import { CustomerComponent } from './admin/customer/customer.component';
import { ServicesComponent } from './admin/services/services.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MechanicComponentPage } from './admin/mechanic/mechanic.component';
import { AppointmentComponent } from './admin/appointment/appointment.component';
import { CustomerAppointmentComponent } from './customer/customer-appointment/customer-appointment.component';
import { NewAppointmentFormComponent } from './customer/new-appointment-form/new-appointment-form.component';
import { AddComponent } from './component/add/add.component';
import { CustomerDataComponent } from './component/customer-data/customer-data.component';
import { AppointmentListComponent } from './component/appointment-list/appointment-list.component';
import { MechanicAddComponent } from './component/mechanic-add/mechanic-add.component';
import { MechanicsListComponent } from './component/mechanics-list/mechanics-list.component';
import { ServicesAddComponent } from './component/services-add/services-add.component';
import { ServicesListComponent } from './component/services-list/services-list.component';
import { LoginComponent } from './component/login/login.component';
import { SignUpFormComponent } from './customer/sign-up-form/sign-up-form.component';
import { customerGuard } from './guards/customerGuard';
import { adminGuard } from './guards/adminGuard';
import { mechanicGuard } from './guards/mechanicGuard';
import { CustomerCarListComponent } from './customer/customer-car-list/customer-car-list.component';
import { NewCarFormComponent } from './customer/customer-car-list/new-car-form/new-car-form.component';
import { NotificationComponent } from './component/cutomer-notification/notification.component';
import { MechanicComponent } from './mechanic/mechanic.component';
import { AppoMechaComponent } from './component/appo-mecha/appo-mecha.component';
import { HistoryMechaComponent } from './component/history-mecha/history-mecha.component';

export const routes: Routes = [
    //{ path: '', component: FrontpageComponent },
    
    { path: 'admin', 
        component: AdminComponent,
        canActivate: [adminGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'services', component: ServicesComponent,
                    children:[
                        { path: 'services-list', component: ServicesListComponent },
                        { path: 'services-add', component: ServicesAddComponent },
                        { path: '**', redirectTo:'services-list' }
                    ]
             },
            { path: 'customer', component: CustomerComponent, 
                    children:[ 
                        { path: 'customer-list', component: CustomerDataComponent },
                        { path: 'add-customer', component: AddComponent },
                        { path: '**', redirectTo:'customer-list' }
                    ]
            },
            { path: 'mechanic', component: MechanicComponentPage,
                    children:[
                        { path:'mechanic-add', component:MechanicAddComponent },
                        { path:'mechanic-list', component:MechanicsListComponent },
                        { path: '**', redirectTo:'mechanic-list' }
                    ]
             },
            { path: 'appointments', component: AppointmentComponent,
                    children:[
                        { path:'appointments-list', component: AppointmentListComponent },
                        { path: '**', redirectTo:'appointments-list' }
                    ]
             },
            { path: '', redirectTo:'dashboard', pathMatch: 'full' }
        ]
    },

    //******************************************/
    { path: 'mechanic', 
        canActivate: [mechanicGuard],
        component: MechanicComponent,
        children:[
            { path: 'appointments', component: AppoMechaComponent },
            { path: 'history', component: HistoryMechaComponent },
            { path: '**', redirectTo: 'appointments' }
        ]
    },
    //******************************************/
    
   { path: '', component: FrontpageComponent},
    {
        path:'customer',
        component: CustomerLayoutComponent,
        canActivate: [customerGuard],
        children:[
            { path: 'appointment', 
                component: CustomerAppointmentComponent ,
                children:[
                    { path: 'newAppointment', component: NewAppointmentFormComponent}
                ]
            },
            { path: 'intervention', 
                component: CompletedServicesComponent
            },
            { path: 'carList', 
                component: CustomerCarListComponent,
                children: [
                    { path: 'AddCar', component: NewCarFormComponent}
                ]
            },
            {
                path: 'notification', component: NotificationComponent
            }
            // { path: 'intervention', }
        ]
    },
    { path: 'login', component: LoginComponent},
    { path: 'signUp', component: SignUpFormComponent} 
]; 
