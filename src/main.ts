import { World } from './js/World'
import './style.css'


const world = new World()

const animate = ():void => {
requestAnimationFrame(animate)

world.update()
}

animate()