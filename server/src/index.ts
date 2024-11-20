import express ,{Application,Request,Response} from 'express';
import "dotenv/config";
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app:Application = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');
app.set('views',path.resolve(__dirname,'views'));


app.get('/',(req:Request,res:Response)=>{
    return res.render('welcome');
    // res.send("Hello World");
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});