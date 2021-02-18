import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "login",
		loadChildren: () =>
			import("./pages/login/login.module").then((m) => m.LoginModule)
	},
	{
		path: "admin",
		loadChildren: () => {
			return import("./pages/admin/admin.module").then(
				(m) => m.AdminModule
			);
		}
	},
	{
		path: "**",
		redirectTo: "login",
		pathMatch: "full"
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
