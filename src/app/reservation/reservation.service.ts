import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  reservations: Reservation[]=[];

  getAllReservation():Reservation[]{
    let s = localStorage.getItem('reservations');
    if(s!==null){
      return JSON.parse(s);
    }
    else{
      return [];
    }
    
  }

  getReservation(id:string):Reservation|undefined {
    let s = localStorage.getItem('reservations');
    if(s!=null){
      let parsed:Reservation[] = JSON.parse(s);
      return parsed.find(res => res.id === id);
    }else{
      return undefined;
    }
  }

  addReservation(reservation: Reservation): void{
    let rs:Reservation[] = this.getAllReservation();
    reservation.id = Date.now().toString();
    rs.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(rs));
    
  }

  deleteReservation(id:string):void{
    let rs:Reservation[] = this.getAllReservation();
    let index=rs.findIndex(res => res.id === id);
    rs.splice(index,1);
    localStorage.setItem("reservations", JSON.stringify(rs));
  }

  updateReservation(updatedReservation: Reservation):void{
    let index=this.reservations.findIndex(res => res.id === updatedReservation.id);
    this.reservations[index]=updatedReservation;
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }
}
