"use strict";
exports.__esModule = true;
var supertest = require("supertest");
var request = supertest("http://localhost:8000");
describe("GET /login", function () {
    it("should return 200 OK", function (done) {
        request.get("/login")
            .expect(200, done);
    });
});
describe("GET /signup", function () {
    it("should return 200 OK", function (done) {
        request.get("/signup")
            .expect(200, done);
    });
});
