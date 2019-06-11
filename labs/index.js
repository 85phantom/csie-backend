const Action = require('./action');
const Middleware = require('./middleware');

class labsService{
    constructor(options){
        this.db = options.db;
        this.app = options.app;
        this.fileService = options.fileService;
        this.action = new Action({db:this.db, fileService: this.fileService});
        const middleware = new Middleware({labActions: this.action});
        this.app.post('/labs',middleware.verifyUsers(),  middleware.createLabs());
        this.app.get('/labs', middleware.findLabs());
        this.app.put('/labs/:id',middleware.verifyUsers(), middleware.updateLabs());
        this.app.delete('/labs/:id',middleware.verifyUsers(), middleware.deleteLabs());

    }
}

module.exports = labsService;