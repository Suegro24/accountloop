import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OverviewComponent } from './layout/overview/overview.component'
import { BudgetListComponent } from './components/budget-list/budget-list.component';
import { RegisterComponent } from './layout/register/register.component';
import { LoginComponent } from './layout/login/login.component';
import { AddIncomeModalComponent } from './components/modals/add-income-modal/add-income-modal.component';
import { AddExpenseModalComponent } from './components/modals//add-expense-modal/add-expense-modal.component';
import { BudgetChartComponent } from './components/budget-chart/budget-chart.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { EditProfileModalComponent } from './components/modals/edit-profile-modal/edit-profile-modal.component';
import { FirmComponent } from './layout/firm/firm.component';
import { FirmSearchModalComponent } from './components/modals/firm-search-modal/firm-search-modal.component';
import { FirmCreateModalComponent } from './components/modals/firm-create-modal/firm-create-modal.component';
import { FirmBudgetListComponent } from './components/firm-budget-list/firm-budget-list.component';
import { FirmUsersListComponent } from './components/firm-users-list/firm-users-list.component';
import { ManageFirmComponent } from './layout/manage-firm/manage-firm.component';
import { ChangePermissionsModalComponent } from './components/modals/change-permissions-modal/change-permissions-modal.component';
import { EditFirmDataModalComponent } from './components/modals/edit-firm-data-modal/edit-firm-data-modal.component';
import { ConfirmLeavingFirmComponent } from './components/modals/confirm-leaving-firm/confirm-leaving-firm.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UserChartsComponent } from './layout/user-charts/user-charts.component';
import { AccountComponent } from './layout/account/account.component';
import { BudgetListPipePipe } from './components/pipes/budget-list-pipe/budget-list-pipe.pipe';
import { VerticalBarChartIncomesExpensesComponent } from './components/vertical-bar-chart-incomes-expenses/vertical-bar-chart-incomes-expenses.component';
import { MoneyTransferComponent } from './layout/money-transfer/money-transfer.component';
import { MoneyTransferPipePipe } from './components/pipes/money-transfer-pipe/money-transfer-pipe.pipe';
import { SendMoneyDialogComponent } from './components/modals/send-money-dialog/send-money-dialog.component';

const routes: Routes = [
  {path: '', redirectTo: '/rejestracja', pathMatch: 'full'},
  {path: 'logowanie', component: LoginComponent},
  {path: 'rejestracja', component: RegisterComponent},
  {path: 'przeglad', component: OverviewComponent},
  {path: 'profil', component: ProfileComponent},
  {path: 'firma', component: FirmComponent},
  {path: 'zarzadzaj-firma', component: ManageFirmComponent},
  {path: 'uzytkownik-wykresy', component: UserChartsComponent},
  {path: 'konto', component: AccountComponent },
  {path: 'przelew', component: MoneyTransferComponent}
]

const Material = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatDividerModule,
  MatListModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatCardModule,
  MatCheckboxModule,
  MatMenuModule,
  MatTabsModule,
  MatBadgeModule,
  MatTooltipModule,
  MatSnackBarModule
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    OverviewComponent,
    BudgetListComponent,
    RegisterComponent,
    LoginComponent,
    AddIncomeModalComponent,
    AddExpenseModalComponent,
    BudgetChartComponent,
    ProfileComponent,
    EditProfileModalComponent,
    FirmComponent,
    FirmSearchModalComponent,
    FirmCreateModalComponent,
    FirmBudgetListComponent,
    FirmUsersListComponent,
    ManageFirmComponent,
    ChangePermissionsModalComponent,
    EditFirmDataModalComponent,
    ConfirmLeavingFirmComponent,
    SidenavComponent,
    UserChartsComponent,
    AccountComponent,
    BudgetListPipePipe,
    VerticalBarChartIncomesExpensesComponent,
    MoneyTransferComponent,
    MoneyTransferPipePipe,
    SendMoneyDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    Material,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
