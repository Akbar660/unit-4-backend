

const app=require("./index")

const connect=require("./configs/db")

app.listen(2355,async ()=> {

    try{
        await connect();
        console.log("listing on port 2355");
    }catch (e){
          console.log(e.message);
    }
})