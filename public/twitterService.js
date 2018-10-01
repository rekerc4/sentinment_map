"use strict";

function TwitterService ($http, $sce, $timeout) {//inject http sce and timeout. sce and timeout were previously used http is currently used. 
    const vm = this;

/*Object that stores twitter place ids for each state.*/   
const states =  {
        "AL": "288de3df481163e8", 
        "AK": "07179f4fe0500a32",
        "AZ": "a612c69b44b2e5da",
        "AR": "e8ad2641c1cb666c",
        "CA": "fbd6d2f5a4e4a15e",
        "CO": "e21c8e4914eef2b3",
        "CT": "e86b380cfefcced5",
        "DE": "3f5897b87d2bf56c",
        "FL": "4ec01c9dbc693497",
        "GA": "7142eb97ae21e839",
        "HI": "9dafd05b1158873b",
        "ID": "4723507d8ce23a60",
        "IL": "f54a2170ff4b15f7",
        "IN": "1010ecfa7d3a40f8",
        "IA": "3cd4c18d3615bbc9",
        "KS": "27c45d804c777999",
        "KY": "6ffcf3b0b904bbcb",
        "LA": "1c73ebb264e145ee",
        "ME": "463f5d9615d7d1be",
        "MD": "dea1eac2d7ef8878",
        "MA": "cd450c94084cbf9b",
        "MI": "67d92742f1ebf307",
        "MN": "9807c5c5f7a2c6ce",
        "MS": "43d2418301bf1a49",
        "MO": "2526edd24c06e60c",
        "MT": "d2ddff69682ae534",
        "NE": "ac9b9070f6d17a9a",
        "NV": "d374fb61a20fb74f",
        "NH": "226b21641df42460",
        "NJ": "65b4760a2b411e11", 
        "NM": "71d65c0e6d94efab",
        "NY": "27485069891a7938",
        "NC": "3b98b02fba3f9753",
        "ND": "7d893ca2441b0c21",
        "OH": "de599025180e2ee7",
        "OK": "bd3d2074a33fbd06",
        "OR": "df7fd3a3b9eff7ee",
        "PA": "dd9c503d6c35364b",
        "RI": "6d50765616ee2e60",
        "SC": "6057f1e35bcc6c20",
        "SD": "d06e595eb3733f42",
        "TN": "7f7d58e5229c6b6c",
        "TX": "e0060cda70f5f341",
        "UT": "1879ace9e02ace61",
        "VT": "9aa25269f04766ab",
        "VA": "5635c19c2b5078d1",
        "WA": "bc3a38d3d5999b4b",
        "WV": "2d83c71ce16cd187",
        "WI": "7dc5c6d3bfb10ccc",
        "WY": "5669366953047e51"
    }

    /*Object to store the average of text to sentiment api*/
    const avgStore =  {
        "AL": null, 
        "AK": null,
        "AZ": null,
        "AR": null,
        "CA": null,
        "CO": null,
        "CT": null,
        "DE": null,
        "FL": null,
        "GA": null,
        "HI": null,
        "ID": null,
        "IL": null,
        "IN": null,
        "IA": null,
        "KS": null,
        "KY": null,
        "LA": null,
        "ME": null,
        "MD": null,
        "MA": null,
        "MI": null,
        "MN": null,
        "MS": null,
        "MO": null,
        "MT": null,
        "NE": null,
        "NV": null,
        "NH": null,
        "NJ": null, 
        "NM": null,
        "NY": null,
        "NC": null,
        "ND": null,
        "OH": null,
        "OK": null,
        "OR": null,
        "PA": null,
        "RI": null,
        "SC": null,
        "SD": null,
        "TN": null,
        "TX": null,
        "UT": null,
        "VT": null,
        "VA": null,
        "WA": null,
        "WV": null,
        "WI": null,
        "WY": null
    }

    /*Test object for smallStates case used in development to avoid rate limits of twitter search api. */
    const smallStates = {
        "AL": "288de3df481163e8", 
        "AZ": "a612c69b44b2e5da",
        "AR": "e8ad2641c1cb666c",
        "WA": "bc3a38d3d5999b4b",
        "CA": "fbd6d2f5a4e4a15e",
        "MI": "67d92742f1ebf307",
    }

    /*Object that stores states full name with state abbr. as keys */
    vm.fullName = {
        "AL": "Alabama", 
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "Califonia",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "FL": "Florida",
        "GA": "Georgia",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucy",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachussetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Misouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey", 
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    }
    

    let deStringify = function(obj) {
 
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));

        return str.join("&");
    }//Used as transform request to conteract angular http request applying stringify to data sent to apis by it. 

    /*Takes array of most expressed emotions for tweets sent to text to emotion api and finds most prevelant emotion for state.*/
    vm.topEmotion = (emotionArr) => {
        let counts = {};
        let compare = 0;
        let mostFrequent = 0;
        let stateEmotion = emotionArr; 
        for(let i = 0, len = stateEmotion.length; i < len; i++){//loops through array of top emotions for tweets in a given state.
            let word = vm.stateEmotion[i];//set current emotion to word.
            if (counts[word] === undefined){
                counts[word] = 1;
            } else {
                counts[word] = counts[word] + 1;//sets value for number of times the emotion appears in array of top emotions adding 1 each time a given emotion is found.
            }
            if (counts[word] > compare){
                compare = counts[word];//sets the number to be compared to the number of times the most frequent emotion expressed so far has been expresed. 
                mostFrequent = stateEmotion[i];//sets the mostFrequent variable to the name of the most frequent emotion expressed so far. 
            }
        }
            return mostFrequent;//function returns the most frequently expressed emotion in array of emotions. 
    }

    /*Set background color of states on map of USA to color based on the average sentinment of top 10 tweets in each state. */
    vm.averageSorter = (num, state) => {
        let avg = num; 
        let ret = state; 

        if(avg > 2.5){
            let color = `#742796`;  
            simplemaps_usmap_mapdata.state_specific[ret].color = color; 
            simplemaps_usmap.refresh_state(ret)
        }
         else if(avg > 1.5){
            let color = "#973490";
            simplemaps_usmap_mapdata.state_specific[ret].color = color; 
            simplemaps_usmap.refresh_state(ret)
         }
         else if(avg > .5){
             let color = "#B8428C";
             simplemaps_usmap_mapdata.state_specific[ret].color = color; 
             simplemaps_usmap.refresh_state(ret)
         } else if(avg > -.5){
            let color = "#E96A8D";
            simplemaps_usmap_mapdata.state_specific[ret].color = color; 
            simplemaps_usmap.refresh_state(ret)
        } else if(avg > -1.5){
            let color = "#EE8B98";
            simplemaps_usmap_mapdata.state_specific[ret].color = color; 
            simplemaps_usmap.refresh_state(ret)
        } else if(avg > -2.5){
            let color = "#F3ACA2";
            simplemaps_usmap_mapdata.state_specific[ret].color = color; 
            simplemaps_usmap.refresh_state(ret)
        } else if(avg >= -5){
            let color = "#F9CDAC";
            simplemaps_usmap_mapdata.state_specific[ret].color = color; 
            simplemaps_usmap.refresh_state(ret)
        }
    }
