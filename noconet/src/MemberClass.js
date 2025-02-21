export class Member {
    constructor(name="", email="", phoneNumber="") {
        this._name = name;
        this._email = email;
        this._phoneNumber = phoneNumber;
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    set name(newName) {
        return (this._name = newName);
    }

    set email(newEmail) {
        return (this._email = newEmail);
    }

    set phoneNumber(newPhoneNumber) {
        return (this._phoneNumber = newPhoneNumber);
    }

    set clear(newVal) {
        this._name = newVal
        this._email = newVal
        this._phoneNumber = newVal
    }
}