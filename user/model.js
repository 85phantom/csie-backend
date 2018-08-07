class Users{

    /**
     *Creates an instance of Users.
     * @param {object} data
     * @param {string} data.email
     * @param {string} data.password
     * @memberof Users
     */
    constructor(data){
        this.email = data.email;
        this.password = data.password;
    }
}

module.exports = Users;