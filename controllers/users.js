
const User = require('../models/schemas/user')
const Item = require('../models/schemas/item')

exports.createUser = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send('Must provide email')
  }
  if (!req.body.password) {
    return res.status(400).send('Must provide valid password')
  }
  if (!req.body.name) {
    return res.status(400).send('Must provide name')
  }
  const userData = {
    email: req.body.email,
    hash: req.body.password,
    name: req.body.name
  }
  const newUser = new User(userData)
  newUser.save((err) => {
    if (err) return next(err)
    return res.json(newUser)
  })
}

exports.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err)
    return res.json(users)
  })
}

exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(404).send('No user with id: ' + req.params.userId)
    return res.json(user)    
  })
}

exports.getUserByEmail = (req, res, next) => {
  User.findOne({ email: req.params.email }, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(404).send('No user with email: ' + req.params.email)
    return res.json(user)    
  })
}

exports.updateUser = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.userId }, req.body, {}, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(404).send('Could not find user: ' + req.params.userId)
    return res.json(user)
  })
}
exports.deleteUser = (req, res, next) => {
  User.findByIdAndRemove(req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(404).send('Could not find user ' + req.params.userId)
    return res.json(user)
  })
}

exports.purchaseById = (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(404).send('No user with id: ' + req.params.userId)
    // Search for items 
    Item.findById(req.params.itemId, (err, item) => {
      if (err) return next(err)
      if (!item) return res.status(404).send('No item with id: ' + req.params.itemId)

      if(item.quantity > req.body.quantityDemanded) {
        item.quantity -= req.body.quantityDemanded
        item.markModified('quantity');
        item.save(function (err) {
          if (err) return next(err);
        });

        user.orders.items.push(item);
        user.markModified('orders');

      }
      else
      {

      }

    })

  })
}
