"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
/* GET home page. */
router.get('/', function (_req, res) {
    res.render('index', { title: 'Express Contact Example' });
});
exports.default = router;
//# sourceMappingURL=index.js.map