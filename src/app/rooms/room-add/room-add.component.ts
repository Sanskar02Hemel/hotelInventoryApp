import { Component } from '@angular/core';
import { RoomList } from '../rooms';
import {RoomsService} from '../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'hinv-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.scss']
})
export class RoomAddComponent {
  room: RoomList = {
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    rating: 0
  }

  successMessage: string = '';

  constructor(private roomsService: RoomsService) {}

  AddRoom(roomsForm: NgForm) {
    this.roomsService.addRoom(this.room).subscribe((data) => {
      this.successMessage = 'Room added successfully';
      roomsForm.reset();
    });
  }
}
