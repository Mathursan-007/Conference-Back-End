const Express = require('express');
const cors = require('cors');
const path = require('path')

const AdminRoutes = require('./routes/admin.router');
const EditorRoutes = require('./routes/editor.router');
const ReviewerRoutes = require('./routes/reviewer.router');
const UserRoutes = require('./routes/user.router');


require('./dal/connection');

const app = new Express();

const whitelist = ['http://localhost:1234','https://task-track-frontend.herokuapp.com']
const corsOptions = {
    origin: function (origin, callback) {
        console.log("** Origin of request " + origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Origin acceptable")
            callback(null, true)
        } else {
            console.log("Origin rejected")
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))


app.use(Express.json());

app.use("/admin",AdminRoutes);
app.use("/editor",EditorRoutes);
app.use("/reviewer",ReviewerRoutes);
app.use("/user",UserRoutes);


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(Express.static(path.join(__dirname, 'conference-front-end/build')));
// Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'conference-front-end/build', 'index.html'));
    });
}



const port = process.env.PORT || 5000;


app.listen(port, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Backend Service is running on port '+port);
});

