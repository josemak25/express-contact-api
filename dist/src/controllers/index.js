"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../../db/db"));
var joi_1 = __importDefault(require("joi"));
var schema = {
    id: joi_1.default.number().required(),
    firstName: joi_1.default.string()
        .min(3)
        .max(20)
        .required(),
    lastName: joi_1.default.string()
        .min(3)
        .max(20)
        .required(),
    phone: joi_1.default.string()
        .min(11)
        .required(),
    email: joi_1.default.string().required(),
    block: joi_1.default.boolean().required()
};
function getContacts() {
    return db_1.default;
}
exports.getContacts = getContacts;
function getContact(contactId) {
    return db_1.default.find(function (contact) { return contact.id === parseFloat(contactId); });
}
exports.getContact = getContact;
function addContact(body) {
    var contact = body;
    contact.id = db_1.default.length + 1;
    contact.block = false;
    var errorMessages = null;
    var _a = joi_1.default.validate(contact, schema, {
        abortEarly: false,
        skipFunctions: true
    }), error = _a.error, value = _a.value;
    if (error) {
        errorMessages = error.details.map(function (errMsg) {
            var _a;
            return (_a = {},
                _a[errMsg.path[0]] = errMsg.message.replace(/"/g, ''),
                _a);
        });
        return { errorMessages: errorMessages };
    }
    db_1.default.push(value);
    return { value: value };
}
exports.addContact = addContact;
function editContact(_a) {
    var body = _a.body, params = _a.params;
    var contactId = params.id;
    var contact = getContact(contactId);
    if (!contact) {
        var contact_1 = 'Not Found';
        return { contact: contact_1 };
    }
    var errorMessages = null;
    body.firstName = body.firstName || contact.firstName;
    body.lastName = body.lastName || contact.lastName;
    body.email = body.email || contact.email;
    body.phone = body.phone || contact.phone;
    body.id = contact.id;
    body.block = contact.block;
    var _b = joi_1.default.validate(body, schema, {
        abortEarly: false,
        skipFunctions: true
    }), error = _b.error, value = _b.value;
    if (error) {
        errorMessages = error.details.map(function (errMsg) {
            var _a;
            return (_a = {},
                _a[errMsg.path[0]] = errMsg.message.replace(/"/g, ''),
                _a);
        });
        return { errorMessages: errorMessages };
    }
    contact.firstName = value.firstName;
    contact.lastName = value.lastName;
    contact.email = value.email;
    contact.phone = value.phone;
    return { value: value };
}
exports.editContact = editContact;
function deleteContact(_a) {
    var params = _a.params;
    var contactId = params.id;
    var contact = db_1.default.findIndex(function (contact) { return contact.id === parseFloat(contactId); });
    if (contact < 0)
        return;
    return db_1.default.splice(contact, 1);
}
exports.deleteContact = deleteContact;
function blockContact(_a) {
    var contactId = _a.id, block = _a.block;
    var contact = getContact(contactId);
    if (!contact)
        return;
    contact.block = block.toLowerCase() === 'true' ? true : false;
    return contact;
}
exports.blockContact = blockContact;
//# sourceMappingURL=index.js.map