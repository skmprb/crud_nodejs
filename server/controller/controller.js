var Userdb = require('../model/model');

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
        birthday: req.body.date,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country
    })

    user 
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a user"
            });
        });
}

exports.find = (req,res) => {

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send({
                        message: "Not found user with is id "+ id
                    })
                }else{
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieveing user with id" + id
                })
            })

    }else{
        Userdb.find()
            .then(user => {
            res.send(user)
            })
            .catch(err => {
               res.status(500).send({message:err.message || "Error Occurred while getting users"});
            });
    }

    

}

exports.update = (req,res) => {
    if(!req.body){
        return res
            .status(400)
            .send({message: "Content can not be empty!"});
        
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body,{
        useFindAndModify: false
    })
    .then(data => {
        if(!data){
            res.status(404).send({
                message: `Cannot Update user with ${id}. Maybe user not found!`
            })
        }else{
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({ message: "Error Update user information"})
    })
}

exports.delete = (req,res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message: `Cannot Delete with id $(id).Maybe id is wrong`
            })
        }else{
            res.send({
                message: "User was deleted successfully"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "could not delete User with id = " +id
        });
    });
}