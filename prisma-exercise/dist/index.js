"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function insertUser(username, password, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.create({
            data: {
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName
            }
        });
        console.log(res);
    });
}
function updateUser(username_1, _a) {
    return __awaiter(this, arguments, void 0, function* (username, { firstName, lastName }) {
        prisma.user.update({
            where: {
                username: username
            },
            data: {
                firstName: firstName,
                lastName: lastName
            }
        });
    });
}
// updateUser("cb7chaitanya@gmail.com", {firstName: "Chaitanya", lastName: "Bajpai"})
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findFirst({
            where: {
                username: username
            }
        });
        console.log(res);
    });
}
function deleteUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ username, password }) {
        yield prisma.user.delete({
            where: {
                username: username,
                password: password
            },
        });
        console.log(`User ${username} deleted successfully`);
    });
}
deleteUser({ username: "cb7chaitanya@gmail.com", password: "halamadrid" });
