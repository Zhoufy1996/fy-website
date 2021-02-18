import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeetcodeRoutingModule } from './leetcode-routing.module';
import { LeetcodeComponent } from './leetcode.component';


@NgModule({
  declarations: [LeetcodeComponent],
  imports: [
    CommonModule,
    LeetcodeRoutingModule
  ]
})
export class LeetcodeModule { }
