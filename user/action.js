const Users = require('./model');

class UsersAction {
    constructor(options){
        this.db = options.db;
        this.usersPerPage = 10;
    }

    async createUsers(data={}){
        const newUsers = new Users(data);
        try{
            let userExist = await userExistCheck(newUsers.mail)
            // const checkUserExist = await this.db('Users').where({mail: newUsers.mail});
            // console.log(checkUserExist);
            if(userExist == true){
                throw new Error('User Exist');
            }
            await this.db.insert(newUsers).into('Users');
        }
        catch(err){
            throw err;
        }
        return data;
    }

    async findUsers(query = {}, mail = ''){
        const page = query.page;
        const skip = page * this.usersPerPage;
        try {
            let userListQuery = this.db('Users').offset(skip).limit(this.usersPerPage);
            let totalUserQuery = this.db('Users').count('userId AS user');
            if(mail){
                userListQuery = userListQuery.where({mail: mail});
                totalUserQuery = totalUserQuery.where({mail: mail});
            }
            const userList = await userListQuery;
            const totalUser = await totalUserQuery;
            return{
                page_total : (totalUser[0].Users / this.usersPerPage)+1 ,
                users : userList
            }
        } catch (err) {
            throw err;
        }
    }

    async updateUsers(userId, data ={}){
        const newUsers = new Users(data);
        try {
            let userExist = await userExistCheck(newUsers.mail);
            if(userExist != true){
                throw new Error('User not Exist');
            }
            await this.db('Users').where({user_id : userId}).update(newUsers);
            return newUsers;
        } catch (err) {
            throw err;
        }
    }

    async deleteUsers(userId){
        try{
            let userExist = await userExistCheck(newUsers.mail);
            if(userExist != true){
                throw new Error('User not Exist');
            }
            await this.db('Users').where({user_id : userId}).del();
            return papersId;
        }
        catch(err){
            throw err;
        }
    }
    async userExistCheck(userMail){
        userquery = {
            page:1
        }
        const findLogin = await this.userService.action.findUsers(userquery, userMail);
        if(findLogin.users.length == 1){
            return true;
        }
        return false;
    }
}

module.exports = UsersAction;