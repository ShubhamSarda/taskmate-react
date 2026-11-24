const ShowTask = ({ tasklist, setTasklist, handleEdit, handleDelete }) => {
  const handleStatusChange = (id, status) => {
    setTasklist((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };
  return (
    <section className="showTask">
      <p className="head">
        <span>
          <span className="title">Todo</span>
          <span className="count">{tasklist.length}</span>
        </span>
        <span className="clearAll" onClick={() => setTasklist([])}>
          Clear All
        </span>
      </p>
      <ul>
        {tasklist.map((task) => (
          <div>
            <li key={task.id} className={task.status}>
              <p>
                <span className="name">{task.name}</span>
                <span className="time">{task.time}</span>
                <span className="status">
                  <button
                    className="finish"
                    onClick={() => handleStatusChange(task.id, "finished")}
                  >
                    Finished
                  </button>
                  <button
                    className="inprogress"
                    onClick={() => handleStatusChange(task.id, "in-progress")}
                  >
                    In Progress
                  </button>
                  <button
                    className="pending"
                    onClick={() => handleStatusChange(task.id, "to-be-done")}
                  >
                    Pending
                  </button>
                </span>
              </p>
              <i
                className="bi bi-pencil-square"
                onClick={() => handleEdit(task.id)}
              ></i>
              <i
                className="bi bi-trash"
                onClick={() => handleDelete(task.id)}
              ></i>
            </li>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default ShowTask;
