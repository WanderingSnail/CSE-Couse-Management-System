export class Course {
    #courseId;
    #name;
    #category;
    #description;
    #prerequisites;
    #creditHours;
    #minStudents;
    #maxStudents;

    constructor(
        courseId,
        name,
        category,
        description,
        prerequisites,
        creditHours,
        minStudents,
        maxStudents
    ) {
        this.#courseId = courseId;
        this.#name = name;
        this.#category = category;
        this.#description = description;
        this.#prerequisites = prerequisites;
        this.#creditHours = creditHours;
        this.#minStudents = minStudents;
        this.#maxStudents = maxStudents;
    }

    get courseId() {
        return this.#courseId;
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

    get creditHours() {
        return this.#creditHours;
    }

    get minStudents() {
        return this.#minStudents;
    }

    get maxStudents() {
        return this.#maxStudents;
    }

    static fromJson(json) {
        return new Course(
            json.courseId,
            json.name,
            json.category,
            json.description,
            json.prerequisites,
            json.creditHours,
            json.minStudents,
            json.maxStudents
        );
    }
}
