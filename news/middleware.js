const _ = require('lodash')
const newError = require('../error')

class newsMiddleware {
    constructor(options){
        this.newsActions = options.newsActions;
    }

    createNews() {
        return async (req, res) => {
            try{
                const body = this.validateNews(req.body);
                const news = await this.newsActions.createNews(body);
                return res.status(200).json(news);
            }
            catch(err){
                return res.status(error.code|| 500).json(error.message|| error);
            }
        }
    }

    findNews(){
        return async (req, res) => {
            try {
                const news = await this.newsActions.findNews(req.query);
                return res.status(200).json(news);
            } catch (error) {
                return res.status(error.code|| 500).json(error.message|| error);
            }
            
        }
    }
    updateNews(){
        return async (req, res) => {
            try {  
                const body = this.validateNews(req.body);
                const news = await this.newsActions.updateNews(parseInt(req.params.id), body);
                return res.status(200).json(news);
            } catch (error) {
                return res.status(error.code|| 500).json(error.message|| error);
            }
        }
    }
    deleteNews(){
        return async (req, res) => {
            try {
                const news = await this.newsActions.deleteNews(parseInt(req.params.id));
                return res.status(200).json(news);
            } catch (error) {
                return res.status(error.code|| 500).json(error.message|| error);
            }
        }
    }
    validateNews(news){
        if(!_.isObjectLike(news))
            throw new newError(400, 'News is not an object');
        const content = news.content;
        const classify = news.classify;
        const title = news.title;
        const cover_id = news.cover_id;
        const file_id = news.file_id;
        if(!_.isString(content))
            throw new newError(400, 'content is not String');
        if(!_.isString(classify))
            throw new newError(400, 'classify is not String');
        if(!_.isString(title))
            throw new newError(400, 'title is not String');
        if(!(_.isNil(cover_id) || _.isNumber(parseInt(cover_id))))
            throw new newError(400, 'cover_id is not Nil');
        if(!(_.isNil(file_id) || _.isNumber(parseInt(file_id))))
            throw new newError(400, 'file_id is not Nil');
        return news;
    }
}

module.exports = newsMiddleware;