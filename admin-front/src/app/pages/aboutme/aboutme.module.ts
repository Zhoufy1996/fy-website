import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutmeRoutingModule } from './aboutme-routing.module';
import { AboutmeComponent } from './aboutme.component';


@NgModule({
  declarations: [AboutmeComponent],
  imports: [
    CommonModule,
    AboutmeRoutingModule
  ]
})
export class AboutmeModule { }
