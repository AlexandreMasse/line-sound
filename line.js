function Line(nbParticle, baseY, color) {
    this.nbParticle = nbParticle;
    this.baseY = baseY;
    this.color = color;
    this.particles = [];
    this.gapXParticle = 0;
}

Line.prototype = {

    createPoints : function () {
        let angle = 0;
        for (let i = 0; i < this.nbParticle + 1; i++ ) {
            angle+= 0.1;
            let particle = new Particle(this.baseY, this.gapXParticle, angle, 250, this.color);
            this.particles.push(particle);
            this.gapXParticle += (canvas.width / nbParticle );
        }
    },

    linesBetweenPoints : function() {

        ctx.beginPath();
        ctx.save();

        ctx.strokeStyle = this.color;

        for (let i = 0; i < this.particles.length - 1 ; i++) {
            ctx.moveTo(this.particles[i].x, this.particles[i].y);
            ctx.lineTo(this.particles[i+1].x, this.particles[i+1].y)
        }

        ctx.stroke();
        ctx.restore();
        ctx.closePath();
    },

    render : function () {
  //        console.log(this.nbParticle);
        for (let i = 0; i < this.nbParticle + 1; i++ ) {
            let p = this.particles[i];
            p.update();
            p.render();
        }

        this.linesBetweenPoints();

    },

   /* update : function() {
        for(let i = 0; i < this.particles.length; i ++) {
            particle =
        }
    }*/
};