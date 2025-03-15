import { User } from "./user.js";

export class Admin {
    #id;
    #name;
    #username;
    #password;
    #role;

    constructor(id, name, username, password, role="admin") {
        this.#id = id;
        this.#name = name;
        this.#username = username;
        this.#password = password;
        this.#role = role;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get username() {
        return this.#username;
    }

    get role() {
        return this.#role;
    }

    static fromJson(json) {
        return new Admin(
            json.id,
            json.name,
            json.username,
            json.password,
            json.role
        );
    }
}
