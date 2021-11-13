const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const path = require('path')
const app = express()
const port = 80

// enable files upload
app.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 256 * 1024 * 1024 * 1024 //256MB max file(s) size
    },
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get('/upload-toolbox-asset', (req, res) => {
    res.send(`<form action="/upload-toolbox-asset-internal" method="POST" enctype="multipart/form-data">
    <input type="file" id="avatar" name="avatar">
    <input type="submit">
  </form>`);
});

app.get('/upload-custom-asset', (req, res) => {
    res.send(`<form action="/upload-custom-asset-internal" method="POST" enctype="multipart/form-data">
    <input type="file" id="avatar" name="avatar">
    <input type="submit">
  </form>`);
});

// ./www/IDE/toolbox-assets
app.post('/upload-toolbox-asset-internal', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            if (a.split(".")[1] === "rbxm") {
            avatar.mv('./www/IDE/toolbox-assets' + avatar.name);
            } else {
                res.status(500).send(err);
            }
            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// www/custom-asset
app.post('/upload-custom-asset-internal', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            let assetid = `${Math.floor(Math.random() * 10000)}${Math.floor(Math.random() * 10000)}${Math.floor(Math.random() * 10000)}`
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./www/custom-asset/' + assetid);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    idKeepMe: assetid,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


app.use('/', express.static(path.join(__dirname, 'www/')))

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);
