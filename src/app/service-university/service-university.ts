import { Component, OnInit } from '@angular/core'
import { SharedService } from '../shared.service'

@Component({
  selector: 'app-service-university',
  imports: [],
  templateUrl: './service-university.html',
  styleUrl: './service-university.scss'
})
export class ServiceUniversity implements OnInit {
  receivedMessage = ''

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.currentMessage.subscribe(message => {
      this.receivedMessage = message
    })
  }
}
