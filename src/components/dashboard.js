import React from 'react';

const Dashboard = (props) => (
  <div>
      <button onClick={props.handleLogout}>Log out</button> 
    <h5>Here are your Todo's</h5>
    <div>
      {props &&
        props.todos.map(todo => (
          <h6 key={todo.id}>
          {todo.text}
          <span style={{ cursor: 'pointer'}} onClick={() => props.handleRemove(todo.id)}>   X  </span>          
          </h6>
        ))
      }
    </div>
    <form onSubmit={props.handleSubmit}>
      <input value={props.textValue} onChange={props.handleChange} />
      <button>Add Todo</button> 
      </form>  
  </div>
);

export default Dashboard;