import { Enemy } from "./Enemy";
import { Matrix } from "./math/matrix";
import { Vector } from "./math/vector";
import { Player } from "./Player";

export class Sword {
    src: string;
    rotation: number; // Current rotation angle (radians)
    dir: Vector;

    position: Vector; // Sword base position
    mouse: Vector; // Mouse position
    end: Vector; // Sword tip position
    length: number; // Sword length
    c: CanvasRenderingContext2D;

    constructor(position: Vector, c: CanvasRenderingContext2D) {
        this.src = "";
        this.rotation = 0;
        this.dir = new Vector(1, 0); // Default direction
        this.position = position;
        this.mouse = new Vector(100, 100);
        this.length = 150;
        this.c = c;

        this.end = this.position.add(this.dir.mult(this.length));
    }

    render() {
        this.c.strokeStyle = "black";
        this.c.beginPath();
        this.c.moveTo(this.position.x, this.position.y);
        this.c.lineTo(this.end.x, this.end.y);
        this.c.lineWidth = 2;
        this.c.stroke();
        this.c.closePath()

   
    }
    giveDamage(enemy:Enemy){
        // let dir = this.end.sub(this.position).unit()
        // let c2c = enemy.position.sub(this.position)
        // dir = dir.mult(c2c.dot(dir))
        // let closestVector = c2c.sub(dir)

        // if(enemy.position.x < Math.max(this.position.x, this.end.x) && enemy.position.y > Math.min(this.position.x , this.end.x)){
        //     if(closestVector.mag() < 1){
        //         console.log("esy")
        //         enemy.takeDamage(10)
        //     }  
        // }
       

        let wallVector = this.end.sub(this.position);
        let ballToWallStart = enemy.position.sub(this.position);
    
        // Project the ball’s position onto the wall segment
        let projectionLength = ballToWallStart.dot(wallVector.unit());
        let wallLength = wallVector.mag();
    
        // Check if the projection is within the bounds of the wall segment
        if (projectionLength >= 0 && projectionLength <= wallLength) {
            // Find the closest point on the wall to the ball
            let closestPoint = this.position.add(wallVector.unit().mult(projectionLength));
    
            this.c.fillStyle = "red"
            this.c.fillRect(closestPoint.x, closestPoint.y , 10,10)
            // Calculate the vector from the ball to this closest point
            let ballToClosestPoint = enemy.position.sub(closestPoint);
            let distanceToWall = ballToClosestPoint.mag();
    
            // Check if the ball is within collision range
            if (distanceToWall <= 20) {
                // Resolve the collision by moving the ball out and inverting velocity along the normal
            //     let collisionNormal = ballToClosestPoint.unit();
            //     this.position = closestPoint.add(collisionNormal.mult(this.r));
            //     this.velocity = this.velocity.sub(collisionNormal.mult(2 * this.velocity.dot(collisionNormal))).add(collisionNormal.mult(closestPoint.sub(wall.start).mag()*wall.omega)).mult(.8) // Damping factor
            enemy.takeDamage(50)
                console.log("HIT!")
        }
        }
    }

   
    rotateTowardsMouse() {
        document.onmousemove = (e) => {
            this.mouse = new Vector(e.pageX, e.pageY);
        };

        let toMouse = this.mouse.sub(this.position);

        let desiredAngle = Math.atan2(toMouse.y, toMouse.x);

        let angleDiff = desiredAngle - this.rotation;
     
        this.rotation += angleDiff * 0.05;

        this.dir = new Vector(Math.cos(this.rotation), Math.sin(this.rotation));
        this.end = this.position.add(this.dir.mult(this.length));
    }

    update() {
        this.rotateTowardsMouse();
        // this.giveDamage()
        this.render();
    }
}
