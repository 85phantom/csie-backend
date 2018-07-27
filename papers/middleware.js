const _ = require('lodash')

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
                console.log(error)
                return res.status(500).json(error);
            }
            
        }
    }
    findPapers(){
        return async(req, res)=>{
            try {
                const papers = await this.papersActions.findPapers(req.query);
                return res.status(200).json(papers);
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
    updatePapers(){
        return async(req, res)=>{
            try {
                const body = this.validatePapers(req.body);
                const papers = await this.papersActions.updatePapers(((req.params.id), body));
                return res.status(200).json(papers);
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
    deletePapers(){
        return async(req, res) => {
            try {
                const papers = await this.papersActions.deletePapers(req.params.id);
                return res.status(200).json(papers);
            } catch (error) {
                return res.status(500).json(error);
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
            throw new Error('paper is not an object');
        }
        if(!_.isString(title)){
            throw new Error('title is not a string');
        }
        if(!_.isString(author)){
            throw new Error('author is not a string');
        }
        if(!_.isString(paperClass)){
            throw new Error('paperClass is not a string');
        }
        if(!_.isString(link)){
            throw new Error('link is not a string');
        }
        if(!(_.isNumber(year) || _.isNil(year)))
            throw new Error('year is not a number');
    }
}

module.exports = papersMiddleware