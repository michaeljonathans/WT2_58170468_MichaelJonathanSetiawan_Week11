import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { RouterExtensions } from 'nativescript-angular/router';
import * as dialog from "tns-core-modules/ui/dialogs";

@Component({
  selector: "login",
  templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit {
    //dummy user untuk default value
    user: User = { username: "username", password: "password" };
    //ini adalah desain login form untuk HTML
    loginForm: FormGroup = this.fb.group({
        username: [this.user.username, [Validators.required]],
        password: [this.user.password, [Validators.required]],
    });
    //getter -> untuk mengambil value pada HTML
    username = this.loginForm.get("username");
    password = this.loginForm.get("password");

    constructor(
        private page: Page,
        private fb: FormBuilder,
        private ls: LoginService,
        private router: RouterExtensions
    ) { 
        page.actionBarHidden = true;
    }
    
    ngOnInit() {
        if (this.ls.isLoggedIn()) {
            this.router.navigate(["/pokemon"], { clearHistory: true });
        }
    }

    login() {
        console.log(this.loginForm.value);
        if (this.ls.login(this.loginForm.value)) {
            this.router.navigate(["/pokemon"], { clearHistory: true });
        } else {
            alert("username or password are wrong");
        }
    }

    register() {
        if (this.ls.isAlreadyRegistered) {
            dialog
                .confirm(
                    "Register a new user will replace the current user. Are you sure?"
                )
                .then((result) => {
                    if (result) {
                        this.ls.register(this.loginForm.value);
                        alert (`User ${this.loginForm.value.username} has been registered`);
                    }
                });
        } else {
            this.ls.register(this.loginForm.value);
            alert (`User ${this.loginForm.value.username} has been registered`);
        }
    }
}
