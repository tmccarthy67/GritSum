var newContractArray = new Array;
var newContract = "";

var nounPhrases = new Array;

var startPhrases = [
	"First one to ", "Last one to ", "I will "
];

var verbPhrases = [
	"eat ", "drink ", "run "
];

var nounPhrases = [
    {
    "verb": "eat ", // new property for this object
    "noun": "burrito ",
    "phrase": "2 Pancheros burritos "
    },

{
    "verb": "eat ", // new property for this object
    "noun": "pizza ",
    "phrase": "a whole pizza "
    },

{
    "verb": "drink ", // new property for this object
    "noun": "milk ",
    "phrase": "a whole gallon of milk "
    },

{
    "verb": "drink ", // new property for this object
    "noun": "shots ",
    "phrase": "3 shots of Jack "
    },
{
    "verb": "run ", // new property for this object
    "noun": "distance ",
    "phrase": "1 mile in under 7 minutes "
    },

{
    "verb": "run ", // new property for this object
    "noun": "speed ",
    "phrase": "the beer mile "
    }
]

var userEnteredReward = "this reward " //enventually this will be an entry field

var reward = userEnteredReward;

var timeFrame = [
	"immediately ", "24 hours ", "one week "
];

var who = [
	{
		"who": "challenger ",
		"challengesStarted": "challenges started ",
		"challengesCompleted": "challenges completed "
	},
	{
		"who": "challengee ",
		"challengesStarted": "challenges started ",
		"challengesCompleted": "challenges completed "
	}
];

//initial state
$('#logo').show();
$('#social').show();
$('#legal').show();
$('#title').hide();
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
    startConstructor();
})

var startConstructor = function () {
    $('#startBuild').show();

    $('#startBuild').append($('<p>').text('Chose a Starting Phrase').addClass('question'))

    for (i = 0; i < startPhrases.length; i++) {
        var startClass = "start" + i;
        $('#startBuild').append($('<p>').text(startPhrases[i]).addClass(startClass))
    }

    var attachHandler = function(i) {
        var startClick = ".start" + i;
        $(startClick).click(function () {
            tempStart = startPhrases[i];
            newContractArray.push(tempStart);
            newContract = newContract + tempStart

            $('#startBuild').hide();
            $('#verbBuild').show();
            verbConstructor();
        });
    }

    for (i = 0; i < startPhrases.length; i++) {
        attachHandler(i);
    }

}

var verbConstructor = function () {
    var verbText = newContractArray;
    var output = newContractArray[0];
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
    var nounText = newContractArray;
    var output = newContractArray[0] + newContractArray[1]
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
            newContractArray.push(tempNoun);
            newContract = newContract + tempNoun;

            console.log(newContract);
            console.log(newContractArray);

            $('#nounBuild').hide();
            $('#rewardBuild').show();

        });
    }

    for (i = 0; i < nounPhrases.length; i++) {
        attachHandlerNoun(i);
    }

}



            var contract;
            for (i=0;i<newContractArray.length;i++){
                contract = contract + newContractArray[i];
            }

            console.log(contract);
// console.log(who[0].who + "challenges " + who[1].who);
// console.log(startPhrases[0] + nounPhrases[0].verb + nounPhrases[0].phrase + "wins " + reward + "to be paid " + timeFrame[0]);