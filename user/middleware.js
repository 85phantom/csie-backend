const _ = require('lodash')
const newError = require('../error');

class usersMiddleware{
    constructor(options){
        this.usersAction = options.usersAction;
    }
    createUsers(){
        return async (req, res) => {
            try {
                const body = this.validateUsers(req.body);
                const user = await this.usersAction.createUsers(body);
                return res.status(200).json(user);
            } catch (error) {
                console.error(error)
                return res.status(error.code || 500).json(error.message || error);
            }
        }
    }
    findUsers(){
        return async (req, res) => {
            try {
                const query = await this.usersAction.findUsers(req.query);
                return res.status(200).json(query);
            } catch (error) {
                console.error(error)
                return res.status(error.code || 500).json(error.message || error);
            }
        }
    }
    updateUsers(){
        return async (req, res) => {
            try {
                const body = this.validateUsers(req.body);
                const users = await this.usersAction.updateUsers(parseInt(req.params.id),body);
                return res.status(200).json(users);
            } catch (error) {
                console.error(error);
                return res.status(error.code || 500).json(error.message || error);
            }
        }  
    }
    deleteUsers(){
        return async (req, res) => {
            try {
                const user = this.usersAction.deleteUsers(parseInt(req.params.id))
                return res.status(200).json(user);
            } catch (error) {
                return res.status(error.code || 500).json(error.message || error);
            }
        }
    }
    validateUsers(Users){
        if(!_.isObjectLike(Users))
            throw new newError(400, 'User is not an object');
        if(!_.isString(Users.email))
            throw new newError(400, 'email is not a string');
        if(!_.isString(Users.password))
            throw new newError(400, 'password is not a string');
        return Users;
    }
    verifyUsers(){
        return (req, res, next) =>{
            try {
                const tokenHeader = req.headers['authorization']
                this.usersAction.verifyUsers(tokenHeader);
                next();
            } catch (error) {
                return res.status(error.code || 500).json(error.message || error);
            }
        }
    }
    loginUsers(){
        return async (req, res) =>{
            try {
                const user = await this.usersAction.userLogin(req.body);
                return res.status(200).json(user);
            } catch (error) {
                return res.status(error.code || 500).json(error.message || error);
            }
        }
    }
}

module.exports = usersMiddleware