import userModel from '../Models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
// import bcrypt from 'bcryptjs';
import auth from '../common/auth.js';

// export const register = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
//   try {
//     const user = new User({ firstName, lastName, email, password });
//     await user.save();
    
//     // Send activation email with JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     const url = `${process.env.BASE_URL}/activate/${token}`;
    
//     // Send email logic
//     const transporter = nodemailer.createTransport(
//       {
//       service:"gmail",
//       auth:{
//           user:process.env.EMAIL_ID,
//           pass:process.env.SECRET_KEY,

//       }});
//     await transporter.sendMail({
//       from: process.env.EMAIL_ID,
//       to: user.email,
//       subject: 'Account Activation',
//       html: `<a href="${url}">Click to activate your account</a>`,
//     });
    
//     res.status(201).json({ message: 'Registration successful. Please check your email to activate your account.' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const register = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
//   try {
//     const user = new User({ firstName, lastName, email, password });
//     await user.save();
    
//     // Generate JWT token for email activation
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     const url = `${process.env.BASE_URL}/activate/${token}`;
    
//     // Send activation email with the token
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_ID,
//         pass: process.env.SECRET_KEY,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_ID,
//       to: user.email,
//       subject: 'Account Activation',
//       html: `<a href="${url}">Click to activate your account</a>`,
//     });
    
//     // Send both message and token in the response
//     res.status(201).json({
//       message: 'Registration successful. Please check your email to activate your account.',
//       token,  // Send the token in the response
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const signup = async(req,res)=>{
  try {
      let user = await userModel.findOne({email:req.body.email})
      if(!user)
      {
          req.body.password = await auth.hashPassword(req.body.password)
          const newuser = await userModel.create(req.body)
          res.status(201).send({
              message:`User ${req.body.firstName} ${req.body.lastName} is Succesfully created`,
              newuser
          })
      }
     
      else{
          res.status(404).send({
              message:`user with ${req.body.email} is allready exist`
          })
      }
      
  } catch (error) {
      res.status(500).send({
          message:"Internal Server Error",
          error:error.message
      })
  }
}

// export const activateAccount = async (req, res) => {
//   const { token } = req.params;
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findByIdAndUpdate(decoded.id, { isActive: true });
//     if (!user) throw new Error('User not found');
//     res.status(200).json({ message: 'Account activated successfully' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// Additional controllers for login, forgot password, reset password, etc.
// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     // Check if the account is activated
//     if (!user.isActive) {
//       return res.status(400).json({ error: 'Please activate your account first' });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res.status(200).json({ token, message: 'Login successful' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const login = async(req,res)=>{
  try {
   let user = await userModel.findOne({email:req.body.email})
   if(user)
   {
      let hashcompare = await auth.hashcompare(req.body.password,user.password)
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      
      if(hashcompare)
      {
          const user = await userModel.findOne({email:req.body.email},{password:0})
          res.status(201).send({
              message:` User ${user.firstName} ${user.lastName} is login successfully`,
              token,
              user

          })
      }
      else
      {
          res.status(404).send({
              message:"Invalid Passward"
          })
      }
   }
   else{
      res.status(404).send({
          message:`User with ${req.body.email} is not Found pleas signup`
      })
   }
  } catch (error) {
      res.status(500).send({
          message:"Internal Server Error",
          error:error.message
      })
  }
}

// export const getAllUser = async(req,res)=>{
//   try {
//      const allusers = await User.find({},{password:0,_id:0})
//      res.status(200).send({
//       message:"users Fetched Successfully",
//       allusers
//      })
//   } catch (error) {
//       res.status(500).send({
//           message:"Internal Server Error",
//           error:error.message
//       })
//   }
// }

export const getAllUser = async(req,res)=>{
  try {
     const allusers = await userModel.find({},{password:0,_id:0})
     res.status(200).send({
      message:"users Fetched Successfully",
      allusers
     })
  } catch (error) {
      res.status(500).send({
          message:"Internal Server Error",
          error:error.message
      })
  }
}

// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: 'User with this email does not exist' });
//     }

//     // Generate a password reset token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     const url = `${process.env.BASE_URL}/reset-password/${token}`;

//     // Send email with the reset password link
//     const transporter = nodemailer.createTransport({/* Email Config */});
//     await transporter.sendMail({
//       to: email,
//       subject: 'Password Reset',
//       html: `<a href="${url}">Click to reset your password</a>`,
//     });

//     res.status(200).json({ message: 'Password reset link sent to your email' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const forgetPassword = async (req, res) => {
  try {
      const { email } = req.body;
      let user = await userModel.findOne({ email });
      
      if (user) {
          // Generate JWT token with expiration time
          const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '15m' });

          const resetLink = `${process.env.ResetUrl}/reset-password/${token}`;

          const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                  user: process.env.EMAIL_ID,
                  pass: process.env.SECRET_KEY,
              }
          });

          const mailOptions = {
              from: process.env.EMAIL_ID,
              to: user.email,
              subject: "Password Reset Link",
              html: `
                  <p> Dear ${user.userName}, </p>
                  <p> Sorry to hear you’re having trouble logging into your account. We got a message that you forgot your password. If this was you, you can get right back into your account or reset your password now. </p>
                  <p> Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a> </p>
                  <p> If you didn’t request a login link or a password reset, you can ignore this message. </p>
                  <p> Only people who know your account password or click the login link in this email can log into your account. </p>
              `
          };

          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  console.log(error);
                  return res.status(500).send({ message: "Failed to send the password reset mail" });
              }
              console.log("Password reset email sent: " + info.response);
              res.status(201).send({ message: "Password reset mail sent successfully" });
          });
      } else {
          res.status(400).send({ message: `User with ${email} does not exist` });
      }
  } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
  }
};

// export const resetPassword = async (req, res) => {
//   const { token } = req.params;
//   const { newPassword } = req.body;
//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password
//     const user = await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });
//     if (!user) throw new Error('User not found');

//     res.status(200).json({ message: 'Password reset successful' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

export const resetPassword = async (req, res) => {
  try {
      const { token } = req.params;

      // Verify JWT token
      jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
          if (err) {
              return res.status(400).send({ message: "Invalid or expired token" });
          }

          // Find the user by email from the decoded token
          const user = await userModel.findOne({ email: decoded.email });

          if (!user) {
              return res.status(400).send({ message: "User not found" });
          }

          // Check if newPassword is provided
          if (req.body.newPassword) {
              const newPassword = await auth.hashPassword(req.body.newPassword);
              user.password = newPassword;
              await user.save();
              res.status(201).send({ message: "Your new password has been updated" });
          } else {
              res.status(400).send({ message: "New password not provided" });
          }
      });
  } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
  }
};