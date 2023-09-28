import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import { useState,useRef } from 'react';
import TestComp from './component/TestComp';
function App() {

  const idref = useRef(3);
  const mockTodo = [
    {
      id : 1,
      content : "content1",
      isDone: false,
      createdDate: new Date().getTime()
    },
    {
      id : 2,
      content : "content2",
      isDone: false,
      createdDate: new Date().getTime()
    }
  ]; 
  const [todo, setTodo] = useState(mockTodo);
  

   
// 할 일 목록에 추가
  const onCreate = (content) => { 
    const newItem ={
      id : idref.current,
      content,
      isDone: false,
      createdDate: new Date().getTime(),
    };
    setTodo([newItem,...todo]);
    idref.current += 1;
  };

  //업데이트
  const onUpdate = (targetId) => {
    setTodo(
      todo.map((it)=>
      it.id === targetId ? {...it, isDone: !it.isDone} : it
      )
    );
  };

  //삭제
  const onDelete = (targetId) => {
    setTodo(todo.filter((it)=>it.id !== targetId));
  };

  return (
    <div className="App">
      <TestComp />
      <Header />
      <TodoEditor onCreate={onCreate}/>
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
    );
}

export default App;
