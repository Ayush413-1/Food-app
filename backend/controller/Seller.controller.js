import jwt from 'jsonwebtoken'

// Controller: authenticate the seller using configured admin credentials and create a seller session cookie
export const sellerLogin = async (req,res) => {
   try{
     const {email, password} =req.body;

    if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
        const token =jwt.sign({email},process.env.JWT_SECRET,{expiresIn: '7d'})

        res.cookie('sellerToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.json({success: true, message:"Logged in"})
    }else{
        return res.json({success:false, message:'Invalid Credentials'});
    }
   }catch(error){
    console.log(error.message);
    res.json({success:false, message:error.message});
   }
}

// Controller: confirm that the seller token is valid for the current session
export const isSellerAuth = async (req, res) =>{
    try{
        return res.json({success: true})
    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Controller: clear the seller auth cookie and end the dashboard session
export const logout = async (req, res) =>{
    try{
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });
        return res.json({success: true, message: "Logged Out"})
    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}