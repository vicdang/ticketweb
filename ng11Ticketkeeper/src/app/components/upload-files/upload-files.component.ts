import { Component, OnInit } from '@angular/core';

import { UploadFilesService } from 'src/app/services/upload-files.service';
import { TicketService } from 'src/app/services/ticket.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})

export class UploadFilesComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  venueUploaded = false;

  fileInfos?: Observable<any>;

  constructor(
    private uploadService: UploadFilesService,
    private ticketService: TicketService,
    private notifyService : NotificationService) { }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadEvent(): void {
    this.progress = 0;
    
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.ticketService.deleteAll()
        .subscribe(() => {
        this.currentFile = file;
        this.uploadService.uploadEvent(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
  
            this.currentFile = undefined;
          });
        });
      }
  
      this.selectedFiles = new FileList;
    }
  };

  uploadVenue(): void {
    this.progress = 0;
    
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.uploadService.uploadVenue(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
            this.venueUploaded = true;
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
  
            this.currentFile = undefined;
          });
      }
  
      this.selectedFiles = new FileList;
    }
  };

  scanVenue(): void {
    this.ticketService.scanVenue()
      .subscribe(
        data => {
          this.showToasterSuccess(data);
          console.log(data);
        },
        error => {
          this.showToasterError();
          console.log(error);
        });
  };

  showToasterSuccess(data: any){
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

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }
}
