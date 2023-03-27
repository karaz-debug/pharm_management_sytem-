const express = require('express');
const app = express();
const cors = require('cors');

const adminRoutes = require('./routes/admin');
const monitorRoutes = require('./routes/monitor');


app.use(express.json({ extended: false }));
app.use(cors());



app.use('/admin', adminRoutes);
app.use('/monitor', monitorRoutes);

module.exports = app;

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const jwt = require('jsonwebtoken');

// const adminRoutes = require('./routes/admin');
// const doctorRoutes = require('./routes/doctor');
// const monitorRoutes = require('./routes/monitor');

// app.use(express.json());
// app.use(cors());


// // const authenticateJWT = (req, res, next) => {
// //     const authHeader = req.headers.authorization;
// //     if (authHeader) {
// //         const token = authHeader.split(' ')[1];
// //         let secretKey = "165371566132632461543261543516426184721abghdghjsvdbn"
// //         jwt.verify(token, secretKey, (err, decodedToken) => {
// //             if (err) {
// //                 return res.sendStatus(401);
// //             }
// //             req.user = decodedToken;
// //             next();
// //         });
// //     } else {
// //         res.sendStatus(401);
// //     }
// // };

// // const checkRole = (allowedRoles) => (req, res, next) => {
// //     console.log(req.user)
// //     if (!req.user || !allowedRoles.includes(req.user.role)) {
// //         return res.sendStatus(403);
// //     }
// //     next();
// // };

// app.use('/admin', authenticateJWT, checkRole(['admin']), adminRoutes);
// // app.use('/doctor', authenticateJWT, checkRole(['admin', 'doctor']));
// app.use('/monitor', authenticateJWT, checkRole(['admin', 'monitor']), monitorRoutes);

// module.exports = app;


