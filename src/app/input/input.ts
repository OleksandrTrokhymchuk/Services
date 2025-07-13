import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SharedService } from '../shared.service'

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.html',
  styleUrl: './input.css'
})
export class Input {
  constructor(private sharedService: SharedService) {}

  sendMessage(value: string) {
    this.sharedService.updateMessage(value)
  }
}
