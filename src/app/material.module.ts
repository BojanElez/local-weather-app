import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule
  ],
  exports: [
    MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule
  ]
})
export class MaterialModule { }
