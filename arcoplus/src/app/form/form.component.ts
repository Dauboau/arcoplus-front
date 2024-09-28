import { Component, ElementRef, inject, OnInit, Pipe, TemplateRef, ViewChild } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { PipefyService } from '../services/pipefy.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { BrowserModule } from '@angular/platform-browser';

const defaultValue:Number = 0;

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule,NgbModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private pipefyService: PipefyService,
  ){}

  confirmFormGroup = new FormGroup({
    email: new FormControl(''),
    nG4: new FormControl(defaultValue),
    nG5: new FormControl(defaultValue),
    n1F: new FormControl(defaultValue),
    n2F: new FormControl(defaultValue),
    n3F: new FormControl(defaultValue),
    n4F: new FormControl(defaultValue),
  });

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {

      if(params['nG4'] == undefined 
        || params['nG5'] == undefined 
        || params['n1F'] == undefined 
        || params['n2F'] == undefined 
        || params['n3F'] == undefined 
        || params['n4F'] == undefined
      ){
        Swal.fire({
          title: "URL Inválida",
          icon:"warning",
          text: "Por favor, verifique o link e tente novamente.",
          showConfirmButton: false,
          showCloseButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        })
      }else{

        this.confirmFormGroup.patchValue({
          nG4: Number(params['nG4']),
          nG5: Number(params['nG5']),
          n1F: Number(params['n1F']),
          n2F: Number(params['n2F']),
          n3F: Number(params['n3F']),
          n4F: Number(params['n4F'])
        });

      }

    });

    this.pipefyService.testApi().subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })

  }

  onSubmit(){

  }

  

}