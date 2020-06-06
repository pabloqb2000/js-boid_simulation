class BoidSimulation {
    /**
     * 
     * @param n number of initial boids
     */
    constructor(n, w=width, h=height) {
        this.boids = [];
        this.w = w;
        this.h = h;

        for(let i = 0; i < n; i++) {
            this.newBoid();
        }
        
        // Default parameters
        this.viewR = 100;
        this.fov = true;
        this.separation = 0.1;
        this.cohesion = 0.2;
        this.maxVel = 5;
    }

    /**
     * Adds new boid to the system
     */
    newBoid() {
        this.boids.push(new Boid(
            new Vector([random(this.w/3, 2/3*this.w), random(this.h/3, 2/3*this.h)]), 
                        this));
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