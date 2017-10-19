function Particle(baseX, baseY, angle, radius, color){

    this.baseX = baseX;
    this.baseY = baseY;
    this.angle = angle;
    this.radius = radius;
    this.amplitude = 0;
    this.color = color;
    this.incrementTime = 0.0005;


    this.noise = simplex.noise2D(Math.cos(this.angle), Math.sin(this.angle)) * this.amplitude;

    this.x = this.baseX;

    this.y = this.baseY + this.noise ;
}


Particle.prototype = {

    render : function() {
        ctx.beginPath();
        ctx.save();

        ctx.fillStyle = this.color;

        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        ctx.fill();

        ctx.restore();
        ctx.closePath();

    },

    //Todo: faire passer en paramètre time et amplitude pour les faire varier avec web audio api ?
    update : function (everageNumber) {

        //console.log(everageNumber);
        //Todo : a changer en fonction de la web audio api
       time += 0.0005 / nbLine;
        //time += this.everageNumberTime / nbLine;


        this.noise = simplex.noise2D(Math.cos(this.angle) + ( time + everageNumber / 200 ), Math.sin(this.angle) + (time + everageNumber / 200 )) * (this.amplitude + (everageNumber / 3 ));

        this.x = this.baseX;
        this.y = this.baseY + this.noise ;

    }

};