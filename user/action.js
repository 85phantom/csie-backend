const Users = require('./model');
const newError = require('../error');
const bcrypt = require('bcrypt');
const saltround = 10;
const jwt = require('jsonwebtoken')
const key = 'nyanyanyanya';

class UsersAction {
    constructor(options){
        this.db = options.db;
        this.usersPerPage = 10;

    }

    async createUsers(data={}){
        const newUsers = new Users(data);
        try{
            let userExist = await this.userExistCheck(newUsers.email)
            if(userExist == true){
                throw new newError(400, 'User Exist');
            }
            newUsers.password = await bcrypt.hash(newUsers.password, saltround);
            await this.db.insert(newUsers).into('Users');
        }
        catch(err){
            throw err;
        }
        return data;
    }

    async findUsers(query = {}){
        const page = query.page;
        const email = query.email;
        const skip = page * this.usersPerPage;
        try {
            let userListQuery = this.db('Users').offset(skip).limit(this.usersPerPage);
            let totalUserQuery = this.db('Users').count('user_id AS user');
            if(email){
                userListQuery = userListQuery.where({email: email});
                totalUserQuery = totalUserQuery.where({email: email});
            }
            const userList = await userListQuery;
            const totalUser = await totalUserQuery;
            return{
                page_total : Math.ceil(totalUser[0].user / this.usersPerPage) ,
                users : userList
            }
        } catch (err) {
            throw err;
        }
    }

    async updateUsers(userId, data ={}){
        const newUsers = new Users(data);
        try {
            let userExist = await this.userExistCheck(newUsers.email);
            if(userExist != true){
                throw new newError(400, 'User not Exist');
            }
            console.log('newUsers.password, saltround', newUsers.password, saltround);
            newUsers.password = await bcrypt.hash(newUsers.password, saltround);
            await this.db('Users').where({user_id : userId}).update(newUsers);
            return newUsers;
        } catch (err) {
            throw err;
        }
    }

    async deleteUsers(userId){
        try{
            let userExist = await userExistCheck(newUsers.email);
            if(userExist != true){
                throw new newError(400, 'User not Exist');
            }
            await this.db('Users').where({user_id : userId}).del();
            return userId;
        }
        catch(err){
            throw err;
        }
    }
    async userExistCheck(userMail){
        userquery = {
            page:1,
            mail:userMail
        }
        const findLogin = await this.userService.action.findUsers(userquery);
        if(findLogin.users.length == 1){
            return true;
        }
        return false;
    }

    async userExistCheck(email){
        const findLogin = await this.findUsers({ email: email});
        if(findLogin.users.length == 1){
            return true;
        }
        return false;
    }

    async userLogin(user){
        const newUser = new Users(user)
        if(await this.userExistCheck(newUser.email)){
            const dbUserQueryResult = await this.findUsers({ email: newUser.email })
            const dbUser = dbUserQueryResult.users[0]
            const compare = await bcrypt.compare(newUser.password, dbUser.password)
            if(compare){
                const accesstoken = jwt.sign({email: newUser.email }, key ,{expiresIn:'1d'});
                return {token : accesstoken};
            }
            else{
                throw new newError(403, 'Email or Password is wrong.')
            }
        }
        else
            throw new newError(403, 'Email or Password is wrong.');
    }
    verifyUsers(token){
        try {
            let decoded = jwt.verify(token, key);
            const email = decoded.email;
            return email;
        } catch (error) {
            throw new newError(403, error.message);
        }
    }
}

module.exports = UsersAction;