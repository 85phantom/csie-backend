const File = require('../file/model');

class Teachers {

    /**
     *Creates an instance of teachers.
     * @param {object} data
     * @param {string} data.name
     * @param {string} data.profession
     * @param {string} data.mail
     * @param {string} data.office
     * @param {string} data.office_number
     * @param {File} data.cover
     * @param {File} data.background
     * @param {number} data.cover_id
     * @param {number} data.background_id
     * @memberof teachers
     */
    constructor(data){
        this.name = data.name;
        this.profession = data.profession;
        this.mail = data.mail;
        this.office = data.office;
        this.office_number = data.office_number;
        this.cover = data.cover;
        this.background = data.background;
        this.cover_id = null;
        this.background_id = null;
    }
    transformDatabase(){
        return{
            name:this.name,
            profession: this.profession,
            mail: this.mail,
            office: this.office,
            office_number: this.office_number,
            cover_id: this.cover_id,
            background_id: this.background_id
        }
    }
}

module.exports = Teachers;