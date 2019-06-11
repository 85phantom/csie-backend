const News = require('./model');
const _ = require('lodash');
const jwt = require('jsonwebtoken')
const key = 'nyanyanyanya';
const newError = require('../error');

class NewsAction {
  constructor(options){
    this.db = options.db;
    this.fileService = options.fileService;
    this.newsPerPage = 10;
  }

  async createNews(data = {}){
    const newNews = new News(data);
    try {
      if(!(_.isNil())){
        const findCoverQuery = await this.fileService.action.createFile(newNews.cover);
        newNews.cover_id = findCoverQuery.file_id;
      }
      if(!(_.isNil())){
        const findFileQuery = await this.fileService.action.createFile(newNews.file);
        newNews.file_id = findFileQuery.file_id;
      }
      await this.db.insert(newNews.transformDatabase()).into('News');
    }
    catch(err){
      throw err;
    }
    return data;
  }

  async findNews(query = {}){
    const page = query.page || 1;
    const search = query.search
    const skip = (page-1) * this.newsPerPage;

    try {
      
      const newsList = await this.db('News').offset(skip).limit(this.newsPerPage);
      const newsCount = await this.db('News').count('news_id AS count');
      if(search){
        newsList = newsList.where({search:search});
      }
      for(let i = 0;i<newsList.length;i++){
        newsList[i].cover = {
          file_id: 0,
          path: '',
          uri: ''
        }
        newsList[i].file = {
          file_id: 0,
          path: '',
          uri: ''
        }
        if(!_.isNil(newsList[i].cover_id)){
          const coverIdInNews = newsList[i].cover_id;
          const findCoverObject = await this.fileService.action.getFileObject(coverIdInNews); 
          newsList[i].cover = findCoverObject;
        }
        if(!_.isNil(newsList[i].file_id)){
          const fileIdInNews = newsList[i].file_id;
          const findFileObject = await this.fileService.action.getFileObject(fileIdInNews);
          newsList[i].file = findFileObject;
        }
      }
      return {
        page_total: Math.ceil
        (newsCount[0].count / this.newsPerPage),
        news: newsList
      }
    }
    catch (err) {
      throw err;
    }
  }

  async updateNews(newsId, data = {}){
    const newNews = new News(data);
    try{
      if(!_.isNil(newNews.cover)){
        const newNewsCoverId = await this.fileService.action.saveFile(newNews.cover);
        newNews.cover_id = newNewsCoverId;
        delete newNews.cover;
      }
      if(!_.isNil(newNews.file)){
        const newNewsFileId = await this.fileService.action.saveFile(newNews.file);
        newNews.file_id = newNewsFileId;
        delete newNews.file;  
      }
      await this.db('News').where({news_id : newsId}).update(newNews);
      return newNews;
    }
    catch(err){
        throw err;
    }
  }

  async deleteNews(newsId){
    await this.db('News').where({news_id: newsId}).del();
    return newsId;
  }
  verifyUsers(token){
    try {
        let decoded = jwt.verify(token, key);
        const email = decoded.email;
        return email;
    } catch (error) {
        throw new newError(403, error.message);
    }
}
}

module.exports = NewsAction;