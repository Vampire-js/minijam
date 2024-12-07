import { Enemy } from "./Enemy"
import { Vector } from "./math/vector"
import { Player } from "./Player"
import { Sword } from "./Sword"
export class World{
    canvas:HTMLCanvasElement
    c:CanvasRenderingContext2D | null
    player: Player | undefined
    sword: Sword | undefined
    enemy:Enemy | undefined
    time: number
    enemies:Array<Enemy>
    constructor(){
      this.canvas = document.createElement("canvas")
      this.canvas.width = innerWidth
      this.canvas.height = innerHeight
      this.c = this.canvas.getContext("2d")
      this.enemies = []
      this.time = 0;
     this.init()
    }
    init(){
      document.body.append(this.canvas)
  
      this.drawPlayer()

      this.attachSword()

      this.addEnemy()

      setInterval(()=>{
        if(this.player && this.c && this.sword){
        let enemy = new Enemy(Math.random()*this.canvas.width , Math.random()*this.canvas.height , this.c)
        enemy.target = this.player.position
        enemy.id = Date.now()
        enemy.render()
        this.enemies.push(enemy)
        }
      },5000)
    }
    drawPlayer(){
        if(this.c){
        this.player = new Player(200,200,this.c)
            this.player.draw()
        }
    }
 attachSword(){
    if(this.c && this.player){
        this.sword = new Sword(this.player.position, this.c)

        this.sword.render()
    }
 }
 addEnemy(){
    if(this.c){
    this.enemy = new Enemy(400,400, this.c)
    this.enemy.render()
    }
 }
    clearCanvas(){
        if(this.c){
            let img = new Image()
            img.src = "/src/assets/grass.jpg"
            let pat = this.c.createPattern(img,"repeat")
            
            if(pat) this.c.fillStyle = pat
            this.c.fillRect(0,0,this.canvas.width, this.canvas.height)

        }
    }
  
    update(){
        this.time += 0.01

        this.clearCanvas()
        if(this.player){
            this.player.update()
        }
        if(this.sword && this.player){
            this.sword.position = this.player.position
            this.sword.update()
        }
        // if(this.enemy && this.player){
        //     this.enemy.target = this.player.position
        //     this.sword?.giveDamage(this.enemy)
        //     this.enemy.update()
        // }
        this.enemies.map(e => {
            this.sword?.giveDamage(e)
            this.player?.bodyDamage(e)

            if(e.isDead){
                this.enemies = this.enemies.filter(a => a.id != e.id)
            }
            e.update()
        })
    }
    
  }
  