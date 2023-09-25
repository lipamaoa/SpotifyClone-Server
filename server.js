const express = require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const spotifyWebApi = require('spotify-web-api-node');

const app=express();
app.use(cors());
app.use(bodyParser.json());

app.post('/login',(req, res) => {
    const code=req.body.code;
    const spotifyApi=new spotifyWebApi({
        redirectUri: 'http://localhost:5173',
        clientId: '6ac1e61062d440d0831cc707db81649b',
        clientSecret: 'a3cffc78283b4f4882e5ac7f9589c518',
})
spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
    })
}).catch(err => {
    console.log('this is the error', err);
    res.sendStatus(400)
});
});

app.listen(5174, () => {
    
});