const Action = require('./action');
const Middleware = require('./middleware')

class TeachersService{
    constructor(options){
        this.app = options.app;
        this.db = options.db;
        this.fileService = options.fileService;
        this.action = new Action({db: this.db, fileService: this.fileService });
        const middleware = new Middleware({teachersAction: this.action});
        this.app.post('/teachers', middleware.createTeachers());
        this.app.get('/teachers', middleware.findTeachers());
        this.app.put('/teachers/:id', middleware.updateTeachers());
        this.app.delete('/teachers/:id', middleware.deleteTeachers());
    }
}


module.exports = TeachersService;