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

    skin:HTMLImageElement | undefined
    leftFoot:HTMLImageElement | undefined
    blood: HTMLImageElement | undefined

    time:number
    constructor(x:number,y:number,c:CanvasRenderingContext2D){
        this.position = new Vector(x,y)
        this.velocity = new Vector(0,0)
        this.target = new Vector(0,0)
        this.health = 100
        this.rad = 40
        this.c = c
        this.id = 0
        this.isDead = false
        this.time = 0
    }
    render(){
        this.c.fillStyle = "blue"
        this.c.beginPath()
        this.c.arc(this.position.x, this.position.y, this.rad , 0, Math.PI*2)
        this.c.stroke()
        let angle = Math.atan2(this.velocity.y , this.velocity.x)
        this.c.save()
        this.c.translate(this.position.x, this.position.y)
        this.c.rotate(angle + Math.PI/2)    
        this.c.fillStyle = "black"
        this.c.fillRect(-75,100, 150,30)
        this.c.fillStyle = "green"
        this.c.fillRect(-75,  100, 150*this.health/100,30)
        this.c.restore()
        this.attachSkin()
        this.attachFeet()
        this.attachBlood()
    }
    calculateVelocity(){
        let dir = this.target.sub(this.position).unit()
        this.velocity = dir.mult(.5)
    }
    takeDamage(attack:number){
        this.health -= attack
        this.position = this.position.sub(new Vector(50,50))
    }
    attachSkin(){
        this.skin = new Image()
        this.skin.src = "/src/assets/enemy.png"
        
    }
    attachFeet(){
        this.leftFoot = new Image()
        this.leftFoot.src = "/src/assets/left-foot.png"
    }
    attachBlood(){
        this.blood = new Image()
        this.blood.src = "/src/assets/blood.svg"
    }
    update(){
if(this.health <= 0){
    this.isDead = true
}
this.time += 0.1

        if(this.health > 0){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.render()
        this.calculateVelocity()
       

        if(this.skin && this.leftFoot){
        let angle = Math.atan2(this.velocity.y , this.velocity.x)

        this.c.save()
        this.c.translate(this.position.x, this.position.y)
        this.c.rotate(angle + Math.PI/2)    
        this.c.drawImage(this.leftFoot , -10 ,-20 + 10*Math.sin(this.time/(2)), -50,50)
        this.c.drawImage(this.leftFoot , -10 ,-20 + 10*Math.cos(this.time/(2)), 50,50)
        this.c.drawImage(this.skin,-80,-80 )
        

        this.c.restore()

        }
        }else{
            if(this.blood){

            this.c.save()
            this.c.translate(this.position.x, this.position.y)
            this.c.drawImage(this.blood,0,0 )
            this.c.restore()
            }
        }
    }
}