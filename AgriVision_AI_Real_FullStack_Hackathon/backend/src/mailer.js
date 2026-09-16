import nodemailer from 'nodemailer';
import twilio from 'twilio';
let transporter=null,twilioClient=null;
if(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS){transporter=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:String(process.env.SMTP_SECURE||'false')==='true',auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});}
if(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN){twilioClient=twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);}
export async function sendOtp({method,contact,otp,purpose}){
 if(method==='email' && transporter){await transporter.sendMail({from:process.env.SMTP_FROM||process.env.SMTP_USER,to:contact,subject:`AgriVision AI ${purpose==='password_reset'?'password reset':'verification'} OTP`,text:`Your AgriVision AI OTP is ${otp}. It expires in 5 minutes. Do not share this code.`});return {delivered:true,channel:'email'};}
 if(method==='phone' && twilioClient){await twilioClient.messages.create({from:process.env.TWILIO_FROM,to:process.env.TWILIO_TO_PREFIX?process.env.TWILIO_TO_PREFIX+contact:'+91'+contact,body:`AgriVision AI OTP: ${otp}. Valid for 5 minutes. Do not share it.`});return {delivered:true,channel:'sms'};}
 if(process.env.NODE_ENV!=='production') return {delivered:false,development:true};
 throw new Error(method==='email'?'Email delivery is not configured.':'SMS delivery is not configured.');
}
