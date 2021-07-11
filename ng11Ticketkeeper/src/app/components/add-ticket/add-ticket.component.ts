import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

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
    private router: Router,
    private notifyService : NotificationService) { }

  ngOnInit(): void {
  }

  saveTicket(): void {
    const data = {
      title: this.ticket.site_url,
      // title: this.ticket.title,
      site_url: this.ticket.site_url,
      gaptime: this.ticket.gaptime,
      last_status: false,
      // last_status: this.ticket.last_status,
      activated: true
      // activated: this.ticket.activated
    };

    this.ticketService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.showToasterSuccess();
          this.newTicket();
          this.router.navigate(['/ticket']);
        },
        error => {
          this.showToasterError();
          console.log(error);
        });
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

  showToasterSuccess(){
    this.notifyService.showSuccess("Succeed !", "");
  }

  showToasterError(){
      this.notifyService.showError("Something is wrong", "");
  }

  showToasterInfo(){
      this.notifyService.showInfo("This is info", "");
  }

  showToasterWarning(){
      this.notifyService.showWarning("This is warning", "");
  }

}
