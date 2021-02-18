import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../login/services/Auth.service";

@Component({
	selector: "app-logout",
	templateUrl: "./logout.component.html",
	styleUrls: ["./logout.component.scss"]
})
export class LogoutComponent {
	constructor(readonly authService: AuthService) {}
}
