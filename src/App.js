import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import React, {useMemo,useCallback ,useReducer, useRef } from 'react';

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

//reducer 함수
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


//-0-
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
        id: idref.current,
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

  const memoizedDispatches = useMemo(()=>{
    return {onCreate, onUpdate, onDelete};
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
        

    </div>
    );
}

export default App;
