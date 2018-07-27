const Action = require('./action');
const Middleware = require('./middleware')
class TeachersService{
    constructor(options){
        this.db = options.db
        this.fileService = options.fileService;
        this.action = new Action({db: this.db, fileService: this.fileService });
        const middleware = new Middleware({teachersAction: this.action});
        
    }
}


module.exports = TeachersService;