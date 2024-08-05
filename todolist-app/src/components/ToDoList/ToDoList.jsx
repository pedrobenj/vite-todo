import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from '../Column/Column.jsx';

const ToDoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({
    backlog: [
      { id: '1', content: 'Conteudo 1' },
      { id: '2', content: 'Conteudo 2' },
    ],
    done: [],
  });

  const handleAddTask = () => {
    if (task.trim() !== '') {
      const newTask = { id: Date.now().toString(), content: task };
      setTasks((prevTasks) => ({
        ...prevTasks,
        backlog: [...prevTasks.backlog, newTask],
      }));
      setTask('');
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = tasks[source.droppableId];
    const destinationColumn = tasks[destination.droppableId];

    if (source.droppableId === destination.droppableId) {
      const reorderedTasks = Array.from(sourceColumn);
      const [removed] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, removed);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [source.droppableId]: reorderedTasks,
      }));
    } else {
      const sourceItems = Array.from(sourceColumn);
      const destinationItems = Array.from(destinationColumn);
      const [removed] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, removed);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center space-y-4">
      <div className="bg-gray-800 shadow-md rounded p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Adicionar Tarefa</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border p-2 rounded w-full bg-gray-700 text-white"
            placeholder="Nova tarefa"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Adicionar
          </button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-row space-x-4">
          {['backlog', 'done'].map((columnId) => (
            <Column key={columnId} columnId={columnId} tasks={tasks[columnId]} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ToDoList;
