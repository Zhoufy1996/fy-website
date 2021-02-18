import { Component, OnInit } from "@angular/core";
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators
} from "@angular/forms";
import { AuthService } from "../services/Auth.service";

@Component({
	selector: "app-login-form",
	templateUrl: "./login-form.component.html",
	styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
	constructor(
		private readonly fb: FormBuilder,
		private readonly authService: AuthService
	) {}

	user: FormGroup = this.fb.group({
		username: ["", [Validators.required]],
		password: ["", [Validators.required]]
	});

	error = "";

	ngOnInit(): void {
		this.user.valueChanges.subscribe(() => {
			this.error = "";
		});
	}

	login(): void {
		if (this.user.valid) {
			const { username, password } = this.user.value as {
				username: string;
				password: string;
			};
			this.authService
				.login({
					username,
					password
				})
				.subscribe({
					error: () => {
						this.error = "用户名或密码不正确";
					}
				});
		}
	}

	get password(): AbstractControl {
		return this.user.get("password") as AbstractControl;
	}

	get username(): AbstractControl {
		return this.user.get("username") as AbstractControl;
	}
}
