const User = require('../model/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports.userLogin = async (req,res)  => {
  const {email, password} = req.body;
  try{
    const existUser = await User.findOne({email:email});
    if (existUser){
      const pass = bcrypt.compareSync(password, existUser.password);
      if(!pass) return res.status(401).json('invalid credential');
      const token = jwt.sign({
          id: existUser._id
      },'webtoken');
      return res.status(200).json({
        token,
        id:existUser._id,
        message: 'successfully login', 
        email: existUser.email,
        fullname:existUser.fullname
      })
     }else{
        return res.status(401).json('user not found')
      }
    }
  
catch(err){
  return res.status(400).json(`${err}`)
  }
}

module.exports.userSignup = async (req,res) => {
  const {email, password, fullname} = req.body;
  console.log(req.body)
  try {
    const existUser = await User.findOne({email:email});
    if (existUser){
      return res.status(401).json('user already exist');

    }else{
      const hashPassword = bcrypt.hashSync(password,10)
      await User.create({
        email,
        password:hashPassword,
        fullname
      })
      return res.status(201).json('successfully registered')
    }
  } catch (err) {
    return res.status(400).json(`${err}`)
  }
}