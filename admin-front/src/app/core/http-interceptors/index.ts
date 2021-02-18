import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { PrefixInterceptor } from "./prefix-interceptor";
import { TokenInterceptor } from "./token-interceptor";

export const httpInterceptorProviders = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: TokenInterceptor,
		multi: true
	},
	{
		provide: HTTP_INTERCEPTORS,
		useClass: PrefixInterceptor,
		multi: true
	}
];
