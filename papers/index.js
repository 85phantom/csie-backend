const Action = require('./action');
const Middleware = require('./middleware');

class PapersService{
    constructor(options){
        this.app = options.app;
        this.db = options.db;
        this.action = new Action({ db: this.db});
        const middleware = new Middleware({papersActions: this.action})
        this.app.post('/papers',middleware.verifyUsers(), middleware.createPapers());
        this.app.get('/papers', middleware.findPapers());
        this.app.put('/papers/:id',middleware.verifyUsers(), middleware.updatePapers());
        this.app.delete('/papers/:id',middleware.verifyUsers(), middleware.deletePapers());
    }
}

module.exports = PapersService;