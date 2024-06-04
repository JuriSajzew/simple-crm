import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate?: Date;
  constructor(private firestore: Firestore) { }



  async saveUser() {
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
      console.log(this.user);
    } else {
      alert('Bitte fülle das Fehld Geburtstag aus!')
    return;
    }

    try {
      const userCollection = collection(this.firestore, 'users');
      const result = await addDoc(userCollection, this.user.toJSON());
      console.log('Adding user finished ', result);
    } catch (error) {
      console.error('Error adding user: ', error);
    }

  }
}
