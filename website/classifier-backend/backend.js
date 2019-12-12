const express = require('express')
const app = express()
const port = 3000

app.post('/single-file',(req,res) =>{
res.send("single file");

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))