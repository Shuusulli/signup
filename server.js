const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { sendFile } = require('express/lib/response');



const port = porcess.env.PORT;
const app = express();

app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'))


app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html')

})

app.post('/', (req, res) => {

    let firstName = req.body.firstName;

    let lastName = req.body.lastName;

    let email = req.body.email;




    var data = {
        members:[
            {
                email_address:email,
                status: 'subscribed',
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }


    var jsonData = JSON.stringify(data)

    const url = 'https://us14.api.mailchimp.com/3.0/lists/0389cd9d66';

    const options = {
        method : 'POST',
        auth: 'sulli:8470660c5910000e19310e58a875f8ec-us14'
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode ===200){
            res.sendFile(__dirname + '/success.html')
        }else{
            res.sendFile(__dirname + '/failure.html')
        }

        response.on('data' ,function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.listen(port || 3000, function () {
    console.log(`server runing on port ${port}`)
})


//api key 8470660c5910000e19310e58a875f8ec-us14

//id 0389cd9d66