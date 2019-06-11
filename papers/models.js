class Papers{

    /**
     *Creates an instance of papers.
     * @param {object} data
     * @param {number} data.paper_id
     * @param {number} data.teacher_id
     * @param {string} data.title
     * @param {string} data.author
     * @param {string} data.class
     * @param {string} data.link
     * @param {number} data.years
     * @memberof Papers
     */ 
    constructor(data){
        this.teacher_id = data.teacher_id;
        this.title = data.title;
        this.author = data.author;
        this.class = data.class;
        this.link = data.link;
        this.years = data.years;
    }
}

module.exports = Papers;