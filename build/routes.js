"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _MyFirstController = require('./app/controller/MyFirstController'); var _MyFirstController2 = _interopRequireDefault(_MyFirstController);

const routes = new (0, _express.Router)();

routes.post('/', _MyFirstController2.default.store);
routes.get('/', _MyFirstController2.default.index);

exports. default = routes;