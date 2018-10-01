"use strict";

const twitterMap = {
    templateUrl: "twitterMap.html"
    ,
    controller: ["TwitterService", "$location", "$timeout", function(TwitterService, $location, $timeout) {//injects TwitterService, location, and timeout. location was used previously, TwitterSevice and timeout are currently used.
        simplemaps_usmap.load();//loads simplemaps USA map. 
        const vm = this;

        document.getElementById("map").addEventListener("click", (e) => {//add click event to us map. 
            let stateName = e.target.className.animVal.charAt(9) + e.target.className.animVal.charAt(10);//Get state abbr. from simplemap state specific class (sm_state_<State abbr.>)
            console.log(stateName);
            if(!stateName){
                return;//return if a part of the map that is not a state is clicked on. 
            }
            simplemaps_usmap.refresh();//refresh simple map.
            document.getElementById("container").innerHTML = "";
            twttr.ready(function (twttr) {
                TwitterService.embedTweets(stateName).then((response) => {//get most popular tweet from clicked on state. 
                   for (let tweetId of response.data.statuses) {//for each tweet retreive its  styling and additional content from embed tweets js. 
                    twttr.widgets.createTweet(tweetId.id_str, document.getElementById('container'), {cards: 'hidden'});
                   } 
                });
            });
            /* Get top for clicked on states tweets and dislay apporiate emoji and message for that emotion. */
            TwitterService.getState(stateName).then((response) => {
                let delayPull = function(){
                    let stateText = document.getElementById('statetext');
                    let specState = document.getElementById('specificState');
                    let specEmotion = document.getElementById('itsEmotion'); 
                    let stateFullName = TwitterService.fullName[stateName]; 
                    
                    stateText.classList.remove('hide');
                    specState.innerHTML = stateFullName; 
                    
                    if(!response.emotion[0].emotion){
                        specEmotion.innerHTML = "Great &#x1F60A;"
                        return; 
                    }

                    switch(response.emotion[0].emotion){
                        case 'Angry': 
                            console.log(stateName); 
                            console.log("switch angry"); 
                            specEmotion.innerHTML = "Angry &#x1F624;"
                            break;
                        case 'Bored': 
                            console.log(stateName); 
                            console.log("switch bored"); 
                            specEmotion.innerHTML = "Bored &#x1F611;"
                            break; 
                        case 'Excited': 
                            console.log(stateName); 
                            console.log("switch excited"); 
                            specEmotion.innerHTML = "Excited &#x1F606;"
                            break;
                        case 'Fear': 
                            console.log(stateName); 
                            console.log("switch fear"); 
                            specEmotion.innerHTML = "Fearful &#x1F631;"
                            break;
                        case 'Happy': 
                            console.log(stateName); 
                            console.log("switch happy");    
                            specEmotion.innerHTML = "Happy &#x1F603;"
                            break; 
                        case 'Sad': 
                            console.log(stateName); 
                            console.log("switch sad"); 
                            specEmotion.innerHTML = "Sad &#x1F622;"
                            break; 
                        case 'Sarcasm': 
                            console.log(stateName); 
                            console.log("switch sarcasm"); 
                            specEmotion.innerHTML = "Sarcastic &#x1F60E;"
                            break; 
                        default: 
                            console.log(stateName); 
                            console.log("switch defualt error"); 
                            specEmotion.innerHTML = "Happy &#x1F603;"
                            break; 
                    }
                }
                $timeout(delayPull, 1000);
                // vm.tweetStuff = response.text;
            });
        });
    }] 
}

angular
    .module("App")
    .component("twitterMap", twitterMap);