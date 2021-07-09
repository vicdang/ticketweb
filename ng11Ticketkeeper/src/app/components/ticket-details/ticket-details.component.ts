import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  currentTicket: Ticket = {
    title: '',
    site_url: '',
    gaptime: 60,
    last_status: false,
    activated: true
  };
  message = '';

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getTicket(this.route.snapshot.params.id);
  }

  getTicket(id: string): void {
    this.ticketService.get(id)
      .subscribe(
        data => {
          this.currentTicket = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateLastStatus(last_status: boolean): void {
    const data = {
      title: this.currentTicket.title,
      site_url: this.currentTicket.site_url,
      gaptime: this.currentTicket.gaptime,
      last_status: last_status,
      activated: this.currentTicket.activated
    };

    this.ticketService.update(this.currentTicket.id, data)
      .subscribe(
        response => {
          this.currentTicket.last_status = last_status;
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }

  updateActivated(activated: boolean): void {
    const data = {
      title: this.currentTicket.title,
      site_url: this.currentTicket.site_url,
      gaptime: this.currentTicket.gaptime,
      last_status: this.currentTicket.last_status,
      activated: activated
    };

    this.ticketService.update(this.currentTicket.id, data)
      .subscribe(
        response => {
          this.currentTicket.activated = activated;
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }

  updateTicket(): void {
    this.ticketService.update(this.currentTicket.id, this.currentTicket)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }

  deleteTicket(): void {
    this.ticketService.delete(this.currentTicket.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/ticket']);
        },
        error => {
          console.log(error);
        });
  }
}
