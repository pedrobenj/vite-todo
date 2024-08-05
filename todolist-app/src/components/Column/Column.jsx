import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Task from '../Task/Task.jsx';

const Column = ({ columnId, tasks }) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-4">
            {columnId === 'backlog' ? 'Backlog' : 'Done'}
          </h2>
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
