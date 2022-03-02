

const app=require("./index")

const connect=require("./configs/db")

app.listen(2349,async ()=> {

    try{
        await connect();
        console.log("listing on port 2349");
    }catch (e){
          console.log(e.message);
    }
})