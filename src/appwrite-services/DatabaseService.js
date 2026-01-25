import { ID, Client, TablesDB, Query } from 'appwrite'
import config from '../config/config';

class DatabaseService{
    client = new Client();
    database;
    storage;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
        this.database = new TablesDB(client);
    }

    async createArticle({id, title, body, userId, image, status}){
        try {
            return await this.database.createRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: id,
                data: {
                    articleTitle: title,
                    articleBody: body,
                    userId: userId,
                    status: status,
                    articleImage: image
                }
            })
        } catch (error) {
            console.log('Error while creating article: '+error);
        }
        
    }

    async updatePost(id, {title, body, userId, status, image}){
        try {
            return await this.database.updateRow({
            databaseId: config.appwriteDatabaseId,
            tableId: config.appwriteTableId,
            rowId: id,
            data: {
                articleTitle: title,
                articleBody: body,
                userId: userId,
                status: status,
                articleImage: image
            }
        })
        } catch (error) {
            console.log('Error while updating row: '+error);
        }
        
    }

    async deletePost(id){
        try {
            return await this.database.deleteRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: id
            })
        } catch (error) {
            console.log("Error while deleting row: "+error);
        }
    }

    async fetchPost(id){
        try {
            return await this.database.getRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: id
            })
        } catch (error) {
            console.log('Error while fetching row: '+error);
        }
    }

    async fetchActivePosts(){
        try {
            this.database.getRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                queries: [
                    Query.equal('status', 'active')
                ]
            });
        } catch (error) {
            console.log('Error while fetching active posts: '+error);
        }
    }

}

const dbService = new DatabaseService();
export default dbService;