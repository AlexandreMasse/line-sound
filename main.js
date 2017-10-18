// Lines -> particules

const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    simplex = new SimplexNoise(),
    nbParticle = 8,
    nbLine = 4
;

let lines = [],
    lastCoords,
    time = 0;


function updateFrame(){
    requestAnimationFrame(updateFrame);


    ctx.clearRect(0,0, canvas.width, canvas.height);

    lastCoords = [];


    for(let i= 0; i < nbLine; i++ ){
        let line = lines[i];

        line.render();
    }

    /*for(let i = 0; i < lines[0].particles.length; i++) {

        let particle = particles[i];

        particle.update();
        particle.render();

    }*/


    //drawLastToFirst();
}


function init() {

let ecart = 100;

    //Creation des lignes
    for (let i = 0; i < nbLine; i++) {
        let line = new Line(nbParticle, ecart, 'red');
        line.createPoints();
        line.render();
        lines.push(line);
        ecart += 100;
    }

    console.log(lines);

   //drawLastToFirst();

   updateFrame();
}


/*

function drawLastToFirst() {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = 'white';
    ctx.moveTo(particles[particles.length - 1].x, particles[particles.length - 1].y);
    ctx.lineTo(particles[0].x, particles[0].y);
    ctx.stroke();
    ctx.restore();
    ctx.closePath();
}
*/


init();

