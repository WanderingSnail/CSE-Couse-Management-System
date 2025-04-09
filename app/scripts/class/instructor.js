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

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            username: this.#username,
            password: this.#password,
            role: this.#role,
            expertise_area: this.#expertise_area,
            assignedCourses: this.#assignedCourses
        };
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

    static async load() {
        const storedInstructors = localStorage.getItem('instructors');
        if (storedInstructors) {
            return JSON.parse(storedInstructors).map(Instructor.fromJson);
        }

        const response = await fetch('../data/instructor.json');
        const instructorsJSON = await response.json();
        
        localStorage.setItem('instructors', JSON.stringify(instructorsJSON, null, 2));
        
        return instructorsJSON.map(Instructor.fromJson);
    }

    static async save(instructors) {
        const instructorsJSON = instructors.map(instructor => instructor.toJSON());
        localStorage.setItem('instructors', JSON.stringify(instructorsJSON, null, 2));
    }
}
