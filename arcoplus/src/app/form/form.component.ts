import { Component, ElementRef, inject, OnInit, Pipe, TemplateRef, ViewChild } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { PipefyService } from '../services/pipefy.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private pipefyService: PipefyService
  ){}

  nG4: Number = 0;
  nG5: Number = 0;
  n1F: Number = 0;
  n2F: Number = 0;
  n3F: Number = 0;
  n4F: Number = 0;

  confirmFormGroup = new FormGroup({
    email: new FormControl(''),
    nG4: new FormControl(this.nG4),
    nG5: new FormControl(this.nG5),
    n1F: new FormControl(this.n1F),
    n2F: new FormControl(this.n2F),
    n3F: new FormControl(this.n3F),
    n4F: new FormControl(this.n4F),
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

        this.nG4 = Number(params['nG4']);
        this.nG5 = Number(params['nG5']);
        this.n1F = Number(params['n1F']);
        this.n2F = Number(params['n2F']);
        this.n3F = Number(params['n3F']);
        this.n4F = Number(params['n4F']);

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

    /*
    this.pipefyService.testApi().subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
    */

  }

  onSubmit(){

  }

  

}