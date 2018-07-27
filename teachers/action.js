const Teachers = require('./model');
const newError = require('../error');

class TeachersAction{
    constructor(options){
       this.db = options.db;
       this.fileService = options.fileService;
       this.teacherPerPage = 10;
    }

    async createTeachers(data = {}){
        const newTeacher = new Teachers(data);
        try{
            const findCoverQuery = await this.fileService.action.createFile(newTeacher.cover);
            const findBackgroundQuery = await this.fileService.action.createFile(newTeacher.background);
            newTeacher.cover_id = findCoverQuery.file_id;
            newTeacher.background_id = findBackgroundQuery.file_id;
            await this.db.insert(newTeacher.transformDatabase()).into('Teachers');
        }
        catch(err){
            throw err;
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
                const coverIdInTeacher = teachersList[i].cover_id;
                const bgIdInTeacher = teachersList[i].background_id;
                const findCoverObject = await this.fileService.action.getFileObject(coverIdInTeacher);
                const findBgObject = await this.fileService.action.getFileObject(bgIdInTeacher);
                teachersList[i].cover = findCoverObject;
                teachersList[i].background = findBgObject;
            }
            return{
                page_total : (teachersCount[0].teachers_count/this.teacherPerPage)+1,
                teachers : teachersList
            }
        }
        catch(err){
            throw err;
        }
    }

    async updateTeachers(teacherId, data={}){
        const newTeacher = new Teachers(data);
        try{
            const newTeacherCover = await this.fileService.action.saveFile(newTeacher.cover);
            const newTeacherBackground = await this.fileService.action.saveFile(newTeacher.background);
            newTeacher.cover_id = newTeacherCover;
            newTeacher.background_id = newTeacherBackground;
           
            delete newTeacher.cover;
            delete newTeacher.background;
            await this.db('Teachers').where({teacher_id : teacherId}).update(newTeacher);
            return newTeacher;
        }
        catch(err){
            throw err;
        }
        
    }
    async deleteTeachers(teacherId){
        try{
            await this.db('Teachers').where({teacher_id : teacherId}).del();
            return teacherId;
        }
        catch(err){
            throw err;
        }    
    }
}


module.exports = TeachersAction