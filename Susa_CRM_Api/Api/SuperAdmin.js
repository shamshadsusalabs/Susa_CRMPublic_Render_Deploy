const express = require("express");
const router = express.Router();
const Str = require('@supercharge/strings')
const { check,validationResult } = require('express-validator');
const SuperAdminSchema = require('../Model/SuperAdmin');
const CustomerSchema = require('../Model/Customer');
const EmployerSchemas = require('../Model/Employer');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let employer = await SuperAdminSchema.findOne({ email });

            if (!employer) {
                return res.status(404).json({ msg: "User not found" });
            }

            // Compare password
            const isMatch = await bcrypt.compare(password, employer.password);

            if (!isMatch) {
                return res.status(401).json({ msg: 'Invalid credentials' });
            }

            // User matched, create JWT payload
            const payload = {
                user: {
                    id: employer.id  // Ensure you use a meaningful and unique identifier
                }
            };

            // Sign the token
            jwt.sign(
                payload,
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;

                    // Append token to employer's tokens array in database
                    employer.tokens = employer.tokens.concat({ token });
                    employer.save();

                    // Send the response including the token and user details
                    res.json({
                        token,
                        user: {
                            id: employer.id,
                            email: employer.email,
                            name: employer.name,
                            tag: employer.tag,
                            stage: employer.stage,
                            status: employer.status,
                            lreason: employer.lreason,
                            priority: employer.priority,
                            source: employer.source
                        }
                    });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);
 


router.post('/addsource',async (req,res) => {
    try{
        let {id}=req.query;
        let employer = await SuperAdminSchema.findById(id);
        if (!employer) {
            return res.status(401).json("Employer not found");
        }
 // let obj = {         
 //     allCoveringEmployees : 
 // }        
 const referc = Str.random(5)  


 employer.source.push(
    {
        "sid" : referc,
        "data" : req.body.data
        
    }
    
    );
 await employer.save();
 res.json(employer);
     }
    catch(err){
        res.json({msg:err.message});
    }
});

router.get('/source',async (req,res) => {
    try {
        let {id} = req.query;
        let employer = await SuperAdminSchema.findById(id);
        if (!employer) {
            return res.status(401).json("Company not found");
        }
        // let obj = {         
        //     allCoveringEmployees : 
        // }

        res.json(employer.source);
    } catch (error) {
        console.log(error.message);
        return res.status(500);
    }
});

router.post(
    '/deletesource',
    async (req,res) => {
        try{
            let {id} = req.body.id;  
            let employer = await SuperAdminSchema.findOne({"_id"  : req.body.id});
            if (!employer) {
                return res.status(401).json("Work not found");
            }
            SuperAdminSchema.findOneAndUpdate(
                { _id: req.body.id},
                { $pull: { source: { sid: req.body.sid } } },
                { new: true }
              )
                .then(templates =>
                    {
                        res.status(200).json(templates)
                })
                .catch(err =>  {
                    res.status(200).json(err)
            });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : error.message});
        }
    }
);


router.post('/addpriority',async (req,res) => {
    try{
        let {id}=req.query;
        let employer = await SuperAdminSchema.findById(id);
        if (!employer) {
            return res.status(401).json("Employer not found");
        }
 // let obj = {         
 //     allCoveringEmployees : 
 // }        
 const referc = Str.random(5)  


 employer.priority.push(
    {
        "sid" : referc,
        "data" : req.body.data
        
    }
    
    );
 await employer.save();
 res.json(employer);
     }
    catch(err){
        res.json({msg:err.message});
    }
});

router.get('/priority',async (req,res) => {
    try {
        let {id} = req.query;
        let employer = await SuperAdminSchema.findById(id);
        if (!employer) {
            return res.status(401).json("Company not found");
        }
        // let obj = {         
        //     allCoveringEmployees : 
        // }

        res.json(employer.priority);
    } catch (error) {
        console.log(error.message);
        return res.status(500);
    }
});

