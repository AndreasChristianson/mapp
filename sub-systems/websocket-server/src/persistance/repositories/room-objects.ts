import { Database, RoomObject } from '../db'
import Server from '../../websocket/websocket-server'
import Logger from '../../websocket/logging'

const roomObjects = () => Database.getInstance().get('objects')

export const getAll = () => roomObjects().value()
export const getById = (objectId: string) => roomObjects().getById(objectId).value()
export const update = async (roomObject: RoomObject) => {
  const upsertedRoomObject = await roomObjects().upsert(roomObject).write()
  Server.getInstance().in(roomObject.roomId).emit('roomObjectChanged', upsertedRoomObject)
  Logger.log(`Room object ${roomObject.id} (in room ${roomObject.roomId}) changed.`, upsertedRoomObject)
  return upsertedRoomObject
}

export const getByRoomId = (roomId: string) => roomObjects().filter({ roomId }).value()
