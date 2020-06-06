class BoidSimulation {
    /**
     * 
     * @param n number of initial boids
     * @param w width of the simulation
     * @param h height of the simulation
     */
    constructor(n, w, h) {
        this.boids = [];
        this.w = w;
        this.h = h;
        
        // Default parameters
        this.viewR = viewRSld.value;
        this.separation = sepSld.value;
        this.cohesion = cohSld.value;
        this.alignment = algSld.value;
        this.avoidance = avdSld.value;
        this.maxVel = maxVelSld.value;
        this.fov = fovBtn.active;

        // Add obstables
        this.obstacles = [
            new WallObst(0, 0),
            new WallObst(1, w),
            new WallObst(2, h),
            new WallObst(3, 0),
            new CircleObst(createVector(w/2, h/2), w/40),
            new RectObst(createVector(w/3, h/3), w/20, w/20, 5)
        ];

        // Add boids
        for(let i = 0; i < n; i++) {
            this.newBoid();
        }
    }

    /**
     * Adds new boid to the system
     */
    newBoid() {
        this.boids.push(new Boid(this.randomNewPos(), this));
    }

    /**
     * Returns an available random new position
     */
    randomNewPos() {
        let p;
        do {
            p = new Vector([random(this.w), random(this.h)]);
        } while(this.obstacles.map(o => o.isIn(p)).reduce((x,y) => x || y));
        return p;
    }

    /**
     * Update all the boids
     */
    update() {
        for(let b of this.boids) {
            b.update(this.boids, this.obstacles);
        }
    }

    /**
     * Draw all boids
     */
    draw() {
        for(let b of this.boids) {
            b.draw();
        }
    }
}