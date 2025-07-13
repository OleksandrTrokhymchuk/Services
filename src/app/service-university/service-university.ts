import { Component, OnInit } from '@angular/core'
import { SharedService } from '../shared.service'
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-service-university',
  imports: [HttpClientModule],
  templateUrl: './service-university.html',
  styleUrl: './service-university.scss'
})
export class ServiceUniversity implements OnInit {
  receivedMessage = ''

  constructor(private sharedService: SharedService, private http: HttpClient) {}

  protected apiData: any = null
  protected errorMessage: string | null = null

  fetchData(searchParams: string): void {
    const apiUrl = `http://universities.hipolabs.com/search?country=${searchParams}`

    this.errorMessage = null

    this.http.get(apiUrl).subscribe({
      next: (response) => {
        this.apiData = response
        console.log('response:', response)
      },
      error: (error) => {
        this.errorMessage = error.message
        console.error('Помилка API-запиту:', error)
        this.apiData = null
      },
    })
  }

  ngOnInit() {
    this.sharedService.currentMessage.subscribe(message => {
      this.receivedMessage = message
      this.fetchData(message)
    })
  }
}
