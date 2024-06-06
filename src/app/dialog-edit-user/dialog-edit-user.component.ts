import { Component } from '@angular/core';
import { User } from '../../models/user.class';
import { Firestore, collection, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  loading = false;
  user: any;
  birthDate: any;
  userId: string = '';

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: Firestore) {
    this.user = User;
    this.birthDate = Date;
  }

  async saveUser() {
    this.loading = true;
    try {
      const userDocRef = doc(this.firestore, `users/${this.userId}`);
      await updateDoc(userDocRef, this.user.toJSON());
      this.dialogRef.close();
    } catch (error) {
      console.error("Error updating user: ", error);
    } finally {
      this.loading = false;
    }
  }
}
