const Action = require('./action');

class FilesService{
    constructor(options){
        this.db = options.db;
        this.action = new Action({ db:this.db });
    }
}

module.exports = FilesService;