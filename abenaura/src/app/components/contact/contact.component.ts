import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less'],
})
export class ContactComponent implements OnInit {
  FormData: FormGroup;

  constructor(private fb: FormBuilder, private mail: HttpService) {}

  ngOnInit(): void {
    this.FormData = this.fb.group({
      // Fullname: new FormControl('', [Validators.required]),
      // Email: new FormControl('', [
      //   ,
      //   Validators.compose([Validators.required, Validators.email]),
      // ]),
      message: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit(FormData) {
    let user = {
      name: 'bouba',
      email: 'toto',
      message: this.FormData.controls['message'].value,
    };

    console.log(user.message);
    this.mail.sendEmail('http://localhost:3000/sendmail', user).subscribe(
      (data) => {
        let res: any = data;
        console.log('email send');
      },
      (err) => {
        console.log(err);
        // this.loading = false;
        // this.buttionText = "Submit";
      },
      () => {
        // this.loading = false;
        // this.buttionText = "Submit";
      }
    );
  }
}
