import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import { useReducer, useRef } from 'react';
import TestComp from './component/TestComp';
import { useCallback } from 'react';


function reducer(state, action) {
  switch(action.type){
    case "CREATE": {
      return [action.newItem, ...state];
    }
    case "UPDATE": {
      return state.map((it) =>
      it.id === action.targetId
      ? {
        ...it,
        isDone: !it.isDone,
        key : it.id
        }
      :it
      );
    }
    case "DELETE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    default:
      return state;
  }
}
function App() {
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
const [todo, dispatch] = useReducer(reducer, mockTodo);
const idref = useRef(3);

   
//Create추가
  const onCreate = (content) => { 
    dispatch({
      type: "CREATE",
      newItem : {
        id: idref.cureent,
        content,
        isDone : false,
        createdDate: new Date().getTime(),
      },
    });
  idref.current += 1;
  };

  //Update업데이트
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId,
    });
  },[]);

  //Delete삭제
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  },[]);

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
