const PORT = process.env.PORT || 3000;
const express = require('express');
const host = require('./Objects/host');
const student = require('./Objects/student');
const event = require('./Objects/event');
const tag = require('./Objects/tag');
const verify = require('./utils/verify');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: './config/.env' });

//Start Server
const server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

mongoose.connect(process.env.DATABASE_ACCESS)

let newStudent = {
    username: "test1",
    email: "test@mail.net",
    password: "testPassword",
    fullName: {
        firstName: "First",
        lastName: "Last"
    },
    birthDate: new Date(2002, 6, 11),
    gender: "Male"
};

let newHost = {
    email: "testhost@mail.net",
    hostEmail: "testhost@mail.net",
    password: "testPassword",
    hostName: "hostNameTest",
    description: "descriptionTest",
    phoneNumber: "+1 (999) 1234 567",
    website: "www.host.com",
    tags: []
};

io.on('connection', (socket) => {
    socket.on('verifyEmail', (request, callback) => {
        verify.checkEmailExists(request.email, (check) => {
            if (check) {
                callback({ err: 'Email exists' }, null);
                return;
            }

            callback(null, { res: 'Email does not exist' });
        });
    });

    socket.on('login', async (request, callback) => {
        let isStudentLogin = await student.isStudentLogin(request);
        let isHostLogin = await host.isHostLogin(request);

        if (isStudentLogin) {
            student.studentLogin(request, (err, res) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, res);
            });
        } else if (isHostLogin) {
            host.hostLogin(request, (err, res) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, res);
            });
        } else {
            callback({ err: "INCORRECT_EMAIL" }, null);
        }
    });

    socket.on('verifyToken', (request, callback) => {
        try {
            let decoded = jwt.verify(request.token, process.env.APP_SECRET);
            decoded.iat = undefined;
            decoded.exp = undefined;
            callback(null, { email: decoded.email, id: decoded.id, signInType: decoded.signInType });
        } catch (err) {
            callback(err, null);
        }
    });

    socket.on('getTags', (request, callback) => {
        tag.getTags((err, res) => {
            if(err) {
                callback(err, null);
                return;
            }

            for(let i = 0; i < res.length; i++) {
                res[i].metadata = undefined;
                res[i].events = undefined;
                res[i].hosts = undefined;
            }

            callback(null, res);
        })
    });

    socket.on('getEvents', (request, callback) => {
        student.retreiveStudentInfo(request.sid, (err, res1) => {
            if(err) {
                callback(err, null);
                return;
            }
            event.getEvents((err, res) => {
                if(err) {
                    callback(err, null);
                    return;
                }

                let arr = [];
                for(let i = 0; i < res.length; i++) {
                    if(res1.interestedEvents.filter(item => item._id.equals(res[i]._id)).length === 0 && res1.confirmedEvents.filter(item => item._id.equals(res[i]._id)).length === 0) {
                        res[i].metadata = undefined;
                        res[i].confirmedStudents = undefined;
                        res[i].interestedStudents = undefined;
                        arr.push(res[i]);
                    }
                }
    
                callback(null, arr);
            });
        });
    });

    studentListeners(socket);
    hostListeners(socket);
});

//Possible other events for students:
//Retreive list of interested and confirmed events
//Retreive list of hosts
var studentListeners = (socket) => {
    socket.on('studentSignup', (request, callback) => {
        student.studentSignup(request, (err, ret) => {
            if (err) {
                if(callback) {callback(err, null)};
                return;
            }

            if(callback) {callback(null, { id: ret._id, email: ret.token.email, token: ret.token.token, signInType: 'STUDENT' })};
        });
    });

    socket.on('getStudentEvents', (request, callback) => {
        student.retreiveStudentInfo(request.sid, (err, res) => {
            if (err) {
                if(callback) {callback(err, null)};
                return;
            }
        
            for(let i = 0; i < res.confirmedEvents.length; i++) {
                res.confirmedEvents[i].metadata = undefined;
                res.confirmedEvents[i].confirmedStudents = undefined;
                res.confirmedEvents[i].interestedStudents = undefined;
            }

            for(let i = 0; i < res.interestedEvents.length; i++) {
                res.interestedEvents[i].metadata = undefined;
                res.interestedEvents[i].confirmedStudents = undefined;
                res.interestedEvents[i].interestedStudents = undefined;
            }
    
            if(callback) {callback(null, {confirmedEvents: res.confirmedEvents, interestedEvents: res.interestedEvents})}
        })

    });

    socket.on('addInterestedEvent', (request, callback) => {
        student.addInterestedEvent(request.uid, request.eid, (err, ret) => {
            if (err) {
                if(callback) {callback(err, null)};
                return;
            }

            if(callback) {callback(null, ret)};
        });
    });

    socket.on('addConfirmedEvent', (request, callback) => {
        student.addConfirmedEvent(request.uid, request.eid, (err, ret) => {
            if (err) {
                if(callback) {callback(err, null)};
                return;
            }

            if(callback) {callback(null, ret)};
        });
    });

    socket.on('removeInterestedEvent', (request, callback) => {
        student.removeInterestedEvent(request.uid, request.eid, (err, ret) => {
            if (err) {
                if(callback) {callback(err, null)};
                return;
            }

            if(callback) {callback(null, ret)};
        });
    });

    socket.on('removeConfirmedEvent', (request, callback) => {
        student.removeConfirmedEvent(request.uid, request.eid, (err, ret) => {
            if (err) {
                if(callback) {callback(err, null)};
                return;
            }

            if(callback) {callback(null, ret)};
        });
    });

    socket.on('followHost', (request, callback) => {
        student.followHost(request.uid, request.eid, (err, ret) => {
            if (err) {
                if(callback) {callback(err, null)};
                return;
            }

            if(callback) {callback(null, ret)};
        });
    });

    socket.on('unfollowHost', (request, callback) => {
        student.unfollowHost(request.uid, request.eid, (err, ret) => {
            if (err) {
                if(callback) {callback(err, null)};
                return;
            }

            if(callback) {callback(null, ret)};
        });
    });
};

//Possible events to listen for in hosts:
//Retreive list of events
var hostListeners = (socket) => {
    socket.on('hostSignup', (request, callback) => {
        host.hostSignup(request.newHost, (err, ret) => {
            if (err) {
                if(callback) {callback(err, null)};
                return;
            }

            if(callback) {callback(null, { id: ret._id, email: ret.token.email, token: ret.token.token, signInType: 'HOST' })};
        });
    });

    socket.on('createEventHost', (request, callback) => {
        host.createEventHost(request.hid, request.newEvent, (err, ret) => {
            if (err) {
                if(callback) {callback(err, null)};
                return;
            }
            if(callback) {callback(null, ret)};
        });
    });

    socket.on('updateEventHost', (request, callback) => {
        //Implement Later
    });

    socket.on('deleteEventHost', (request, callback) => {
        host.deleteEventHost(request.hid, request.eid, (err, ret) => {
            if (err) {
                if(callback) {callback(err, null)};
                return;
            }

            if(callback) {callback(null, ret)};
        });
    });
};