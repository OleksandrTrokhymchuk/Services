import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Input } from "../app/input/input"
import { ServiceUniversity } from './service-university/service-university';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Input, ServiceUniversity],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('my-angular-app');
}
