export class Vector {
    x:number
    y:number
        constructor(x:number, y:number) {
            this.x = x
            this.y = y
        }
        add(v:Vector) {
            return new Vector(this.x + v.x, this.y + v.y)
        }
        sub(v:Vector) {
            return new Vector(this.x - v.x, this.y - v.y)
        }
        mag() {
            return Math.sqrt(this.x ** 2 + this.y ** 2)
        }
        mult(n:number) {
            return new Vector(n * this.x, n * this.y)
        }
        normal(){
            return new Vector(-this.y, this.x)
        }
        unit(){
            let v = new Vector(this.x, this.y)
            let mag = this.mag()
            if(mag != 0){
            v = v.mult(1/(mag))
    
            }
    
            return v
        }
        angleBetween(v:Vector){
            let cos = this.unit().dot(v.unit())
            return Math.acos(cos)
        }
        set(v:Vector){
            this.x = v.x
            this.y = v.y
        }
        dot(v:Vector){
            return this.x*v.x + this.y*v.y
        }
        // draw(start_x:number, start_y:number, n:number, color:string) {
        //     c.beginPath()
        //     c.moveTo(start_x, start_y)
        //     c.lineTo(start_x + this.x * n, start_y + this.y * n)
        //     c.strokeStyle = color
        //     c.strokeWidth = 10
        //     c.stroke()
        // }
    }