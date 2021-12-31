import { Point } from "@pixi/math";

export class AttractionPoint extends Point {

    public power: number;
    public distance: number;

    constructor(x = 0, y = 0, power = 1, distance = 100) {
        super(x, y);

        this.power = power;
        this.distance = distance;
    }
}