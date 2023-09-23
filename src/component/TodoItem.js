import "./TodoItem.css";

const TodoItem = ({id,content,isDone,createdDate,onUpdate}) => {
    const onChangeCheckbox = () =>{
        onUpdate(id)
    }
    return (
        <div className="TodoItem">
            <div className="checkbox_col">
                <input onChange={onChangeCheckbox} checked={isDone} type="checkbox" />
            </div>
            <div className="title_col">{content}</div>
            <div className="date_col">{new Date(createdDate).toLocaleDateString()}</div>
            <div className="btn_col">
                <button>삭제</button>
            </div>
        </div>
    );
};

export default TodoItem;