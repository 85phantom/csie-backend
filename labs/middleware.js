const _ = require('lodash');

class LabMiddleware{
    constructor(options){
        this.labActions = options.labActions;
    }
    createLabs(){
        return async (req, res) => {
            try{
                const body = this.validatelabs(req.body);
                const labs = await this.labActions.createLabs(body);
                return res.status(200).json(labs);
            }
            catch(err){
                return res.status(500).json(err);
            }
        }
    }
    findLabs(){
        return async (req, res) => {
            try {
                const labs = await this.labActions.findLabs(req.query);
                return res.status(200).json(labs);
            } catch (error) {
                console.log(error)
                return res.status(500).json(error);
            }   
        }
    }

    updateLabs(){
        return async (req, res) => {
            try {
                const body = this.validatelabs(req.body);
                const labs = await this.labActions.updateLabs(parseInt(req.params.id), body)
                return res.status(200).json(labs);
            } catch (err) {
                return res.status(500).json(err);
            }
            
        }
    }

    deleteLabs(){
        return async (req, res) => {
            try {
                const labs = await this.labActions.deleteLabs(parseInt(req.params.id));
                return res.status(200).json(labs)
            } catch (error) {
                return res.status(500).json(err);
            }
        }
    }

    validatelabs(Labs){
        if(!_.isObjectLike(Labs))
            throw new Error('Lab is not an object');
        const teacher_id = Labs.teacher_id;
        const name = Labs.name;
        const description = Labs.description;
        const cover_id = Labs.cover_id;
        const photo_id = Labs.photo_id;

        if(!_.isString(name))
            throw new Error('name is not String');
        if(!_.isString(description))
            throw new Error('description is not String');
        if(!(_.isNil(cover_id) || _.isNumber(parseInt(cover_id))))
            throw new Error('cover_id is not Nil');       
        if(!(_.isNil(teacher_id) || _.isNumber(parseInt(teacher_id))))
            throw new Error('teacher_id is not Nil');
        if(!(_.isNil(photo_id) || _.isNumber(parseInt(photo_id))))
            throw new Error('cover_id is not Nil');

        return Labs;
    }
}

module.exports = LabMiddleware;