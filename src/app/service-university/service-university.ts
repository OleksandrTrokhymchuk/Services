import { Component, OnInit } from '@angular/core'
import { SharedService } from '../shared.service'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface University {
  name: string
  country: string
  'state-province': string | null;
  web_pages: string[]
  domains: string[]
  alpha_two_code: string
}

@Component({
  selector: 'app-service-university',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './service-university.html',
  styleUrl: './service-university.scss'
})



export class ServiceUniversity implements OnInit {
  protected receivedMessage: string | null = null

  protected universities: University[] = []

  constructor(private sharedService: SharedService, private http: HttpClient) {}

  protected apiData: any = null
  protected errorMessage: string | null = null

  fetchData(searchParams: string): void {
    const apiUrl = `http://universities.hipolabs.com/search?country=${searchParams}`

    this.errorMessage = null

    this.http.get<University[]>(apiUrl).subscribe({
      next: (response: University[]) => {
        this.universities = response
        console.log('response:', this.apiData)

      },
      error: (error) => {
        this.errorMessage = error.message
        console.error('Error request to API:', error)
        this.universities = []
      },
    })
  }

  protected resetData(): void {
    this.universities = []
    this.errorMessage = null
  }

  ngOnInit() {
    this.sharedService.currentMessage.subscribe(message => {
      this.receivedMessage = message
      this.receivedMessage && this.fetchData(message)
    })
  }
}
