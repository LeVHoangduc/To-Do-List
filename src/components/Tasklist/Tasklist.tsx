import styles from './Tasklist.module.scss'

import React from 'react'
import { Todo } from '../todolist/Todolist'

interface tasklistProps {
  donetasklist?: boolean
  Todos: Todo[]
  handleChangeCheck: (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
  // handleChangeCheck: (id: string, done: boolean) => void
  // handleChangeCheck: (id: string, done: boolean) => void
  handleEdit: (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => void
  handleX: (id: string) => void
}
export default function Tasklist(props: tasklistProps) {
  const { donetasklist, Todos, handleChangeCheck, handleEdit, handleX } = props
  // const onChangeCheckbox = (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //   handleChangeCheck(idTodo, event.target.checked)
  // }
  const ChangehandleX = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event)
    handleX(id)
  }
  return (
    <div>
      <h2 className={styles.title}>{donetasklist ? 'Complete' : 'Incomplete'}</h2>
      <div className={styles.tasks}>
        {Todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              className={styles.taskCheckBox}
              checked={todo.done}
              onChange={handleChangeCheck(todo.id)}
              // onChange={onChangeCheckbox(todo.id)}
            />
            <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.value}</span>
            <div className={styles.taskAction}>
              <button className={styles.taskBTN} onClick={handleEdit(todo.id)}>
                ✎
              </button>
              <button className={styles.taskBTN} onClick={ChangehandleX(todo.id)}>
                🗑
              </button>
            </div>
          </div>
        ))}
        {/* <div className={styles.task}>s
          <input type='checkbox' className={styles.taskCheckBox} />
          <span className={`${styles.taskName} ${styles.taskNameDone}`}>Hoc bai</span>
          <div className={styles.taskAction}>
            <button className={styles.taskBTN}>✎</button>
            <button className={styles.taskBTN}>🗑</button>
          </div>
        </div> */}
      </div>
    </div>
  )
}
