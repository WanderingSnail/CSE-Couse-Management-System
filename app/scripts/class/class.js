import { Course } from "./course.js";

export class Class extends Course {
    #instructor;
    #student;
    #status; //open, closed, in progress, completed
    #schedule;
    
    constructor(instructor, students, status, schedule) {
        this.#instructor = instructor;
        this.#student = students;
        this.#status = status;
        this.#schedule = schedule;
    }
    
    get instructor() {
        return this.#instructor;
    }

    get students() {
        return this.#student;
    }

    get status() {
        return this.#status;
    }

    get schedule() {
        return this.#schedule;
    }

    static fromJson(json) {
        return new Class(json.instructor, json.students, json.status, json.schedule);
    }
}
