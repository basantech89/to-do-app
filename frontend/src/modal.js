import React from 'react';

const Modal = (props) => {
  const [isOpen, setModalState] = React.useState(false);
  const newTask = React.createRef();

  const toggle = (event) => {
    setModalState(!isOpen);
    newTask.current.value = null;
    event.preventDefault();
  };

  const onEdit = (event) => {
    event.preventDefault();
    props.editTask(props.id, newTask.current.value);
    newTask.current.value = null;
    toggle(event);
  };

  return (
    <form>
      <button onClick={toggle}> Edit</button>
      <button onClick={(event) => props.deleteTask(event, props.id)}> Delete</button>
      <div style={ isOpen ? { display: 'block' } : { display: 'none' }}>
        <label htmlFor="newtask"> New Task </label>
        <input type="text" id="newtask" ref={newTask} />
        <button onClick={onEdit}> Ok </button>
        <button onClick={toggle}> Cancel </button>
      </div>
    </form>
  );
};

export default Modal;
