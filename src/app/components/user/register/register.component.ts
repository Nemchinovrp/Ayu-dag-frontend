import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  errorMessage: string;
  isHotelOwner: boolean = false;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.userService.register(this.user, this.isHotelOwner).subscribe(data => {
      this.router.navigate(['/login']);
    }, error =>  {
      console.log(error);
      this.errorMessage = 'Username is already exist';
    });
  }
}
