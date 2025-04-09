export class User {
    #id;
    #name;
    #username;
    #password;
    #role;

    constructor(id, name, username, password, role) {
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

    login(username, password) {
        return this.#username === username && this.#password === password;
    }

    static fromJson(json) {
        return new User(json.id, json.name, json.username, json.password, json.role);
    }

    static async load() {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            return JSON.parse(storedUsers).map(User.fromJson);
        }
        
        const response = await fetch('../data/users.json');
        const userJSON = await response.json();        
        
        localStorage.setItem('users', JSON.stringify(userJSON, null, 2));
        
        return userJSON.map(User.fromJson);
    }
}