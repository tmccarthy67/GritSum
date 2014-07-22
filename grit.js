var newContractArray = new Array;

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

$('#fb').on("click", function() {
// add facebook login functionallity here
    $('#social').hide();
    $('#title').show();
//    $('#search').show(); <!-- placeholder for future development of adding the abililty to search server side (sponsored?) or server side (most popular) or local (previous challenges) -->
    $('#contractConstruction').show();
    $('#legal').hide();

    $('#title').append($('<p>').text('Challenge Creation'))
    contractConstructor();
})

var contractConstructor = function () {
    console.log("build the contract");
    $('#startBuild').show();

    $('#startBuild').append($('<p>').text('Chose a Starting Phrase'))
    for (i = 0; i < startPhrases.length; i++) {
    $('#startBuild').append($('<p>').text(startPhrases[i]))
    }
}

// console.log(who[0].who + "challenges " + who[1].who);
// console.log(startPhrases[0] + nounPhrases[0].verb + nounPhrases[0].phrase + "wins " + reward + "to be paid " + timeFrame[0]);