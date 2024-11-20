import express ,{Application,Request,Response} from 'express';
import "dotenv/config";
import path from 'path';
import {fileURLToPath} from 'url';
import ejs from 'ejs';
import { sendEmail } from './config/mail.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app:Application = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');
app.set('views',path.resolve(__dirname,'views'));


app.get('/',async (req:Request,res:Response)=>{
    const html = await ejs.renderFile(path.resolve(__dirname,'views/emails/welcome.ejs'),{name:"Rahul"});

    // return res.render('emails/welcome',{name:"Rahul"});

    await sendEmail("gefib48763@exoular.com","testing",html)
     res.send("Hello World");
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});