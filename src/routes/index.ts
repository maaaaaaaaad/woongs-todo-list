import { Router } from "express";
import {
  deleteTodo,
  getTodos,
  postTodo,
  updateTodo,
} from "../controllers/todos";

const router: Router = Router();

router.get("/todos", getTodos);
router.post("/post-todo", postTodo);
router.put("/edit-todo/:id", updateTodo);
router.delete("/delete-todo/:id", deleteTodo);

export default router;
