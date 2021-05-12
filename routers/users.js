const express = require("express");
const router = express.Router();
const Users = require("../schemas/users");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

router.post("/signUp", async (req, res) => {
  const { names, nickname, password, profileImage } = req.body;

  await Users.create({
    names,
    nickname,
    profileImage,
    password: bcrypt.hashSync(password, 10),
  });

  console.log("회원가입 완료");
});

const postAuthSchema = Joi.object({
  nickname: Joi.string().required(),
  password: Joi.string().required(),
});

router.post("/auth", async (req, res) => {
  try {
    const { nickname, password } = await postAuthSchema.validateAsync(req.body);

    const authFind = await Users.findOne({ nickname });

    if (!authFind) {
      res.status(401).send({
        errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
      });
      return;
    }

    const same = bcrypt.compareSync(password, authFind.password);

    if (!same) {
      res.status(401).send({
        errorMessage: "인증이 잘못되었습니다.",
      });
    }

    const token = jwt.sign({ userId: authFind.userId }, "junhee916");
 
    res.status(201).send({ token: token, })
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errorMessage: "요청하 데이터 형식이 올바르지 않습니다.",
    });
  }

});

module.exports = router;
