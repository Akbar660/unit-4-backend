

const app=require("./index")

const connect=require("./configs/db")

app.listen(2348,async ()=> {

    try{
        await connect();
        console.log("listing on port 2348");
    }catch (e){
          console.log(e.message);
    }
})