import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';
import jwt from "jsonwebtoken";

const router = express.Router();
const prisma = new PrismaClient();

// 할 일 생성
router.post('/todos', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id; // JWT 토큰에서 추출된 사용자 ID

    // 제목 필수 값 체크
    if (!title) {
      return res.status(400).json({
        message: '제목은 필수 입력값입니다.'
      });
    }

    // 새로운 할 일 생성
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId
      }
    });

    return res.status(201).json({
      todoId: todo.id
    });

  } catch (error) {
    console.error('할 일 생성 중 오류 발생:', error);
    return res.status(500).json({
      message: '서버 오류가 발생했습니다.'
    });
  }
});

router.get('/todos', authenticateToken, async (req, res, next) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userEmail = decoded.email;

    const user = users.find(u => u.email === userEmail);
    if (!user) {
      return res.status(401).json({ message: "유효하지 않은 사용자입니다." });
    }

    
    const userTodos = todos
      .filter(todo => todo.email === userEmail)
      .map(todo => ({
        todoId: todo.id,
        title: todo.title,
        description: todo.description,
        isCompleted: todo.isCompleted,
        createdAt: todo.createdAt || new Date().toISOString(),
        updatedAt: todo.updatedAt || new Date().toISOString()
      }));

    res.status(200).json(userTodos);
  } catch (e) {
    return next(new Error("DataBaseError"));
  }
})

module.exports = router;