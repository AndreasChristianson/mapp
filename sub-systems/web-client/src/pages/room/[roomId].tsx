import { swrFetch } from '../../utils/fetch-helpers';
import getConfig from 'next/config';
import { Room, RoomObject } from '../../../../types/types';
import { NextPage, NextPageContext } from 'next';
import { useState, useEffect } from 'react';
import RoomDisplay from '../../components/RoomDisplay';
import RoomHeader from '../../components/RoomHeader';
import io from 'socket.io-client';

interface Props {
  room: Room;
  roomObjects: RoomObject[];
}

const RoomPage: NextPage<Props> = ({
  room: initialRoom,
  roomObjects: intialObjects,
}) => {
  const [room, setRoom] = useState<Room>(initialRoom);
  const [roomObjects, setRoomObjects] = useState<RoomObject[]>(intialObjects);

  useEffect(() => {
    const {
      publicRuntimeConfig: { apiUrl },
    } = getConfig();

    const socket = io(`${apiUrl}`);
    socket.emit('joinRoom', room.id);
    socket.on('roomChanged', (updatedRoom: Room) => {
      setRoom(updatedRoom);
    });
    socket.on('roomObjectChanged', (updatedRoomObject: RoomObject) => {
      setRoomObjects((previousRoomObjects) => [
        ...previousRoomObjects.filter(({ id }) => id !== updatedRoomObject.id),
        updatedRoomObject,
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <RoomHeader room={room} />
      <RoomDisplay room={room} roomObjects={roomObjects} />
    </>
  );
};
RoomPage.getInitialProps = async (ctx: NextPageContext) => {
  const {
    query: { roomId },
  } = ctx;
  const roomPromise = swrFetch(`/rooms/${roomId}`);
  const roomObjectsPromise = swrFetch(`/rooms/${roomId}/room-objects`);

  const [room, roomObjects] = await Promise.all([
    roomPromise,
    roomObjectsPromise,
  ]);

  return {
    room,
    roomObjects,
  };
};

export default RoomPage;
