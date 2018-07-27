const Action = require('./action');
const Middleware = require('./middleware');

class NewsService {
  constructor(options){
    this.app = options.app;
    this.db = options.db;
    this.fileService = options.fileService;
    this.action = new Action({ db: this.db, fileService: this.fileService });
    const middleware = new Middleware({ newsActions: this.action });
    this.app.post('/news', middleware.createNews());
    this.app.get('/news', middleware.findNews());
    this.app.put('/news/:id', middleware.updateNews());
    this.app.delete('/news/:id', middleware.deleteNews());
  }
}

module.exports = NewsService;