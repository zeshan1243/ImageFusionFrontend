import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

interface Images {
  id: number;
  url: string;
  tags: string;
  description: string;
}
interface Tags {
  id: number;
  tag:string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  start: number=1;
  size: number=20;
  images: Images[]=[];
  query: string = '';
  tags: Tags[] = [
    { id: 1, tag: 'nature' },
    { id: 2, tag: 'background' },
    { id: 3, tag: 'animal' },
    { id: 4, tag: 'sun' },
    { id: 5, tag: 'mountains' },
    { id: 6, tag: 'trees' },
    { id: 7, tag: 'ocean' },
    { id: 8, tag: 'forest' },
    { id: 9, tag: 'desert' },
    { id: 10, tag: 'wildlife' },
    { id: 11, tag: 'waterfall' },
    { id: 12, tag: 'skyline' },
    { id: 13, tag: 'flowers' },
    { id: 14, tag: 'snow' },
    { id: 15, tag: 'lake' },
    { id: 16, tag: 'river' },
    { id: 17, tag: 'beach' },
    { id: 18, tag: 'sunset' },
    { id: 19, tag: 'stars' },
    { id: 20, tag: 'clouds' }
  ];
  @ViewChild('tagContainer') tagContainer!: ElementRef;
  showLeftButton = false;
  showRightButton = false;

  constructor(private dataService : DataService) {
    this.dataService.searchInput.subscribe(res =>{
      if(res) this.fetchImages(this.start,this.size,res)
    })
   }
  ngOnInit(): void {
    this.fetchImages(this.start, this.size,this.query);
    setTimeout(() => {
      this.updateScrollButtons()
    }, 1000);

  }
  ngAfterViewInit() {
    // this.updateScrollButtons();
    // const container = this.tagContainer.nativeElement;

    // container.addEventListener('scroll', () => {
    //   this.updateScrollButtons();
    // });
  }

  fetchImages(start:number, size:number,query:string){
    let body ={
      start: start,
      size: size,
      tags: query
    }
    this.dataService.fetchImages(body).subscribe({
      next:(result) =>{
        console.log(result)
        if(result.status == 'success'){
          this.images = result.images;
        }
      },
      error: (err) => console.error('Error:', err)
    })
  }

  scroll(direction: number) {
    const container = this.tagContainer.nativeElement;
    const scrollAmount = 200; // Adjust this value as needed
    container.scrollLeft += direction * scrollAmount;
    this.updateScrollButtons();
  }

  updateScrollButtons() {
    const container = this.tagContainer.nativeElement;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;

    this.showLeftButton = scrollLeft > 0;
    this.showRightButton = scrollWidth - scrollLeft > clientWidth;
  }
}
