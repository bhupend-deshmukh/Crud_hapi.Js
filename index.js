const Hapi = require("@hapi/hapi");
const knex = require("./config/db_connection");


const server = Hapi.server({
  port: 3330,
  host: 'localhost'
});


// create user_acaunt...

server.route({
  method: 'POST',
  path: '/create_users',
  handler: async(req, h) => {
    try {
      const {first_name,last_name,email,password}=req.payload
      if(first_name === undefined || last_name === undefined || email === undefined || password === undefined){
        return h.response({status:"error",message:"body data is empty......."})
      }
      await knex("users_details").insert(req.payload)
      return h.response({status:"success",message:"users details inserted successfully..."})
    } catch (err) {
      if(err.errno === 1062){
        return h.response({status:"error",message:"this email allready exist....."})
      } 
      return h.response({status:"error",message:err.message})
    }
  }
});

// show details for users by get id

server.route({
  method:"GET",
  path:"/getUsersbyID/{id}",
  handler: async(req,h) =>{
    try {
      let id = req.params.id
      let data = await knex("*").from("users_details").where({id:id})
      if(data.length > 0){
        return h.response({status:"success",message:"data fetched successfully...",count:data.length,users_data:data})  
      }
      return h.response({status:"success",message:"id not found..."})
    } catch (err) {
      return h.response({status:"error",message:err.message})
    }
  } 
})

// update users details 

server.route({
  method:"PUT",
  path:"/updateDetails/{id}",
  handler: async(req,h)=>{
    try {
      let id = req.params.id
      console.log(id);
      const {first_name,last_name,email} = req.payload
      let update = await knex.select("*").from("users_details").update({first_name,last_name}).where({id:id})
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
})

// Delete users details by id

server.route({
  method:"DELETE",
  path:"/deleteData/{id}",
  handler: async(req,h)=>{
    try {
      let id = req.params.id
      let data = await knex.select("*").from("users_details").where({id:id}).del()
      if(data > 0){
        return h.response({status:"success",message:"successfully deleted..."})
      }else{
        return h.response({status:"error",message:"id not found..."})   
      }
    } catch (err) {
      return h.response(err)            
    }
  }
})


const start = async () => {
  await server.start();                 
};    

start();