import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
	declarations: [],
	imports: [],
	exports: [
		MatCardModule,
		MatButtonModule,
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatToolbarModule
	]
})
export class SharedModule {}
