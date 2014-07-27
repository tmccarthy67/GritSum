// ******
// Hey Clay - BlackBox stuff below here - please ignore
// ******
var newContractArray = new Array;
var newContract = "";

var nounPhrases = new Array;

var GritData = new Array;
var GritSumDataRaw = new Firebase('https://gritsum.firebaseio.com/phrases/');

var startPhrases = [
    // "First one to ", "Last one to ", "I will "
    ];

var verbPhrases = [
    // "eat ", "drink ", "run "
    ];

var quantPhrases = [];

var nounPhrases = [
    //     {
    //     "verb": "eat ", // new property for this object
    //     "noun": "burrito ",
    //     "phrase": "2 Pancheros burritos "
    //     },

    // {
    //     "verb": "eat ", // new property for this object
    //     "noun": "pizza ",
    //     "phrase": "a whole pizza "
    //     },

    // {
    //     "verb": "drink ", // new property for this object
    //     "noun": "milk ",
    //     "phrase": "a whole gallon of milk "
    //     },

    // {
    //     "verb": "drink ", // new property for this object
    //     "noun": "shots ",
    //     "phrase": "3 shots of Jack "
    //     },
    // {
    //     "verb": "run ", // new property for this object
    //     "noun": "distance ",
    //     "phrase": "1 mile in under 7 minutes "
    //     },

    // {
    //     "verb": "run ", // new property for this object
    //     "noun": "speed ",
    //     "phrase": "the beer mile "
    //     }
    ];

var rewardPhrases = [
    // "2 Panchero's Burritos from the loser " , "a free lunch from the loser ", "bragging rights"
    ];

var timePhrases = [
    // "immediately ", " within 24 hours ", "within one week "
    ];

var whoPhrases = [
    // {
    //     "who": "challenger ",
    //     "challengesStarted": "challenges started ",
    //     "challengesCompleted": "challenges completed "
    // },
    // {
    //     "who": "challengee ",
    //     "challengesStarted": "challenges started ",
    //     "challengesCompleted": "challenges completed "
    // }
    ];

var verifyPhrases = [
    //    "no", "yes"
    ];

var GritRawPhrases = function (f) {
    if (startPhrases.length > 0) {
        f();
        return;
    }
    GritSumDataRaw.once('value', function(data) {
        GritData = data.val();

        startPhrases = GritData.startPhrases;
        verbPhrases = GritData.verbPhrases;
        // nounPhrases = GritData.nounPhrases.franchise;
        // console.log(nounPhrases);
        quantPhrases = GritData.nounPhrases.quantity;
        franchisePhrases = GritData.nounPhrases.franchise;
        rewardPhrases = GritData.rewardPhrases;
        // console.log(franchisePhrases.drink);
        // console.log(franchisePhrases.eat);
        // console.log(franchisePhrases.physical);
        f();
      // console.log(GritData.nounPhrases.franchise.drink);
      // console.log(GritData.nounPhrases.franchise.eat);
      // console.log(GritData.nounPhrases.franchise.eat.pancheros);
      // console.log(GritData.nounPhrases.franchise.eat.pizzaHut);
      // console.log(GritData.nounPhrases.franchise.eat.buffaloWildWings);
      // console.log(GritData.nounPhrases.franchise.physical);
      // console.log(GritData.nounPhrases.franchise.physical.bike);
      // console.log(GritData.nounPhrases.franchise.physical.lose);
      // console.log(GritData.nounPhrases.franchise.physical.run);
      // console.log(GritData.rewardPhrases);
      // console.log(GritData.rewardPhrases.loser);
      // console.log(GritData.rewardPhrases.winner);
      // console.log(GritData.timePhrases);
      //return;
  });
};

var startGenerator = function () {
// console.log(startPhrases);
// console.log(startPhrases[0]);
startConstructor(startPhrases);
//return
  };

  var inputContract;

//initial state
$('#logo').show();
$('#social').show();
$('#legal').show();
$('#title').hide();
$('#verification').hide();
$('#search').hide();
$('#contractConstruction').hide();
$('#startBuild').hide();
$('#verbBuild').hide();
$('#quantBuild').hide();
$('#franchiseBuild').hide();
$('#nounBuild').hide();
$('#rewardBuild').hide();
$('#timeBuild').hide();
$('#verifyBuild').hide();
$('#sendBuild').hide();
$('#completedContract').hide();
$('.footer').hide();

$('#fb').on('click', function() {
// add facebook login functionallity here
$('#social').hide();
$('#title').show();
//    $('#search').show(); <!-- placeholder for future development of adding the abililty to search server side (sponsored?) or server side (most popular) or local (previous challenges) -->
$('#contractConstruction').show();
$('#legal').hide();

$('#title').append($('<p>').text('Challenge Creation'))
    if (startPhrases.length ===  0) {
        GritRawPhrases(startGenerator);
    }
});


