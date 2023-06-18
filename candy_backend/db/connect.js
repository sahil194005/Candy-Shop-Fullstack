const Sequelize = require("sequelize");
const mysql = require("mysql2");

const sequelize = new Sequelize("node-complete", "root", "Sahil@2000", { host: "localhost", dialect: "mysql" });

// const checkConnection =async function(){
//     try {
        
//     await sequelize.authenticate();
//     // console.log('connedted')

//     } catch (error) {
//         console.log(error)
       
//     }
// }
// checkConnection()
module.exports ={sequelize};