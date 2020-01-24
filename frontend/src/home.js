import React from 'react';
import Modal from "./modal";
import {addTask, editItem, getAllTasks, removeTask} from "./apiCaller";

const Home = () => {
  const [tasks, setTasks] = React.useState([]);
  const task = React.createRef();

  const fetchTasks = () => {
    getAllTasks()
      .then(res => setTasks(res))
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    fetchTasks();
  }, [tasks.length]);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addTask({ task: task.current.value });
    fetchTasks();
    task.current.value = null;
  };

  const editTask = async (id, newTask) => {
    await editItem(id, { task: newTask });
    fetchTasks();
  };

  const deleteTask = async (event, id) => {
    event.preventDefault();
    await removeTask(id);
    fetchTasks();
  };

  const RenderTasks = tasks.map(task => {
    return (
      <div key={task._id}>
        <p> {task.task} </p>
        <Modal id={task._id} deleteTask={deleteTask} editTask={editTask} />
      </div>
    )
  });

  return (
    <div style={{ marginTop: 50, marginLeft: 30 }}>
      <form onSubmit={onSubmit}>
        <label htmlFor="task"> Task </label>
        <input type="text" id="task" ref={task} />
      </form>
      {RenderTasks}
    </div>
  );
};

export default Home;
