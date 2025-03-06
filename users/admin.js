import { User } from "./user.js";

export class Admin extends User {

  constructor(username, password, name) {
    super(username, password, name, 'Admin');
  }

  toString() {
    return `${super.toString()}.`;
  }

  toJSON() {
    return { ...super.toJSON() };
  }
}