export class User {
    #id;
    #name;
    #username;
    #password;
    #role;

    constructor(id, name, username, password, role) {
        this.#username = username;
        this.#name = name;
        this.#password = password;
        this.#role = role;
        this.#id = id;
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

    //Login function
    login(username, password) {
        return this.#username === username && this.#password === password;
    }

    static fromJson(json) {
        return new User(json.id, json.name, json.username, json.password, json.role);
    }
}