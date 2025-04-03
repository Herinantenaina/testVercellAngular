import { CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MechanicService } from '../../services/add-mechanic/mechanic.service';

@Component({
  selector: 'app-last-user',
  templateUrl: './last-user.component.html',
  styleUrls: ['./last-user.component.scss'],
  imports: [ CommonModule]
})
export class LastUserComponent implements OnInit {
  latestUsers: any[] = [];

  constructor(private userService: MechanicService) {}

  ngOnInit(): void {
    this.getUsers()
    this.latestUsers.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime());
  }

  getUsers(){
    this.userService.getAllMechanics().subscribe(data => {
      this.latestUsers = data;
      this.latestUsers = this.latestUsers.filter(data => data.role == 'customer')
    })
  }
}