router.post(
    '/deletepriority',
    async (req,res) => {
        try{
            let {id} = req.body.id;  
            let employer = await SuperAdminSchema.findOne({"_id"  : req.body.id});
            if (!employer) {
                return res.status(401).json("Work not found");
            }
            SuperAdminSchema.findOneAndUpdate(
                { _id: req.body.id},
                { $pull: { priority: { sid: req.body.sid } } },
                { new: true }
              )
                .then(templates =>
                    {
                        res.status(200).json(templates)
                })
                .catch(err =>  {
                    res.status(200).json(err)
            });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : error.message});
        }
    }
);


router.post('/addlreason',async (req,res) => {
    try{
        let {id}=req.query;
        let employer = await SuperAdminSchema.findById(id);
        if (!employer) {
            return res.status(401).json("Employer not found");
        }
 // let obj = {         
 //     allCoveringEmployees : 
 // }        
 const referc = Str.random(5)  


 employer.lreason.push(
    {
        "sid" : referc,
        "data" : req.body.data
        
    }
    
    );
 await employer.save();
 res.json(employer);
     }
    catch(err){
        res.json({msg:err.message});
    }
});

router.get('/lreason',async (req,res) => {
    try {
        let {id} = req.query;
        let employer = await SuperAdminSchema.findById(id);
        if (!employer) {
            return res.status(401).json("Company not found");
        }
        // let obj = {         
        //     allCoveringEmployees : 
        // }

        res.json(employer.lreason);
    } catch (error) {
        console.log(error.message);
        return res.status(500);
    }
});

router.post(
    '/deletelreason',
    async (req,res) => {
        try{
            let {id} = req.body.id;  
            let employer = await SuperAdminSchema.findOne({"_id"  : req.body.id});
            if (!employer) {
                return res.status(401).json("Work not found");
            }
            SuperAdminSchema.findOneAndUpdate(
                { _id: req.body.id},
                { $pull: { lreason: { sid: req.body.sid } } },
                { new: true }
              )
                .then(templates =>
                    {
                        res.status(200).json(templates)
                })
                .catch(err =>  {
                    res.status(200).json(err)
            });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : error.message});
        }
    }
);


router.post('/addstatus',async (req,res) => {
    try{
        let {id}=req.query;
        let employer = await SuperAdminSchema.findById(id);
        if (!employer) {
            return res.status(401).json("Employer not found");
        }
 // let obj = {         
 //     allCoveringEmployees : 
 // }        
 const referc = Str.random(5)  


 employer.status.push(
    {
        "sid" : referc,
        "data" : req.body.data
        
    }
    
    );
 await employer.save();
 res.json(employer);
     }
    catch(err){
        res.json({msg:err.message});
    }
});

router.get('/status',async (req,res) => {
    try {
        let {id} = req.query;
        let employer = await SuperAdminSchema.findById(id);
        if (!employer) {
            return res.status(401).json("Company not found");
        }
        // let obj = {         
        //     allCoveringEmployees : 
        // }

        res.json(employer.status);
    } catch (error) {
        console.log(error.message);
        return res.status(500);
    }
});

router.post(
    '/deletestatus',
    async (req,res) => {
        try{
            let {id} = req.body.id;  
            let employer = await SuperAdminSchema.findOne({"_id"  : req.body.id});
            if (!employer) {
                return res.status(401).json("Work not found");
            }
            SuperAdminSchema.findOneAndUpdate(
                { _id: req.body.id},
                { $pull: { status: { sid: req.body.sid } } },
                { new: true }
              )
                .then(templates =>
                    {
                        res.status(200).json(templates)
                })
                .catch(err =>  {
                    res.status(200).json(err)
            });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : error.message});
        }
    }
);


router.post('/addstage',async (req,res) => {
    try{
        let {id}=req.query;
        let employer = await SuperAdminSchema.findById(id);
        if (!employer) {
            return res.status(401).json("Employer not found");
        }
 // let obj = {         
 //     allCoveringEmployees : 
 // }        
 const referc = Str.random(5)  


 employer.stage.push(
    {
        "sid" : referc,
        "data" : req.body.data
        
    }
    
    );
 await employer.save();
 res.json(employer);
     }
    catch(err){
        res.json({msg:err.message});
    }
});

