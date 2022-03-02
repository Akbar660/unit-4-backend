
const app=require("./index")

const connect=require("./configs/db");

app.listen(2347,async()=>{

try{
    await connect();
    console.log("listing to server 2347");
}catch (e){
    console.log(e.message);
}

})