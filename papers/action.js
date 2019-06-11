const Papers = require('./models');
const newError = require('../error');
const jwt = require('jsonwebtoken')
const key = 'nyanyanyanya';

class PapersAction{
    constructor(option){
        this.db = option.db;
        this.papersPerPage = 10;
    }

    async createPapers(data = {}){
        const newPapers = new Papers(data);
        try{
            await this.db('Papers').insert(newPapers);
            return newPapers;
        }
        catch(error){
            throw error;
        }
    }

    async findPapers(query={}){
        const page = query.page;
        const skip = page * this.papersPerPage;
        try{
            const paperList = await this.db('Papers').offset(skip).limit(this.papersPerPage);
            const totalpaper = await this.db('Papers').count('paper_id AS paper')
            return{
                page_total : Math.ceil(totalpaper[0].paper / this.papersPerPage),
                papers : paperList
            }
        }
        catch(error){
            throw error;
        }
    }

    async updatePapers(papersId, data = {}){
        const newPapers = new Papers(data);
        console.log(newPapers)
        try{
            await this.db('Papers').where({paper_id : papersId}).update(newPapers);
            return newPapers;
        }
        catch(err){
            throw err;
        }
    }

    async deletePapers(papersId){
        try{
            await this.db('Papers').where({paper_id : papersId}).del();
            return papersId;
        }
        catch(err){
            throw err;
        }
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

module.exports = PapersAction;