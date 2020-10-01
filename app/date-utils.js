module.exports = class DateUtils {
    constructor() {}

    getCurrentYear() {
        const today = new Date();
        return today.getFullYear();
    }
}
