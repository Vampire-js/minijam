import { Vector } from "./math/vector";

export class Enemy{
    position: Vector
    target: Vector
    velocity: Vector
    c:CanvasRenderingContext2D
rad:number
    health:number
    id:number
    isDead:boolean
    constructor(x:number,y:number,c:CanvasRenderingContext2D){
        this.position = new Vector(x,y)
        this.velocity = new Vector(0,0)
        this.target = new Vector(0,0)
        this.health = 100
        this.rad = 20
        this.c = c
        this.id = 0
        this.isDead = false
    }
    render(){
        this.c.fillStyle = "blue"
        this.c.beginPath()
        this.c.arc(this.position.x, this.position.y, this.rad , 0, Math.PI*2)
        this.c.stroke()

        this.c.fillStyle = "black"
        this.c.fillRect(this.position.x -25, this.position.y - 40, 50,10)
        this.c.fillStyle = "green"
        this.c.fillRect(this.position.x -25, this.position.y - 40, 50*this.health/100,10)
    }
    calculateVelocity(){
        let dir = this.target.sub(this.position).unit()
        this.velocity = dir.mult(.5)
    }
    takeDamage(attack:number){
        this.health -= attack
        this.position = this.position.sub(new Vector(50,50))
    }
    update(){
if(this.health <= 0){
    this.isDead = true
}
        if(this.health > 0){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.calculateVelocity()
        this.render()
        }
    }
}