import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }
    // async getSessions({email,password,name}){
    //     try {
    //         const sessions = account.getSession("66b4a1e7001e8921ba45");
    //         if (sessions) {
    //             console.log("user session info: ", response); // Success
    //         } else {
    //             return null;
    //         }
            
    //     } catch (error) {
    //         console.log("user session error: ", error); // Failure
    //     }
    // }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
             return await this.account.getPrefs();
          
        
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
       

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService