const app = require("./app");

const express = require('express');

// const allowedOrigin = 'https://main--graceful-pika-a0b2f8.netlify.app';

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
