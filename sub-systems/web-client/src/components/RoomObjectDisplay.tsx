import React, { useState, useEffect } from 'react';
import { RoomObject, Position} from '../../../types/types';
import { useRouter } from 'next/router'
import { put } from '../utils/fetch-helpers';
import { useDrag, DragSourceMonitor} from 'react-dnd';
import { calculateNewPosition } from '../utils/svg-helpers';
import { RoomObjectImage } from './RoomObjectImage';

type Props = {
  roomObject: RoomObject;
  matrix?: DOMMatrix;
};

const calculateNewPositionIfDragging = (initialPosition: Position, monitor: DragSourceMonitor, matrix?: DOMMatrix) => {
  if(!monitor.isDragging()){
    return null
  }

  return calculateNewPosition(initialPosition, monitor, matrix!)
};

const RoomObjectDisplay = ({
  roomObject,
  matrix,
}: Props) => {
  const router = useRouter();
  const updateRoomObject = (roomObject: RoomObject) =>
    put(
      `/rooms/${roomObject.roomId}/room-objects/${roomObject.id}`,
      roomObject
    );
  const [roomObjectState, setRoomObjectState] = useState<RoomObject>(roomObject);
  useEffect(() => {
    setRoomObjectState(roomObject);
  }, [roomObject]);
  const [{position: dragPosition}, dragRef] = useDrag({
    item: {
      id: roomObject.id,
      type: 'roomObject'
    },
    end: (comp:any, monitor:any) => {
      const changedObj = {
        ...roomObject,
        position: calculateNewPosition(roomObjectState.position, monitor, matrix!)
      }
      updateRoomObject(changedObj)
      setRoomObjectState(changedObj)
    },
    collect: (monitor: DragSourceMonitor) => ({
      position: calculateNewPositionIfDragging(roomObjectState.position, monitor, matrix)
    })
  })
  // const editRoomObject = () => {
  //   if(!dragging){
  //     router.push(`/room/${roomObject.roomId}/room-object/${roomObject.id}`);
  //   }
  // };

  const position = dragPosition || roomObjectState.position

  return (
      <g 
      ref={dragRef} 
      transform={`translate(${position?.x},${position?.y})`}
      >
        <RoomObjectImage {...roomObjectState}/>
        <title >{`${roomObject.title}`}</title>
      </g>
  );
};

export default RoomObjectDisplay;
