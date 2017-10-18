function Line(nbParticle, baseY, color) {
    this.nbParticle = nbParticle;
    this.baseY = baseY;
    this.color = color;
    this.particles = [];
    this.ecartParticle = 0;
}

Line.prototype = {

    createPoints : function () {
        let angle = 0;
        for (let i = 0; i < this.nbParticle + 1; i++ ) {
            angle+= 0.1;
            let particle = new Particle(this.baseY, this.ecartParticle, angle, 250, this.color);
            this.particles.push(particle);
            this.ecartParticle += (canvas.width / nbParticle );
        }
    },

    render : function () {
  //        console.log(this.nbParticle);
        for (let i = 0; i < this.nbParticle + 1; i++ ) {
            let p = this.particles[i];
            p.update();
            p.render();
        }


    //TODO : relier les particules


    //    console.log(particles)

     //   this.lines.push(particles);
        //console.log(lines);
    },

   /* update : function() {
        for(let i = 0; i < this.particles.length; i ++) {
            particle =
        }
    }*/
};