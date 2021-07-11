import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  currentTicket?: Ticket;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 50, 100];

  constructor(private ticketService: TicketService,
    private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.retrieveTickets();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveTickets(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.ticketService.getAll(params)
      .subscribe(
        response  => {
          const { tickets, totalItems } = response;
          this.tickets = tickets;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveTickets();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTickets();
  }

  refreshList(): void {
    this.retrieveTickets();
    this.currentTicket = undefined;
    this.currentIndex = -1;
  }

  setActiveTicket(ticket: Ticket, index: number): void {
    this.currentTicket = ticket;
    this.currentIndex = index;
  }

  removeAllTickets(): void {
    this.ticketService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.showToasterSuccess(response);
          this.refreshList();
        },
        error => {
          this.showToasterError(error);
          console.log(error);
        });
  }

  removeTicket(ticket: number): void {
    this.ticketService.delete(ticket)
      .subscribe(
        response => {
          console.log(response);
          this.showToasterSuccess(response);
          this.refreshList();
        },
        error => {
          this.showToasterError(error);
          console.log(error);
        });
  }

  searchTitle(): void {
    this.ticketService.findByTitle(this.title)
      .subscribe(
        data => {
          this.tickets = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  executeTest(): void {
    this.ticketService.executeTest()
      .subscribe(
        data => {
          this.showToasterSuccess(data);
          console.log(data);
        },
        error => {
          this.showToasterError(error);
          console.log(error);
        });
  }

  showToasterSuccess(data: any){
    this.notifyService.showSuccess("Succeed !", "");
  }

  showToasterError(data: any){
      this.notifyService.showError("Something is wrong", "");
  }

  showToasterInfo(){
      this.notifyService.showInfo("This is info", "");
  }

  showToasterWarning(){
      this.notifyService.showWarning("This is warning", "");
  }

}
