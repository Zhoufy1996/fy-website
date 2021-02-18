import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "./pages/login/services/Auth.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
	constructor(
		private authService: AuthService,
		private readonly router: Router
	) {}

	tokenSub: Subscription = this.authService.token$.subscribe((data): void => {
		if (this.authService.hasVerify) {
			if (data === "") {
				this.router.navigate(["login"]).catch(() => {
					return;
				});
			} else {
				if (location.pathname === "/login") {
					this.router.navigate(["admin"]).catch(() => {
						return;
					});
				} else {
					this.router.navigate([location.pathname]).catch(() => {
						return;
					});
				}
			}
		}
	});

	title = "admin-front";

	ngOnInit(): void {
		this.authService.verifyToken();
	}

	get hasInit(): boolean {
		return this.authService.hasVerify.value;
	}
}
