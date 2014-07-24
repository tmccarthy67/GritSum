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
 GritSumDataRaw.once('value', function(data) {
  GritData = data.val();
      if (startPhrases.length === 0) {
      startPhrases = GritData.startPhrases;
      f();
      };
      // if (verbPhrases.length === 0) {
      // verbPhrases = GritData.verbPhrases;
      // f();
      // };
      // if (quantPhrases.length === 0) {
      // quantPhrases = GritData.nounPhrases.quantity;
      // f();
      // };
      // if (verbPhrases.length === 0) {
      // verbPhrases = GritData.verbPhrases;
      // f();
      // };
      // console.log(GritData.nounPhrases);
      // console.log(GritData.nounPhrases.quantity);
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
      return;
  })
};

var startGenerator = function () {
      // startPhrases = GritData.startPhrases;
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
$('#nounBuild').hide();
$('#rewardBuild').hide();
$('#timeBuild').hide();
$('#verifyBuild').hide();
$('#sendBuild').hide();
$('#completedContract').hide();

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

var verbConstructor = function () {
    // var verbText = newContractArray;
    var output = buildContractFormat(newContractArray);
    $('#verbBuild').append($('<p>').text(output).addClass('question'))

    for (i = 0; i < startPhrases.length; i++) {
        var verbClass = "verb" + i;
        $('#verbBuild').append($('<p>').text(verbPhrases[i]).addClass(verbClass))
    }

    var attachHandlerVerb = function(i) {
        var verbClick = ".verb" + i;
        $(verbClick).click(function () {
            tempVerb = verbPhrases[i];
            newContractArray.push(tempVerb);
            newContract = newContract + tempVerb;

            $('#verbBuild').hide();
            $('#nounBuild').show();
            nounConstructor(verbPhrases[i]);
        });
    }

    for (i = 0; i < startPhrases.length; i++) {
        attachHandlerVerb(i);
    }

}

var nounConstructor = function (verb) {
    // var nounText = newContractArray;
    var output = buildContractFormat(newContractArray);
    $('#nounBuild').append($('<p>').text(output).addClass('question'))

    for (i = 0; i < nounPhrases.length; i++) {
        var nounClass = "noun" + i;
        if (verb === nounPhrases[i].verb) {
            $('#nounBuild').append($('<p>').text(nounPhrases[i].phrase).addClass(nounClass))
        }
    }

    var attachHandlerNoun = function(i) {
        var nounClick = ".noun" + i;
        $(nounClick).click(function () {
            tempNoun = nounPhrases[i].phrase;
            newContractArray.push(tempNoun + "wins ");
            newContract = newContract + tempNoun + "wins ";

            $('#nounBuild').hide();
            $('#rewardBuild').show();
            rewardConstructor();

        });
    }

    for (i = 0; i < nounPhrases.length; i++) {
        attachHandlerNoun(i);
    }

}

var rewardConstructor = function (reward) {
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

var timeConstructor = function () {
    // var timeText = newContractArray;
    var output = buildContractFormat(newContractArray);
    $('#timeBuild').append($('<p>').text(output).addClass('question'))

    for (i = 0; i < timePhrases.length; i++) {
        var timeClass = "time" + i;
        $('#timeBuild').append($('<p>').text(timePhrases[i]).addClass(timeClass))
    }

    var attachHandlerTime = function(i) {
        var timeClick = ".time" + i;
        $(timeClick).click(function () {
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

var verifyConstructor = function () {
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
        $(verifyClick).click(function () {
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

var buildContractFormat = function (CA) {
    var output = "";
    for (i = 0; i < CA.length; i++) {
        output = output + CA[i];
    }
    return output;
}

// console.log(who[0].who + "challenges " + who[1].who);
// console.log(startPhrases[0] + nounPhrases[0].verb + nounPhrases[0].phrase + "wins " + reward + "to be paid " + timeFrame[0]);