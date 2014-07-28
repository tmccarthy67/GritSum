// ******
// Hey Clay - BlackBox stuff below here - please ignore
// ******
var newContractArray = new Array;
var newContract = "";

var nounPhrases = new Array;

var GritData = new Array;
var rootRef = new Firebase('https://gritsum.firebaseio.com/');
var GritSumDataRaw = new Firebase('https://gritsum.firebaseio.com/phrases/');

var auth = new FirebaseSimpleLogin(rootRef, function(error, user) {
  if (error) {
    // an error occurred while attempting login
    console.log("Login Error:", error);
  } else if (user) {
    // user authenticated with Firebase

    $('#social').hide();
    $('#title').show();
    //    $('#search').show(); <!-- placeholder for future development of adding the abililty to search server side (sponsored?) or server side (most popular) or local (previous challenges) -->
    $('#contractConstruction').show();
    $('#legal').hide();

    $('#title').append($('<p>').text('Challenge Creation'))
        if (startPhrases.length ===  0) {
            GritRawPhrases(startGenerator);
        }

    console.log("User ID: " + user.uid + ", Provider: " + user.provider);
  } else {
    console.log("noone logged in ");
    // user is logged out
  }
});

var startPhrases = [];

var verbPhrases = [];

var quantPhrases = [];

var nounPhrases = [];

var rewardPhrases = [];

var timePhrases = [];

var whoPhrases = [];

var verifyPhrases = [];

var GritRawPhrases = function (f) {
    if (startPhrases.length > 0) {
        f();
        return;
    }
    GritSumDataRaw.once('value', function(data) {
        GritData = data.val();

        startPhrases = GritData.startPhrases;
        verbPhrases = GritData.verbPhrases;
        quantPhrases = GritData.nounPhrases.quantity;
        franchisePhrases = GritData.nounPhrases.franchise;
        rewardPhrases = GritData.rewardPhrases;
        verifyPhrases = GritData.verifyPhrases;
        timePhrases = GritData.timePhrases;
        f();
  });
};

var startGenerator = function () {
startConstructor(startPhrases);
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
$('.back').hide();
$('.footer').hide();


$('#fb').on('click', function() {
    // add facebook login functionallity here

    auth.login('facebook');

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
    $('.back').show();

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

            if (verb === keyName) {
                for (var nounKey in franchisePhrases[verb]) {
                    var nounKeyClass = nounKey.replace(/\s/g, "");
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
        var specificNouns = nouns[business];
        $('#nounBuild').append($('<p>').text(output).addClass('question'));

        for (var keyName in nouns) {

            if (business === keyName) {
                for (var nounKey in specificNouns) {
                    var nounClass = "noun" + nounKey;

            $('#nounBuild').append($('<p>').text(specificNouns[nounKey]).addClass(nounClass))
                }

            }
        }

        var attachHandlerNoun = function(nounKey) {
            var nounClick = ".noun" + nounKey;
            $(nounClick).click(function() {
                tempNoun = specificNouns[nounKey];
                newContractArray.push(tempNoun);
                newContract = newContract + tempNoun;

                $('#nounBuild').hide();
                $('#rewardBuild').show();
                rewardConstructor();
            });
        }
        for (var nounKey in specificNouns) {
            attachHandlerNoun(nounKey);
        }
    });
}

var rewardConstructor = function() {
    var output = buildContractFormat(newContractArray);
    $('#rewardBuild').append($('<p>').text(output).addClass('question'))
    for (var keyName in rewardPhrases.combined) {
        var rewardClass = "reward" + keyName;
        $('#rewardBuild').append($('<p>').text(rewardPhrases.combined[keyName]).addClass(rewardClass))
    }

        var attachHandlerReward = function(keyName) {
            var rewardClick = ".reward" + keyName;
            $(rewardClick).click(function () {
                tempReward = rewardPhrases.combined[keyName];
                newContractArray.push(tempReward);
                newContract = newContract + tempReward;

                $('#rewardBuild').hide();
                $('#timeBuild').show();
                timeConstructor();

            });
        }

    for (var keyName in rewardPhrases.combined) {
        attachHandlerReward(keyName);
    }

}

var timeConstructor = function() {
    var output = buildContractFormat(newContractArray);
    $('#timeBuild').append($('<p>').text(output).addClass('question'))

    for (var keyName in timePhrases) {
        var timeClass = "time" + keyName;
        $('#timeBuild').append($('<p>').text(timePhrases[keyName]).addClass(timeClass))
    }

    var attachHandlerTime = function(keyName) {
        var timeClick = ".time" + keyName;
        $(timeClick).click(function() {
            tempTime = timePhrases[keyName];
            newContractArray.push(tempTime);
            newContract = newContract + tempTime;

            $('#timeBuild').hide();
            $('#title').hide();
            $('#verification').show();
            $('#verifyBuild').show();
            verifyConstructor();

        });
    }

    for (var keyName in timePhrases) {
        attachHandlerTime(keyName);
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

            $('#verifyBuild').hide();
            $('#verification').hide();
            $('#sendBuild').show();
            sendConstructor();

        });
    }

    for (i = 0; i < verifyPhrases.length; i++) {
        attachHandlerVerify(i);
    }

}

var sendConstructor = function() {

    $('#sendBuild').append($('<p>').text("Sending to Facebook").addClass('question'));

}


var buildContractFormat = function(CA) {
    var output = "";
    for (i = 0; i < CA.length; i++) {
        output = output + CA[i];
    }
    return output;
}
