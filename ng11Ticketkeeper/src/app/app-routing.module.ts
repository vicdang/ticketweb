import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';

const routes: Routes = [
  { path: '', redirectTo: 'ticket', pathMatch: 'full' },
  { path: 'ticket', component: TicketListComponent },
  { path: 'ticket/:id', component: TicketDetailsComponent },
  { path: 'add', component: AddTicketComponent },
  { path: 'upload-file', component: UploadFilesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
