class labs{

    /**
     *Creates an instance of labs.
     * @param {object} data
     * @param {number} data.teacher_id
     * @param {string} data.name
     * @param {string} data.description
     * @param {File} data.cover
     * @param {File} data.photo
     * @param {number} data.cover_id
     * @param {number} data.photo_id
     * @memberof labs
     */
    constructor(data){
        this.teacher_id = data.teacher_id;
        this.name = data.name;
        this.description = data.description;
        this.cover = data.cover;
        this.photo = data.photo;
        this.cover_id = data.cover_id;
        this.photo_id = data.photo_id;
    }
    transformDatabase(){
        return{
            teacher_id: this.teacher_id,
            name: this.name,
            description: this.description,
            cover_id: this.cover_id,
            photo_id: this.photo_id
        }
    }
}

module.exports = labs;