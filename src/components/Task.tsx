import { Trash, CheckCircle, Circle } from '@phosphor-icons/react';
import styles from "./Task.module.css"

export interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

interface TaskProps {
  task: Task;
  onCompleteTask: (value: string) => void;
  onDeleteTask: (value: string) => void;
}

export function Task({task, onCompleteTask, onDeleteTask}: TaskProps) {
  function handleCompleteTask() {
    onCompleteTask(task.id);
  }

  function handleDeleteTask() {
    onDeleteTask(task.id);
  }

  return (
    <div className={styles.task}>
      <button onClick={handleCompleteTask} >
        {task.isCompleted && <CheckCircle size={20} className={styles.checked} /> }
        {!task.isCompleted && <Circle size={20} className={styles.unchecked} /> }
      </button>
      <p className={task.isCompleted ? styles.through : ""}>{task.content}</p>
      <button onClick={handleDeleteTask} className={styles.delete}>
        <Trash size={20}  />
      </button>
    </div>
  )
}