import config from "../config/conf";
import { Client, Account, ID,Databases,Storage,Query } from "appwrite";


class Service{
    client=new Client();
    database; 
    storage;
    constructor(){
        this.client.setEndpoint(config.appwrite_url).setProject(config.appwrite_project_id)
        this.database=new Databases(this.client)
        this.storage=new Storage(this.client)
    }
    async createPost({title,content,slug,featured_image,status,user_id}){
        try {
            console.log({user_id,title,content,slug,featured_image,status});
            
            return await this.database.createDocument(config.appwrite_database_id,config.appwrite_collection_id, slug,{
                title,
                content,
                featured_image,
                status,
                user_id
            })
            
        } catch (error) {
            console.log('something went wrong in creating post');
            return null
        }
        
    }
    async updatePost(slug,{title,content,featured_image,status}){
        try {
             await this.database.updateDocument(config.appwrite_database_id,config.appwrite_collection_id,slug,{
                title,
                content,
                featured_image,
                status
            })
            return true
        } catch (error) {
            console.log('something went wrong in creating post');
            return false
        }
    
    }
    async deletePost(documentId){
        
        try {
            await this.database.deleteDocument(
                config.appwrite_database_id,config.appwrite_collection_id,
                documentId
            );
            return true
        } catch (error) {
            console.log(documentId);
        
            console.log('something went wrong in deleting post',error);
            return false
        }
       
    }
    async getPost(slug){
        try {
            return await this.database.getDocument( config.appwrite_database_id,config.appwrite_collection_id,slug)
        } catch (error) {
            console.log('something went wrong in getting post',error);
            return false
        }
       
    }
    async getAllPost(){
        try {
            return await this.database.listDocuments( config.appwrite_database_id,config.appwrite_collection_id,[
                Query.equal('status','active')
            ])
        } catch (error) {
            console.log('something went wrong in getting all post',error);
            return false
        }
    }
    async uploadFile(file){
      try {
         return await this.storage.createFile(config.appwrite_storage_id,ID.unique(),file)
      } catch (error) {
        console.log('something went wrong in uploading file',error);
            return false
      }
    }
    async deleteFile(fileId){
        try {
          return await this.storage.deleteFile(config.appwrite_storage_id,fileId)
        } catch (error) {
          console.log('something went wrong in uploading file',error);
              return false
        }
      }
      getFilePreview(fileId){
            return this.storage.getFilePreview(config.appwrite_storage_id,fileId)
      }
}
const appWriteService=new Service()
export default appWriteService