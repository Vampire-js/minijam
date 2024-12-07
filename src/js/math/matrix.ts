import { Vector } from "./vector"

export class Matrix{
    rows:number
    cols:number
    data:Record<number, Array<number>>
    constructor(rows:number, cols:number){
        this.rows = rows
        this.cols = cols
        this.data = []
    
        for(let i=0; i< this.rows; i++){
            this.data[i] = []
            for(let j=0; j<this.cols; j++){
                this.data[i][j] = 0
            }
        }
    }
    multiplyVec(v:Vector): Vector{
        let res = new Vector(0,0)
        res.x = this.data[0][0]*v.x + this.data[0][1]*v.y
        res.y = this.data[1][0]*v.x + this.data[1][1]*v.y
    
        return res
    }
    
    }