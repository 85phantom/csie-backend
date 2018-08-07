const NewsService = require('./news');
const TeachersService = require('./teachers');
const PaperService = require('./papers');
const LabsService = require('./labs');
const FileService = require('./file');
const UsersService = require('./user');
const Knex = require('knex');
const Express = require('express');
const app = Express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const dbConfig = {
  client: 'mysql2',
  connection: {
    host : 'localhost',
    user : 'root',
    password : 'root',
    port: 3306,
    database : 'csie-website'
  }
}

class App {
  
  constructor(){
    this.db = Knex(dbConfig);
    this.fileService = new FileService ({app, db: this.db });
    this.newsService = new NewsService({ app, db: this.db, fileService: this.fileService });
    this.teachersService = new TeachersService({app, db: this.db, fileService: this.fileService });
    this.paperService = new PaperService({app, db: this.db});
    this.labsService = new LabsService({app, db: this.db, fileService: this.fileService});
    this.usersService = new UsersService({app, db: this.db});
    // this.loginservice = new Loginservice({db: this.db, userService: this.usersService})
  }

  async start() {
    app.listen(3000, () => {
      console.log('Server started.')
    });
  }
}

new App().start().then();