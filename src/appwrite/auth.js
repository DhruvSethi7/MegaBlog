import  config from '../config/conf'
import { Client, Account, ID } from "appwrite";
export class AuthService{
    client=new Client()
    account
    constructor(){
        this.client.setEndpoint(config.appwrite_url).setProject(config.appwrite_project_id)
        this.account=new Account(this.client)
    }
    async createAccount({email,password,name}){
        try {
           const userAccount=this.account.create(ID.unique(),email,password,name)
           if (userAccount) {
            return this.login(email,password)
           }
           else{
            return userAccount
           }
        } catch (error) {
            
        }
        return null
    }
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
            
        } catch (error) {
            console.log(error.message);
        }
        return null
    }
    async logout(){
        try {
            await this.account.deleteSession('current');
            console.log('sessin deleted successfully ',);
            return
        } catch (error) {
            console.log(error.message);
        }
        return null
    }
    async checkCurrentUser(){
        try {
            return await this.account.get();
              
        } catch (error) {
            console.log('Something error occured during checking user',error);
        }
       return false
    }
}
const authService=new AuthService()
export default authService