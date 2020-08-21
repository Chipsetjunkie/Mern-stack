const express= require('express');
const profile = express.Router();
const profile_db = require("../../models/Profile");
const user_db = require("../../models/User");
const post_db = require("../../models/Post");
const auth = require("../../middleware/auth");
const {check,validationResult} = require('express-validator');

profile.get("/test",(req,res)=>{
    res.send("Tiny test")
});

profile.get('/me',auth,async (req,res) =>{
      user_profile = await profile_db.findOne({user:req.user.id}).populate('user',['name','avatar']);
      if(!user_profile){
        res.status(500).json({message:"Profile doesnt exist"})
      }
      else{
        console.log("entered profile")
        res.json({user_profile})
      }
});





profile.get('/',async (req,res) =>{
      user_profile = await profile_db.find().populate('user',['name','avatar']);
      if(!user_profile){
        res.status(500).json({message:"Profile doesnt exist"})
      }
      else{
        console.log("entered profile")
        res.json({user_profile})
      }
});

profile.post('/',
      [auth,
        [check('status','Please fill status').not().isEmpty(),
        check('skills','Please fill skills').not().isEmpty()]],
      async (req,res)=> {
          const errors = validationResult(req)
          if(!errors.isEmpty()){
            res.status(500).json({errors})
          }
            const {
              company,
              website,
              location,
              bio,
              status,
              githubusername,
              skills,
              youtube,
              facebook,
              twitter,
              instagram,
              linkedin
            } = req.body;

            const profileFields = {}
            profileFields.user = req.user.id;
            profileFields.status = status;
            if (company) profileFields.company = company
            if (website) profileFields.website = website
            if (location) profileFields.location = location
            if (bio) profileFields.bio = bio
            if (githubusername) profileFields.githubusername =  githubusername
            if (skills) profileFields.skills = skills.split(",").map(skill => skill.trim())

            profileFields.social = {}

            if (youtube) profileFields.social.youtube = youtube
            if (facebook) profileFields.social.facebook = facebook
            if (twitter) profileFields.social.twitter = twitter
            if (instagram) profileFields.social.instagram = instagram
            if (linkedin) profileFields.social.linkedin = linkedin

            try{
              user_profile = await profile_db.findOne({user:req.user.id})
              if(user_profile){
                  await profile_db.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})
                  res.json(user_profile)
              }
              else{
                new_profile = new profile_db(profileFields)
                await new_profile.save();
                res.json(new_profile)
                console.log("created Profile")
              }
            }
            catch(err){
              console.error(err)
              res.status(500).json({message:"something went wrong"})
            }
      });


profile.get('/user/:user_id',async (req,res) =>{
        try{
          console.log(req.params.user_id)
          const profile = await profile_db.findOne({user:req.params.user_id}).populate('user',['name','avatar'])
          if (!profile){
              console.log(profile)
              res.status(500).json({message:"profile does not exist"})
          }

          res.json({profile})
        }catch(err){
          if (err.kind == "ObjectId"){
              res.status(500).json({message:"profile not there"})
          }
          res.status(500).send("Server Error")
        }

      });

profile.delete('/',auth,async(req,res)=>{
      try{

          await post_db.deleteMany({user:req.user.id});

          await profile_db.findOneAndDelete({user:req.user.id})

          await user_db.findOneAndDelete({_id:req.user.id})

          res.json({message:"User deleted"})
      }
      catch(err){
        res.send("Deletion failed")
      }
});

profile.put('/experience',
      [auth,[check('title','Title is required').not().isEmpty(),
      check('company','Company is required').not().isEmpty(),
      check('from','From is required').not().isEmpty()]],
      async (req,res) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
          res.status(500).json({errors})
        }

        const {
          company,
          title,
          location,
          from,
          to,
          current,
          description
        } = req.body;


        const newExp = {
          company,
          title,
          location,
          from,
          to,
          current,
          description
        }

        try{
            const profile = await profile_db.findOne({user:req.user.id})

            profile.experience.unshift(newExp);
            await profile.save()
            res.json(profile)
        }catch(err){
          console.error(err.message)
          res.status(500).send('Serve Eror')
        }

});

profile.delete('/experience/:exp_id',auth,async(req,res)=>{
    try{
      const profile_ = await profile_db.findOne({user:req.user.id});

      const removeIndex = profile_.experience.map(item => item.id).indexOf(req.params.exp_id);
      profile_.experience.splice(removeIndex,1);

      await profile_.save();

      res.json(profile_)

    }catch(err){
      console.error(err.message)
      res.status(500).send('Serve Eror')
    }
})

profile.put('/education',
      [auth,[check('school','school is required').not().isEmpty(),
      check('degree','Degree is required').not().isEmpty(),
      check('fieldofstudy','Field of study is required').not().isEmpty(),
      check('from','From is required').not().isEmpty()]],
      async (req,res) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
          res.status(500).json({errors})
        }

        const{
          school,
          degree,
          fieldofstudy,
          from,
          to,
          current,
          description
        } = req.body

        const newEd ={
          school,
          degree,
          fieldofstudy,
          from,
          to,
          current,
          description
        }

        try{
            const profile = await profile_db.findOne({user:req.user.id})

            profile.education.unshift(newEd);
            await profile.save()
            res.json(profile)
        }catch(err){
          console.error(err.message)
          res.status(500).send('Serve Eror')
        }

  });

  profile.delete('/education/:ed_id',auth,async(req,res)=>{
      try{
        const profile_ = await profile_db.findOne({user:req.user.id});

        const removeIndex = profile_.education.map(item => item.id).indexOf(req.params.ed_id);
        profile_.education.splice(removeIndex,1);

        await profile_.save();

        res.json(profile_)

      }catch(err){
        console.error(err.message)
        res.status(500).send('Serve Eror')
      }
  })




module.exports = profile;
