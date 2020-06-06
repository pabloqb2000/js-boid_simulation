/**
 * All obstacles should have and isIn method and a nearestPt method
 */

class WallObst {
    constructor(side, pos) {
        this.side = side;
        this.pos = pos;
    }

    nearestPt(pt) {
        if(this.side % 2 == 0)
            return new Vector([pt.getX(), this.pos]);
        else
            return new Vector([this.pos, pt.getY()]);
    }

    isIn(pt) {
        return (this.side == 0 && pt.getY() < this.pos) ||
               (this.side == 1 && pt.getX() > this.pos) ||
               (this.side == 2 && pt.getY() > this.pos) ||
               (this.side == 3 && pt.getX() < this.pos);
    }
}

class CircleObst extends DragCircle {
    nearestPt(pt) {
        let p = new Vector([this.pos.x, this.pos.y]);
        return pt.copy().sub(p).setNorm(this.r).add(p);
    }

    isIn(pt) {
        return pt.dist(new Vector([this.pos.x, this.pos.y])) < this.r;
    }

    draw() {
        stroke(this.highlighted ? 200 : 230);
        strokeWeight(1);
        noFill();
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }
}

class RectObst extends DragRect {
    nearestPt(pt) {
        return Vector.fromDim(2);
    }

    isIn(pt) {
        return false;
    }

    draw() {
        stroke(this.highlighted ? 200 : 230);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.w, this.h, this.r);
        rectMode(CORNER);
    }
}