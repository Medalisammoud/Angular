import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData, RegData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string, firstName: string, lastName: string, phone: string, type: string) {
    const authData: RegData = { email: email, password: password, firstName: firstName, lastName: lastName, phone: phone, role: type };

    this.http
      .post<{ token: string; expiresIn: number, user: object, userId: string }>("http://localhost:8000/api/user/signup", authData)
      .subscribe(response => {
        const token = response.token;
        const user = Object.create(response.user);
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          
          this.saveAuthData(token, this.userId);
          
          if (user.role === "vendeur") {
            this.router.navigate(["/profile"]);

          } else {

            this.router.navigate(["/"]);
          }


        }
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    console.log(authData)
    this.http
      .post<{ token: string, expiresIn: number, user: object, userId: string }>(
        "http://localhost:8000/api/user/signin",
        authData
      )
      .subscribe(response => {
        const token = response.token;
        console.log(response.user)
        const user = Object.create(response.user);
        this.token = token;
        if (token) {
          
          this.isAuthenticated = true;
          this.userId = user._id;
          this.authStatusListener.next(true);
          
          this.saveAuthData(token, this.userId);
          console.log(user)
          if (user.role === "vendeur") {
            this.router.navigate(["/profile"]);

          } else {

            this.router.navigate(["/"]);
          }


        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = "";
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


  private saveAuthData(token: string, userId: string) {
    localStorage.setItem("tokenB", token);
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("tokenB");
    localStorage.removeItem("expirationB");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("tokenB");
    const expirationDate = localStorage.getItem("expirationB");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return null;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
}
