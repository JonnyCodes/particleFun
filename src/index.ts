import { Application, InteractionEvent } from "pixi.js";
import { Rectangle, Point } from "@pixi/math";
import { Text } from "@pixi/text";
import ParticleManager from './particleManager';
import { AttractionPoint } from './attractionPoint';
import { text_H, text_E, text_L, text_O } from "./text";
import { randomBetween } from "./utils";

export default class PixiBoot extends Application
{
    static RATIO = 1920 / 1080;

    private particleManager: ParticleManager;
    private helloText: Text;
    private movingPoints: {point: AttractionPoint, vel: Point}[];

	constructor()
	{
		super({
			view: <HTMLCanvasElement>document.getElementById('canvas'),
			backgroundColor: 0x2F2540,
			width: 800,
			height: 800,
            resolution: devicePixelRatio,
            sharedTicker: true,
            antialias: true,
		});

		document.body.appendChild(this.view);
        window.addEventListener('resize', this.resizeCanvas.bind(this));

        this.helloText = new Text("HELLO", {
            fill: 0x6E3D5E,
            fontSize: 300,
            fontWeight: "bold",
            align: "center",
        });
        this.helloText.position.x = 150;
        this.helloText.position.y = 250;
        this.helloText.alpha = 0;

        // this.stage.addChild(this.helloText);
        
        this.stage.interactive = true;
        this.stage.on("click", (event: InteractionEvent) => {
            console.log(event.data.global.x - 1050, event.data.global.y - 330);
        });
            
        this.particleManager = new ParticleManager(this.stage, new Rectangle(-50, -50, 1050, 1050));
        this.particleManager.addParticles(3000);

        this.movingPoints = [];
        for (let i = 0; i < 5; i++) {
            const point = this.particleManager.addAttractionPoint(new AttractionPoint(randomBetween(0, 1000), randomBetween(0, 1000), randomBetween(1, 4), randomBetween(50, 100)));
            this.movingPoints.push({point: point, vel: new Point(randomBetween(-5, 5), randomBetween(-5, 5))});
        }

        window.setInterval(() => {
            if (this.helloText.alpha > 0) {
                this.helloText.alpha = 0;
                this.particleManager.removeAttractionPoints();
            } else {
                this.helloText.alpha = 0.1;
                this.showHello();
            }
        }, 7500)
        
        this.resizeCanvas();

		this.ticker.add((deltaTime) => this.update(deltaTime));
	}

    public showHello() {
        const textHPosX = 190;
        const textHPosY = 335;
        text_H.forEach((point) => {
            this.particleManager.addAttractionPoint(new AttractionPoint(textHPosX + point.x, textHPosY + point.y, 1, 100));
        });
        
        const textEPosX = 410;
        const textEPosY = 335;
        text_E.forEach((point) => {
            this.particleManager.addAttractionPoint(new AttractionPoint(textEPosX + point.x, textEPosY + point.y, 2.5, 75));
        });

        const textLPosX = 610;
        const textLPosY = 335;
        text_L.forEach((point) => {
            this.particleManager.addAttractionPoint(new AttractionPoint(textLPosX + point.x, textLPosY + point.y, 1, 75));
        });

        const textL2PosX = 790;
        const textL2PosY = 335;
        text_L.forEach((point) => {
            this.particleManager.addAttractionPoint(new AttractionPoint(textL2PosX + point.x, textL2PosY + point.y, 1, 75));
        });

        const textOPosX = 1050;
        const textOPosY = 335;
        text_O.forEach((point) => {
            this.particleManager.addAttractionPoint(new AttractionPoint(textOPosX + point.x, textOPosY + point.y, 1, 100));
        });
    }

    private resizeCanvas() {
        this.renderer.resize(window.innerWidth, window.innerHeight);
        this.particleManager.resize(-50, -50, window.innerWidth + 100, window.innerHeight + 100);
    }

    private update(deltaTime:number) {
        this.particleManager.update(deltaTime);

        this.movingPoints.forEach((movingPoint) => {
            movingPoint.point.set((movingPoint.point.x + (movingPoint.vel.x * deltaTime)), (movingPoint.point.y + (movingPoint.vel.y * deltaTime)));
            
            if (movingPoint.point.x < -10 || movingPoint.point.x > window.innerWidth + 10) {
                movingPoint.vel.x *= -1;
            }
    
            if (movingPoint.point.y < 0 || movingPoint.point.y > window.innerHeight + 10) {
                movingPoint.vel.y *= -1;
            }
        });
	}
}

new PixiBoot();