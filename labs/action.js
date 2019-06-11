const _ = require('lodash');
const Labs = require('./model');
const jwt = require('jsonwebtoken')
const key = 'nyanyanyanya';
const newError = require('../error');

class labsAction{
    constructor(options){
        this.db = options.db;
        this.fileService = options.fileService;
        this.labsPerPage = 10;
    }

    async createLabs(data = {}){
        const newLabs = new Labs(data);
        try{
            if(!_.isNil(newLabs.cover)){
                const findCoverQuery = await this.fileService.action.createFile(newLabs.cover);
                newLabs.cover_id = findCoverQuery.file_id;
            }
            if(!_.isNil(newLabs.photo)){    
                const findPhotoQuery = await this.fileService.action.createFile(newLabs.photo);
                newLabs.photo_id = findPhotoQuery.file_id;
            }
            await this.db('Labs').insert(newLabs.transformDatabase());
            return newLabs;
        }
        catch(err){
            throw err;
        }
    }

    async findLabs(query = {}){
        const page = query.page;
        const skip = page * this.labsPerPage;
        try{
            const labsList = await this.db('Labs').offset(skip).limit(this.labsPerPage);
            const totalLabs = await this.db('Labs').count('lab_id AS lab');
            for(let i = 0;i<labsList.length;i++){
                labsList[i].cover = {
                    file_id: 0,
                    path: '',
                    uri: ''
                }
                labsList[i].photo = {
                    file_id: 0,
                    path: '',
                    uri: ''
                }
                if(!_.isNil(labsList[i].cover_id)){
                    const coverIdInLabs = labsList[i].cover_id;
                    const findCoverObject = await this.fileService.action.getFileObject(coverIdInLabs);
                    labsList[i].cover = findCoverObject;
                }
                if(!_.isNil(labsList[i].photo_id)){
                    const photoIdInTLabs = labsList[i].photo_id;
                    const findPhotoObject = await this.fileService.action.getFileObject(photoIdInTLabs);
                    labsList[i].photo = findPhotoObject;
                }
            }
            return{
                page_total: Math.ceil((totalLabs[0].lab / this.labsPerPage) )+1,
                labs : labsList
            }
        }
        catch(err){
            throw err;
        }
    }

    async updateLabs(labId, data={}){
        const newLabs = new Labs(data)
        try{
            if(!_.isNil(newLabs.cover)){
            const findCoverQuery = await this.fileService.action.createFile(newLabs.cover);
            newLabs.cover_id = findCoverQuery.file_id;
        }
        if(!_.isNil(newLabs.photo)){    
            const findPhotoQuery = await this.fileService.action.createFile(newLabs.photo);
            newLabs.photo_id = findPhotoQuery.file_id;
        }
            delete newLabs.cover;
            delete newLabs.photo;
            await this.db('Labs').where({lab_id : labId}).update(newLabs);
            
            return newLabs;
        }
        catch(err){
            throw err;
        }
    }
    async deleteLabs(labId){
        try{
            await this.db('Labs').where({lab_id: labId}).del()
            return labId;
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
module.exports = labsAction;