import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeModule } from "../home/home.module";
import { AdminComponent } from "./admin.component";

const routes: Routes = [
	{
		path: "",
		component: AdminComponent,
		children: [
			{
				path: "home",
				loadChildren: () =>
					import("../home/home.module").then((m) => m.HomeModule)
			},
			{
				path: "articles",
				loadChildren: () =>
					import("../articles/articles.module").then(
						(m) => m.ArticlesModule
					)
			},
			{
				path: "leetcode",
				loadChildren: () =>
					import("../leetcode/leetcode-routing.module").then(
						(m) => m.LeetcodeRoutingModule
					)
			},
			{
				path: "tasks",
				loadChildren: () =>
					import("../tasks/tasks.module").then((m) => m.TasksModule)
			},
			{
				path: "aboutme",
				loadChildren: () =>
					import("../aboutme/aboutme.module").then(
						(m) => m.AboutmeModule
					)
			},
			{
				path: "**",
				redirectTo: "home"
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {}
