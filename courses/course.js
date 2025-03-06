export class Course {

    #courseName; #category; #prerequisites

    constructor(courseName, category, prerequisites = []) {
        this.#courseName = courseName;
        this.#category = category;
        this.#prerequisites = prerequisites;
    }

    get courseName() {
        return this.#courseName;
    }

    get category() {
        return this.#category;
    }

    get prerequisites() {
        return this.#prerequisites;
    }

    toString() {
        return `Course: ${this.#courseName}. Category: ${this.#category}. Prerequisites: ${this.#prerequisites}.`;
    }

    toJSON() {
        return { courseName: this.#courseName, category: this.#category, prerequisites: this.#prerequisites };
    }
}