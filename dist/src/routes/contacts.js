"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_1 = require("../controllers/index");
var router = express_1.Router();
/* GET contacts listing. */
router.get('/', function (_req, res) {
    var contacts = index_1.getContacts();
    res.status(200).json({ success: 'true', message: 'All contacts', data: contacts });
});
/* GET single contact. */
router.get('/:id', function (req, res) {
    var contact = index_1.getContact(req.params.id);
    if (!contact)
        return res.status(404).json({ success: 'false', message: 'Error, Contact not available' });
    return res.status(200).json({ success: 'true', data: contact });
});
/* POST a contact. */
router.post('/', function (req, res) {
    var _a = index_1.addContact(req.body), value = _a.value, errorMessages = _a.errorMessages;
    if (errorMessages) {
        return res.status(406).json({
            success: 'false',
            message: 'Error please input right contact details',
            error: errorMessages
        });
    }
    return res
        .status(201)
        .json({ success: 'true', message: 'Contact added successfully', data: value });
});
router.put('/:id', function (req, res) {
    var params = req.params, body = req.body;
    var _a = index_1.editContact({ params: params, body: body }), value = _a.value, errorMessages = _a.errorMessages, contact = _a.contact;
    if (contact === 'Not Found')
        return res.status(404).json({ success: 'false', message: 'Error, Contact not available' });
    if (errorMessages) {
        return res.status(406).json({
            success: 'false',
            message: 'Error please input right contact details',
            error: errorMessages
        });
    }
    return res
        .status(202)
        .json({ success: 'true', message: 'Contact updated successfully', data: value });
});
router.put('/:id/:block', function (req, res) {
    var contact = index_1.blockContact(req.params);
    if (!contact) {
        return res
            .status(406)
            .json({ success: 'false', message: 'Error, cannot block contact, contact not found' });
    }
    return res.status(200).json({
        success: 'true',
        message: "Contact is " + (contact.block ? 'blocked' : 'unblocked') + " successfully",
        data: contact
    });
});
router.delete('/:id', function (req, res) {
    var contact = index_1.deleteContact(req);
    if (!contact)
        return res.status(404).json({ success: 'false', message: 'Error, Contact not available' });
    return res.status(200).json({
        success: 'true',
        message: 'Contact deleted successfully'
    });
});
exports.default = router;
//# sourceMappingURL=contacts.js.map