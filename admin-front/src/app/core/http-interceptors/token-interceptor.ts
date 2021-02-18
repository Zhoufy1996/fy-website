import { Injectable } from "@angular/core";
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest
} from "@angular/common/http";

import { Observable } from "rxjs";
import { AuthService } from "src/app/pages/login/services/Auth.service";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private readonly authService: AuthService) {}
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const tokenReq = req.clone({
			headers: req.headers.set(
				"Authorization",
				`Bearer ${this.authService.getAccessToken()}`
			)
		});

		return next.handle(tokenReq);
	}
}
