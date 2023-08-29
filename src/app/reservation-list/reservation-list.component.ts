import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations:Reservation[]=[];

  constructor(private reservationService:ReservationService){}

  ngOnInit(): void {
      this.reservations=this.reservationService.getAllReservation();
  }

  deleteReservation(id: string):void{
    console.log(id);
    this.reservationService.deleteReservation(id);
    window.location.reload();
  }

  editReservation(id:string):void{
    
  }
}
