export class Instructor {
    #id;
    #name;
    #username;
    #password;
    #role;
    #expertise_area;
    #assignedCourses;

    constructor(id, name, username, password, role="instructor", expertise_area=[], assignedCourses=[]) {
        this.#id = id;
        this.#name = name;
        this.#username = username;
        this.#password = password;
        this.#role = role;
        this.#expertise_area = expertise_area;
        this.#assignedCourses = assignedCourses;
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

    //Assigned courses with courseId, classId
    get assignedCourses() {
        return this.#assignedCourses;
    }

    //Expertise area the same as courses category
    get expertise_area() {
        return this.#expertise_area;
    }

    static fromJson(json) {
        return new Instructor(
            json.id,
            json.name,
            json.username,
            json.password,
            json.role,
            json.expertise_area,
            json.assignedCourses
        );
    }
}
