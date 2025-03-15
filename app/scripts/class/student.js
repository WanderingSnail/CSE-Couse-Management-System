import { User } from "./user.js";

export class Student {
    #id;
    #name;
    #username;
    #password;
    #role;
    #enrolledCourses;
    #completedCourses;

    constructor(id, name, username, password, role="student", enrolledCourses=[], completedCourses=[]) {
        this.#id = id;
        this.#name = name;
        this.#username = username;
        this.#password = password;
        this.#role = role;
        this.#enrolledCourses = enrolledCourses;
        this.#completedCourses = completedCourses;
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

    //Enrolled courses with courseId, classId, courseName, category, instructor, status
    get enrolledCourses() {
        return this.#enrolledCourses;
    }

    //Completed courses with courseId, classId, courseName, category, instructor, grade
    get completedCourses() {
        return this.#completedCourses;
    }

    static fromJson(json) {
        return new Student(
            json.id,
            json.name,
            json.username,
            json.password,
            json.role,
            json.enrolledCourses,
            json.completedCourses
        );
    }
}