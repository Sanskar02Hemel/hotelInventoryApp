import { Component, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { HttpEventType } from '@angular/common/http';
import { Subject, Subscription, catchError, map, of } from 'rxjs';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  hotelName = 'Hilton Hotel';
  numberOfRooms = 10;
  numberOfWindows = 458;
  hideWindows = true;

  selectedRoom!: RoomList;

  // interface for usecase of *ngif
  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  title = 'Room List';

  roomList: RoomList[] = [];

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  error: string = '';
  totalBytes = 0;

  subscription!: Subscription;
  error$ = new Subject<String>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      this.error$.next(err.message);
      return of([]);
   })
  );

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms) => rooms.length)
  )

  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {

    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader:{
          console.log('Request Success!');
          break;
        }
        case HttpEventType.DownloadProgress:{
          this.totalBytes+=event.loaded;
          break;
        }
        case HttpEventType.Response:{
          console.log(event.body);
          break;
        }
      }
    });
    // console.log(this.headerComponent);
    // this.stream.subscribe({
    //   next: (value)=> console.log(value),
    //   complete: ()=> console.log('complete'),
    //   error: (err)=> console.log(err),
    // });

    // this.roomsService.getRooms$.subscribe(rooms =>{
    //   this.roomList = rooms;
    // });

  }

  ngAfterViewInit() {
    this.headerComponent.title  = "Rooms View"
  }  

  // for event binding
  toggle() {
    this.hideWindows = !this.hideWindows;
    this.title = "Rooms List"
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room : RoomList ={
      // roomNumber: "401",
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, Tv, Bathroom, Kitchen',
      price: 500,
      photos: 'https://unsplash.com/photos/T5pL6ciEn-I',
      checkinTime: new Date('17-Jul-2023'),
      checkoutTime: new Date('18-Jul-2023'),
      rating: 4.2
    };
    // this.roomList.push(room); 
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom(){
    const room : RoomList ={
      roomNumber: "3",
      roomType: 'Updated Room',
      amenities: 'Air Conditioner, Free Wi-Fi, Tv, Bathroom, Kitchen',
      price: 500,
      photos: 'https://unsplash.com/photos/T5pL6ciEn-I',
      checkinTime: new Date('17-Jul-2023'),
      checkoutTime: new Date('18-Jul-2023'),
      rating: 4.2
    };

    this.roomsService.editRoom(room).subscribe((data) => {
          this.roomList = data;
        });
  }

  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
          this.roomList = data;
        });
  }

  ngOnDestroy() {
    if(this.subscription) {
    this.subscription.unsubscribe();
  }
}
}
