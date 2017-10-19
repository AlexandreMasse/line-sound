// Lines -> particules

//Pour augmenter fréquence signal : augnmenter le nombre de particules ou le time
//Pour augmenter amplitude signal : augmenter l'amplitude du noise

const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    simplex = new SimplexNoise(),
    nbParticle = 15,
    nbLine = 5;

let lines = [],
    audio,
    time = 0;


function updateFrame(){

    requestAnimationFrame(updateFrame);

    //ctx.clearRect(0,0, canvas.width, canvas.height);
    //ctx.beginPath();
    //ctx.save();
    ctx.fillStyle = 'rgba(0,0,0, 0.2)';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    //ctx.restore();
    //ctx.closePath();



    //Caculate average for each line
    const allData = audio.getFrequencyData();
    const everageData = [];


    for(let i= 0; i < nbLine; i++ ){
        let everageCurrent = 0;
        let cumul = 0;
        //let compteur = 0;

        let debut = Math.floor( ((allData.length - 1) / nbLine) * i );
        let fin = Math.floor( ((allData.length - 1) / nbLine) * (i + 1) );

        for(let j = debut; j < fin; j++) {
            //compteur++
            cumul += allData[j];
        }

        //console.log('Line : ' + i + ' compteur : ' + compteur);
        //console.log('Line : ' + i + ' début : ' + debut + ' fin : ' + fin);

        everageCurrent = cumul / (fin - debut);

        everageData.push(everageCurrent);

    }

    //console.log(everageData);


    //Render lines
    for(let i= 0; i < nbLine; i++ ){
        let line = lines[i];

        //console.log(everageData[i]);

        line.render(everageData[i]);
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