router.get('/stage',async (req,res) => {
    try {
        let {id} = req.query;
        let employer = await SuperAdminSchema.findById(id);
        if (!employer) {
            return res.status(401).json("Company not found");
        }
        // let obj = {         
        //     allCoveringEmployees : 
        // }

        res.json(employer.stage);
    } catch (error) {
        console.log(error.message);
        return res.status(500);
    }
});

router.post(
    '/deletestage',
    async (req,res) => {
        try{
            let {id} = req.body.id;  
            let employer = await SuperAdminSchema.findOne({"_id"  : req.body.id});
            if (!employer) {
                return res.status(401).json("Work not found");
            }
            SuperAdminSchema.findOneAndUpdate(
                { _id: req.body.id},
                { $pull: { stage: { sid: req.body.sid } } },
                { new: true }
              )
                .then(templates =>
                    {
                        res.status(200).json(templates)
                })
                .catch(err =>  {
                    res.status(200).json(err)
            });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : error.message});
        }
    }
);


router.post('/addtag',async (req,res) => {
    try{
        let {id}=req.query;
        let employer = await SuperAdminSchema.findById(id);
        if (!employer) {
            return res.status(401).json("Employer not found");
        }
 // let obj = {         
 //     allCoveringEmployees : 
 // }        
 const referc = Str.random(5)  


 employer.tag.push(
    {
        "sid" : referc,
        "data" : req.body.data
        
    }
    
    );
 await employer.save();
 res.json(employer);
     }
    catch(err){
        res.json({msg:err.message});
    }
});

router.get('/tag',async (req,res) => {
    try {
        let {id} = req.query;
        let employer = await SuperAdminSchema.findById(id);
        if (!employer) {
            return res.status(401).json("Company not found");
        }
        // let obj = {         
        //     allCoveringEmployees : 
        // }

        res.json(employer.tag);
    } catch (error) {
        console.log(error.message);
        return res.status(500);
    }
});

router.post(
    '/deletetag',
    async (req,res) => {
        try{
            let {id} = req.body.id;  
            let employer = await SuperAdminSchema.findOne({"_id"  : req.body.id});
            if (!employer) {
                return res.status(401).json("Work not found");
            }
            SuperAdminSchema.findOneAndUpdate(
                { _id: req.body.id},
                { $pull: { tag: { sid: req.body.sid } } },
                { new: true }
              )
                .then(templates =>
                    {
                        res.status(200).json(templates)
                })
                .catch(err =>  {
                    res.status(200).json(err)
            });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : error.message});
        }
    }



    
);


router.post(
    '/restart',
    async (req,res) => {
        try{

            const referc = Str.random(5)  

            let emp = [];
            EmployerSchemas.find({ "present" :  true}).then(result=>
                {  
                    emp = result;
                   

                    
            }).catch(error=>{
                        console.log(error);
                            res.status(500).json(
                                {error:error}
                            )
            })

          var  i =0; var  j =0; 
                var cost = 0;
          CustomerSchema.find({ Tag: { $nin: ["Close"] } }).then( async result=>
                {  


                    for (let k = 0; k < result.length; k++) {
                    if(j>emp[i].targetcall-1){
                     

                        let objc = {         
                            "revenue.$.openamount" : 0
                        }

                        EmployerSchemas.findOneAndUpdate(
                            { _id: emp[i]._id , "revenue.sid": emp[i].code},
                            { $set: objc },
                        { new: true }
                          )
                            .then(templates =>
                                {
                                    
                            })
                            .catch(err =>  {
                               
                        });

                        i ++;
                        j = 0;
                        cost = 0;


                    }



                    let employer = await CustomerSchema.findById(result[k]._id);
                    if (!employer) {
                        return res.status(401).json("Employer not found");
                    }
                    let obj = {         
                        eid : emp[i]._id
                    }

                    cost += employer.Value;
                    Object.assign(employer, obj);
                    await employer.save();


                    j++;
                   }
                    

            }).catch(error=>{
                        console.log(error);
                            res.status(500).json(
                                {error:error}
                            )
            })
            res.status(200).json(
                                {message : "ds"}
                            )



            
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : error.message});
        }
    }



    
);





module.exports = router;