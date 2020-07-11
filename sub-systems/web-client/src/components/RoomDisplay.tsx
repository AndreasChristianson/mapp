import React, { createRef, useEffect, useState, useLayoutEffect } from 'react';
import { RoomObject, Room } from '../../../types/types';
import styled from 'styled-components';
import RoomObjectDisplay from './RoomObjectDisplay';
import { put } from '../utils/fetch-helpers';
import { transformMouseEventPosition } from '../utils/svg-helpers';

type Props = {
  roomObjects: RoomObject[];
  room: Room;
};

const Svg = styled.svg`
  border: 1px solid;
  border-radius: 5px;
`;

const RoomDisplay = ({ roomObjects, room }: Props) => {
  const svg = createRef<SVGSVGElement>();
  const getRootMatrix = () => svg.current!.getScreenCTM() as DOMMatrix;
  const createRoomObject = async (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    event.preventDefault();
    const rootMatrix = getRootMatrix();
    
    await put(`/rooms/${room.id}/room-objects`, {
      title: 'new object',
      position: transformMouseEventPosition(event, rootMatrix),
      imageUrl: '',
    });
  };

  return (
    <Svg
      viewBox={`0 0 ${room.size} ${room.size}`}
      ref={svg}
      // onContextMenu={createRoomObject}
    >
      <image href={room.imageUrl} x="0" y="0" width="100%" height="100%" />
      {roomObjects.map((roomObject) => (
        <RoomObjectDisplay
          key={roomObject.id}
          roomObject={roomObject}
          generateMatrix={getRootMatrix}
        />
      ))}
    </Svg>
  );
};

export default RoomDisplay;
