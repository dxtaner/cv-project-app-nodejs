const app = require("./src/app.js");
require("dotenv-safe").config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on the port ${port}`);
});
