class Users{

    /**
     *Creates an instance of Users.
     * @param {object} data
     * @param {string} data.mail
     * @param {string} data.password
     * @memberof Users
     */
    constructor(data){
        this.mail = data.mail;
        this.password = data.password;
    }
}

module.exports = Users;