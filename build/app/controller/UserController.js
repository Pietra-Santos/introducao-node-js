"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _database = require('../../config/database');
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController{
    async store(req, res){
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required().min(6),
      });

      if(!(await schema.isValid(req.body))){
        return res.status(401).json({ message: 'Ooops, dados inválidos'})
      }

      const userExists = await _User2.default.findOne({ 
        where: { 
          email: req.body.email 
        }
      });

      if(userExists){
        return res.status(401).json({ message: 'Usuário já cadastrado em nossa base' })
      }

      const { id, name, email} = await _User2.default.create(req.body);
      return res.json({id, name, email});
    };

    async index(req, res){
      const person = {
        name: "Nome da Pessoa",
        age: 21
      }
      return res.status(200).json(person);
    };
    async delete(req, res){
      return res.status(200).json({ message: 'Isso aí!'});
    };
    async update(req, res){
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string(),
        oldPassword: Yup.string().min(6),
        password: Yup.string().when('oldPassword',
          (oldPassword, field) => oldPassword ? field.required().min(6) : field
        ),
        confirmPassword: Yup.string().when('password',
        (password, field) => password ? field.required().min(6).oneOf([Yup.ref('password')]) : field
        ),
      })
      if(!(await schema.isValid(req.body))){
        return res.status(401).json({
          message: 'Falha na validação'
        })
      }

      console.log(req.userEmail)

      const { email, oldPassword } = req.body;
      console.log(req.userId)

      const user = await _User2.default.findByPk(req.userId)
      console.log('email informado no banco', user.email)
      console.log('email informado body', email)

      if(email !== user.email){
        const userExists = await _User2.default.findOne({ where: { email }})

        if(userExists){
          return res.status(400).json({ message: 'Verifique o email informado'})
        }
      }

      if(oldPassword && !(await user.checkPassword(oldPassword))){
        return res.status(400).json({ message: 'Senha não confere'})
      }

      const { id, name, employee} = await user.update(req.body)

      return res.status(200).json({ 
        id, 
        name, 
        employee
      });
    };
  }
  
  exports. default = new UserController();