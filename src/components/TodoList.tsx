import React, { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";

interface TodoItem {
  text: string;
  isComplete: boolean;
}

const localStorageId = "chaoticTodoItems";

const TodoList: React.FC = () => {
  // Use the useState hook to create a state variable for the todo items and a function to update it
  const [todoItems, setTodoItems] = useState<TodoItem[]>(getItemsFromStorage());

  // Handle the submission of the form to add a new todo item
  const handleSubmit = (event: React.FormEvent<any>) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // // Get the value of the input field
    const newTodo = event.currentTarget.elements.newTodo.value;

    // // Add the new todo item to the list
    if (newTodo) {
        setTodoItems([...todoItems, { text: newTodo, isComplete: false }]);
    }

    // // Clear the input field
    event.currentTarget.elements.newTodo.value = "";
  };

  // Handle the change of a checkbox to mark a todo item as complete or not
  const toggleCheckbox = (index: number) => {
    // Create a copy of the todo items list
    const newTodoItems = [...todoItems];

    // Toggle the isComplete property of the todo item at the specified index
    newTodoItems[index].isComplete = !newTodoItems[index].isComplete;

    // Update the state with the modified todo items list
    setTodoItems(newTodoItems);
  };

  const deleteItem = (index: number) => {
    const newTodoItems = [...todoItems];
    newTodoItems.splice(index, 1);
    setTodoItems(newTodoItems);
  };

  useEffect(() => {
    saveItemsToStorage(todoItems);
  }, [todoItems]);

  const clearAll = () => {
    setTodoItems([]);
  };

  return (
    <div className="todoList">
      <Card className="todoListInput">
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Todo"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                type="text"
                name="newTodo"
              />
              <Button type="submit">Add Todo</Button>
            </InputGroup>
          </form>
        </Card.Body>
      </Card>
      <ul className="todoListItems">
        {todoItems.map((todo, index) => (
          <TodoListItem
            index={index}
            todo={todo}
            toggleCheckbox={toggleCheckbox}
            deleteItem={deleteItem}
          />
        ))}
      </ul>
      {todoItems.length > 0 && (
        <div className="todoListItemsFooter">
          <Button variant="link" onClick={() => clearAll()}>
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

const TodoListItem: React.FC<{
  index: number;
  todo: TodoItem;
  toggleCheckbox: (index: number) => void;
  deleteItem: (index: number) => void;
}> = (props) => {
  const { index, todo, toggleCheckbox, deleteItem } = props;
  return (
    <Card key={index} as={"li"} className={"todoListItem"}>
      <Card.Body>
        <div>
          <input
            type="checkbox"
            checked={todo.isComplete}
            onChange={() => toggleCheckbox(index)}
          />
          <span className={todo.isComplete ? "struckThrough" : ""}>
            {todo.text}
          </span>
        </div>
        <div onClick={() => deleteItem(index)}>X</div>
      </Card.Body>
    </Card>
  );
};

function getItemsFromStorage() {
  const data = localStorage.getItem(localStorageId);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

function saveItemsToStorage(items: TodoItem[]) {
  localStorage.setItem(localStorageId, JSON.stringify(items));
}

export default TodoList;
