import { Type } from "../../types/pokemon"
import bug from "./Bug"
import dark from "./Dark"
import dragon from "./Dragon"
import electric from "./Electric"
import fairy from "./Fairy"
import fighting from "./Fighting"
import fire from "./Fire"
import flying from "./Flying"
import ghost from "./Ghost"
import grass from "./Grass"
import ground from "./Ground"
import ice from "./Ice"
import normal from "./Normal"
import poison from "./Poison"
import psychic from "./Psychic"
import rock from "./Rock"
import steel from "./Steel"
import water from "./Water"

export interface SVGProps {
  color: string
  size: string
}

const icons: Record<Type, ({ color, size }: SVGProps) => JSX.Element> = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water
}

export function getTypeIcon(
  type: Type
): ({ color, size }: SVGProps) => JSX.Element {
  return icons[type]
}
