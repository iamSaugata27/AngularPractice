import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}


@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAqfFBQZSjol65VRzswMJ8qBROxJxnJGGs", {
            email, password, returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.HandleAuthentication(
                    resData.email, resData.localId, resData.idToken, +resData.expiresIn
                )
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAqfFBQZSjol65VRzswMJ8qBROxJxnJGGs", {
            email, password, returnSecureToken: true
        }).pipe(catchError(this.handleError),
            tap(resData => {
                this.HandleAuthentication(
                    resData.email, resData.localId, resData.idToken, +resData.expiresIn
                )
            })
        );
    }

    autoLogin() {
        const user: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!user)
            return;
        const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem("userData");
        if (this.tokenExpirationTimer)
            clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private HandleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResp: HttpErrorResponse) {
        let errorMessage = "An unknown error occured!"
        if (!errorResp.error?.error)
            return throwError(() => new Error(errorMessage));
        switch (errorResp.error.error.message) {
            case "EMAIL_EXISTS":
                errorMessage = "This Email already exists!";
                break;
            case "EMAIL_NOT_FOUND":
                errorMessage = "This email doesn't exists!";
                break;
            case "INVALID_PASSWORD":
                errorMessage = "The password is not correct!";
                break;
        }
        return throwError(() => new Error(errorMessage));
    }
}