
var newContractArray = new Array;
var newContract;

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
    window.USER = user;

    //alert("Logged in " + localStorage.getItem('authByClick'));
    if (localStorage.getItem('authByClick') == 'yes'){
        startFriendSelector();
        localStorage.setItem('authByClick',  'no');
    }
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

var output;

function initApp(){

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
$('#friendSelector').hide();

$('.startDiv').remove();
$('.verbDiv').remove();
$('.quantDiv').remove();
$('.franchiseDiv').remove();
$('.nounDiv').remove();
$('.timeDiv').remove();
$('.rewardDiv').remove();
$('.verifyDiv').remove();
$('.sendDiv').remove();

newContractArray = [];
newContract = "";
}

initApp();

$('#fb').on('click', function() {
    // add facebook login functionallity here

    localStorage.setItem('authByClick',  'yes');
    auth.login('facebook', {scope:'email,user_friends', preferRedirect:true});
});

$('#nofb').on('click', function (){
    oponent = "";
    startChallengeCreation();
});

var startFriendSelector = function(){
    var token = USER.accessToken;
    $.getJSON("https://graph.facebook.com/me/friends?access_token="+token, function(res){
        console.log(res);
        $('#social').hide();
        $('#legal').hide();

        var section = $('#friendSelector > ul');
        $.each(res.data, function(idx, friend){

            $.getJSON("https://graph.facebook.com/"+friend.id+"?access_token="+token, function(friendDetails){
                console.log("friend info", friendDetails);

                var f = friendDetails;
                //create the list element for this friend
                var imgsrc= 'http://graph.facebook.com/'+f.id+'/picture?height=100&type=normal&width=100';
                var html = "<li id="+f.id+"><a href='#'><img src='"+imgsrc+"' ><h2>"+f.name+"</h2></a></li>";
                section.append($(html));
                $("#"+f.id).on('click', function(){
                    window.oponent = f;
                    startChallengeCreation();
                });
            });

            //atach an event Handler for this friend

        });

        $('#friendSelector').show();
    });

    //startChallengeCreation();

};

var startChallengeCreation = function(){
    $('#social').hide();
    $('#friendSelector').hide();
    $('#title').show();
    //    $('#search').show(); <!-- placeholder for future development of adding the abililty to search server side (sponsored?) or server side (most popular) or local (previous challenges) -->
    $('#contractConstruction').show();
    $('#legal').hide();

    if (oponent != "") {
    var message = oponent.first_name + " has been challenged by " + USER.thirdPartyUserData.first_name};
    $('#title').append($('<p>').text(message));
    if (startPhrases.length ===  0) {
        GritRawPhrases(startGenerator);
    }
}

var startConstructor = function (startPhrases) {
    clearDivs();
    // console.log('start');
    $('#startBuild').show();

    $('#startBuild').append($('<div>').addClass('startDiv'))
    $('.startDiv').append($('<p>').text('Choose a Starting Phrase').addClass('question'))

    for (var keyName in startPhrases) {
        var startClass = "start" + keyName;
        $('.startDiv').append($('<p>').text(startPhrases[keyName]).addClass(startClass))
    }

    var attachHandler = function(keyName) {
        var startClick = ".start" + keyName;
        $(startClick).click(function () {
            // console.log('start handler');
            tempStart = startPhrases[keyName];
            newContractArray.push(tempStart);
            newContract = newContract + tempStart
            // clearDivs();
            $('#startBuild').hide();
            $('#verbBuild').show();
            $('.back').show();
            verbConstructor();
        });
    }

    for (var keyName in startPhrases) {
        attachHandler(keyName);
    }
}

