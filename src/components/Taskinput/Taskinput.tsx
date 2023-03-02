import { useState } from 'react'
import { Todo } from '../todolist/Todolist'
import styles from './Taskinput.module.scss'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (value: string) => void
  // finishEdit: () => void

  finishEdit: (Currenttodo: Todo) => void
}
// ➕ , ✔️
export default function Taskinput(props: TaskInputProps) {
  const { currentTodo, addTodo, editTodo, finishEdit } = props
  const [content, setContent] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTodo) {
      editTodo(event.target.value)
    }
    // console.log('dang onchange input ne')
    setContent(event.target.value)
    // console.log(content)
  }
  const onChangeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      console.log('chang submit')
      // console.log(finishEdit)
      // finishEdit()
      finishEdit(currentTodo)
      if (content) {
        setContent('')
      }
    } else {
      addTodo(content)
      setContent('')
    }
  }
  return (
    <div>
      <h1 className={styles.title}>To do list</h1>
      <form className={styles.form} onSubmit={onChangeSubmit}>
        <input
          type='text'
          value={currentTodo ? currentTodo.value : content}
          placeholder='caption goes here'
          onChange={handleChange}
        />
        <button type='submit'>➕</button>
      </form>
    </div>
  )
}
