import { Component, OnInit } from '@angular/core'
import { SharedService } from '../shared.service'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface University {
  name: string
  country: string
  'state-province': string | null;
  web_pages: string[]
  domains: string[]
  alpha_two_code: string
  selected: boolean
}

@Component({
  selector: 'app-service-university',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './service-university.html',
  styleUrl: './service-university.scss'
})



export class ServiceUniversity implements OnInit {
  protected receivedMessage: string | null = null

  protected universities: University[] = []
  protected savedUniversities: University[] = []

  protected onCheckboxChange(isChecked: boolean, savedUni: University) {
    if (isChecked) {
      this.savedUniversities = [...this.savedUniversities, savedUni]
    } else {
      this.savedUniversities = this.savedUniversities.filter(uni => uni.name !== savedUni.name)
    }
  }

  constructor(private sharedService: SharedService, private http: HttpClient) {}

  protected errorMessage: string | null = null

  fetchData(searchParams: string): void {
    const originalUrl = `http://universities.hipolabs.com/search?country=${searchParams}`
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(originalUrl)}`

    this.errorMessage = null

    this.http.get<{ contents: string }>(proxyUrl).subscribe({
      next: (response) => {
        const data = JSON.parse(response.contents) as University[]
        this.universities = data.map(uni => ({ ...uni, selected: false }))
        console.log('response:', this.universities)

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
