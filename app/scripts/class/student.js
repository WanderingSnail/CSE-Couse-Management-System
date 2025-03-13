import { User } from "./user.js";

export class Student extends User {
    #enrolledCourses;
    #completedCourses;
    constructor(id, name, username, password, role="student", enrolledCourses, completedCourses) {
        super(id, name, username, password, role);
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

    static fromJson(json) {
        return new Student(json.id, json.name, json.username, json.password, json.role, json.enrolledCourses, json.completedCourses);
    }
}