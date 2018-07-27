const Labs = require('./model');

class labsAction{
    constructor(options){
        this.db = options.db;
        this.fileService = options.fileService;
        this.labsPerPage = 10;
    }

    async createLabs(data = {}){
        const newLabs = new Labs(data);
        try{
            console.log(newLabs)
            const findCoverQuery = await this.fileService.action.createFile(newLabs.cover);
            const findPhotoQuery = await this.fileService.action.createFile(newLabs.photo);
            newLabs.cover_id = findCoverQuery.file_id;
            newLabs.photo_id = findPhotoQuery.file_id;
            console.log(findCoverQuery)
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
                console.log(labsList[i])
                const coverIdInLabs = labsList[i].cover_id;
                const photoIdInTLabs = labsList[i].photo_id;
                const findCoverObject = await this.fileService.action.getFileObject(coverIdInLabs);
                const findPhotoObject = await this.fileService.action.getFileObject(photoIdInTLabs);
                labsList[i].cover = findCoverObject;
                labsList[i].photo = findPhotoObject;
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
            const newLabsCover = await this.fileService.action.saveFile(newLabs.cover);
            const newLabsPhoto = await this.fileService.action.saveFile(newLabs.photo);
            newLabs.cover_id = newLabsCover;
            newLabs.photo_id = newLabsPhoto;
           
            delete newLabs.cover;
            delete newLabs.photo;
            console.log(newLabs);
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
}
module.exports = labsAction;