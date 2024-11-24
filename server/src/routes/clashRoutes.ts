


import { Router ,Request,Response} from "express";

const router = Router()

router.post('/' , async (req:Request,res:Response) => {
    res.send('Hello World')


    try{

    }catch(err){
        console.log(err)
        
    }
})










export default router;  