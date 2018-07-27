const _ = require('lodash')
const newError = require('../error');
class teachersMiddleware{
    constructor(options){
        this.teachersAction = options.teachersAction;
    }
    createTeachers(){
        return async (req, res)=>{
            try {  
                const body = this.validateTeachers(req.body);
                const teacher = this.teachersAction.createTeachers(body);
                return res.status(200).json(teacher);
            } catch (error) {
                return res.status(error.code || 500).json(error.message || error);
            }  
            
        }
    }
    findTeachers(){
        return async (req, res)=>{
            try {
                const query = this.teachersAction.findTeachers(req.query);
                return res.status(200).json(query);
            } catch (error) {
                return res.status(error.code || 500).json(error.message || error);
            }
        }
    }
    updateTeachers(){
        return async (req, res) => {
            try {
                const body = this.validateTeachers(req.body);
                const teacher = this.teachersAction.updateTeachers((req.param.id),body);
                return res.status(200).json(teacher);
            } catch (error) {
                return res.status(error.code || 500).json(error.message || error);
            }
        }
    }
    deleteTeachers(){
        return async (req, res) => {
            try {
                const teacher = this.teachersAction.deleteTeachers(req.param.id);
                return res.status(200).json(teacher); 
            } catch (error) {
                return res.status(error.code || 500).json(error.message ||　error);
            }
        }
    }
    validateTeachers(teachers){
        if(!_isObjectLike(teachers))
            throw new newError(400, 'teacher is not an object');
        const name = teachers.name;
        const profession = teachers.profession;
        const mail = teachers.mail;
        const office = teachers.office;
        const office_number = teachers.office_number;
        const cover_id = teachers.cover_id;
        const background_id = teachers.background_id;

        if(_.isString(name))
            throw new newError(400, 'name is not a String');
        if(_.isString(profession))
            throw new newError(400, 'profession is not a String');
        if(_.isString(mail))
            throw new newError(400, 'mail is not a String');
        if(_.isString(office))
            throw new newError(400, 'office is not a String');
        if(_.isString(office_number))
            throw new newError(400, 'office is not a String');
        if(!(_.isNumber(cover_id) || _.isNil(cover_id)))
            throw new newError(400, 'cover_id is not number');
        if(!(_.isNumber(background_id) || _.isNil(background_id)))
            throw new newError(400, 'background_id is not number');
    }
}

module.exports = teachersMiddleware;