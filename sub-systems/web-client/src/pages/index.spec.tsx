import renderer from 'react-test-renderer';
import Chance from 'chance';

import Index from './index';

import Stats from '../components/Stats';
import RoomSelection from '../components/RoomSelection';

jest.mock('../components/Stats');
jest.mock('../components/RoomSelection');

describe('Index', () => {
  beforeEach(() => {
    const mockStats = Stats as jest.Mock;
    mockStats.mockReturnValue('stats component');
    const mockRoomSelection = RoomSelection as jest.Mock;
    mockRoomSelection.mockReturnValue('room component');
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<Index />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
