const Action = require('./action');

class UsersService {
  constructor(options){
    this.db = options.db;
    this.action = new Action({ db: this.db });
  }
}

module.exports = UsersService;