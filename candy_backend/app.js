const express = require("express");
const candyRoute = require("./routes/candy-route");
const app = express();
const  {sequelize}= require("./db/connect");
const bodyParser = require("body-parser");
const cors = require('cors')
app.use(cors())

app.use(bodyParser.json());


app.use(candyRoute);

(async () => {
	try {
		await sequelize.sync();
		app.listen(3000, console.log("server listening on port 3000..."));
	} catch (error) {
		console.log(error);
	}
})();
