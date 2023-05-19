const express = require("express");

const routerUser = express.Router()
const fs = require("fs");

const bodyParser = require("body-parser");
routerUser.use(bodyParser.json());
routerUser.use(bodyParser.urlencoded({ extended: true }));

//lấy dữ liệu toàn bộ user
routerUser.get("/", (req, res) => {
   
    try {
      let data = JSON.parse(fs.readFileSync("./api/users.json"));
      res.json(data);
    } catch (error) {
      res.json({
        error,
      });
    }
  });
  //tìm user theo id
  routerUser.get("/:id", (req, res) => {
    const { id } = req.params;
    try {
      let data = JSON.parse(fs.readFileSync("./api/users.json"));
      const fineId = data.find((user) => user.id === +id);
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
  routerUser.post("/", (req, res) => {
    let { name, username, email } = req.body;
    try {
      let question = {
        id: Math.floor(Math.random() * 1000000000),
        name,
        username,
        email,
      };
      let dataUser = JSON.parse(fs.readFileSync("./api/users.json"));
      dataUser.push(question);
      console.log(question);
      fs.writeFileSync("./api/users.json", JSON.stringify(dataUser));
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
  
  routerUser.put("/:id", (req, res) => {
    
    const { id } = req.params;
    let { name, username, email } = req.body;
  
    try {
      let dataUser = JSON.parse(fs.readFileSync("./api/users.json"));
  
      let findIndex = dataUser.findIndex((e, i) => e.id === +id);
  
      if (findIndex === -1) {
        res.json({
          message: "Question not found",
        });
      } else {
        dataUser[findIndex] = {
          ...dataUser[findIndex],
          name,
          username,
          email,
        };
        fs.writeFileSync("./api/users.json", JSON.stringify(dataUser));
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
  routerUser.delete("/:id", (req, res) => {
      let { id } = req.params;
      try {
        let dataUser = JSON.parse(fs.readFileSync("./api/users.json"));
    
        let findIndex = dataUser.findIndex((e, i) => e.id === +id);
    
        if (findIndex === -1) {
          res.json({
            message: "Question not found",
          });
        } else {
          dataUser.splice(findIndex, 1);
          fs.writeFileSync("./api/users.json", JSON.stringify(dataUser));
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

    module.exports = routerUser;