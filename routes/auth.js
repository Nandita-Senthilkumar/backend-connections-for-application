const router=require("express").Router();
const user=require("../models/user")
const admin=require("../config/firebase.config")
router.get("/login",async(req,res)=>{
     if(!req.headers.authorization)
     {
        return res.status(500).send({message:"Invalid Token (Internal Server Error)"})
     }

     const token= req.headers.authorization.split(" ")[1];
    //  return res.send(token)
    try{
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (!decodeValue) {
          return res.status(500).json({ message: "Un Authorize" });
        }
        else{
            // return res.status(200).json(decodeValue)
            //checking user exists already or not
            const userExists=await user.findOne({"user_id":decodeValue.user_id})
            if(!userExists)
            {
                newUserData(decodeValue, req, res);//function call
            }
            else{
                updateUserData(decodeValue, req, res);//function call
            }
        }
    }
    catch(error)
    {
        return res.status(505).json({message:error})
    }
})
//to store user information
const newUserData = async (decodeValue, req, res) => {
    const newUser = new user({
      name: decodeValue.name,
      email: decodeValue.email,
      imageURL: decodeValue.picture,
      user_id: decodeValue.user_id,
      email_verfied: decodeValue.email_verified,
      role: "member",
      auth_time: decodeValue.auth_time,
    });
    try {
      const savedUser = await newUser.save();
      res.status(200).send({ user: savedUser });
    } catch (err) {
      res.status(400).send({ success: false, msg: err });
    }
  };

  const updateUserData = async (decodeValue, req, res) => {
    const filter = { user_id: decodeValue.user_id };
    const options = {
        //upsert:create a new document when there is no matches found,if matches found it will return the single document 
      upsert: true,
      new: true,
    };
  
    try {
      const result = await user.findOneAndUpdate(
        filter,
        //just update the time,not everything..you can get the time from the token itself.
        //dont get time by using date time function
        { auth_time: decodeValue.auth_time },
        options
      );
      //the below user is temporary user diffrent from the above one.just for variable
      res.status(200).send({ user: result });
    } catch (err) {
      res.status(400).send({ success: false, msg: err });
    }
  };

module.exports=router;