const express = require("express");
const PORT = 3000;

router = require('./src/routes')

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(router)

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
