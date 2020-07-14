export interface RoomObject {
  id: string
  roomId: string
  position: Position
  imageUrl: string
  title: string
}

export interface Room {
  id: string
  description: string
  title: string
  imageUrl: string
  size: number
}

export interface Position {
  x: number
  y: number
}