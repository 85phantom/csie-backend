const Action = require('./action');
const Middleware = require('./middleware')

class UsersService {
  constructor(options){
    this.app = options.app;
    this.db = options.db;
    this.action = new Action({ db: this.db });
    const middleware = new Middleware({usersAction: this.action})
    this.app.post('/users',middleware.verifyUsers(), middleware.createUsers());
    this.app.get('/users', middleware.findUsers());
    this.app.put('/users/:id',middleware.verifyUsers(), middleware.updateUsers())
    this.app.delete('/users/:id', middleware.verifyUsers(), middleware.deleteUsers());
    this.app.post('/login', middleware.loginUsers());
  }
}

module.exports = UsersService;