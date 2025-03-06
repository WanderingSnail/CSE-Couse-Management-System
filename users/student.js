import { User } from "./user.js";

export class Student extends User {

    #studentId; #registeredClasses; #completedCourses;

    constructor(username, password, name, studentId, completedCourses = []) {
        super(username, password, name, 'Student');
        this.#studentId = studentId;
        this.#completedCourses = completedCourses;
        this.#registeredClasses = [];
    }

    get studentId() {
        return this.#studentId;
    }

    get registeredClasses() {
        return this.#registeredClasses;
    }

    get completedCourses() {
        return this.#completedCourses;
    }

    toString() {
        return `${super.toString()}. Student ID: ${this.#studentId}. Registered Classes: ${this.#registeredClasses}. Completed Courses: ${this.#completedCourses}.`;
    }

    toJSON() {
        return { ...super.toJSON(), studentId: this.#studentId, registeredClasses: this.#registeredClasses, completedCourses: this.#completedCourses };
    }
}