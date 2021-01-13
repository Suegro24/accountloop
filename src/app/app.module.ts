import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OverviewComponent } from './layout/overview/overview.component';
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
import { AuthGuard } from './guards/auth.guard';
import { FirmChartsComponent } from './layout/firm-charts/firm-charts.component';
import { ChatComponent } from './layout/chat/chat.component';
import { SettingsComponent } from './layout/settings/settings.component';
import { HelpdeskComponent } from './layout/helpdesk/helpdesk.component';
import { AdminLoginComponent } from './layout/admin/admin-login/admin-login.component';
import { AdminPanelComponent } from './layout/admin/admin-panel/admin-panel.component';
import { RoleGuardService } from './guards/role-guard-service.service';
import { OpenMailModalComponent } from './components/modals/open-mail-modal/open-mail-modal.component';
import { UserListComponent } from './layout/admin/user-list/user-list.component';
import { AdminMessagesComponent } from './layout/admin/admin-messages/admin-messages.component';
import { SendMailModalComponent } from './components/modals/send-mail-modal/send-mail-modal.component';
import { AdminCategoryComponent } from './layout/admin/admin-category/admin-category.component';
import { AddCategoryModalComponent } from './components/modals/add-category-modal/add-category-modal.component';
import { ShowNewPasswordModalComponent } from './components/modals/show-new-password-modal/show-new-password-modal.component';
import { EditCategoryModalComponent } from './components/modals/edit-category-modal/edit-category-modal.component';
import { MoneyTransferFirmComponent } from './layout/money-transfer-firm/money-transfer-firm.component';
import { BudgetForecastingChartComponent } from './components/budget-forecasting-chart/budget-forecasting-chart.component';
import { AddBudgetGoalModalComponent } from './components/modals/add-budget-goal-modal/add-budget-goal-modal.component';
import { ChangePasswordModalComponent } from './components/modals/change-password-modal/change-password-modal.component';
import { EventEmitterService } from './services/event-emitter.service';
import { UnblockUserModalComponent } from './components/modals/unblock-user-modal/unblock-user-modal.component';
import { FirmUserBudgetComponent } from './layout/firm-user-budget/firm-user-budget.component';
import { ShowAccountChangeDetailsComponent } from './components/modals/show-account-change-details/show-account-change-details.component';
import { AddMoneyToGoalModalComponent } from './components/modals/add-money-to-goal-modal/add-money-to-goal-modal.component';
import { EditGoalModalComponent } from './components/modals/edit-goal-modal/edit-goal-modal.component';
import { DeleteGoalModalComponent } from './components/modals/delete-goal-modal/delete-goal-modal.component';

const routes: Routes = [
  {path: '', redirectTo: 'logowanie', pathMatch: 'full'},
  {path: 'logowanie', component: LoginComponent},
  {path: 'rejestracja', component: RegisterComponent},
  {path: 'przeglad', component: OverviewComponent, canActivate: [AuthGuard]},
  {path: 'profil', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'firma', component: FirmComponent, canActivate: [AuthGuard]},
  {path: 'zarzadzaj-firma', component: ManageFirmComponent, canActivate: [AuthGuard]},
  {path: 'uzytkownik-wykresy', component: UserChartsComponent, canActivate: [AuthGuard]},
  {path: 'konto', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'przelew', component: MoneyTransferComponent, canActivate: [AuthGuard]},
  {path: 'przelew-firma', component: MoneyTransferFirmComponent, canActivate: [AuthGuard]},
  {path: 'firma-wykresy', component: FirmChartsComponent, canActivate: [AuthGuard]},
  {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
  {path: 'firma-konto', component: FirmUserBudgetComponent, canActivate: [AuthGuard]},
  {path: 'ustawienia', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'pomoc', component: HelpdeskComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminLoginComponent},
  {path: 'admin-panel', component: AdminPanelComponent, canActivate: [RoleGuardService], data: {expectedRole: 'admin'}},
  {path: 'admin-panel-users', component: UserListComponent, canActivate: [RoleGuardService], data: {expectedRole: 'admin'}},
  {path: 'admin-panel-messages', component: AdminMessagesComponent, canActivate: [RoleGuardService], data: {expectedRole: 'admin'}},
  {path: 'admin-panel-categories', component: AdminCategoryComponent, canActivate: [RoleGuardService], data: {expectedRole: 'admin'}},
  {path: '**', redirectTo: 'logowanie'}
];

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
  MatSnackBarModule,
  MatPaginatorModule,
  MatTableModule,
  ClipboardModule,
  MatProgressBarModule,
  MatSliderModule,
  MatChipsModule,
  MatProgressSpinnerModule
];

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
    SendMoneyDialogComponent,
    FirmChartsComponent,
    ChatComponent,
    SettingsComponent,
    HelpdeskComponent,
    AdminLoginComponent,
    AdminPanelComponent,
    OpenMailModalComponent,
    AdminMessagesComponent,
    SendMailModalComponent,
    UserListComponent,
    AdminCategoryComponent,
    AddCategoryModalComponent,
    ShowNewPasswordModalComponent,
    EditCategoryModalComponent,
    MoneyTransferFirmComponent,
    BudgetForecastingChartComponent,
    AddBudgetGoalModalComponent,
    ChangePasswordModalComponent,
    UnblockUserModalComponent,
    FirmUserBudgetComponent,
    ShowAccountChangeDetailsComponent,
    AddMoneyToGoalModalComponent,
    EditGoalModalComponent,
    DeleteGoalModalComponent
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
  providers: [AuthGuard, RoleGuardService, EventEmitterService, {provide: Window, useValue: window}],
  bootstrap: [AppComponent]
})
export class AppModule { }
