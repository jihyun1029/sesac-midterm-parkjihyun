const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");
const authenticateToken = require("../middleware/authenticate");
const { signUpValidator, loginValidator, handleValidationResult } = require("../middleware/validation");

const router = express.Router();
const SECRET_KEY = "sessac";

// 회원가입
router.post("/auth/signup", signUpValidator, handleValidationResult, async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) return next(new Error("ExistEmail"));

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: { email, password: hashedPassword, username },
    });

    return res.status(201).json({ userId });
  } catch (e) {
    return next(new Error("DataBaseError"));
  }
});

// 로그인
router.post("/auth/login", loginValidator, handleValidationResult, async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return next(new Error("UserNotFound"));

    const match = await bcrypt.compare(password, user.password);
    if (!match) return next(new Error("PasswordError"));

    const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: "12h" });
    return res.status(200).json({ token });
  } catch (e) {
    return next(new Error("DataBaseError"));
  }
});

// 인증된 유저 정보 확인
router.get("/user", authenticateToken, (req, res) => {
  return res.status(200).json({ userId: req.user });
});

module.exports = router;