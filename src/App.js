import userEvent from '@testing-library/user-event';
import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import { useState,useRef } from 'react';
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

  return (
    <div className="App">
      <Header />
      <TodoEditor onCreate={onCreate}/>
      <TodoList todo={todo}/>
    </div>
    );
}

export default App;
