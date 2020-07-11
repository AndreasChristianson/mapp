import styled from 'styled-components';
import useSWR from 'swr';
import { swrFetch } from '../utils/fetch-helpers';
import { Room } from '../../../types/types';
import SmallRoomSelector from './SmallRoomSelector';
import CreateRoomButton from './CreateRoomButton';

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.div`
  margin: 5px;
`;

const RoomSelection = () => {
  const { data, error } = useSWR<Room[]>('/rooms', swrFetch, {
    refreshInterval: 5000,
  });
  if (error) {
    return <p>{'Unable to load room list'}</p>;
  }

  if (!data) {
    return <List>{'Loading rooms...'}</List>;
  }

  return (
    <List>
      <ListItem>
        <CreateRoomButton />
      </ListItem>
      {data.map((room:Room) => (
        <ListItem key={room.id}>
          <SmallRoomSelector room={room} />
        </ListItem>
      ))}
    </List>
  );
};

export default RoomSelection;
