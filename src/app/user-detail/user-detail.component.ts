import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, docData, doc } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  userId = '';
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: Firestore) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.userId = id !== null ? id : '';
      console.log('GO ID ', this.userId);
      this.getUser();
    })
  }

  async getUser() {
    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    docData(userDocRef).subscribe((user: any) => {
      this.user = new User(user);
      console.log('Retrieved user ', this.user);
    })
  }

  openAddressDialog(){
    
  }
}
