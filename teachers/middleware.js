const _ = require('lodash')

class teachersMiddleware{
    constructor(options){
        this.teachersAction = options.teachersAction;
    }
    createTeachers(){

    }
    findTeachers(){

    }
    updateTeachers(){

    }
    deleteTeachers(){

    }
    validateTeachers(teachers){
        if(!_isObjectLike(teachers))
            throw new Error('teacher is not an object');
        const name = teachers.name;
        const profession = teachers.profession;
        const mail = teachers.mail;
        const office = teachers.office;
        const office_number = teachers.office_number;
        const cover_id = teachers.cover_id;
        const background_id = teachers.background_id;

        if(_.isString(name))
            throw new Error('name is not a String');
        if(_.isString(profession))
            throw new Error('profession is not a String');
        if(_.isString(mail))
            throw new Error('mail is not a String');
        if(_.isString(office))
            throw new Error('office is not a String');
        if(_.isString(office_number))
            throw new Error('office is not a String');
        if(!(_.isNumber(cover_id) || _.isNil(cover_id)))
            throw new Error('cover_id is not number');
        if(!(_.isNumber(background_id) || _.isNil(background_id)))
            throw new Error('background_id is not number')
    }
}

module.exports = teachersMiddleware;