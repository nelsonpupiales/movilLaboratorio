import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() { }

    public setToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }


}