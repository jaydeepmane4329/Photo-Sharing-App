import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/users.js';

const secret = 'test';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({ message: 'User does not exists...'});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(404).json({ message: 'Invalid Credentials'});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, secret, { expiresIn: '1hr'});
        res.status(200).json({result: existingUser, token})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong...'})
    }
};

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmpassword } = req.body;
    try {
       const existingUser = await User.findOne({email});
       if(existingUser) return res.status(400).json({message: 'User already exists..'});
       if(password !== confirmpassword) return res.status(400).json({message: 'Password does not match..'});
       
       const hashedPassword = await bcrypt.hash(password, 12);
    
       const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});

       const token = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn: '1hr'});

       res.status(201).json({result, token});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong...'})
    }
};

