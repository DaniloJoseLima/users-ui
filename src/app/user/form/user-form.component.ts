import { DatePipe } from '@angular/common';
import { UsersService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [DatePipe]
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  protected id?: string;
  protected msgError?: string;

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private datePipe: DatePipe
  ) { }


  ngOnInit(): void {

    this.route.queryParams.forEach(e => {
      if (e['id']) {
        this.id = e['id'];
        this.getUser(e['id'])
      }
    });

    this.userForm = this.fb.group({
      id: [this.id, []],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      title: ["", []],
      email: ["", [Validators.required, Validators.email]],
      gender: ["", [Validators.required]],
      dateOfBirth: ["", [Validators.required, Validators.pattern(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)]],
      phone: ["", []],
      picture: ["", []],
      location: this.fb.group({
        street: ["", []],
        city: ["", []],
        state: ["", []],
        country: ["", []],
      })
    });
  }

  protected onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.getRawValue() as User;
      if (user.dateOfBirth) {
        user.dateOfBirth = this.formatDate(user.dateOfBirth);
      }
      if (user.id) {
        this.userService.update(user).subscribe(data => {
          this.router.navigate(['users']);
        },
          error => {
            this.setError("Erro ao atualizar formulário.")
          });

      } else {
        this.userService.created(user).subscribe(data => {
          this.router.navigate(['users']);
        },
        error => {
          this.setError("Erro ao salvar formulário.")
        });
      }
    } else {
      Object.values(this.userForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  protected get userFormControl() {
    return this.userForm.controls;
  }

  protected getUser(id: string) {
    this.userService.findById(id).subscribe(data => {
      data.dateOfBirth = this.datePipe.transform(data.dateOfBirth, 'dd/MM/yyyy')
      this.userForm.patchValue(data);
      this.userForm.controls['email'].disable();
    });
  }

  protected formatDate(value: any) {
    const dateParts = value.split('/');
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10);
      const year = parseInt(dateParts[2], 10);
      const isoDate = new Date(year, month - 1, day).toISOString();
      return isoDate
    }
    return value;
  }

  protected setError(msg: string) {
    this.msgError = msg;
    setTimeout(() => {
      this.msgError = undefined;
    }, 3000);
  }

}
