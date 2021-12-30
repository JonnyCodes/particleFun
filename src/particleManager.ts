import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Point, Rectangle } from "@pixi/math";
import Particle from "./particle";
import { randomBetween, randomPointWithin } from "./utils";

export default class ParticleManager {
    private particles: Particle[];
    private container: Container
    private boundary: Rectangle;
    private attractionPoints: Point[];
    private attractionPointsToRemove: Point[];

    constructor(container: Container, boundary: Rectangle) {
        this.particles = [];
        this.attractionPoints = [];
        this.attractionPointsToRemove = [];
        this.container = container;
        this.boundary = boundary;
    }

    public addParticles(numParticles: number) {
        for (let i = 0; i < numParticles; i++) {
            this.addParticle();
        }
    }

    public addParticle() {
        const particle = new Particle();
        particle.position.copyFrom(randomPointWithin(this.boundary));
        particle.scale.set(randomBetween(0.65, 1));
        this.particles.push(particle);
        this.container.addChild(particle);
    }

    public removeAttractionPoint(point: Point) {
        this.attractionPointsToRemove.push(point);
    }

    public addAttractionPoint(point: Point) {
        this.attractionPoints.push(point);
        return point;
    }

    public resize(x: number, y: number, width: number, height: number) {
        this.boundary.x = x;
        this.boundary.y = y;
        this.boundary.width = width;
        this.boundary.height = height;
    }

    public update(deltaTime: number) {        
        this.particles.forEach((particle) => {

            if (particle.x < this.boundary.left || particle.x > this.boundary.right) {
                particle.velocity.x *= -1;
            }

            if (particle.y < this.boundary.top || particle.y > this.boundary.bottom) {
                particle.velocity.y *= -1;
            }

            this.attractionPoints.forEach((attractionPoint) => {
                const dist = Math.sqrt(Math.pow(particle.x - attractionPoint.x, 2) + Math.pow(particle.y - attractionPoint.y, 2));

                if (dist < 300) {
                    particle.runBehaviours(attractionPoint);
                }
            });

            particle.update(deltaTime);
        });
    }
}