//  this function populates the colors on the map upon loading
  
/* Sends to the router endpoint search/all/ and to get an object containing tweets of all states and states text to sentiment scores and averages*/
    vm.getAllTweets = () => {  
            return $http({
            method: "GET",
            url: "/search/all/"
         }).then((response) => {
            let stateKeys = Object.keys(states); 
            let smallStateKeys = Object.keys(states);
           
            for(let i = 0; i < stateKeys.length; i++){
                let stateAvg = response.data[stateKeys[i]].avg; 
                let state = stateKeys[i];  
                vm.averageSorter(stateAvg, state);  
            }
         });
        }
    vm.getAllTweets();

  
   /*On click of states on US map send to router endpoint /state/ with the states abbr. and get current top tweets from the state.
     then send each tweet to a text to emotion api and wait for the reutrn for each tweet to be pushed into a new array and sent to a top emotion sorter to get the top emotion expressed in the states tweet. */
    vm.getState = (state) => {
        let theState = states[state]; 
        return $http({
            method: "GET",
            url: "/state/" + theState
        }).then((response) => {
            console.log(response);
            const p = new Promise((resolve, reject) => {
                vm.stateData = { emotion: [], text: []};
                for (let i = 0; i < response.data.text.length; i++) {
                    vm.loopThroughTweets(response.data.text[i]);
                }//loop through all tweets and return http call for each before moving forward. 
                resolve(vm.stateData);
            });
            p.then((response) => {
                console.log(response); 
                let emData = vm.topEmotion(response);//send the loopthroughtweets response to topEmotion function. 
                console.log(emData); 
                return response;
            });
            return p;
        });
    };
    // loopThroughTweets is accessing the text-to-sentiment api
    vm.stateData = { emotion: [], text: []};
    vm.loopThroughTweets = (tweet) => {
        return $http({
            url: "https://apis.paralleldots.com/v3/emotion",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
                'text': tweet,
                'api_key': 'tS1eyB0dc50cFmtNbr5o5YjMDyxMdlCW7FKwuBaOzAo'
            },
            transformRequest: deStringify
        }).then((response) => {
            vm.stateData.emotion.push(response.data.emotion);//push emotions of tweets of clicked on state to global stateData object.
            vm.stateData.text.push(response.config.data.text);//push text analyzed by text to emotion api to global stateData object. 
        });
    };

// To Embed Tweets
    vm.embedTweets = (state) => {
        let theState = states[state];
        return $http({//get current top tweets for clicked on state. 
            method: "GET",
            url: "/state/" + theState
        }).then((response) => {
            console.log(response);
            return response;//return top tweets for clicked on state. 
        })
    }
}

    angular
        .module("App")
        .service("TwitterService", TwitterService)



