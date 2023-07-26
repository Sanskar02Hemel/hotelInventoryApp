import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'hotelInventoryApp';

  @ViewChild('name', {static: true}) name!: ElementRef;
  ngOnInit() {
    this.name.nativeElement.innerText = "Hilton Hotels";
  }
  // ngSwitch usecase
  // role ='Admin';

  // @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef;

  // ngAfterViewInit() {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;
  // }


}
