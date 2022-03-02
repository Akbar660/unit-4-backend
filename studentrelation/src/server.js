const app=require("./index")

const connect=require("./configs/db")

app.listen(2346,async ()=> {

    try{
        await connect();
        console.log("listing on port 2346");
    }catch (e){
          console.log(e.message);
    }
})