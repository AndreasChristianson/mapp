import { RoomObject } from "../../../types/types";

type Props = RoomObject

const radius = 50;
const diameter = radius*2;

export const RoomObjectImage = ({ imageUrl }: Props) => <>
  <clipPath id="clipCircle">
    <circle
      r={radius}
      cx={radius}
      cy={radius}
    />
  </clipPath>
  <image
    href={imageUrl}
    width={diameter}
    height={diameter}
    clipPath="url(#clipCircle)"
  />
  <circle
    r={radius}
    fillOpacity="0"
    strokeWidth="2px"
    stroke="black"
    vectorEffect="non-scaling-stroke"
    cx={radius}
    cy={radius}
  />
</>
  ;
