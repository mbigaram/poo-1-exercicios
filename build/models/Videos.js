"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Videos = void 0;
class Videos {
    constructor(id, title, duration, createdAt) {
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    setId(newId) {
        this.id = newId;
    }
    getTitle() {
        return this.title;
    }
    setTitle(newTitle) {
        this.title = newTitle;
    }
    getDuration() {
        return this.duration;
    }
    setDuration(newDuration) {
        this.duration = newDuration;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(newCreatedAt) {
        this.createdAt = newCreatedAt;
    }
}
exports.Videos = Videos;
const video1 = new Videos("001", "Macaco véio", 2, "2023-01-30 10:00:00");
const video2 = new Videos("002", "Menino feio", 1, "2023-01-30 10:00:00");
video1.setId("010");
const Tais = video2.getTitle;
video1.setId("011");
//# sourceMappingURL=Videos.js.map