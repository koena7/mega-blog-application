import { Client, Account, ID } from 'appwrite'
import config from '../config/config';

class AuthenticationService{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async signIn(email, password, name){
        try {
            const createdUser = await this.account.create({
                userId: ID.unique(),
                email: email,
                password: password
            })
            if(createdUser){
                //log in
                return this.logIn(email, password);
            }
            return createdUser;
        } catch (error) {
            console.log('error in signIn: '+error)
        }
    }

    async logIn(email, password){
        try {
            return await this.account.createEmailPasswordSession({
                email: email,
                password: password
            })
        } catch (error) {
            console.log('error during log in: '+error)
        }
    }

    async logOut(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log('error during logout: '+error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log('error while fetching current user: '+error)
        }
    }

}

const authService = new AuthenticationService();
export default authService;