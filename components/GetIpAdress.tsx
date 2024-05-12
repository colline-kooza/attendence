import React from 'react'

// pages/api/getIpAddress.js

export default function handler(req:any, res:any) {
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.status(200).json({ ipAddress });
    console.log('IP Address:', ipAddress);
    console.log(ipAddress)
  }
  
