const Userdata = require("../models/model");

class UserCrud{
    async createUser(req,h){
        try {
            const {first_name,last_name,email,password}=req.payload
            if(first_name === undefined || last_name === undefined || email === undefined || password === undefined){
              return h.response({status:"error",message:"body data is empty......."})
            }
            const presentData = await Userdata.query().where({email:email})
            if(presentData.length > 0){
                return h.response({status:"success",message:"users allready exists..."})
            }else{
                await Userdata.query().insert({first_name,last_name,email,password})
                return h.response({status:"success",message:"users details inserted successfully..."})
            }
          } catch (err) {
            if(err.errno === 1062){
              return h.response({status:"error",message:"this email allready exist....."})
            } 
            return h.response({status:"error",message:err.message})
          }
    }

    async getAllData(req,h){
        try {
            const allUsers = await Userdata.query() 
            if(allUsers.length>0){
                return h.response(allUsers)
            }else{
                h.response('does not any users exists....')
            }
        } catch (error) {
            h.response(error.message)
        }
    }


    async getUserById(req,h){
        try {
            let id = req.params.id
            let data = await Userdata.query().where({id:id})
            if(data.length > 0){
              return h.response({status:"success",message:"data fetched successfully...",count:data.length,users_data:data})  
            }
            return h.response({status:"success",message:"id not found..."})
        } catch (err) {
            return h.response({status:"error",message:err.message})
        }
    }

    async geleteDataId(req,h){
        try {
            let id = req.params.id
            let data = await Userdata.query().deleteById(id);
            if(data > 0){
              return h.response({status:"success",message:"successfully deleted..."})
            }else{
              return h.response({status:"error",message:"id not found..."})   
            }
          } catch (err) {
            return h.response(err)            
          }
    }
    
    async updateById(req,h){
        try {
            let id = req.params.id
            const {first_name,last_name,email} = req.payload
            let update = await Userdata.query().findById(id).patch({first_name,last_name,email});
            if(update > 0){
              return h.response({status:"seccess",message:"users details updated successfully..."})
            }else{
              return h.response({status:"success",message:"id not found...."})
            }
          } catch (err) {
            console.log(err);
            return h.response(err)  
          }
    }

}

module.exports = UserCrud