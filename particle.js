function Particle(baseY, baseX, angle, radius, color){

    this.angle = angle;
    this.radius = radius;
    this.amplitude = 30;
    this.color = color;


    this.baseX = baseX;
    this.baseY = baseY;

    this.noise = simplex.noise2D(Math.cos(this.angle), Math.sin(this.angle)) * this.amplitude;

    this.x = this.baseX;

    this.y = this.baseY + this.noise ;
}


Particle.prototype = {

    render : function() {
        ctx.beginPath();
        ctx.save();

        ctx.fillStyle = this.color;

        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);

        ctx.fill();


        if (!lastCoords) {
            lastCoords = {
                x : this.x,
                y : this.y
            };
        }


        ctx.strokeStyle = "white";
        ctx.moveTo(lastCoords.x, lastCoords.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();



        lastCoords = {
            x : this.x,
            y : this.y
        };


        ctx.restore();
        ctx.closePath();

    },

    update : function () {

        time += 0.0005;
        /*this.noise = simplex.noise2D(Math.cos(this.angle) + time , Math.sin(this.angle) + time) * this.amplitude;
        this.x = this.baseX + Math.cos(this.angle) * ( this.radius + this.noise);
        this.y = this. baseY + Math.sin(this.angle) * ( this.radius + this.noise);*/

        this.noise = simplex.noise2D(Math.cos(this.angle) + time, Math.sin(this.angle) + time) * this.amplitude;

        this.x = this.baseX;
        this.y = this.baseY + this.noise;

    }

};