import React, { useState, useEffect } from 'react';
import { RoomObject } from '../../../types/types';
import { useRouter } from 'next/router'
import { put } from '../utils/fetch-helpers';
import { useDrag, DragSourceMonitor} from 'react-dnd';
import { transformPosition, addPositions, negatePosition } from '../utils/svg-helpers';
import { RoomObjectImage } from './RoomObjectImage';

type Props = {
  roomObject: RoomObject;
  generateMatrix: () => DOMMatrix;
};

const RoomObjectDisplay = ({
  roomObject,
  generateMatrix,
}: Props) => {
  const router = useRouter();
  const updateRoomObject = (roomObject: RoomObject) =>
    put(
      `/rooms/${roomObject.roomId}/room-objects/${roomObject.id}`,
      roomObject
    );
  const [matrix, setMatrix] = useState<DOMMatrix|null>(null)
  const [roomObjectState, setRoomObjectState] = useState<RoomObject>(roomObject);
  useEffect(() => {
    setRoomObjectState(roomObject);
  }, [roomObject]);
  const getPosition = (monitor: DragSourceMonitor) => {
    if(!monitor.isDragging()){
      return null
    }
    const initialOffset = transformPosition(monitor.getInitialClientOffset()!, matrix!);
    const clickOffset = addPositions(initialOffset,negatePosition(roomObjectState.position))
    const movement = transformPosition(monitor.getClientOffset()!,matrix!)
    const newPosition = addPositions(movement,negatePosition(clickOffset))

    return newPosition
  }
  const [{position: dragPosition}, dragRef] = useDrag({
    item: {
      id: roomObject.id,
      type: 'roomObject'
    },
    end: (comp:any, monitor:any) => {
      const changedObj = {
        ...roomObject,
        position: getPosition(monitor)!
      }
      setRoomObjectState(changedObj)
      updateRoomObject(changedObj)
    },
    begin: () => {
      setMatrix(() => generateMatrix())
    },
    collect: (monitor: DragSourceMonitor) => ({
      position: getPosition(monitor)
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
