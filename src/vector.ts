import { Point } from "@pixi/math";

export class Vector extends Point {

    constructor(x = 0, y = 0) {
        super(x, y);
    }

    public static subtractPoints(point1: Point, point2: Point) {
        return new Vector(point1.x - point2.x, point1.y - point2.y);
    }

    public get lengthSq() {
        return this.x * this.x + this.y * this.y
    }

    public get length() {
        return Math.sqrt(this.lengthSq);
    }

    public add(vector: Vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    public subtract(vector: Vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    public multiply(vector: Vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
    }

    public multiplyScalar(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    public divide(vector: Vector) {
        this.x /= vector.x;
        this.y /= vector.y;
        return this;
    }

    public divideScalar(scalar: number) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    public limit(max: number) {
        const lenSq = this.lengthSq;
        if (lenSq > max * max) {
            this.normalize().multiplyScalar(max);
            this.divideScalar(Math.sqrt(lenSq));
        }
        return this;
    } 

    public normalize() {
        const len = this.length;

        if (len === 0) {
            this.x = 1;
            this.y = 1;
        } else {
            this.x /= len;
            this.y /= len;
        }

        return this;
    }
}