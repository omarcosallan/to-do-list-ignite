import { Header } from './components/Header'
import { NewTask } from './components/NewTask';
import { Backpack } from '@phosphor-icons/react';

import { useState } from "react"

import styles from './App.module.css';
import "./global.css";
import { Task } from './components/Task';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const completedTasks = tasks.reduce((acc, task) => (task.isCompleted ? acc + 1 : acc), 0);

  function insertTask(task: Task) {
    setTasks([...tasks, task]);
  }

  function completeTask(taskId: string) {
    const tasksUpdate = tasks.map((task) => {
      if (task.id === taskId) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    })
    setTasks(tasksUpdate);
  }

  function deleteTask(taskId: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskId;
    })
    setTasks(tasksWithoutDeletedOne);
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <NewTask onAddNewTask={insertTask}/>
        <div className={styles.info}>
          <p>Tarefas criadas<span>{tasks.length}</span></p>
          <p>Concluídas
            <span>{tasks.length === 0 ? "0" : `${completedTasks} de ${tasks.length}`}</span>
          </p>
        </div>

        {tasks.length === 0 && 
          <div className={styles.noTasks}>
            <Backpack size={56}/>
            <div>
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </div>
        }

        {tasks.length > 0 &&
          <div className={styles.tasks}>
            {tasks.map(task => {
              return (
                <Task
                  key={task.id} 
                  task={task}
                  onCompleteTask={completeTask}
                  onDeleteTask={deleteTask} 
                />
              )
            })}
          </div>
        }
        
      </div>
    </div>
  )
}

export default App
