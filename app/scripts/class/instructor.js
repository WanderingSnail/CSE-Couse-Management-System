import { User } from "./user.js";

export class Instructor extends User {
    #expertise_area;
    #assignedCourses;

    constructor(username, password, role="instructor", id) {
        super(username, password, role, id);
        this.#expertise_area = [];
        this.#assignedCourses = [];
    }

    //Assigned courses with courseID
    get assignedCourses() {
        return this.#assignedCourses;
    }

    //Expertise area the same as courses category
    get expertise_area() {
        return this.#expertise_area;
    }


}
