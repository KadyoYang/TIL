import React, {useState} from 'react';
import TodoBanner from './TodoBanner';
import TodoCreator from './TodoCreator';
import TodoRow from './TodoRow';
import VisibilityControl from './VisibilityControl';


function App() {

  const [userName, setUserName] = useState("Adam");
  const [todoItems, setTodoItem] = useState([
    {action: "buy Flower", done: false},
    {action: "get shoes", done: false},
    {action: "collect tickets", done: true},
    {action: "call joe", done: false}
  ]);
  const [showCompleted, setShowCompleted] = useState(true);

  // const [newItemText, setNewItemText] = useState("");


  const changeStateData = () => {
    if(userName === "Adam"){
      setUserName("Bob");
    }else{
      setUserName("Adam");
    }
  }
/*
  const updateNewTextValue = (event) => {
    const {target: {value}} = event;
    // console.log(event.target);
    setNewItemText(value);
    console.log("newItemText is " + newItemText);
  }
*/
  const createNewTodo = (task) => {
    if( !todoItems.find(item => item.action === task)){
      console.log("successfully added on list");
      setTodoItem(todoItems => [...todoItems, {action: task, done: false}]);
      // setNewItemText("");
    }
  }

  const toggleTodo = (todo) => {
    setTodoItem(
      todoItems.map(item=>item.action === todo.action?{action: item.action, done: !item.done}: item)
    );
  }

  const todoTableRows = (doneValue) => todoItems.filter(item=> item.done === doneValue).map(item =>
      <TodoRow key={item.action} item={item} callback={toggleTodo} />
    );

  

  return (
    <div>
      <TodoBanner userName={userName} todoItems={todoItems} />
      <div className = "container-fluid">
        <TodoCreator callback={createNewTodo} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr><th>Description</th><th>Done</th></tr>
          </thead>
          <tbody>
            {todoTableRows(false)}
          </tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl description="Completed Tasks" isChecked={showCompleted} callback={(checked) =>{setShowCompleted(checked)}} />
        </div>
        {
          showCompleted &&
          <table className="table table-striped table-bordered">
            <thead>
              <tr><th>Description</th><th>Done</th></tr>
            </thead>
            <tbody>{todoTableRows(true)}</tbody>
          </table>
        }
      </div>
    </div>
  );
}



export default App;
