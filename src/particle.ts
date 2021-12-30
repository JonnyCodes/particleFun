import { Graphics } from "@pixi/graphics";
import { Sprite } from "@pixi/sprite";
import { Point } from "pixi.js";
import { randomBetween } from "./utils";
import { Vector } from "./vector";

export default class Particle extends Sprite {
    
    public velocity: Vector;
    public acceleration: Vector;
    private isSeeking: boolean;
    private wasSeeking: boolean;
    private maxSpeed = 6;
    private maxForce = 0.75;

    private graphics: Graphics;

    constructor(posX = 0, posY = 0) {
        super();

        this.graphics = new Graphics();
        this.graphics.beginFill(0xF9F871);
        this.graphics.drawCircle(0, 0, randomBetween(2, 4));
        this.addChild(this.graphics);
        this.alpha = 0.25;

        this.isSeeking = this.wasSeeking = false;

        this.position.set(posX, posY);
        this.velocity = new Vector(randomBetween(-3, 3), randomBetween(-3, 3));
        this.acceleration = new Vector();
    }

    public runBehaviours(target: Point) {
        const seekVec = this.seek(target);
        this.applyForce(seekVec);

        this.isSeeking = true;
    }

    public update(deltaTime: number) {
        this.position.set((this.position.x + (this.velocity.x * deltaTime)), (this.position.y + (this.velocity.y * deltaTime)));
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.set(randomBetween(-0.5, 0.5), randomBetween(-0.5, 0.5));

        // Is now seeking
        if (!this.wasSeeking && this.isSeeking) {
            this.alpha = 0.75;
        }

        // Has stopped seeking
        if (!this.isSeeking && this.wasSeeking) {
            this.alpha = 0.3;
        }

        this.wasSeeking = this.isSeeking;
        this.isSeeking = false;
    }

    private seek(target: Point): Vector {
        const desired = Vector.subtractPoints(target, this.position);
        desired.normalize().multiplyScalar(this.maxSpeed);
        return desired.subtract(this.velocity).limit(this.maxForce);
    }
 
    private applyForce(forceVector: Vector) {
        this.acceleration.add(forceVector);
    }
}