const newError = require('./error')
const bcrypt = require('bcrypt');
const Users = require('./user/model')
const jwt = require('jsonwebtoken')
const key = 'nyanyanyanya';
class loginAction{
    constructor(option){
        this.db = option.db;
        this.userService= option.userService;
    }

    async userExistCheck(user){
        const findLogin = await this.userService.action.findUsers({ mail: user.mail });
        if(findLogin.users.length == 1){
            return true;
        }
        return false;
    }

    async userLogin(user){
        const newUser = new Users(user)
        if(this.userExistCheck(newUser)){
            const dbUserQueryResult = await this.userService.action.findUsers({ mail: newUser.mail })
            const dbUser = dbUserQueryResult.users[0]
            const compare = await bcrypt.compare(newUser.password , dbUser.password)
            if(compare){
                const accesstoken = jwt.sign({ mail: newUser.mail }, key);
                return { token : accesstoken};
            }
            else{
                throw new newError(403, 'User or password is wrong.')
            }
        }
        else
            throw new newError(403, 'User or password is wrong.');
    }
}