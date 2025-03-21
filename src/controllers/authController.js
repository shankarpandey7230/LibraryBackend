import { hashPassword } from '../../utils/bcrypt.js';
import { createUser } from '../models/user/UserModel.js';
export const insertNewUser = async (req, res, next) => {
    try {


        // console.log(req.body)
        const { password } = req.body;
        req.body.password = hashPassword(password);

    
        //insert into DB
        const user = await createUser(req.body)
        if (user?._id) {
            // create an unique user activation link and send to their email
            res.json({
                status: "success",
                message: "Success "
            })
        }
        res.json({
            status: "error",
            message: "Unable to create account..Try again later"
        })
        
    } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            error.message = "Email already exist in the system, use another email "
            error.statusCode = 200;
            // console.log(error)
        }
    
        next(error)
        
    }
}
