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

        for(let i = 0; i < n; i++) {
            this.newBoid();
        }
        
        // Default parameters
        this.viewR = viewRSld.value;
        this.separation = sepSld.value;
        this.cohesion = cohSld.value;
        this.alignment = algSld.value;
        this.maxVel = maxVelSld.value;
        this.fov = fovBtn.active;
    }

    /**
     * Adds new boid to the system
     */
    newBoid() {
        this.boids.push(new Boid(
            new Vector(this.randomNewPos()), 
                        this));
    }

    /**
     * Returns an available random new position
     */
    randomNewPos() {
        return [random(this.w/3, 2/3*this.w), random(this.h/3, 2/3*this.h)];
    }

    /**
     * Update all the boids
     */
    update() {
        for(let b of this.boids) {
            b.update(this.boids);
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