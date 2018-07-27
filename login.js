class loginAction{
    constructor(option){
        this.db = option.db;
        this.userService= option.userService;
    }

    async userExistCheck(user){
        const findLogin = await this.userService.action.findUsers(user);
        if(findLogin.users.length == 1){
            return true;
        }
        return false;
    }
}