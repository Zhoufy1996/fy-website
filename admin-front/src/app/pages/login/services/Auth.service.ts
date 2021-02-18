import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	hasVerify = new BehaviorSubject(false);

	private token = new BehaviorSubject(this.getLocalToken());

	token$ = this.token.asObservable();

	private tokenSubscription: Subscription = this.token.subscribe((data) => {
		this.setLocalToken(data);
	});

	constructor(private http: HttpClient, private readonly router: Router) {}

	private setLocalToken(data: string): void {
		window.localStorage.setItem("access_token", data);
	}

	private getLocalToken(): string {
		return window.localStorage.getItem("access_token") || "";
	}

	getAccessToken(): string {
		return this.token.value;
	}

	verifyToken(): void {
		const localToken = this.getLocalToken();
		if (localToken) {
			this.http.post("/user/verifytoken", {}).subscribe({
				next: () => {
					this.token.next(localToken);
					this.hasVerify.next(true);
				},
				error: () => {
					this.token.next("");
					this.hasVerify.next(true);
				}
			});
		} else {
			this.hasVerify.next(true);
		}
	}

	login({
		username,
		password
	}: {
		username: string;
		password: string;
	}): Observable<{ accessToken: string }> {
		return this.http
			.post<{ accessToken: string }>("/user/login", {
				username,
				password
			})
			.pipe(
				tap((data) => {
					this.token.next(data.accessToken);
				})
			);
	}

	logout(): void {
		this.token.next("");
	}
}
