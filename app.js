const express = require("express");
const app = express();
const fs = require("fs");

let userRouter = require("./routers/user.router.js");
let postRouter = require("./routers/post.router.js");

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/api/v1/users/:id/posts", (req, res) => {
  const { id } = req.params;
  try {
    let postData = JSON.parse(fs.readFileSync("./api/posts.json"));
    let userData = JSON.parse(fs.readFileSync("./api/users.json"));
    const fineIdposts = userData.find((user) => user.id === +id);
    const find = postData.filter((post) => post.userId === fineIdposts.id);
    if (find) {
      res.json(find);
    } else {
      res.json({ message: "không có thìm thấy bài post" });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

// //lấy dữ liệu toàn bộ user
// app.get("/api/v1/posts", (req, res) => {
//   try {
//     let postData = JSON.parse(fs.readFileSync("./api/posts.json"));
//     res.json(postData);
//   } catch (error) {
//     res.json({
//       error,
//     });
//   }
// });
// //tìm user theo id
// app.get("/api/v1/posts/:id", (req, res) => {
//   const { id } = req.params;
//   try {
//     let postData = JSON.parse(fs.readFileSync("./api/posts.json"));
//     const fineId = postData.find((post) => post.id === +id);
//     if (fineId) {
//       res.json(fineId);
//     } else {
//       res.json({ message: "không tìm thấy" });
//     }
//   } catch (error) {
//     res.json({
//       error,
//     });
//   }
// });

// //post
// app.post("/api/v1/posts", (req, res) => {
//   let { title, body } = req.body;

//   try {
//     let post = {
//       id: Math.floor(Math.random() * 100000000),
//       title,
//       body,
//       userId: Math.floor(Math.random() * 100),
//     };
//     let postData = JSON.parse(fs.readFileSync("./api/posts.json"));
//     postData.push(post);
//     fs.writeFileSync("./api/posts.json", JSON.stringify(postData));
//     res.json({
//       message: "post thành công",
//     });
//   } catch (error) {
//     res.json({
//       error,
//     });
//   }
// });

// //put user

// app.put("/api/v1/posts/:id", (req, res) => {
//   const { id } = req.params;
//   let {  title, body } = req.body;

//   try {
//     let postData = JSON.parse(fs.readFileSync("./api/posts.json"));

//     let findIndex = postData.findIndex((e, i) => e.id === +id);

//     if (findIndex === -1) {
//       res.json({
//         message: "Question not found",
//       });
//     } else {
//         postData[findIndex] = {
//         ...postData[findIndex],
//         title,
//         body
//       };
//       fs.writeFileSync("./api/posts.json", JSON.stringify(postData));
//       res.json({
//         message: "Question updated successfully",
//       });
//     }
//   } catch (error) {
//     res.json({
//       error,
//     });
//   }
// });

// //delete user
// app.delete("/api/v1/posts/:id", (req, res) => {
//   let { id } = req.params;
//   try {
//     let postData = JSON.parse(fs.readFileSync("./api/posts.json"));

//     let findIndex = postData.findIndex((e, i) => e.id === +id);

//     if (findIndex === -1) {
//       res.json({
//         message: "Question not found",
//       });
//     } else {
//         postData.splice(findIndex, 1);
//       fs.writeFileSync("./api/posts.json", JSON.stringify(postData));
//       res.json({
//         message: "Question deleted successfully",
//       });
//     }
//   } catch (error) {
//     res.json({
//       error,
//     });
//   }
// });

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
