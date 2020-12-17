import * as express from 'express';
import Result from "./Result"
import FileComparator from "./FileComparator"
import * as fs from 'fs';
import MyFile from "../src/MyFile";
import ProgramComparator from "../src/ProgramComparator"
const app = express();




/*

app.get('/',(req: express.Request,res: express.Response) =>{
    let program1 = fs.readFileSync("src\\program1.js")
    let program2 = fs.readFileSync("src\\program2.js")
    let fc = new FileComparator() 

    fc.build(program1, program2, 10, 10)
    Result.addMatchesToJSON()
}) 
*/

app.get('/', (req: express.Request, res: express.Response) => {
    //res.status(200).send("this works"); 
    let p1 = fs.readFileSync("src\\diff1.js")
    let p2 = fs.readFileSync("src\\diff2.js")
    let program1 = new MyFile("program1",p1,'person1')
    let program2 = new MyFile("program2",p2,'person2')
    let fc = new FileComparator() 
    let pc = new ProgramComparator([program1],[program2])
    pc.compareall(6,6)
    //fc.build(program1, program2, 125, 125)
    //console.log(Result.matches)
   
    res.status(200).send(Result.matchesJSON);
})



app.listen(4000,() => {
    console.log('Server running on localhost:4000')
})
