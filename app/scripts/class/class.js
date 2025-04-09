export class Class {
    #classId;
    #courseId;
    #courseName;
    #category;
    #description;
    #prerequisites;
    #creditHours;
    #minStudents;
    #status;
    #instructors;
    #capacity;
    #schedule;
    #studentList;
    #currentStudents;

    constructor(
        classId,
        courseId,
        courseName,
        category,
        description,
        prerequisites,
        creditHours,
        minStudents,
        status,
        instructors,
        capacity,
        schedule,
        studentList,
        currentStudents
    ) {
        this.#classId = classId;
        this.#courseId = courseId;
        this.#courseName = courseName;
        this.#category = category;
        this.#description = description;
        this.#prerequisites = prerequisites;
        this.#creditHours = creditHours;
        this.#minStudents = minStudents;
        this.#status = status;
        this.#instructors = instructors;
        this.#capacity = capacity;
        this.#schedule = schedule;
        this.#studentList = studentList || [];
        this.#currentStudents = currentStudents || 0;
    }

    get classId() {
        return this.#classId;
    }

    get courseId() {
        return this.#courseId;
    }

    get courseName() {
        return this.#courseName;
    }

    get category() {
        return this.#category;
    }

    get description() {
        return this.#description;
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

    get status() {
        return this.#status;
    }

    get instructors() {
        return this.#instructors;
    }

    get capacity() {
        return this.#capacity;
    }

    get schedule() {
        return this.#schedule;
    }

    get studentList() {
        return this.#studentList;
    }

    get currentStudents() {
        return this.#currentStudents;
    }

    set currentStudents(value) {
        this.#currentStudents = value;
    }

    toJSON() {
        return {
            classId: this.#classId,
            courseId: this.#courseId,
            courseName: this.#courseName,
            category: this.#category,
            description: this.#description,
            prerequisites: this.#prerequisites,
            creditHours: this.#creditHours,
            minStudents: this.#minStudents,
            status: this.#status,
            instructors: this.#instructors,
            capacity: this.#capacity,
            schedule: this.#schedule,
            studentList: this.#studentList,
            currentStudents: this.#currentStudents
        };
    }

    static fromJson(json) {
        return new Class(
            json.classId,
            json.courseId,
            json.courseName,
            json.category,
            json.description,
            json.prerequisites,
            json.creditHours,
            json.minStudents,
            json.status,
            json.instructors,
            json.capacity,
            json.schedule,
            json.studentList,
            json.currentStudents
        );
    }

    static async load() {
        const storedClasses = localStorage.getItem('classes');
        if (storedClasses) {
            return JSON.parse(storedClasses).map(Class.fromJson);
        }

        const response = await fetch('../data/classes.json');
        const classesJSON = await response.json();

        localStorage.setItem('classes', JSON.stringify(classesJSON, null, 2));

        return classesJSON.map(Class.fromJson);
    }

    static async save(classes) {
        const classesJSON = classes.map(classItem => classItem.toJSON());
        localStorage.setItem('classes', JSON.stringify(classesJSON, null, 2));
    }
}
