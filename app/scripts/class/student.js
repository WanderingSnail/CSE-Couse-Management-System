import { User } from "./user.js";

export class Student extends User {
    #enrolledCourses;
    #completedCourses;
    constructor(username, password, role="student", id, enrolledCourses, completedCourses) {
        super(username, password, role, id);
        this.#enrolledCourses = enrolledCourses;
        this.#completedCourses = completedCourses;
    }

    //Enrolled courses with courseID, instructor, status
    //status: pending, enrolled, in progress, completed
    get enrolledCourses() {
        return this.#enrolledCourses;
    }

    //Completed courses with courseID, instructor, grade
    get completedCourses() {
        return this.#completedCourses;
    }
}