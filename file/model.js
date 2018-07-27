class File {
  /**
   *Creates an instance of File.
   * @param {object} data
   * @param {number} file_id
   * @param {string} path
   * @param {string} uri
   * @memberof File
   */
  constructor(data = {}){
    if(!data){
      data = {
        file_id: 0,
        path: '',
        uri: ''
      }
    }
    this.file_id = data.file_id;
    this.path = data.path;
    this.uri = data.uri;
  }
}

module.exports = File;