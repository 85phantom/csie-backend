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
                const teacher = await this.teachersAction.createTeachers(body);
                console.log(teacher);
                return res.status(200).json(teacher);
            } catch (error) {
                console.error(error);
                return res.status(error.code || 500).json(error.message || error);
            }  
        }
    }
    findTeachers(){
        return async (req, res)=>{
            try {
                const query = await this.teachersAction.findTeachers(req.query);
                return res.status(200).json(query);
            } catch (error) {
                console.log(error)
                return res.status(error.code || 500).json(error.message || error);
                
            }
        }
    }
    updateTeachers(){
        return async (req, res) => {
            try {
                const body = this.validateTeachers(req.body);
                const teacher = await this.teachersAction.updateTeachers(parseInt(req.params.id),body);
                return res.status(200).json(teacher);
            } catch (error) {
                console.error(error)
                return res.status(error.code || 500).json(error.message || error);
            }
        }
    }
    deleteTeachers(){
        return async (req, res) => {
            try {
                const teacher = await this.teachersAction.deleteTeachers(parseInt(req.param.id));
                return res.status(200).json(teacher); 
            } catch (error) {
                return res.status(error.code || 500).json(error.message ||　error);
            }
        }
    }
    validateTeachers(teachers){
        if(!_.isObjectLike(teachers))
            throw new newError(400, 'teacher is not an object');
        const name = teachers.name;
        const profession = teachers.profession;
        const mail = teachers.mail;
        const office = teachers.office;
        const office_number = teachers.office_number;
        const cover_id = teachers.cover_id;
        const background_id = teachers.background_id;

        if(!_.isString(name))
            throw new newError(400, 'name is not a String');
        if(!_.isString(profession))
            throw new newError(400, 'profession is not a String');
        if(!_.isString(mail))
            throw new newError(400, 'mail is not a String');
        if(!_.isString(office))
            throw new newError(400, 'office is not a String');
        if(!_.isString(office_number))
            throw new newError(400, 'office number is not a String');
        if(!(_.isNumber(cover_id) || _.isNil(cover_id)))
            throw new newError(400, 'cover_id is not number');
        if(!(_.isNumber(background_id) || _.isNil(background_id)))
            throw new newError(400, 'background_id is not number');
        return teachers
    }
    verifyUsers(){
        return (req, res, next) =>{
            try {
                const tokenHeader = req.headers['authorization']
                this.teachersAction.verifyUsers(tokenHeader);
                next();
            } catch (error) {
                return res.status(error.code || 500).json(error.message || error);
            }
        }
    }
}

module.exports = teachersMiddleware;