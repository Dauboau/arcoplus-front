import { Component, ElementRef, inject, OnInit, Pipe, TemplateRef, ViewChild } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { PipefyService } from '../services/pipefy.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { pipe } from 'rxjs';

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

  nG4: number = 0;
  nG5: number = 0;
  n1F: number = 0;
  n2F: number = 0;
  n3F: number = 0;
  n4F: number = 0;

  confirmFormGroup = new FormGroup({
    email: new FormControl(''),
    nG4: new FormControl(this.nG4, [Validators.min(this.nG4)]),
    nG5: new FormControl(this.nG5, [Validators.min(this.nG4)]),
    n1F: new FormControl(this.n1F, [Validators.min(this.nG4)]),
    n2F: new FormControl(this.n2F, [Validators.min(this.nG4)]),
    n3F: new FormControl(this.n3F, [Validators.min(this.nG4)]),
    n4F: new FormControl(this.n4F, [Validators.min(this.nG4)]),
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
          icon:"error",
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

        this.confirmFormGroup.controls['nG4'].addValidators([Validators.min(this.nG4)]);
        this.confirmFormGroup.controls['nG5'].addValidators([Validators.min(this.nG5)]);
        this.confirmFormGroup.controls['n1F'].addValidators([Validators.min(this.n1F)]);
        this.confirmFormGroup.controls['n2F'].addValidators([Validators.min(this.n2F)]);
        this.confirmFormGroup.controls['n3F'].addValidators([Validators.min(this.n3F)]);
        this.confirmFormGroup.controls['n4F'].addValidators([Validators.min(this.n4F)]);
        this.confirmFormGroup.updateValueAndValidity();

      }

    });

  }

  onSubmit(){

    if(!this.confirmFormGroup.valid){
      this.inconsistencyAlert();
    }else{
      this.sendData();
    }

  }

  private sendData(){

    this.pipefyService.createCard().subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        Swal.showValidationMessage(`
          Request failed: ${error}
        `);
      }
    })

  }

  private inconsistencyAlert(){

    Swal.fire({
      title: "Valores Inconsistentes",
      icon:"warning",
      iconColor: "#e4452e",
      text: "Por favor verifique os valores inseridos e o número de alunos previsto em contrato antes de prosseguir.",
      showConfirmButton: true,
      confirmButtonText: "Prosseguir",
      confirmButtonColor: "#4381c0",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#e4452e",
      showCloseButton: false,
      allowOutsideClick: true,
      allowEscapeKey: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.sendData();
      }
    })

  }

}