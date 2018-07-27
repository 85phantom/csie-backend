const _ = require('lodash')

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
                return res.status(500).json(err);
            }
        }
    }

    findNews(){
        return async (req, res) => {
            const news = await this.newsActions.findNews(req.query);
            return res.status(200).json(news);
        }
    }
    updateNews(){
        return async (req, res) => {
            const body = this.validateNews(req.body);
            const news = await this.newsActions.updateNews(parseInt(req.params.id), body);
            return res.status(200).json(news);
        }
    }
    deleteNews(){
        return async (req, res) => {
            const news = await this.newsActions.deleteNews(parseInt(req.params.id));
            return res.status(200).json(news);
        }
    }
    validateNews(news){
        if(!_.isObjectLike(news))
            throw new Error('News is not an object');
        const content = news.content;
        const classify = news.classify;
        const title = news.title;
        const cover_id = news.cover_id;
        const file_id = news.file_id;
        if(!_.isString(content))
            throw new Error('content is not String');
        if(!_.isString(classify))
            throw new Error('classify is not String');
        if(!_.isString(title))
            throw new Error('title is not String');
        if(!(_.isNil(cover_id) || _.isNumber(parseInt(cover_id))))
            throw new Error('cover_id is not Nil');
        if(!(_.isNil(file_id) || _.isNumber(parseInt(file_id))))
            throw new Error('file_id is not Nil');
        return news;
    }
}

module.exports = newsMiddleware;