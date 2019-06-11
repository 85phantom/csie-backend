const Teachers = require('./model');
const newError = require('../error');
const jwt = require('jsonwebtoken')
const key = 'nyanyanyanya';
const _ = require('lodash');

class TeachersAction{
    constructor(options){
       this.db = options.db;
       this.fileService = options.fileService;
       this.teacherPerPage = 10;
    }

    async createTeachers(data = {}){
        const newTeacher = new Teachers(data);
        try{
            if(!(_.isNil(newTeacher.cover))){
                const newTeacherCover = await this.fileService.action.saveFile(newTeacher.cover);
                newTeacher.cover_id = newTeacherCover;
            }
            if(!(_.isNil(newTeacher.background))){
                const newTeacherBackground = await this.fileService.action.saveFile(newTeacher.background);
                newTeacher.background_id = newTeacherBackground;
            }
            
            await this.db.insert(newTeacher.transformDatabase()).into('Teachers');
        }
        catch(error){
            throw error;
        }
        return data;
    }

    async findTeachers(query = {}){
        const page = query.page;
        const skip = (page-1) * this.teacherPerPage;

        try{
            const teachersList = await this.db('Teachers').offset(skip).limit(this.teacherPerPage);
            const teachersCount = await this.db('Teachers').count('teacher_id as teachers_count');
            for(let i = 0;i<this.teacherPerPage;i++){
                teachersList[i].cover = {
                    file_id: 0,
                    path: '',
                    uri: ''
                }
                teachersList[i].background = {
                    file_id: 0,
                    path: '',
                    uri: ''
                }

                if(!(_.isNil(teachersList[i].cover_id))){
                    const coverIdInTeacher = teachersList[i].cover_id;
                    const findCoverObject = await this.fileService.action.getFileObject(coverIdInTeacher);
                    teachersList[i].cover = findCoverObject;
                }
                if(!(_.isNil(teachersList[i].background_id))){
                    const bgIdInTeacher = teachersList[i].background_id;
                    const findBgObject = await this.fileService.action.getFileObject(bgIdInTeacher);
                    teachersList[i].background = findBgObject;
                }
            }
            return{
                page_total : Math.ceil(teachersCount[0].teachers_count/this.teacherPerPage),
                teachers : teachersList
            }
        }
        catch(error){
            throw error;
        }
    }

    async updateTeachers(teacherId, data={}){
        const newTeacher = new Teachers(data);
        try{
            if(!(_.isNil(newTeacher.cover))){
                const newTeacherCover = await this.fileService.action.saveFile(newTeacher.cover);
                newTeacher.cover_id = newTeacherCover;
            }
            if(!(_.isNil(newTeacher.background))){
                const newTeacherBackground = await this.fileService.action.saveFile(newTeacher.background);
                newTeacher.background_id = newTeacherBackground;
            }
           
            delete newTeacher.cover;
            delete newTeacher.background;
            console.log(newTeacher)
            await this.db('Teachers').where({teacher_id : teacherId}).update(newTeacher);
            return newTeacher;
        }
        catch(error){
            throw error;
        }
        
    }
    async deleteTeachers(teacherId){
        try{
            await this.db('Teachers').where({teacher_id : teacherId}).del();
            return teacherId;
        }
        catch(error){
            throw error;
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


module.exports = TeachersAction