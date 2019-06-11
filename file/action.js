const File = require('./model');
const Dauria = require('dauria');
const crypto = require('crypto');
const _ = require('lodash');
const AWS = require('aws-sdk')
const s3 = new AWS.S3();


class FileAction{
    constructor(options){
        this.db = options.db;
        this.dirPath = 'picture/'
    }

    async createFile (data = {}){
        if(_.isEmpty(data))
            return {}
        const newFiles = new File(data);
        // const today = new Date();
        const hash = crypto.createHash('sha256');
        // const nowTime = today.getFullYear()+ '_'+ (today.getMonth()+1) +'_'+today.getDate() +'_'+today.getHours() +':'+today.getMinutes() +':'+today.getSeconds()+':'+today.getMilliseconds();
        delete newFiles.file_id;
        try {
            if(newFiles.uri != null){
                const binaryData = Dauria.parseDataURI(newFiles.uri);
                hash.update(binaryData.buffer);
                const hashStirng = hash.digest('hex')
                newFiles.path = this.dirPath + hashStirng;
                await this.writeFileInS3(newFiles.path, binaryData.buffer);
                delete newFiles.uri;
                const fileId = await this.db('Files').insert(newFiles);
                return this.getFileObject(fileId);
            }
        }  catch (error) {
            throw error;
        }
    }

    async writeFileInS3 (filename, buffer){
        const params = {
            Bucket : 'csie-website-backend',
            Key: filename,
            Body: buffer
        };
        return s3.putObject(params).promise();
    }

    async getFileObject(id){
        const findQuery = await this.db('Files').where({file_id: id});
        findQuery[0].path = findQuery[0].path.substring(1);
        return findQuery[0];
    }
    async saveFile(data){
        if(data.uri != null){
            const fileData = await this.createFile(data);
            return fileData.file_id;
        }
        if(parseInt(data.file_id)>0){
            return data.file_id;
        }
    }
}

module.exports = FileAction;