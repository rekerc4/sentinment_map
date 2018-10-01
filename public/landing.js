"use strict";

const landing = {
    templateUrl:"landing.html",
    controller: ["$location", "$timeout", function($location, $timeout) {
        const vm = this;
        vm.runBirds = () => {//start bird animations when run. 
            let larry = document.querySelectorAll('.bird'); 
            let bigBird = document.getElementById('bigbird'); 
            let xMover = document.getElementById('xMover');
            for(let i = 0; i < larry.length; i++){
                console.log(larry[i]);
                larry[i].style  = 'animation-play-state: running'; 
            }
            bigBird.style = 'animation-play-state: running';
            xMover.style = 'animation-play-state: running';
        }
        vm.redirect = () => {//redirect and run bird animation and fade out white circle when called. 
        let fadeOut = (el, step) => {//fade out element in 0.1 steps over a set amount of time. 
            let opac = 1;  
            let steps = setInterval(function () {
                if (opac <= 0){
                    
                    clearInterval(steps);
                }
                el.style.opacity = opac;
                opac -= 0.1;
            }, step);
        } 

        vm.runBirds(); 
        
        let whiteCircle = document.getElementById('whiteCircle');
        fadeOut(whiteCircle, 100);
        let changeWait = () => {
           $location.path("/twitter-map");
        }
        $timeout(changeWait, 6000);  // wait 6 seconds to change angular path.   
        
    }

   }]
}
angular
    .module("App")
    .component("landing", landing);
