import { Enemy } from "./Enemy";
import { Vector } from "./math/vector";
import { Sword } from "./Sword";

let SPEED = 2

export class Player {
    position: Vector
    velocity: Vector
    keys:Record<string, boolean>
    c: CanvasRenderingContext2D
    sword: Sword | undefined
    health:number
    bDamage:number
    rad:number
    constructor(x:number, y:number , c:CanvasRenderingContext2D){
        this.position = new Vector(x,y)
        this.velocity = new Vector(0,0)
        this.c = c
        this.keys = {
            w:false,
            a:false,
            s:false,
            d:false
        }
        this.health = 100
        this.bDamage = 50
        this.rad = 60
    }
    draw(){
        
        // this.c.beginPath()
        // this.c.arc(this.position.x, this.position.y, this.rad , 0, Math.PI*2)
        // this.c.stroke()

        

        //Health bar

        this.c.fillStyle = "black"
        this.c.fillRect(30, 30, 200,40)
        
        this.c.save()
        // this.c.translate(35,35)
        // this.c.rotate(1)
        this.c.fillStyle = this.health > 30?  "#5ed7f2": "#f25e5e"
        this.c.fillRect(35, 35, 190*this.health/100,30)

        this.c.restore()
 
    }

    bodyDamage(enemy:Enemy){
        if( !enemy.isDead && this.position.sub(enemy.position).mag() < this.rad + enemy.rad){
            enemy.takeDamage(this.bDamage)
                this.health -= 10
        }
      

    }
    enableControls(){
        document.onkeydown = e => {
            switch(e.key){
                case "w":
                    this.keys.w = true
                break;
                case "a":
                    this.keys.a = true
                break;
                case "s":
                    this.keys.s = true
                break;
                case "d":
                    this.keys.d = true
                break;
            }
        }

        document.onkeyup = e => {
            switch(e.key){
                case "w":
                    this.keys.w = false
                break;
                case "a":
                    this.keys.a = false
                break;
                case "s":
                    this.keys.s = false
                break;
                case "d":
                    this.keys.d = false
                break;
            }
        }
    }
    enableMovements(){
        if(this.keys.w){
            this.velocity.y = -SPEED
        }else if(this.keys.s){
            this.velocity.y = SPEED
        }else{
            this.velocity.y = 0
        }

        if(this.keys.a){
            this.velocity.x = -SPEED
        }else if(this.keys.d){
            this.velocity.x = SPEED
        }else{
            this.velocity.x = 0
        }
    }
    update(){

        if(this.health <= 0){
            this.health = 0
        }

        this.enableControls()
        this.enableMovements()


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y


        this.draw()

    }
}