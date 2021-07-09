import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {
  ticket: Ticket = {
    title: '',
    site_url: '',
    gaptime: 60,
    last_status: false,
    activated: true
  };
  submitted = false;

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  saveTicket(): void {
    const data = {
      title: this.ticket.title,
      site_url: this.ticket.site_url,
      gaptime: this.ticket.gaptime,
      last_status: this.ticket.last_status,
      activated: this.ticket.activated
    };

    this.ticketService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });

    this.newTicket();
    this.router.navigate(['/ticket']);
  }

  newTicket(): void {
    this.submitted = false;
    this.ticket = {
      title: '',
      site_url: '',
      gaptime: 60,
      last_status: false,
      activated: true
    };
  }

}
