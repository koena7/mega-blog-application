import { ID, Client, Storage } from 'appwrite'
import config from '../config/config';

class StorageService {
    client = new Client();
    storage

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        
        storage = new Storage(this.client);
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile({
                bucketId: config.appwriteBucketId,
                fileId: ID.unique(),
                file: file
            })
        } catch (error) {
            console.log('Error while uploading image: '+error)
        }
    }

    async deleteFile(id){
        try {
            return await this.storage.deleteFile({
                bucketId: config.appwriteBucketId,
                fileId: id
            })
        } catch (error) {
            console.log('Error while deleting file: '+error)
        }
    }

    getFilePreview(id){
        try {
            return this.storage.getFilePreview({
                bucketId: config.appwriteBucketId,
                fileId: id
            })
        } catch (error) {
            console.log('Error while fetching image preview: '+error)
        }
    }

}

const storageService = new StorageService();
export default storageService;