var verbConstructor = function() {
    clearDivs();
    // console.log('verb');

    GritRawPhrases(function() {
        output = buildContractFormat(newContractArray);
        $('#verbBuild').append($('<div>').addClass('verbDiv'))
        $('.verbDiv').append($('<p>').text(output).addClass('question'));
        $('.verbDiv').append($('<div>').attr('id', 'verbBack').addClass('back'))

        for (var keyName in verbPhrases) {
            var verbClass = "verb" + keyName;
            $('.verbDiv').append($('<p>').text(verbPhrases[keyName]).addClass(verbClass))
        }

        $('#verbBack').one('click',function() {
                newContract = "";
                newContractArray = [];
                    // console.log('verb handler');

                // clearDivs();

                $('.back').hide();
                $('#startBuild').show();
                $('#verbBuild').hide();
                startConstructor(startPhrases);
        });

        var attachHandlerVerb = function(keyName) {
            var verbClick = ".verb" + keyName;
            $(verbClick).click(function() {
                tempVerb = verbPhrases[keyName];
                newContractArray.push(tempVerb);
                newContract = output + tempVerb;

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
    clearDivs();
    // console.log('quant');
    GritRawPhrases(function() {
        var output = buildContractFormat(newContractArray);
        $('#quantBuild').append($('<div>').addClass('quantDiv'));
        $('.quantDiv').append($('<p>').text(output).addClass('question'));
        $('.quantDiv').append($('<div>').attr('id', 'quantBack').addClass('back'))

        for (var keyName in quantPhrases) {
            var quantClass = "quant" + keyName;
            $('.quantDiv').append($('<p>').text(quantPhrases[keyName]).addClass(quantClass))
        }

            $('#quantBack').one('click',function() {
                    // console.log('quant handler');
                // clearDivs();
                newContractArray.splice(1,1);
                output = buildContractFormat(newContractArray);
                $('#verbBuild').show();
                $('#quantBuild').hide();
                verbConstructor();
            });

        var attachHandlerQuant = function(keyName) {
            var quantClick = ".quant" + keyName;
            $(quantClick).click(function() {
                tempQuant = quantPhrases[keyName];
                newContractArray.push(tempQuant);
                newContract = output + tempQuant;

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
    clearDivs();
    // console.log('franchise');
    GritRawPhrases(function() {
        verb = (newContractArray[1]).trim();
        var output = buildContractFormat(newContractArray);
        $('#franchiseBuild').append($('<div>').addClass('franchiseDiv'))
        $('.franchiseDiv').append($('<p>').text(output).addClass('question'));
        $('.franchiseDiv').append($('<div>').attr('id', 'franchiseBack').addClass('back'))

        for (var keyName in franchisePhrases) {
            if (verb === keyName) {
                for (var nounKey in franchisePhrases[verb]) {
                    var nounKeyClass = nounKey.replace(/\s/g, "");
                    if (nounKeyClass === "anyLocation") {
                        tempFranchise = ""
                        newContractArray.push(tempFranchise);
                        newContract = output + tempFranchise;

                        clearDivs();

                        $('#franchiseBuild').hide();
                        $('#nounBuild').show();
                        nounConstructor();
                    }
                    var franchiseClass = "franchise" + nounKeyClass;
                    $('.franchiseDiv').append($('<p>').text(nounKey).addClass(franchiseClass))
                }

            }

        }

         $('#franchiseBack').one('click',function() {
            // console.log('franchise handler');

            // clearDivs();

            newContractArray.splice(2,1);
            output = buildContractFormat(newContractArray);
            $('#quantBuild').show();
            $('#franchiseBuild').hide();
            quantConstructor();
        })

       var attachHandlerFranchise = function(nounKey) {
            var nounKeyClass = nounKey.replace(/\s/g, "");
            var franchiseClick = ".franchise" + nounKeyClass;

            $(franchiseClick).one('click',function() {
                tempFranchise = nounKey;
                newContractArray.push(tempFranchise);
                newContract = output + tempFranchise;

                $('#franchiseBuild').hide();
                $('#nounBuild').show();
                nounConstructor();
            });
        }
        var nounPhraseVerb = franchisePhrases[verb];
        for (var nounKey in nounPhraseVerb) {
            // console.log(nounPhraseVerb);
            attachHandlerFranchise(nounKey);
        }
    });
}

var nounConstructor = function() {
    clearDivs();
    // console.log('noun');
    GritRawPhrases(function() {
        verb = (newContractArray[1]).trim();
        var business = (newContractArray[3]);
        var businessLocation = (business).trim();
        var output = buildContractFormat(newContractArray);
        var nouns = franchisePhrases[verb];
        var specificNouns = nouns[business];

        $('#nounBuild').append($('<div>').addClass('nounDiv'))
        $('.nounDiv').append($('<p>').text(output).addClass('question'));
        $('.nounDiv').append($('<div>').attr('id', 'nounBack').addClass('back'))

        for (var keyName in nouns) {

            if (business === keyName) {
                for (var nounKey in specificNouns) {
                    var nounClass = "noun" + nounKey;

                    $('.nounDiv').append($('<p>').text(specificNouns[nounKey]).addClass(nounClass))
                }

            }

        }

        if (keyName === "anyLocation") {
         for (var nounKey in nouns) {
            var nounList = nouns[nounKey];
            for (var keySharp in nounList) {
                var nounClass = "noun" + keySharp;
                $('.nounDiv').append($('<p>').text(nounList[keySharp]).addClass(nounClass))
            }
        }
    }

             $('#nounBack').one('click',function() {
                    // console.log('noun handler');

                // clearDivs();

                $('#quantBuild').show();
                $('#nounBuild').hide();
                newContractArray.splice(2,2);
                output = buildContractFormat(newContractArray);
                quantConstructor();
            });

       //Handler for anyLocations
        var attachHandlerNoun = function(keyList, nounList) {

            var nounClick = ".noun" + keyList;
            $(nounClick).click(function() {
                tempNoun = nounList[keyList];
                newContractArray.push(tempNoun);
                newContract = output + tempNoun;
                $('#nounBuild').hide();
                $('#rewardBuild').show();
                rewardConstructor();
            });
        }

        for (var keyList in nounList) {
            attachHandlerNoun(keyList, nounList);
        }

        //Handler for all except anyLocaitons
        var attachHandlerNounAll = function(keyNoun, specificNouns) {
            var nounClick = ".noun" + keyNoun;
            $(nounClick).click(function() {
                tempNoun = specificNouns[keyNoun];
                newContractArray.push(tempNoun);
                newContract = output + tempNoun;
                $('#nounBuild').hide();
                $('#rewardBuild').show();
                rewardConstructor();
            });
        }

        for (var keyNoun in specificNouns) {
            attachHandlerNounAll(keyNoun, specificNouns);
        }

    });
}

var rewardConstructor = function() {
    clearDivs();
    // console.log('reward');
    var output = buildContractFormat(newContractArray);
    $('#rewardBuild').append($('<div>').addClass('rewardDiv'))
    $('.rewardDiv').append($('<p>').text(output).addClass('question'))
        $('.rewardDiv').append($('<div>').attr('id', 'rewardBack').addClass('back'))
    var rewardCombined = rewardPhrases.combined;
    for (var keyName in rewardCombined) {
        var rewardClass = "reward" + keyName;
        $('.rewardDiv').append($('<p>').text(rewardPhrases.combined[keyName]).addClass(rewardClass))
    }

         $('#rewardBack').one('click',function () {
            // console.log('reward handler');
            // clearDivs();
            newContractArray.splice(4,1);
            output = buildContractFormat(newContractArray);
            $('#rewardBuild').hide();
            $('#nounBuild').show();
           nounConstructor();
        });

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

        var rewardPhrasesCombined = rewardPhrases.combined
        for (var keyName in rewardPhrasesCombined) {
            attachHandlerReward(keyName);
        }
}

var timeConstructor = function() {
    clearDivs();
    // console.log('time');
    var output = buildContractFormat(newContractArray);
    $('#timeBuild').append($('<div>').addClass('timeDiv'));
    $('.timeDiv').append($('<p>').text(output).addClass('question'))
    $('.timeDiv').append($('<div>').attr('id', 'timeBack').addClass('back'))

    for (var keyName in timePhrases) {
        var timeClass = "time" + keyName;
        $('.timeDiv').append($('<p>').text(timePhrases[keyName]).addClass(timeClass))
    }

         $('#timeBack').one('click',function() {
            // console.log('time handler');
            // clearDivs();

            newContractArray.splice(5,1);
            output = buildContractFormat(newContractArray);
            $('#rewardBuild').show();
            $('#timeBuild').hide();
            rewardConstructor();
        })

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
    clearDivs();
    // console.log('verify');
    $('.verificationTextDiv').remove();
    $('#verification').append($('<div>').addClass('verificationTextDiv'))
    $('.verificationTextDiv').append($('<p>').text("Contract Verification"));

    var output = buildContractFormat(newContractArray);
    $('#verifyBuild').append($('<div>').addClass('verifyDiv'))
    $('.verifyDiv').append($('<p>').text(output).addClass('question'))

    $('.verifyDiv').append($('<p>').text("Is the above contract CORRECT?").addClass('fubar'))
     $('.verifyDiv').append($('<div>').attr('id', 'verifyBack').addClass('back'))

   for (i = 0; i < verifyPhrases.length; i++) {
        var verifyClass = "verify" + i;
        $('.verifyDiv').append($('<p>').text(verifyPhrases[i]).addClass(verifyClass))
    }
        $(verifyBack).one('click',function() {
                // clearDivs();
            newContractArray.splice(6,1);
            output = buildContractFormat(newContractArray);
            $('#verification').hide();
            $('#verifyBuild').hide();
            $('#timeBuild').show();
            timeConstructor();
        })

    var attachHandlerVerify = function(i) {
        var verifyClick = ".verify" + i;
        $(verifyClick).click(function() {
        if (verifyClick === ".verify0") {
            $('#startBuild').show();
            $('#verifyBuild').hide();
            // console.log('verify handler');
            newContractArray = [];
            newContract = "";
            startConstructor(startPhrases);
        } else {
            tempVerify = verifyPhrases[i];

            $('#verifyBuild').hide();
            $('#verification').hide();
            $('#sendBuild').show();
            sendConstructor();
        };
    });
    }

    for (i = 0; i < verifyPhrases.length; i++) {
        attachHandlerVerify(i);
    }
}




var sendConstructor = function() {

    clearDivs();
    $('#sendBuild').append($('<div>').addClass('sendDiv'));
    $('.sendDiv').append($('<p>').text("Sending to Facebook").addClass('question'));
    $('.sendDiv').append($('<div>').attr('id', 'sendBack').addClass('back'))


    console.log("AUTH RESPONSE", FB.getAuthResponse());


    FB.ui({method: 'apprequests',
      message: buildContractFormat(newContractArray),
      to: window.oponent.id,
    }, function(response){
        console.log(response);
        initApp();
        startFriendSelector();
    });


//>>>>>>> c267d35891fbd95642cb279cedcb5cba43d34ab3
}

var buildContractFormat = function(CA) {
    var output = "";
    for (i = 0; i < CA.length; i++) {
        output = output + CA[i];
    }
    return output;
}

var clearDivs = function () {
    // console.log('clearDivs');
    $('.startDiv').remove();
    $('.verbDiv').remove();
    $('.quantDiv').remove();
    $('.franchiseDiv').remove();
    $('.nounDiv').remove();
    $('.timeDiv').remove();
    $('.rewardDiv').remove();
    $('.verifyDiv').remove();
    $('.sendDiv').remove();
    // return;
}
