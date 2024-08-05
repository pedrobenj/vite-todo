import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-gray-700 p-4 rounded shadow mb-2 flex items-center justify-between"
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
