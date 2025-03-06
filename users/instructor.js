import { User } from "./user.js";

export class Instructor extends User {
    #expertise; #classes;

    constructor(username, password, name, expertise, classes = []){
        super(username, password, name, 'Instructor');
        this.#expertise = expertise;
        this.#classes = classes;
    }

    get expertise(){
        return this.#expertise;
    }

    get classes(){
        this.#classes;
    }

    toString() {
        return `${super.toString()}. Expertise: ${this.#expertise}. Classes: ${this.#classes}.`;
    }

    toJSON() {
        return { ...super.toJSON(), expertise: this.#expertise, classes: this.#classes};
    }
}