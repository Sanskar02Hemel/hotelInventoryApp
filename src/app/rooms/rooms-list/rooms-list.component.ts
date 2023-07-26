import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnDestroy} from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RoomsListComponent implements OnInit, OnDestroy {

  // component communication
  // makes rooms as a valid html property on hinv-rooms-list element
  @Input() rooms: RoomList[] = [];

  @Input() title: string = "";
 
  // output can give out data they are actually an event <> b/w this is the type of output
  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes['title']){
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }
    
  ngOnInit() :void{}

  selectRoom(room: RoomList){
    // give this data back to the parent who has already subscribed to the event
    this.selectedRoom.emit(room);
  }

  ngOnDestroy(): void {
    console.log("onDestroy is called");
  }
}
