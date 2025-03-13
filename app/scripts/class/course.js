export class Course {
    #id;
    #name;
    #category;
    #description;
    #prerequisites;
    #minStudents;
    #maxStudents;

    constructor(id, name, category, description, prerequisites) {
        this.#id = id;
        this.#name = name;
        this.#category = category;
        this.#description = description;
        this.#prerequisites = prerequisites;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }
    
    get description() {
        return this.#description;
    }

    get category() {
        return this.#category;
    }

    get prerequisites() {
        return this.#prerequisites;
    }

    get minStudents() {
        return this.#minStudents;
    }

    get maxStudents() {
        return this.#maxStudents;
    }

    static fromJson(json) {
        return new Course(json.id, json.name, json.category, json.description, json.prerequisites);
    }
}
