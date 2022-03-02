const app = require("./index");
const connect = require("./configs/db");

app.listen(2365, async function () {
  try {
    await connect();
    console.log("listening on port 2365");
  } catch (err) {
    console.log(err);
  }
});
