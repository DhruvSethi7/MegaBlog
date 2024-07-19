import  {config} from '../config/conf'
import { Client, Account, ID } from "appwrite";
class AuthService{
    client=new Client()
    account
    constructor(){
        this.client.setEndpoint(config.appwrite_url).setProject(config.appwrite_project_id)
        this.account=new Account(this.client)
    }
    async createAccount({email,password}){
        try {
           const userAccount=this.account.create(ID.unique(),email,password)
           if (userAccount) {
            this.login(email,password)
            return
           }
        } catch (error) {
            
        }
        return null
    }
    async login({email,password}){
        try {
            const userAccount=await this.account.createEmailPasswordSession(email,password)
            if (userAccount) {
                return userAccount
            }
        } catch (error) {
            
        }
        return null
    }
    async logout(){
        try {
          return  await this.account.deleteSession('current');
        } catch (error) {
            
        }
        return null
    }
    async checkCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log('Something error occured during checking user');
        }
        return null
    }
}
const authService=new AuthService()
export default authService