import { Application } from 'pixi.js'
import { Point, Rectangle } from "@pixi/math";
import ParticleManager from './particleManager';

export default class PixiBoot extends Application
{
    static RATIO = 1920 / 1080;

    private particleManager: ParticleManager;

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
        
        this.particleManager = new ParticleManager(this.stage, new Rectangle(-50, -50, 1050, 1050));
        this.particleManager.addParticles(2000);
        this.particleManager.addAttractionPoint(new Point(100, 100));
        this.particleManager.addAttractionPoint(new Point(500, 100));
        this.particleManager.addAttractionPoint(new Point(1000, 750));
        
        this.resizeCanvas();

		this.ticker.add((deltaTime) => this.update(deltaTime));
	}

    private resizeCanvas() {
        this.renderer.resize(window.innerWidth, window.innerHeight);
        this.particleManager.resize(-50, -50, window.innerWidth + 100, window.innerHeight + 100);
    }

    private update(deltaTime:number)
	{
        this.particleManager.update(deltaTime);
	}
}

new PixiBoot();