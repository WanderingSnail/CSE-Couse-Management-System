export class Class {
    #classId;
    #courseId;
    #status; //open, closed, in progress, completed
    #instructors;
    #capacity;
    #schedule;
    
    constructor(classId, courseId, status, instructors, capacity, schedule) {
        this.#classId = classId;
        this.#courseId = courseId;
        this.#status = status;
        this.#instructors = instructors;
        this.#capacity = capacity;
        this.#schedule = schedule;
    }
    
    get classId() {
        return this.#classId;
    }

    get courseId() {
        return this.#courseId;
    }

    get instructors() {
        return this.#instructors;
    }

    get status() {
        return this.#status;
    }

    get capacity() {
        return this.#capacity;
    }

    get schedule() {
        return this.#schedule;
    }

    static fromJson(json) {
        return new Class(json.classId, json.courseId, json.status, json.instructors, json.capacity, json.schedule);
    }
}
