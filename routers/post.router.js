const express = require("express");

const routerPost = express.Router();
const fs = require("fs");

const bodyParser = require("body-parser");
routerPost.use(bodyParser.json());
routerPost.use(bodyParser.urlencoded({ extended: true }));

//lấy dữ liệu toàn bộ user
routerPost.get("/", (req, res) => {
  try {
    let postData = JSON.parse(fs.readFileSync("./api/posts.json"));
    res.json(postData);
  } catch (error) {
    res.json({
      error,
    });
  }
});
//tìm user theo id
routerPost.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    let postData = JSON.parse(fs.readFileSync("./api/posts.json"));
    const fineId = postData.find((post) => post.id === +id);
    if (fineId) {
      res.json(fineId);
    } else {
      res.json({ message: "không tìm thấy" });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

//post
routerPost.post("/", (req, res) => {
  let { title, body } = req.body;

  try {
    let post = {
      id: Math.floor(Math.random() * 100000000),
      title,
      body,
      userId: Math.floor(Math.random() * 100),
    };
    let postData = JSON.parse(fs.readFileSync("./api/posts.json"));
    postData.push(post);
    fs.writeFileSync("./api/posts.json", JSON.stringify(postData));
    res.json({
      message: "post thành công",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

//put user

routerPost.put("/:id", (req, res) => {
  const { id } = req.params;
  let { title, body } = req.body;

  try {
    let postData = JSON.parse(fs.readFileSync("./api/posts.json"));

    let findIndex = postData.findIndex((e, i) => e.id === +id);

    if (findIndex === -1) {
      res.json({
        message: "Question not found",
      });
    } else {
      postData[findIndex] = {
        ...postData[findIndex],
        title,
        body,
      };
      fs.writeFileSync("./api/posts.json", JSON.stringify(postData));
      res.json({
        message: "Question updated successfully",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

//delete user
routerPost.delete("/:id", (req, res) => {
  let { id } = req.params;
  try {
    let postData = JSON.parse(fs.readFileSync("./api/posts.json"));

    let findIndex = postData.findIndex((e, i) => e.id === +id);

    if (findIndex === -1) {
      res.json({
        message: "Question not found",
      });
    } else {
      postData.splice(findIndex, 1);
      fs.writeFileSync("./api/posts.json", JSON.stringify(postData));
      res.json({
        message: "Question deleted successfully",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});
module.exports = routerPost;
