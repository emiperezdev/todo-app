import Joi from "joi";
import TaskEntity from "../entities/task.entity";

const createTaskSchema = (task: TaskEntity) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(task)
};

export default createTaskSchema