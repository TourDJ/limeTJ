"use strict";
exports.__esModule = true;
var supertest = require("supertest");
var request = supertest("http://localhost:8000");
describe("GET /api", function () {
    it("should return 200 OK", function () {
        request
            .get("/api")
            .expect(200);
    });
});
