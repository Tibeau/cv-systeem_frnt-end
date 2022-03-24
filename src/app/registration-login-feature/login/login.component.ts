import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { User } from 'src/app/security/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = {
    id: '',
    password: '',
    email: '',
    jwttoken: '',
    firstname: '',
    lastname: '',
    street: '',
    country: '',
    active: '',
    role: '',
    description: '',
    city: '',
    number: '',
    postcode: '',
    phone: '',
    linkedIn: '',
    imgUrl: '',
    driversLicence: '',
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';
  errorIsShown: boolean = false;
  isLogin: boolean = false;
  isLogout: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    localStorage.clear();
    this.isLogin = true;
  }

  onSubmit(): void {
    console.log(this.user);
    this.isSubmitted = true;
    this.authService.authenticate(this.user).subscribe((result) => {
      console.log('login success');
      console.log(result);
      //Access token opslaan in localStorage
      localStorage.setItem('token', result.jwttoken);
      localStorage.setItem('id', JSON.stringify(result.id));
      localStorage.setItem('email', result.email);
      localStorage.setItem('firstname', result.firstname);
      localStorage.setItem('lastname', result.lastname);
      localStorage.setItem('role', result.role.toString().toUpperCase());
      localStorage.setItem('city', result.city);
      localStorage.setItem('country', result.country);
      localStorage.setItem('street', result.street);
      localStorage.setItem('number', result.number);
      localStorage.setItem('postcode', result.postcode);
      localStorage.setItem('phone', result.phone);
      localStorage.setItem('description', result.description);
      localStorage.setItem('active', result.active);
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });
    });
  }
}
