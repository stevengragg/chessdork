
import { WebApp } from "meteor/webapp"
import bodyParser from "body-parser"
import router from "router"
WebApp.connectHandlers.use(bodyParser.urlencoded({ extended: true }))
WebApp.connectHandlers.use('/hello', bodyParser.json());
const endpoint = router()

endpoint.post("/hello", (req, res) => {

    console.log(req.body)
    res.writeHead(200)
    res.end()
    process.env.MAIL_URL="smtps://gabceboli%40gmail.com:Cordero1991@smtp.gmail.com:465/";


    Email.send({ to:"gabceboli@gmail.com", from:"gabceboli@gmail.com", subject:`New lead: ${req.body.lead_id}`, text :req.body.user_column_data});

})

WebApp.connectHandlers.use(endpoint)


