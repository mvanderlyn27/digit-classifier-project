const express = require('express');
var cors = require('cors');
var fs = require('fs');
var fileupload = require("express-fileupload");

const app = express()
const port = 3000
app.use(cors());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: './images/normal'
}));
app.use(express.static('images'));

app.post('/single-file', (req,res) => {
    var spawn = require("child_process").spawn; 
     fs.rename(req.files.file.tempFilePath,req.files.file.tempFilePath+'.png',function(err){if(err){res.status(500).send(err)}})
    var process = spawn('python',["./predictImage.py", 
                            ''+(req.files.file.tempFilePath+'.png').replace('images\\normal\\','')] ); 
    process.stdout.on('data', function(data) { 
        res.send(JSON.parse(data));
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))