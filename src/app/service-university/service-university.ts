import { Component, OnInit } from '@angular/core'
import { SharedService } from '../shared.service'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-university',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './service-university.html',
  styleUrl: './service-university.scss'
})
export class ServiceUniversity implements OnInit {
  protected receivedMessage: string | null = null

  constructor(private sharedService: SharedService, private http: HttpClient) {}

  protected apiData: any = null
  protected errorMessage: string | null = null

  protected alpha_two_code: string | null = null
  protected country: string | null = null
  protected name: string | null = null
  protected web_page: string | null = null
  protected state_province: string | null = null

  fetchData(searchParams: string): void {
    const apiUrl = `http://universities.hipolabs.com/search?country=${searchParams}`

    this.errorMessage = null

    this.http.get(apiUrl).subscribe({
      next: (response) => {
        this.apiData = response
        console.log('response:', this.apiData)


        this.alpha_two_code = this.apiData[0].alpha_two_code
        this.country = this.apiData[0].country
        this.name = this.apiData[0].name
        this.web_page = this.apiData[0].web_pages[0]
        this.state_province = this.apiData[0].state_province
      },
      error: (error) => {
        this.errorMessage = error.message
        console.error('Error request to API:', error)
        this.apiData = null
      },
    })
  }

  ngOnInit() {
    this.sharedService.currentMessage.subscribe(message => {
      this.receivedMessage = message
      this.receivedMessage && this.fetchData(message)
    })
  }
}
