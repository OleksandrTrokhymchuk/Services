import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private messageSource = new BehaviorSubject<string>('')
  currentMessage = this.messageSource.asObservable()

  updateMessage(message: string) {
    this.messageSource.next(message)
  }
}
