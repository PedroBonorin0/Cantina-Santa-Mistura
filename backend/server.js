const express= require('express');
const cors = require('cors');
const app = express();

var corsOptions = {
  origin: "http://localhost:8000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require("./routes/produto.routes.js")(app);
require("./routes/cliente.routes.js")(app);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});