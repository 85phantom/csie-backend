const Action = require('./action');
const Middleware = require('./middleware');

const test = (req, res, next) => {
    res.status(200).send('FORK YOU');
    
}

class labsService{
    constructor(options){
        this.db = options.db;
        this.app = options.app;
        this.fileService = options.fileService;
        this.action = new Action({db:this.db, fileService: this.fileService});
        const middleware = new Middleware({labActions: this.action});
        this.app.post('/labs', middleware.createLabs());
        this.app.get('/labs', test, middleware.findLabs());
        this.app.put('/labs/:id', middleware.updateLabs());
        this.app.delete('/labs/:id', middleware.deleteLabs());

    }
}

module.exports = labsService;