import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ReservationService } from '../reservation/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{
  constructor(private formBuilder:FormBuilder, 
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      let reservation=this.reservationService.getReservation(id);
      if(reservation)
        this.reservationForm.patchValue(reservation);
    }
  }

  reservationForm: FormGroup = this.formBuilder.group({
    checkInDate:['', [Validators.required]],
    checkOutDate:['', [Validators.required]],
    roomNumber:['', [Validators.required]],
    guestName:['', [Validators.required]],
    guestEmail:['', [Validators.required, Validators.email]]
  });

  onSubmit(){
    if(this.reservationForm.valid){   
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        this.reservationService.updateReservation(this.reservationForm.value);
      }
      else{
        this.reservationService.addReservation(this.reservationForm.value);
        this.router.navigate(['/list']);
      }      
    }
  }
}
