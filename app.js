// const express = require("express");
// const Book = require("./Model/bookdb");
// const router = require("./Route/bookroute");
// const ejs = require("ejs")
// const path = require("path");
// const port = process.env.PORT||4500;
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.set("view engine",ejs);
// app.set("views", path.join(__dirname, "views"));
// app.use('/',router);


// app.listen(port,()=>{
//     console.log(`Server is running at port ${port}`);
// })
const express = require("express");
const Book = require("./Model/bookdb");
const router = require("./Route/bookroute");
const ejs = require("ejs");
const path = require("path"); // Import path module to set the views directory path
const port = process.env.PORT || 4500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Set the view engine to EJS
app.set("view engine", "ejs");

app.use(express.static("public"));

// Use the book route
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
