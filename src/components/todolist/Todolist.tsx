import { useEffect, useState } from 'react'
import Taskinput from '../Taskinput'
import Tasklist from '../Tasklist'
import styles from './todolist.module.scss'

export interface Todo {
  value: string
  done: boolean
  id: string
}
type HandleNewTodos = (todos: Todo[]) => Todo[]

const syncReactToLocal = (HandleNewTodos: HandleNewTodos) => {
  const todoString = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todoString || '[]')
  const newTodosObj = HandleNewTodos(todosObj)
  const newTodosObjTest = (newTodosObj: Todo[]) => newTodosObj.filter((todo) => todo.value !== '')
  localStorage.setItem('todos', JSON.stringify(newTodosObjTest(newTodosObj)))
}

export default function Todolist() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const todosDone = todos.filter((todo) => todo.done)
  const todosNotDone = todos.filter((todo) => !todo.done)
  // const testTodo = todos.filter((todo) => todo.value !== '' || undefined || null)
  // console.log(testTodo)

  const addTodo = (name: string) => {
    const handler = (todosObj: Todo[]) => [...todosObj, Todo]
    const Todo: Todo = {
      value: name,
      done: false,
      id: new Date().toISOString()
    }
    if (Todo.value === '' || null || undefined) return
    // setTodos((prevState) => [...prevState, Todo])
    setTodos((prev) => handler(prev))
    syncReactToLocal(handler)
  }
  const handleChangeCheck = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          // console.log(todo.id, 'id' + id)
          return { ...todo, done: event.target.checked }
        }
        return todo
      })
    })
  }
  // const handleChangeCheck = (id: string, done: boolean) => {
  //   setTodos((prev) => {
  //     return prev.map((todo) => {
  //       if (todo.id === id) {
  //         console.log(todo.id, 'id' + id)
  //         return { ...todo, done }
  //       }
  //       return todo
  //     })
  //   })
  // }
  const handleEdit = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    const currentTodo = todos.find((todo) => todo.id === id)
    if (currentTodo) setCurrentTodo(currentTodo)
    // console.log(currentTodo)
  }
  const editTodo = (value: string) => {
    setCurrentTodo((prev) => {
      if (prev) {
        return { ...prev, value }
      }
      return null
    })
  }

  const finishEdit = (Currenttodo: Todo) => {
    const handler = (todosObj: Todo[]) => {
      // console.log('set todos in finishEdit')
      return todosObj.map((todo) => {
        if (todo.id === Currenttodo.id) {
          // console.log(todo)
          return Currenttodo as Todo
        }
        return todo
      })
    }
    console.log(Currenttodo)
    // setTodos((prev) => {
    //   console.log('set todos in finishEdit')
    //   return prev.map((todo) => {
    //     if (todo.id === Currenttodo.id) {
    //       // console.log(todo)
    //       return Currenttodo as Todo
    //     }
    //     return todo
    //   })
    // })
    setTodos((prev) => handler(prev))
    setCurrentTodo(null)
    setTodos((prev) => prev.filter((todo) => todo.value !== ''))
    // console.log('finish edit')
    syncReactToLocal(handler)
  }
  // const finishEdit = () => {
  //   setTodos((prev) => {
  //     return prev.map((todo) => {
  //       if (todo.id === (currentTodo as Todo).id) {
  //         return currentTodo as Todo
  //       }
  //       return todo
  //     })
  //   })
  //   setCurrentTodo(null)
  //   console.log('finish edit')
  // }
  // useEffect(() => {
  //   console.log('state updated')
  // }, [todos])
  const handleX = (id: string) => {
    const handler = (todosObj: Todo[]) => {
      return todosObj.filter((todo) => todo.id !== id)
    }
    // setTodos((prev) => {
    //   console.log('delete')
    //   return prev.filter((todo) => todo.id !== id)
    // })
    setTodos((prev) => handler(prev))
    syncReactToLocal(handler)
  }

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    setTodos(todosObj)
  }, [])
  return (
    <div className={styles.todolist}>
      <div className={styles.container}>
        <Taskinput currentTodo={currentTodo} addTodo={addTodo} editTodo={editTodo} finishEdit={finishEdit} />
        <Tasklist
          Todos={todosNotDone}
          handleChangeCheck={handleChangeCheck}
          handleEdit={handleEdit}
          handleX={handleX}
        />
        <Tasklist
          Todos={todosDone}
          donetasklist
          handleChangeCheck={handleChangeCheck}
          handleEdit={handleEdit}
          handleX={handleX}
        />
      </div>
    </div>
  )
}
