export class courseClass {

    #course; #instructor; #capacity;

    constructor(course, instructor, capacity) {
        this.#course = course;
        this.#instructor = instructor;
        this.#capacity = capacity;
        this.registeredStudents = [];
        this.validated = false;
        this.grades = {};
    }

    get course() {
        return this.#course;
    }

    get instructor() {
        this.#instructor;
    }

    get capacity() {
        this.#capacity;
    }

    toString() {
        return `Course: ${this.#course}. Instructor: ${this.instructor}. 
        Capacity: ${this.#capacity}.`;
    }

    toJSON() {
        return { couse: this.#course, instructor: this.#instructor, capacity: this.#capacity };
    }
}