"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app"));
describe('TESTING CONTACT RESULTS', function () {
    it('GET ALL CONTACTS API Request', function () { return __awaiter(_this, void 0, void 0, function () {
        var contacts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).get('/contacts')];
                case 1:
                    contacts = _a.sent();
                    expect(contacts.status).toEqual(200);
                    expect(Array.isArray(contacts.body.data)).toBe(true);
                    contacts.body.data.forEach(function (contact) {
                        expect(typeof contact).toEqual('object');
                        // Ensure each contact is an object with the exact set of keys.
                        expect(Object.keys(contact)).toEqual([
                            'id',
                            'firstName',
                            'lastName',
                            'phone',
                            'email',
                            'block'
                        ]);
                        // Validate simple property types.
                        expect(typeof contact.id).toEqual('number');
                        expect(typeof contact.firstName).toEqual('string');
                        expect(typeof contact.lastName).toEqual('string');
                        expect(typeof contact.phone).toEqual('string');
                        expect(typeof contact.email).toEqual('string');
                        expect(typeof contact.block).toEqual('boolean');
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('GET A SINGLE CONTACT BY ID API REQUEST', function () { return __awaiter(_this, void 0, void 0, function () {
        var contact;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).get('/contacts/1')];
                case 1:
                    contact = _a.sent();
                    expect(contact.status).toEqual(200);
                    expect(contact.body).toEqual({
                        success: 'true',
                        data: expect.objectContaining({
                            id: 1,
                            firstName: 'Joe',
                            lastName: 'Doe',
                            phone: '+234-08132978120',
                            email: 'Joe@gmail.com',
                            block: false
                        })
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('GET A SINGLE CONTACT BY ID THAT DOES NOT EXIT IN DATABASE API REQUEST', function () { return __awaiter(_this, void 0, void 0, function () {
        var contact;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).get('/contacts/10')];
                case 1:
                    contact = _a.sent();
                    expect(contact.status).toEqual(404);
                    expect(contact.body).toEqual({ success: 'false', message: 'Error, Contact not available' });
                    return [2 /*return*/];
            }
        });
    }); });
    it('POST A NEW CONTACT API REQUEST', function () { return __awaiter(_this, void 0, void 0, function () {
        var newContact, contact;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newContact = {
                        firstName: 'Bond',
                        lastName: 'Jake',
                        phone: '+234-08132972098',
                        email: 'bondjak@gmail.com'
                    };
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/contacts')
                            .send(newContact)];
                case 1:
                    contact = _a.sent();
                    expect(contact.status).toEqual(201);
                    expect(contact.body).toEqual({
                        success: 'true',
                        message: 'Contact added successfully',
                        data: expect.objectContaining({
                            firstName: 'Bond',
                            lastName: 'Jake',
                            phone: '+234-08132972098',
                            email: 'bondjak@gmail.com',
                            id: 4,
                            block: false
                        })
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('POST AN INCOMPLETE CONTACT API REQUEST', function () { return __awaiter(_this, void 0, void 0, function () {
        var newContact, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newContact = {
                        firstName: '',
                        lastName: 'Jake',
                        phone: '2972098',
                        email: 'bondjak@gmail.com'
                    };
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/contacts')
                            .send(newContact)];
                case 1:
                    error = _a.sent();
                    expect(error.status).toEqual(406);
                    expect(error.body).toEqual({
                        success: 'false',
                        message: 'Error please input right contact details',
                        error: expect.arrayContaining([
                            { firstName: 'firstName is not allowed to be empty' },
                            { firstName: 'firstName length must be at least 3 characters long' },
                            { phone: 'phone length must be at least 11 characters long' }
                        ])
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('PUT A CONTACT BY UPDATING EXISTING CONTACT DETAILS API REQUEST', function () { return __awaiter(_this, void 0, void 0, function () {
        var updateContact, contact;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateContact = {
                        firstName: 'Decagon',
                        lastName: 'Node',
                        phone: '+234-8132238098',
                        email: 'Node@Decagoninstitute.com'
                    };
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put('/contacts/4')
                            .send(updateContact)];
                case 1:
                    contact = _a.sent();
                    expect(contact.status).toEqual(202);
                    expect(contact.body).toEqual({
                        success: 'true',
                        message: 'Contact updated successfully',
                        data: expect.objectContaining({
                            firstName: 'Decagon',
                            lastName: 'Node',
                            phone: '+234-8132238098',
                            email: 'Node@Decagoninstitute.com',
                            id: 4,
                            block: false
                        })
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('PUT A NON EXISTING CONTACT API REQUEST', function () { return __awaiter(_this, void 0, void 0, function () {
        var newContact, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newContact = {
                        firstName: 'Luke',
                        lastName: 'Jake',
                        phone: '+234-8132238098',
                        email: 'bondjak@gmail.com'
                    };
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put('/contacts/10')
                            .send(newContact)];
                case 1:
                    error = _a.sent();
                    expect(error.status).toEqual(404);
                    expect(error.body).toEqual({
                        success: 'false',
                        message: 'Error, Contact not available'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('DELETE AN EXISTING CONTACT API REQUEST', function () { return __awaiter(_this, void 0, void 0, function () {
        var contact;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).delete('/contacts/4')];
                case 1:
                    contact = _a.sent();
                    expect(contact.status).toEqual(200);
                    expect(contact.body).toEqual({
                        success: 'true',
                        message: 'Contact deleted successfully'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('DELETE A NON EXISTING CONTACT API REQUEST', function () { return __awaiter(_this, void 0, void 0, function () {
        var contact;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).delete('/contacts/10')];
                case 1:
                    contact = _a.sent();
                    expect(contact.status).toEqual(404);
                    expect(contact.body).toEqual({
                        success: 'false',
                        message: 'Error, Contact not available'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('PUT BLOCK A CONTACT API REQUEST', function () { return __awaiter(_this, void 0, void 0, function () {
        var contact;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).put('/contacts/1/true')];
                case 1:
                    contact = _a.sent();
                    expect(contact.status).toEqual(200);
                    expect(contact.body).toEqual({
                        message: 'Contact is blocked successfully',
                        success: 'true',
                        data: expect.objectContaining({
                            block: true,
                            email: 'Joe@gmail.com',
                            firstName: 'Joe',
                            id: 1,
                            lastName: 'Doe',
                            phone: '+234-08132978120'
                        })
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('PUT UNBLOCK A CONTACT API REQUEST', function () { return __awaiter(_this, void 0, void 0, function () {
        var contact;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).put('/contacts/1/false')];
                case 1:
                    contact = _a.sent();
                    expect(contact.status).toEqual(200);
                    expect(contact.body).toEqual({
                        message: 'Contact is unblocked successfully',
                        success: 'true',
                        data: expect.objectContaining({
                            block: false,
                            email: 'Joe@gmail.com',
                            firstName: 'Joe',
                            id: 1,
                            lastName: 'Doe',
                            phone: '+234-08132978120'
                        })
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('PUT BLOCK A NON EXITING CONTACT API REQUEST', function () { return __awaiter(_this, void 0, void 0, function () {
        var contact;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).put('/contacts/10/false')];
                case 1:
                    contact = _a.sent();
                    expect(contact.status).toEqual(406);
                    expect(contact.body).toEqual({
                        message: 'Error, cannot block contact, contact not found',
                        success: 'false'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=contacts.test.js.map