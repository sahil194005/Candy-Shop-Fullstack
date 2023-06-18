const { user } = require("../model/candyModel");

const get_products = async function (req, res, next) {
	try {
		
		let arr = await user.findAll();
       
		res.json(arr);
	} catch (error) {
		console.log(error);
	}
};
const patch_product = async function (req, res, next) {
	try {
		const { id } = req.params;
	await	user.update(req.body, { where: { id: id } });
		res.send("updated");
	} catch (error) {
		console.log(error);
	}
};
const post_product = async function (req, res, next) {
	try {
		user.create(req.body);
		res.send("product posted");
		console.log(req.body);
	} catch (error) {
		console.log(error);
		res.send(error);
	}
};

const delete_product = async function(req,res,next){
	try {
		const {id} = req.params;
		await user.destroy({where:{id:id}})
	} catch (error) {
		console.log(error)
	}
}
module.exports = {
	get_products,
	post_product,
	patch_product,
	delete_product
};
