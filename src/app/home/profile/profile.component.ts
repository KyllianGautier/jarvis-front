import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../shared/services/profile/profile.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public dataLoaded: boolean;

  public user: User;
  public userDevices: UserDevice[];

  constructor(
    private profileService: ProfileService
  ) {
    this.dataLoaded = false;
  }

  ngOnInit(): void {
    forkJoin({
      user: this.profileService.getUser(),
      userDevices: this.profileService.getUserDevices()
    })
      .subscribe(results => {
          this.user = results.user;
          this.userDevices = results.userDevices;
          this.dataLoaded = true;
        },
        err => console.error(err)
      );
  }

}
