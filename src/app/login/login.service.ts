import { Injectable } from "@angular/core";
import * as as from "tns-core-modules/application-settings";

@Injectable({ providedIn: "root"})
export class LoginService {
    constructor() {}

    isAlreadyRegistered() {
        //apakah di DataBase kita punya tabel user?
        return as.hasKey("user");
    }

    isLoggedIn() {
        //apakah di DataBase kita punya tabel token?
        return as.hasKey("token");
    }

    register(user: User) {
        //ubah bentuk dari object ke string agar bisa disimpan
        as.setString("user", JSON.stringify(user));
    }

    login(userParam: User) {
        if (!this.isAlreadyRegistered()) {
            return false;
        }

        //ubah bentuk dari string ke object agar bisa dibaca
        let user: User = JSON.parse(as.getString("user"));
        if (user.username === userParam.username && user.password === userParam.password) {
            as.setString("token", userParam.username);
            return true;
        }
        return false;
    }

    logout() {
        as.remove("token");
    }
}
