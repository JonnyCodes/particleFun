import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Point, Rectangle } from "@pixi/math";
import { AttractionPoint } from "./attractionPoint";
import Particle from "./particle";
import { randomBetween, randomPointWithin } from "./utils";

export default class ParticleManager {
    private particles: Particle[];
    private container: Container
    private boundary: Rectangle;
    private attractionPoints: AttractionPoint[];
    private shouldRemoveAttractionPoints: boolean;

    constructor(container: Container, boundary: Rectangle) {
        this.particles = [];
        this.attractionPoints = [];
        this.shouldRemoveAttractionPoints = false;
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

    public addAttractionPoint(point: AttractionPoint) {
        this.attractionPoints.push(point);
        return point;
    }

    public removeAttractionPoints() {
        this.shouldRemoveAttractionPoints = true;
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

                if (dist < attractionPoint.distance) {
                    particle.runBehaviours(attractionPoint);
                }
            });

            particle.update(deltaTime);
        });

        if (this.shouldRemoveAttractionPoints) {
            this.attractionPoints = [];
            this.shouldRemoveAttractionPoints = false;
        }

    }
}