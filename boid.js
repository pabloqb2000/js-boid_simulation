class Boid {
    /**
     * 
     * @param pos Initial position 
     */
    constructor(pos, simulation, size=15) {
        this.pos = pos;
        this.size = size;
        this.sim = simulation;
        this.vel = Vector.random2D();
        this.acc = Vector.random2D();

        this.angle = PI/6;
    }

    /**
     * Update this boid based on it's neighbour boids
     */
    update(neighbours) {
        neighbours = neighbours.filter(n => n.pos != this.pos && n.pos.dist(this.pos) < this.sim.viewR);
        
        if(neighbours.length > 0) {
            let sep = this.separation(neighbours).setNorm(this.sim.separation);
            let coh = this.cohesion(neighbours).setNorm(this.sim.cohesion);
            this.acc = sep.add(coh);
        } else {
            this.acc = new Vector([0,0]);
        }
        this.vel.add(this.acc).limit(this.sim.maxVel);
        this.vel.print();
        this.pos.print();
        this.pos.add(this.vel);
    }

    /**
     * Separate from the neighbour boids
     */
    separation(neighbours) {
        return neighbours.map(n => n.pos.copy().sub(this.pos).mult(-1)).reduce((x,y) => x.add(y));
    }

    /**
     * Move towards the average position of neighbour boids
     */
    cohesion(neighbours) {
        return neighbours.map(n => n.pos.copy()).reduce((x,y) => x.add(y)).div(neighbours.length).sub(this.pos);
    }

    /**
     * Draw this boid
     */
    draw() {
        if(this.sim.fov) {
            // Draw field of view
            stroke(70, 50);
            fill(50, 50);
            ellipse(this.pos.getX(), this.pos.getY(), this.sim.viewR*2, this.sim.viewR*2);
        }

        // Draw shape
        noFill();
        strokeWeight(1);
        stroke(230);
        beginShape();
        
        let pt = this.vel.copy().setNorm(this.size*cos(this.angle)).add(this.pos);
        vertex(pt.getX(), pt.getY());
        
        let h = this.size*sin(this.angle);
        let l = h/(1-h/pt.norm());
        pt.sub(this.pos).rotate(3*PI/4).setNorm(l).add(this.pos);
        vertex(pt.getX(), pt.getY());

        vertex(this.pos.getX(), this.pos.getY());

        pt.sub(this.pos).rotate(PI/2).add(this.pos);
        vertex(pt.getX(), pt.getY());

        endShape(CLOSE);
    }
}