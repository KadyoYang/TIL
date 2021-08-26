import React, {useState} from 'react';

function TodoBanner(props) {
    return (
        <h4 className="bg-primary text-white text-center p-2">
        {props.userName}'s To Do List
        ({props.todoItems.filter(t=>!t.done).length} items to do)
      </h4>
    );
}


export default TodoBanner;