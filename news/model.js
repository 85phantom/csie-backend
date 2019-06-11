const File = require('../file/model'); 

class News {

  /**
   *Creates an instance of News.
   * @param {object} data
   * @param {File} data.cover
   * @param {string} data.content
   * @param {File} data.file
   * @param {string} data.classify
   * @param {string} data.title
   * @param {number} data.cover_id
   * @param {number} data.file_id
   * @memberof News
   */

  constructor(data) {
    this.cover = data.cover;
    this.content = data.content || '';
    this.file = data.file;
    this.classify = data.classify || '';
    this.title = data.title || '';
    this.cover_id = data.cover_id;
    this.file_id = data.file_id;
    this.created_on = new Date().valueOf() / 1000;
  }
  transformDatabase(){
    return{
      content: this.content,
      classify: this.classify,
      title: this.title,
      cover_id: this.cover_id,
      file_id: this.file_id,
      created_on: this.created_on
    }
  }
}

module.exports = News;