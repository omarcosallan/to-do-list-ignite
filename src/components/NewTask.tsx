import { ChangeEvent, FormEvent, useState } from 'react';
import { PlusCircle } from '@phosphor-icons/react';

import { v4 as uuidv4 } from 'uuid';

import styles from "./NewTask.module.css"
import { Task } from './Task';

interface NewTaskProps {
  onAddNewTask: (task: Task) => void;
}

export function NewTask({onAddNewTask}: NewTaskProps) {
  const [newTaskText, setNewTaskText] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    const task = { 
      id: uuidv4(),
      content: newTaskText,
      isCompleted: false
    };
    onAddNewTask(task);
    setNewTaskText("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  const isNewPostEmpty = newTaskText.length === 0;
  
  return (
    <form onSubmit={handleCreateNewTask} className={styles.newTask}>
      <input 
        type="text"
        name="task"
        placeholder='Adicione uma nova tarefa'
        value={newTaskText}
        onChange={handleNewTaskChange}
        required
      />
      <button type="submit" disabled={isNewPostEmpty}>
        Criar
        <PlusCircle size={20} />
      </button>
    </form>
  )
}