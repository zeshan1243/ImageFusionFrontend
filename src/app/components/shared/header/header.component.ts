import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private dataService: DataService){}
  search(event : any){
    console.log(event);
    console.log(event.target.value);
    this.dataService.searchInput.next(event.target.value)
    
  }
}
