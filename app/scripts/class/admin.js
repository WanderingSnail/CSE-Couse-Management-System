import { User } from "./user.js";

export class Admin extends User {
    constructor(username, password, role="admin", id) {
        super(username, password, role, id);
    }
}
