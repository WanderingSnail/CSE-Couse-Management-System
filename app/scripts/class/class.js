export class Class {
    #classId;
    #courseId;
    #courseName;
    #category;
    #description;
    #prerequisites;
    #creditHours;
    #minStudents;
    #status; //open, closed, in progress, completed
    #instructors;
    #capacity;
    #schedule;
    #studentList;
    
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
        studentList
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
            json.studentList
        );
    }
}