var startConstructor = function (startPhrases) {
    $('#startBuild').show();
    $('.footer').show();

    $('#startBuild').append($('<p>').text('Choose a Starting Phrase').addClass('question'))

    for (var keyName in startPhrases) {
        var startClass = "start" + keyName;
        $('#startBuild').append($('<p>').text(startPhrases[keyName]).addClass(startClass))
    }

    var attachHandler = function(keyName) {
        var startClick = ".start" + keyName;
        $(startClick).click(function () {
            tempStart = startPhrases[keyName];
            newContractArray.push(tempStart);
            newContract = newContract + tempStart

            $('#startBuild').hide();
            $('#verbBuild').show();
            verbConstructor();
        });
    }

    for (var keyName in startPhrases) {
        attachHandler(keyName);
    }

}

var verbConstructor = function() {
    GritRawPhrases(function() {
        var output = buildContractFormat(newContractArray);
        $('#verbBuild').append($('<p>').text(output).addClass('question'));

        for (var keyName in verbPhrases) {
            var verbClass = "verb" + keyName;
            $('#verbBuild').append($('<p>').text(verbPhrases[keyName]).addClass(verbClass))
        }

        var attachHandlerVerb = function(keyName) {
            var verbClick = ".verb" + keyName;
            $(verbClick).click(function() {
                tempVerb = verbPhrases[keyName];
                newContractArray.push(tempVerb);
                newContract = newContract + tempVerb;

                $('#verbBuild').hide();
                $('#quantBuild').show();
                quantConstructor();
            });
        }

        for (var keyName in verbPhrases) {
            attachHandlerVerb(keyName);
        }
    });
}


var quantConstructor = function() {
    GritRawPhrases(function() {
        var output = buildContractFormat(newContractArray);
        $('#quantBuild').append($('<p>').text(output).addClass('question'));

        for (var keyName in quantPhrases) {
            var quantClass = "quant" + keyName;
            $('#quantBuild').append($('<p>').text(quantPhrases[keyName]).addClass(quantClass))
        }

        var attachHandlerQuant = function(keyName) {
            var quantClick = ".quant" + keyName;
            $(quantClick).click(function() {
                tempQuant = quantPhrases[keyName];
                newContractArray.push(tempQuant);
                newContract = newContract + tempQuant;

                $('#quantBuild').hide();
                $('#franchiseBuild').show();
                franchiseConstructor();
            });
        }
// console.log(keyName);
// console.log(quantPhrases);
        for (var keyName in quantPhrases) {
            attachHandlerQuant(keyName);
        }
    });
}

var franchiseConstructor = function() {
    GritRawPhrases(function() {
        verb = (newContractArray[1]).trim();
        var output = buildContractFormat(newContractArray);
        $('#franchiseBuild').append($('<p>').text(output).addClass('question'));

        for (var keyName in franchisePhrases) {

        // console.log(verb);
        // console.log(franchisePhrases);
        // console.log(franchisePhrases[verb]);
        // console.log(keyName);
        // console.log(verb === keyName);
            if (verb === keyName) {
                for (var nounKey in franchisePhrases[verb]) {
                    var nounKeyClass = nounKey.replace(/\s/g, "");
                    // console.log(nounKey);
            var franchiseClass = "franchise" + nounKeyClass;
            $('#franchiseBuild').append($('<p>').text(nounKey).addClass(franchiseClass))
                }

            }

        }

        var attachHandlerFranchise = function(nounKey) {
            var nounKeyClass = nounKey.replace(/\s/g, "");
            var franchiseClick = ".franchise" + nounKeyClass;
            $(franchiseClick).click(function() {
                tempFranchise = nounKey;
                newContractArray.push(tempFranchise);
                newContract = newContract + tempFranchise;

                $('#franchiseBuild').hide();
                $('#nounBuild').show();
                nounConstructor();
            });
        }
// console.log(verb);
// console.log(keyName);
// console.log(nounKey);
// var test = nounKey;
// var test2 = nounKey.trim();
// console.log(test === test2);
// var test = franchisePhrases[verb];
// console.log(test);
// console.log(test[nounKey]);
        for (var nounKey in franchisePhrases[verb]) {
            attachHandlerFranchise(nounKey);
        }
    });
}


