import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.html',
  styleUrl: './input.css'
})
export class Input {
  protected inputValue: string = ""
  protected displayedValue: string = ""

  onSearchClick(): void {
    this.displayedValue = this.inputValue
    this.inputValue = ""
  }
}
