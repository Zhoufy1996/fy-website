import { Injectable } from "@angular/core";
import { CanLoad } from "@angular/router";
import { AuthService } from "src/app/pages/login/services/Auth.service";

@Injectable({
	providedIn: "root"
})
export class AuthGuard implements CanLoad {
	constructor(private readonly authService: AuthService) {}

	canLoad(): boolean {
		return this.authService.isLogin.value;
	}
}
