const express = require('express')
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const { Sequelize } = require('sequelize')

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const sequelize = new Sequelize('Car-sharing', 'postgres', '12002233', {
    host: 'localhost',
    dialect: 'postgres'
  });

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// app.listen(port, () => {
//     console.log(`Server was started on port: ${port}`)
// })

async function main(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

main()
