import * as express from 'express';
const app = express();

app.get('/',(req: express.Request,res: express.Response) =>{
    res.status(200).send('It works')
}) 

app.listen(4000,() => {
    console.log('Server running on localhost:4000')
})
