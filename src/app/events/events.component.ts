import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { countries } from '../shared/components/country-data-store';
import moment from 'moment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  events$!: Observable<any[]>;
  countryCode: string = 'US'; // Default country code
  endDate: string = moment().format('YYYY-MM-DD');    // Default end date
  startDate: string = moment(this.endDate).subtract(1, 'days').format('YYYY-MM-DD'); // Default start date
  public countries:any = countries;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    const givenStartDate = moment(this.startDate).format('YYYY-MM-DDTHH:mm:ss[Z]');
    const givenEndDate = moment(this.endDate).format('YYYY-MM-DDTHH:mm:ss[Z]');

    const url = `${environment.apiUrl}/events?` + 
                `countryCode=${this.countryCode}&` + 
                `startDate=${givenStartDate}&` +
                `endDate=${givenEndDate}`;
    this.events$ = this.http.get<any[]>(url);
  }
}
