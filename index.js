const Hapi = require("@hapi/hapi");
const UserCrud = require("./services/service");
const router = new UserCrud()
const server = Hapi.server({
  port: 3330,
  host: 'localhost'
});


// create user_acaunt...

server.route({
  method: 'POST',
  path: '/create_users',
  handler: router.createUser
});

// show details for users by get id

server.route({
  method:"GET",
  path:"/getUsersbyID/{id}",
  handler: router.getUserById
})

// update users details 

server.route({
  method:"PUT",
  path:"/updateDetails/{id}",
  handler: router.updateById
})

// Delete users details by id

server.route({
  method:"DELETE",
  path:"/deleteData/{id}",
  handler: router.geleteDataId
})


server.route({
  method:"GET",
  path:"/getAllData",
  handler:router.getAllData
})
// for the testing........


const start = async () => {
  await server.start();                 
};    

start();