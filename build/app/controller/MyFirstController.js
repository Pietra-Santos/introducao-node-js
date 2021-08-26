"use strict";Object.defineProperty(exports, "__esModule", {value: true});class MyFirstController{
    async index(req, res){
      const person = {
        name: "Nome da Pessoa",
        age: 21
      }
      return res.status(200).json(person);
    };
    async store(req, res){
      const { name, age } = req.body;
      const { page } = req.query;
      return res.json({ name, age });
    };
    async delete(req, res){
      return res.status(200).json({ message: 'Isso aí!'});
    };
    async update(req, res){
      return res.status(200).json({ message: 'Isso aí!'});
    };
  }
  
  exports. default = new MyFirstController();