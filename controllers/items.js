const Item = require('../models/schemas/item')

exports.createItem = (req, res, next) => {
	if (!req.body.name) {
		return res.status(400).send('Must provide item name')
	}

	if (!req.body.price) {
		return res.status(400).send('Must provide item price')
	}

	if (!req.body.quantity) {
		return res.status(400).send('Must provide item quantity')
	}

	const itemData = {
		name: req.body.name,
		price: req.body.price,
		quantity: req.body.price
	}

	const newItem = new Item(itemData)
	newItem.save((err) => {
		if (err) return next(err)
		return res.json(newItem)
	})
}

exports.getAllItems = (req, res, next) => {
	Item.find({}, (err, items) => {
		if (err) return next(err)
		return res.json(items)
	})
}

exports.getItemById = (req, res, next) => {
	Item.findById(req.params.itemId, (err, item) => {
		if (err) return next(err)
		if (!item) return res.status(404).send('No item with id: ' + req.params.itemId)
			return res.json(item)
	})
}

exports.getItemByName = (req, res, next) => {
	Item.findOne({name: req.params.name}, (err, item) => {
		if (err) return next(err)
    	if (!item) return res.status(404).send('No item with name: ' + req.params.name)
    	return res.json(item) 
	})
}

exports.updateItem = (req, res, next) => {
	Item.findOneAndUpdate({ _id: req.params.userId }, req.body, {}, (err, user) => {
		if (err) return next(err)
		if (!user) return res.status(404).send('Could not find user: ' + req.params.userId)
		return res.json(user)
	})
}

exports.deleteItem = (req, res, next) => {
	Item.findByIdAndRemove(req.params.itemId, (err, user) => {
		if (err) return next(err)
		if (!item) return res.status(404).send('Could not find item ' + req.params.itemId)
		return res.json(item)
	})
}