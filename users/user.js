export class User {

    #username; #password; #name; #role;

    constructor(username, password, name, role) {
        this.#username = username;
        this.#password = password;
        this.#name = name;
        this.#role = role;
    }

    get username() {
        return this.#username;
    }

    get password() {
        return this.#password;
    }

    get name() {
        return this.#name;
    }

    get role() {
        return this.#role;
    }

    toString() {
        return `Name: ${this.#name}. Username: ${this.#username}. Password: ${this.#password}. Role: ${this.#role}`;
    }

    toJSON() {
        return { name: this.#name, username: this.#username, password: this.#password, role: this.#role };
    }

}