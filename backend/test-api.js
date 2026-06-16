const http = require('http');

const loginData = JSON.stringify({ email: "m.rodriguez@zeecare.com", password: "Demo@123" });

const req1 = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/v1/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(loginData)
  }
}, res1 => {
  let body1 = '';
  res1.on('data', d => body1 += d);
  res1.on('end', () => {
    console.log("Login Status:", res1.statusCode);
    const cookies = res1.headers['set-cookie'];
    if(!cookies) return console.error("No cookies!");
    
    const req2 = http.request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/v1/dashboard/doctor/appointments',
      method: 'GET',
      headers: {
        'Cookie': cookies[0]
      }
    }, res2 => {
      let body2 = '';
      res2.on('data', d => body2 += d);
      res2.on('end', () => {
        console.log("Appointments Status:", res2.statusCode);
        console.log("Appointments Response length:", body2.length);
      });
    });
    req2.end();
  });
});
req1.write(loginData);
req1.end();
