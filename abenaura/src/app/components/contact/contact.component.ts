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
  success: boolean = false;
  messageSendMail: string = "Message reçu merci !";

  constructor(private fb: FormBuilder, private mail: HttpService) {}

  ngOnInit(): void {
    this.FormData = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit() {
    let user = {
      email: this.FormData.controls['email'].value,
      message: this.FormData.controls['message'].value,
    };

    this.mail.sendEmail('http://localhost:3000/sendmail', user).subscribe(
      (data) => {
        console.log('email send');

        this.success = true;
        this.messageSendMail = "Message reçu merci!";

        setTimeout(() => {
          this.success = false;
          this.FormData.reset();
        }, 2000);
      },
      (err) => {
        this.success = true
        this.messageSendMail = "Une erreur s'est produite veuillez réessayer";

        setTimeout(() => {
          this.success = false;
          this.FormData.reset();
        }, 2000);

        throw new Error(err);
      },
      () => {
        console.log('completed');
      }
    );
  }
}
