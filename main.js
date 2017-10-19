// Lines -> particules

//Pour augmenter fréquence signal : augnmenter le nombre de particules ou le time
//Pour augmenter amplitude signal : augmenter l'amplitude du noise

const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    simplex = new SimplexNoise(),
    nbParticle = 100,
    nbLine = 8;

let lines = [],
    audio,
    time = 0;


function updateFrame(){

    requestAnimationFrame(updateFrame);

    //ctx.clearRect(0,0, canvas.width, canvas.height);
    //ctx.beginPath();
    //ctx.save();
    ctx.fillStyle = 'rgba(0,0,0, 0.7)';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    //ctx.restore();
    //ctx.closePath();



    //Render lines
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

    //console.log(audio.getFrequencyData());
}


function init() {

    let gapYLine = (canvas.height / (nbLine + 1));
    let angleStart = 0;

    audio = new Audio();
    audio.loadSound('./audio/sound.mp3');


    console.log(gapYLine);

    //Create lines
    for (let i = 0; i < nbLine; i++) {
        let line = new Line(nbParticle, gapYLine, 'white', angleStart); //nbParticle, baseY, color, angleStart
        line.createPoints();
        line.render();
        lines.push(line);
        gapYLine += (canvas.height / (nbLine + 1 ));
        angleStart+= 1.5;
    }

    //console.log(lines[0].nbParticle);




   //drawLastToFirst();

   updateFrame();
}




init();

