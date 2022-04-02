const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');

const imageSavePath = 'images/';

const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, imageSavePath)
    },
    filename(req, file, callback){
        callback(null, file.originalname)
    }
});

const upload = multer({storage : storage}).single('files');

const app = express();

dotenv.config();

app.use(cors());
app.use('/images',express.static('images'));

app.get('/api/get-image-list',(req, res)=>{
    const fs = require('fs');
    fs.readdir('./images', (err, files) =>{
        return res.json({success : true, files : files});
    })
});

app.post('/api/image-upload/',async (req, res) =>{
    await upload(req, res, (err)=>{
        if(err){
            return req.json({success : false, err});
        }
        return res.json({
            success : true,
            filePath : res.req.file.path,
            fileName : res.req.file.filename,
        });
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`server is listening at Port=${PORT}`);
})