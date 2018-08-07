const _ = require('lodash')
const newError = require('../error')

class papersMiddleware{
    constructor(options){
        this.papersActions = options.papersActions;
    }
    createPapers(){
        return async(req, res) => {
            try {
                const body = this.validatePapers(req.body);
                const papers = await this.papersActions.createPapers(body);
                return res.status(200).json(papers);
                
            } catch (error) {
                return res.status(error.code|| 500).json(error.message|| error);
            }
            
        }
    }
    findPapers(){
        return async(req, res)=>{
            try {
                const papers = await this.papersActions.findPapers(req.query);
                return res.status(200).json(papers);
            } catch (error) {
                return res.status(error.code|| 500).json(error.message|| error);
            }
        }
    }
    updatePapers(){
        return async(req, res)=>{
            try {
                const body = this.validatePapers(req.body);
                const papers = await this.papersActions.updatePapers(parseInt(req.params.id), body);
                return res.status(200).json(papers);
            } catch (error) {
                return res.status(error.code|| 500).json(error.message|| error);
            }
        }
    }
    deletePapers(){
        return async(req, res) => {
            try {
                const papers = await this.papersActions.deletePapers(req.params.id);
                return res.status(200).json(papers);
            } catch (error) {
                return res.status(error.code|| 500).json(error.message|| error);
            }
        }
    }
    validatePapers(papers){
        const title = papers.title;
        const author = papers.author;
        const paperClass = papers.class;
        const link = papers.link;
        const year = papers.year;
        if(!_.isObjectLike(papers)){
            throw new newError(400, 'paper is not an object');
        }
        if(!_.isString(title)){
            throw new newError(400, 'title is not a string');
        }
        if(!_.isString(author)){
            throw new newError(400, 'author is not a string');
        }
        if(!_.isString(paperClass)){
            throw new newError(400, 'paperClass is not a string');
        }
        if(!_.isString(link)){
            throw new newError(400, 'link is not a string');
        }
        if(!(_.isNumber(year) || _.isNil(year)))
            throw new newError(400, 'year is not a number');
    }
}

module.exports = papersMiddleware