var nounConstructor = function() {
    GritRawPhrases(function() {
        verb = (newContractArray[1]).trim();
        var business = (newContractArray[3]);
        var businessLocation = (business).trim();
        var output = buildContractFormat(newContractArray);
        var nouns = franchisePhrases[verb];
        // console.log(nouns);
        // console.log(business);
        // console.log(businessLocation);
        var specificNouns = nouns[business];
        // console.log(specificNouns);
        $('#nounBuild').append($('<p>').text(output).addClass('question'));

        for (var keyName in nouns) {

        // console.log(keyName);
        // console.log(businessLocation);
        // console.log(business);
        // console.log(franchisePhrases);
        // console.log(verb);
        // console.log(business === keyName);
            if (business === keyName) {
                for (var nounKey in specificNouns) {
        // console.log(nounKey);
        // console.log(specificNouns);
        // console.log(franchisePhrases[verb]);
        // console.log(business);
        // console.log(businessLocation);
                    var nounClass = "noun" + nounKey;
                    // console.log(nounKeyClass);
                    // console.log(nounKey);
                    // console.log(specificNouns);
                    // console.log(specificNouns[nounKey]);
            $('#nounBuild').append($('<p>').text(specificNouns[nounKey]).addClass(nounClass))
                }

            }
        }

        var attachHandlerNoun = function(nounKey) {
            // console.log(nounKey);
            var nounClick = ".noun" + nounKey;
            // console.log(nounClick);
            // console.log(nounClick === nounClass);
            $(nounClick).click(function() {
                // console.log(specificNouns);
                tempNoun = specificNouns[nounKey];
                // console.log(tempNoun);
                newContractArray.push(tempNoun);
                newContract = newContract + tempNoun;

                // console.log(newContract);
                // console.log(newContractArray);

                $('#nounBuild').hide();
                $('#rewardBuild').show();
                rewardConstructor();
            });
        }
// console.log(specificNouns);
// console.log(specificNouns[nounKey]);
        for (var nounKey in specificNouns) {
console.log(nounKey);
console.log(specificNouns);
            attachHandlerNoun(nounKey);
        }
    });
}

var rewardConstructor = function(reward) {
    console.log('done');
    // var rewardText = newContractArray;
    var output = buildContractFormat(newContractArray);
    $('#rewardBuild').append($('<p>').text(output).addClass('question'))

    //  build in ability to have rewards match up with the type of challenge i.e. drinking challenges have drink rewards etc
    for (i = 0; i < rewardPhrases.length; i++) {
        var rewardClass = "reward" + i;
    //     if (verb === rewardPhrases[i].reward) {
        $('#rewardBuild').append($('<p>').text(rewardPhrases[i]).addClass(rewardClass))
    //         }
}

var attachHandlerNoun = function(i) {
    var rewardClick = ".reward" + i;
    $(rewardClick).click(function () {
        tempReward = rewardPhrases[i];
        newContractArray.push(tempReward);
        newContract = newContract + tempReward;

        $('#rewardBuild').hide();
        $('#timeBuild').show();
        timeConstructor();

    });
}

for (i = 0; i < nounPhrases.length; i++) {
    attachHandlerNoun(i);
}

}

var timeConstructor = function() {
    // var timeText = newContractArray;
    var output = buildContractFormat(newContractArray);
    $('#timeBuild').append($('<p>').text(output).addClass('question'))

    for (i = 0; i < timePhrases.length; i++) {
        var timeClass = "time" + i;
        $('#timeBuild').append($('<p>').text(timePhrases[i]).addClass(timeClass))
    }

    var attachHandlerTime = function(i) {
        var timeClick = ".time" + i;
        $(timeClick).click(function() {
            tempTime = timePhrases[i];
            newContractArray.push(tempTime);
            newContract = newContract + tempTime;

            $('#timeBuild').hide();
            $('#title').hide();
            $('#verification').show();
            $('#verifyBuild').show();
            verifyConstructor();

        });
    }

    for (i = 0; i < startPhrases.length; i++) {
        attachHandlerTime(i);
    }

}

var verifyConstructor = function() {
    $('#verification').append($('<p>').text("Contract Verification"));

    var output = buildContractFormat(newContractArray);
    $('#verifyBuild').append($('<p>').text(output).addClass('question'))

    $('#verifyBuild').append($('<p>').text("Is the above contract CORRECT?").addClass('fubar'))
    for (i = 0; i < verifyPhrases.length; i++) {
        var verifyClass = "verify" + i;
        $('#verifyBuild').append($('<p>').text(verifyPhrases[i]).addClass(verifyClass))
    }

    var attachHandlerVerify = function(i) {
        var verifyClick = ".verify" + i;
        $(verifyClick).click(function() {
            tempVerify = verifyPhrases[i];
            // newContractArray.push(tempTime);
            // newContract = newContract + tempTime;

            $('#verifyBuild').hide();
            $('#sendBuild').show();
            //            verifyConstructor();

console.log(newContract);
console.log(newContractArray);
            // verifyConstructor();

        });
    }

    for (i = 0; i < verifyPhrases.length; i++) {
        attachHandlerVerify(i);
    }

}


var buildContractFormat = function(CA) {
    var output = "";
    for (i = 0; i < CA.length; i++) {
        output = output + CA[i];
    }
    return output;
}

// console.log(who[0].who + "challenges " + who[1].who);
// console.log(startPhrases[0] + nounPhrases[0].verb + nounPhrases[0].phrase + "wins " + reward + "to be paid " + timeFrame[0]);