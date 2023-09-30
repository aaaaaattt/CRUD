import "./TodoEditor.css";
import {useContext, useState,useRef } from "react";
import { TodoContext } from "../App";
import { TodoDispatchContext } from "../App";

    const TodoEditor= () => {

    const {onCreate} = useContext(TodoDispatchContext);

    const inputRef = useRef('');
    const [content,setContent] = useState('');
    
    const onChangeContent = (e) =>{
        setContent(e.target.value);
    }
    const onSubmit = () =>{
        if(!content){
            inputRef.current.focus();
            return;
        }
        onCreate(content);
    }

    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            onSubmit();
        }
    }
    return(
        <div className="TodoEditor">
            <h4>새로운 Todo 작성하기</h4>
            <div className="editor_wrapper"> 
                <input 
                ref={inputRef}
                onChange={onChangeContent}
                value={content}
                placeholder="새로운 Todo..." 
                onKeyDown={onKeyDown}
                />
                <button 
                onClick={onSubmit}>추가</button>
            </div>
        </div>
    ) 
};
export default TodoEditor;