import { Injectable } from "@angular/core";
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest
} from "@angular/common/http";

import { Observable } from "rxjs";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class PrefixInterceptor implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const prefixReq = req.clone({
			url: `http://127.0.0.1:3000/api${req.url}`
		});
		return next.handle(prefixReq);
	}
}
