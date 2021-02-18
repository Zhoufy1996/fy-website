import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LeetcodeComponent } from "./leetcode.component";

const routes: Routes = [
	{
		path: "",
		component: LeetcodeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LeetcodeRoutingModule {}
