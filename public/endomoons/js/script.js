$(document).ready(function() {
        	
	var mercurySystem = [
		{
			name : 'Mercury',
			type : 'planet',
			diameter : 4879.4,
			semimajorAxis : 0,
			orbitalPeriod : 0,
			orbitalDirection : 'prograde',
		},
	];
	var venusSystem = [
		{
			name : 'Venus',
			type : 'planet',
			diameter : 12103.6,
			semimajorAxis : 0,
			orbitalPeriod : 0,
			orbitalDirection : 'prograde',
		},
	];
	var earthSystem = [
		{
			name : 'Earth',
			type : 'planet',
			diameter : 12742,
			semimajorAxis : 0,
			orbitalPeriod : 0,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Luna',
			type : 'moon',
			diameter : 3474.2,
			semimajorAxis : 384399,
			orbitalPeriod : 27.321582,
			orbitalDirection : 'prograde',
		},
	];
	var marsSystem = [
		{
			name : 'Mars',
			type : 'planet',
			diameter : 6792.4,
			semimajorAxis : 0,
			orbitalPeriod : 0,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Phobos',
			type : 'moon',
			diameter : 22.2,
			semimajorAxis : 9377,
			orbitalPeriod : 7.66,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Deimos',
			type : 'moon',
			diameter : 12.6,
			semimajorAxis : 23460,
			orbitalPeriod : 30.35,
			orbitalDirection : 'prograde',
		},
	];
	var jupiterSystem = [
		{
			name : 'Jupiter',
			type : 'planet',
			diameter : 139822,
			semimajorAxis : 0,
			orbitalPeriod : 0,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Metis',
			type : 'moon',
			diameter : 45,
			semimajorAxis : 127690,
			orbitalPeriod : 0.29478,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Adrastea',
			type : 'moon',
			diameter : 17,
			semimajorAxis : 128690,
			orbitalPeriod : 0.29826,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Amalthea',
			type : 'moon',
			diameter : 167,
			semimajorAxis : 181366,
			orbitalPeriod : 0.49818,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Thebe',
			type : 'moon',
			diameter : 99,
			semimajorAxis : 221889,
			orbitalPeriod : 0.67450,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Io',
			type : 'moon',
			diameter : 3642.6,
			semimajorAxis : 421700,
			orbitalPeriod : 1.7691,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Europa',
			type : 'moon',
			diameter : 3121.6,
			semimajorAxis : 671034,
			orbitalPeriod : 3.5512,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Ganymede',
			type : 'moon',
			diameter : 5262.4,
			semimajorAxis : 1070412,
			orbitalPeriod : 7.1546,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Callisto',
			type : 'moon',
			diameter : 4820.6,
			semimajorAxis : 1882709,
			orbitalPeriod : 16.689,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Himalia',
			type : 'moon',
			diameter : 170,
			semimajorAxis : 11451971,
			orbitalPeriod : 250.23,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Lysithea',
			type : 'moon',
			diameter : 36,
			semimajorAxis : 11740560,
			orbitalPeriod : 259.89,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Elara',
			type : 'moon',
			diameter : 86,
			semimajorAxis : 11778034,
			orbitalPeriod : 257.62,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Ananke',
			type : 'moon',
			diameter : 28,
			semimajorAxis : 21454952,
			orbitalPeriod : 640.38,
			orbitalDirection : 'retrograde',
		},
		{
			name : 'Carme',
			type : 'moon',
			diameter : 46,
			semimajorAxis : 23197992,
			orbitalPeriod : 763.95,
			orbitalDirection : 'retrograde',
		},
		{
			name : 'Pasiphae',
			type : 'moon',
			diameter : 60,
			semimajorAxis : 23609042,
			orbitalPeriod : 739.80,
			orbitalDirection : 'retrograde',
		},
		{
			name : 'Sinope',
			type : 'moon',
			diameter : 38,
			semimajorAxis : 24057865,
			orbitalPeriod : 739.33,
			orbitalDirection : 'retrograde',
		},
	];
	var saturnSystem = [
		{
			name : 'Saturn',
			type : 'planet',
			diameter : 120536,
			semimajorAxis : 0,
			orbitalPeriod : 0,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Pan',
			type : 'moon',
			diameter : 28.2,
			semimajorAxis : 133584,
			orbitalPeriod : 0.5751,
			orbitalDirection : 'prograde',
		},
// Too small
/*
		{
			name : 'Daphnis',
			type : 'moon',
			diameter : 7.6,
			semimajorAxis : 136505,
			orbitalPeriod : 0.5941,
			orbitalDirection : 'prograde',
		},
*/
		{
			name : 'Atlas',
			type : 'moon',
			diameter : 30.2,
			semimajorAxis : 137670,
			orbitalPeriod : 0.6017,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Prometheus',
			type : 'moon',
			diameter : 86.2,
			semimajorAxis : 139380,
			orbitalPeriod : 0.6130,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Pandora',
			type : 'moon',
			diameter : 81.4,
			semimajorAxis : 141720,
			orbitalPeriod : 0.6285,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Epimetheus',
			type : 'moon',
			diameter : 116.2,
			semimajorAxis : 151422,
			orbitalPeriod : 0.6943,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Janus',
			type : 'moon',
			diameter : 179.0,
			semimajorAxis : 151472,
			orbitalPeriod : 0.6947,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Mimas',
			type : 'moon',
			diameter : 396.4,
			semimajorAxis : 185404,
			orbitalPeriod : 0.9424,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Enceladus',
			type : 'moon',
			diameter : 504.2,
			semimajorAxis : 237950,
			orbitalPeriod : 1.3702,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Tethys',
			type : 'moon',
			diameter : 1062,
			semimajorAxis : 294619,
			orbitalPeriod : 1.8878,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Telesto',
			type : 'leadingTrojan',
			diameter : 25,
			semimajorAxis : 294619,
			orbitalPeriod : 1.8878,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Calypso',
			type : 'trailingTrojan',
			diameter : 21,
			semimajorAxis : 294619,
			orbitalPeriod : 1.8878,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Dione',
			type : 'moon',
			diameter : 1122.8,
			semimajorAxis : 377396,
			orbitalPeriod : 2.7370,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Helene',
			type : 'leadingTrojan',
			diameter : 35,
			semimajorAxis : 377396,
			orbitalPeriod : 2.7370,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Rhea',
			type : 'moon',
			diameter : 1527,
			semimajorAxis : 527108,
			orbitalPeriod : 4.5182,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Titan',
			type : 'moon',
			diameter : 5151,
			semimajorAxis : 1221930,
			orbitalPeriod : 15.9454,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Hyperion',
			type : 'moon',
			diameter : 270,
			semimajorAxis : 1481010,
			orbitalPeriod : 21.2766,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Iapetus',
			type : 'moon',
			diameter : 1468.6,
			semimajorAxis : 3560820,
			orbitalPeriod : 79.3215,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Phoebe',
			type : 'moon',
			diameter : 213,
			semimajorAxis : 12869700,
			orbitalPeriod : 545.09,
			orbitalDirection : 'retrograde',
		},
		{
			name : 'Paaliaq',
			type : 'moon',
			diameter : 22,
			semimajorAxis : 15103400,
			orbitalPeriod : 692.98,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Albiorix',
			type : 'moon',
			diameter : 32,
			semimajorAxis : 16266700,
			orbitalPeriod : 774.58,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Siarnaq',
			type : 'moon',
			diameter : 40,
			semimajorAxis : 17776600,
			orbitalPeriod : 884.88,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Ymir',
			type : 'moon',
			diameter : 18,
			semimajorAxis : 22429673,
			orbitalPeriod : 1254.15,
			orbitalDirection : 'retrograde',
		},
	];
	var uranusSystem = [
		{
			name : 'Uranus',
			type : 'planet',
			diameter : 51118,
			semimajorAxis : 0,
			orbitalPeriod : 0,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Cordelia',
			type : 'moon',
			diameter : 40,
			semimajorAxis : 49770,
			orbitalPeriod : 0.3350,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Ophelia',
			type : 'moon',
			diameter : 43,
			semimajorAxis : 53790,
			orbitalPeriod : 0.3764,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Bianca',
			type : 'moon',
			diameter : 51,
			semimajorAxis : 59170,
			orbitalPeriod : 0.4346,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Cressida',
			type : 'moon',
			diameter : 80,
			semimajorAxis : 61780,
			orbitalPeriod : 0.4636,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Desdemona',
			type : 'moon',
			diameter : 65,
			semimajorAxis : 62680,
			orbitalPeriod : 0.4737,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Juliet',
			type : 'moon',
			diameter : 95,
			semimajorAxis : 64350,
			orbitalPeriod : 0.4931,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Portia',
			type : 'moon',
			diameter : 136,
			semimajorAxis : 66090,
			orbitalPeriod : 0.5132,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Rosalind',
			type : 'moon',
			diameter : 72,
			semimajorAxis : 69940,
			orbitalPeriod : 0.5585,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Cupid',
			type : 'moon',
			diameter : 18,
			semimajorAxis : 74800,
			orbitalPeriod : 0.618,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Belinda',
			type : 'moon',
			diameter : 90,
			semimajorAxis : 75260,
			orbitalPeriod : 0.6235,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Perdita',
			type : 'moon',
			diameter : 30,
			semimajorAxis : 76400,
			orbitalPeriod : 0.638,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Puck',
			type : 'moon',
			diameter : 162,
			semimajorAxis : 86010,
			orbitalPeriod : 0.7618,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Mab',
			type : 'moon',
			diameter : 25,
			semimajorAxis : 97700,
			orbitalPeriod : 0.923,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Miranda',
			type : 'moon',
			diameter : 471.6,
			semimajorAxis : 129390,
			orbitalPeriod : 1.413479,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Ariel',
			type : 'moon',
			diameter : 1157.8,
			semimajorAxis : 191020,
			orbitalPeriod : 2.520379,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Umbriel',
			type : 'moon',
			diameter : 1169.4,
			semimajorAxis : 266300,
			orbitalPeriod : 4.144177,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Titania',
			type : 'moon',
			diameter : 1576.8,
			semimajorAxis : 435910,
			orbitalPeriod : 8.705872,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Oberon',
			type : 'moon',
			diameter : 1522.8,
			semimajorAxis : 583520,
			orbitalPeriod : 13.463239,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Francisco',
			type : 'moon',
			diameter : 22,
			semimajorAxis : 4276000,
			orbitalPeriod : 266.56,
			orbitalDirection : 'retrograde',
		},
		{
			name : 'Caliban',
			type : 'moon',
			diameter : 72,
			semimajorAxis : 7230000,
			orbitalPeriod : 579.50,
			orbitalDirection : 'retrograde',
		},
		{
			name : 'Stephano',
			type : 'moon',
			diameter : 32,
			semimajorAxis : 8002000,
			orbitalPeriod : 676.50,
			orbitalDirection : 'retrograde',
		},
		{
			name : 'Trinculo',
			type : 'moon',
			diameter : 18,
			semimajorAxis : 8571000,
			orbitalPeriod : 758.10,
			orbitalDirection : 'retrograde',
		},
		{
			name : 'Sycorax',
			type : 'moon',
			diameter : 150,
			semimajorAxis : 12179000,
			orbitalPeriod : 1283.4,
			orbitalDirection : 'retrograde',
		},
		{
			name : 'Margaret',
			type : 'moon',
			diameter : 20,
			semimajorAxis : 14345000,
			orbitalPeriod : 1694.8,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Prospero',
			type : 'moon',
			diameter : 50,
			semimajorAxis : 16418000,
			orbitalPeriod : 1992.8,
			orbitalDirection : 'retrograde',
		},
		{
			name : 'Setebos',
			type : 'moon',
			diameter : 48,
			semimajorAxis : 17459000,
			orbitalPeriod : 2202.3,
			orbitalDirection : 'retrograde',
		},
		{
			name : 'Ferdinand',
			type : 'moon',
			diameter : 20,
			semimajorAxis : 20900000,
			orbitalPeriod : 2823.4,
			orbitalDirection : 'retrograde',
		},
	];
	var neptuneSystem = [
		{
			name : 'Neptune',
			type : 'planet',
			diameter : 49528,
			semimajorAxis : 0,
			orbitalPeriod : 0,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Naiad',
			type : 'moon',
			diameter : 66,
			semimajorAxis : 48227,
			orbitalPeriod : 0.294,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Thalassa',
			type : 'moon',
			diameter : 82,
			semimajorAxis : 50074,
			orbitalPeriod : 0.311,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Despina',
			type : 'moon',
			diameter : 150,
			semimajorAxis : 52526,
			orbitalPeriod : 0.335,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Galatea',
			type : 'moon',
			diameter : 176,
			semimajorAxis : 61953,
			orbitalPeriod : 0.429,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Larissa',
			type : 'moon',
			diameter : 194,
			semimajorAxis : 73548,
			orbitalPeriod : 0.555,
			orbitalDirection : 'prograde',
		},
// Unnamed
/*
		{
			name : 'unnamed',
			type : 'moon',
			diameter : 18,
			semimajorAxis : 105283,
			orbitalPeriod : 0.9362,
			orbitalDirection : 'prograde',
		},
*/
		{
			name : 'Proteus',
			type : 'moon',
			diameter : 420,
			semimajorAxis : 117646,
			orbitalPeriod : 1.122,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Triton',
			type : 'moon',
			diameter : 2705.2,
			semimajorAxis : 354759,
			orbitalPeriod : 5.877,
			orbitalDirection : 'retrograde',
		},
		{
			name : 'Nereid',
			type : 'moon',
			diameter : 340,
			semimajorAxis : 5513818,
			orbitalPeriod : 360.13,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Halimede',
			type : 'moon',
			diameter : 62,
			semimajorAxis : 16611000,
			orbitalPeriod : 1879.08,
			orbitalDirection : 'retrograde',
		},
		{
			name : 'Sao',
			type : 'moon',
			diameter : 44,
			semimajorAxis : 22228000,
			orbitalPeriod : 2912.72,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Laomedeia',
			type : 'moon',
			diameter : 42,
			semimajorAxis : 23567000,
			orbitalPeriod : 3171.33,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Psamathe',
			type : 'moon',
			diameter : 40,
			semimajorAxis : 48096000,
			orbitalPeriod : 9074.30,
			orbitalDirection : 'retrograde',
		},
		{
			name : 'Neso',
			type : 'moon',
			diameter : 60,
			semimajorAxis : 49285000,
			orbitalPeriod : 9740.73,
			orbitalDirection : 'retrograde',
		},
	];
	var plutoSystem = [
		{
			name : 'Pluto',
			type : 'moon',
			diameter : 2306,
			semimajorAxis : 2035,
			orbitalPeriod : 6.38723,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Charon',
			type : 'moon',
			diameter : 1207,
			semimajorAxis : 17536,
			orbitalPeriod : 6.38723,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Styx',
			type : 'moon',
			diameter : 17.5,	// between 10 and 25
			semimajorAxis : 42000,
			orbitalPeriod : 20.2,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Nix',
			type : 'moon',
			diameter : 91.5,	// between 46 and 137
			semimajorAxis : 48708,
			orbitalPeriod : 24.856,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Kerberos',
			type : 'moon',
			diameter : 23.5,	// between 13 and 34
			semimajorAxis : 59000,
			orbitalPeriod : 32.1,
			orbitalDirection : 'prograde',
		},
		{
			name : 'Hydra',
			type : 'moon',
			diameter : 114,		// between 61 and 167
			semimajorAxis : 64749,
			orbitalPeriod : 38.206,
			orbitalDirection : 'prograde',
		},
	];
	
	var allSystems = [mercurySystem, venusSystem, earthSystem, marsSystem, jupiterSystem, saturnSystem, uranusSystem, neptuneSystem, plutoSystem,];
	var activeBodies = [];
	var activeSingleSystem = [];
	
	// Factors by which bodies and orbits are scaled, they begin scaled down
	var bodyScaleFactor = 1/1000;	// 1 point on screen = 1000 km
	var orbitScaleFactor = 1/1000;	// 1 point on screen = 1000 km
/* 	var timeScaleFactor = 1;		// 1 second on screen = 1 day */
	
	// Various variable dealing with Options and such
	var lockScales = false;
/* 	var multiSystem = false; */
	var showLabels = false;
	var showPlanet = true;
	var showOrbits = true;
	var sphericalOnly = false;		// Hides Proteus and all natural satellites less than 396 km in diameter, which means only moons which have been rounded to a near sphere by their own gravity remain visible
	
	var playOrbits = false;
			
	function scaleBodies(x) {
		bodyScaleFactor *= x;
		for (i = 0; i < activeBodies.length; i++) {
			$('#' + activeBodies[i].name).animate({
				'width' : activeBodies[i].diameter * bodyScaleFactor,
				'height' : activeBodies[i].diameter * bodyScaleFactor,
				'margin-top' : activeBodies[i].diameter * bodyScaleFactor / -2,
				'margin-left' : activeBodies[i].diameter * bodyScaleFactor / -2,
			});
		}
	}
	function scaleOrbits(x) {
		orbitScaleFactor *= x;
		for (i = 0; i < activeBodies.length; i++) {
			$('#' + activeBodies[i].name + '_orbit').animate({
				'width' : activeBodies[i].semimajorAxis * orbitScaleFactor * 2,
				'height' : activeBodies[i].semimajorAxis * orbitScaleFactor * 2,
				'margin-top' : activeBodies[i].semimajorAxis * orbitScaleFactor * -1,
				'margin-left' : activeBodies[i].semimajorAxis * orbitScaleFactor * -1,
			});
		}
	}
	
	// Creates the markup, applies styles, and positions all the bodies
	function displaySystem(a) {
		$('<div id="' + a.name + '_orbit" class="orbit orbital_motion"><div id="' + a.name + '" class="body ' + a.type + '"></div></div>').prependTo('#space');
		$('#' + a.name).css({
			'width' : a.diameter * bodyScaleFactor,
			'height' : a.diameter * bodyScaleFactor,
			'margin-top' : a.diameter * bodyScaleFactor / -2,
			'margin-left' : a.diameter * bodyScaleFactor / -2,
		});
		$('#' + a.name + '_orbit').css({
			'width' : a.semimajorAxis * orbitScaleFactor * 2,
			'height' : a.semimajorAxis * orbitScaleFactor * 2,
			'margin-top' : a.semimajorAxis * orbitScaleFactor * -1,
			'margin-left' : a.semimajorAxis * orbitScaleFactor * -1,
		});
		
		// Special Cases
		if ( a.name == 'Pluto' ) {
			$('#' + a.name).css({
				'position' : 'relative',
				'bottom' : '-100%',
				'top' : 'auto',
			});
		}
		if ( a.type == 'leadingTrojan' ) {
			$('#' + a.name).css({
				'bottom' : '75%',
				'left' : '6.69875%',
				'top' : 'auto',
			});
		}
		if ( a.type == 'trailingTrojan' ) {
			$('#' + a.name).css({
				'bottom' : '75%',
				'left' : '93.301270%',
				'top' : 'auto',
			});
		}			
	}
	
	function orbitAnimationLogic() {
		for (i = 0; i < activeBodies.length; i++) {
			if ( activeBodies[i].orbitalDirection == 'prograde' ) {
				$('#' + activeBodies[i].name + '_orbit').css({
				    '-webkit-animation' : 'orbitPrograde ' + activeBodies[i].orbitalPeriod + 's linear infinite',
				    'animation' : 'orbitPrograde ' + activeBodies[i].orbitalPeriod + 's linear infinite',
				});
			} else if ( activeBodies[i].orbitalDirection == 'retrograde' ) {
				$('#' + activeBodies[i].name + '_orbit').css({
				    '-webkit-animation' : 'orbitRetrograde ' + activeBodies[i].orbitalPeriod + 's linear infinite',
				    'animation' : 'orbitRetrograde ' + activeBodies[i].orbitalPeriod + 's linear infinite',
				});
			}
			if ( playOrbits == true ) {
				$('#' + activeBodies[i].name + '_orbit').addClass('play');
			} else if ( playOrbits == false ) {
				$('#' + activeBodies[i].name + '_orbit').addClass('pause');
			}
		}
	}
	
	// Decide if non-spherical moons should be displayed (including their orbits) based on the value of the sphericalOnly variable, and if that variable should be toggled or not
	function sphericalLogic( speed ) {
		if ( sphericalOnly == true ) {
			for ( i = 0; i < activeBodies.length; i++ ) {
				if ( activeBodies[i].diameter < 396 || activeBodies[i].name == 'Proteus' ) {
					$('#' + activeBodies[i].name + ', #' + activeBodies[i].name + '_orbit').addClass('sphericalOnly', speed);
				}
			}
		} else if ( sphericalOnly == false ) {
			for ( i = 0; i < activeBodies.length; i++ ) {
				if ( activeBodies[i].diameter < 396 || activeBodies[i].name == 'Proteus' ) {
					$('#' + activeBodies[i].name + ', #' + activeBodies[i].name + '_orbit').removeClass('sphericalOnly', speed);
				}
			}
		}
	}
	
	function orbitsLogic(speed) {
		if ( showOrbits == false ) {
			$('.orbit').addClass('hideOrbits', speed);
		} else if ( showOrbits == true ) {
			$('.orbit').removeClass('hideOrbits', speed);
		}
	}

	function planetLogic(speed) {
		if ( showPlanet == false ) {
			$('.planet').fadeOut(speed);
		} else if ( showPlanet == true ) {
			$('.planet').fadeIn(speed);
		}
	}
	function infoHeight() {
		var remainingHeight = $(window).height() - $('#darken img').height() - 45;
		$('#information').css('height', remainingHeight);
	}
	
	// Labels
	function labelsLogic() {
		if ( showLabels == true ) {
			for (i = 0; i < activeBodies.length; i++) {
				$('<tr><td><table id="' + activeBodies[i].name + '" cellpadding="0px" cellspacing="0px" class="' + activeBodies[i].type + '"><thead><tr><th colspan="2" class="showData">' + activeBodies[i].name + '</th></tr></thead><tbody><tr title="diameter"><td>d</td><td>' + activeBodies[i].diameter + ' km</td></tr><tr title="semi-major axis"><td>s</td><td>' + activeBodies[i].semimajorAxis + ' km</td></tr><tr title="period"><td>p</td><td>' + activeBodies[i].orbitalPeriod + ' days</td></tr></tbody></table></td></tr>').appendTo('#labels');
			}
		} else if ( showLabels == false ) {
			$('#labels tr').remove();
			$('.highlight').removeClass('highlight');
		}
	}
	function toggleData(y) {
		$('table table tbody').slideUp(0);
		$('.activeTable').removeClass('activeTable');
		if ( ! y.closest('table').hasClass('planet') ){
			y.addClass('activeTable');
		}
		y.closest('table').find('tbody').slideDown(0);
		var theMoon = y.text();
		$('.highlight').removeClass('highlight');
		$('#' + theMoon + ', #' + theMoon + '_orbit').addClass('highlight');
	}
		
	// THE ONLY NON-SYSTEM-AGNOSTIC CODE (for initialization purposes only). Display the Saturnian System, add it to the activeSystems array, and make it the activeSingleSystem
	for (i = 0; i < saturnSystem.length; i++) {
		displaySystem(saturnSystem[i]);
		activeBodies.push(saturnSystem[i]);
		activeSingleSystem = allSystems[5];
	}
	
	// Apply the CSS animations of the activeBodies orbits but pause them
	orbitAnimationLogic();

	// Play the orbit animation on planet click
	$('#space').not('#controls').click(function() {
		if ( playOrbits == false ) {
			$('.orbit').addClass('play').removeClass('pause');
			playOrbits = true;
		} else if ( playOrbits == true ) {
			$('.orbit').addClass('pause').removeClass('play');
			playOrbits = false;
		}
	});
	
	// Scale the system bodies or orbits or both (zoom) on button click
	$('#controls .scale').click(function() {
		if ( $(this).hasClass('scaleBodiesUp') ) {
			scaleBodies(2);
		} else if ( $(this).hasClass('scaleBodiesDown') ) {
			scaleBodies(1/2);
		} else if ( $(this).hasClass('scaleOrbitsUp') ) {
			scaleOrbits(2);
		} else if ( $(this).hasClass('scaleOrbitsDown') ) {
			scaleOrbits(1/2);
		} else if ( $(this).hasClass('zoomIn') ) {
			scaleBodies(2);
			scaleOrbits(2);
		} else if ( $(this).hasClass('zoomOut') ) {
			scaleBodies(1/2);
			scaleOrbits(1/2);
		}
	});
	
	// Lock the bodyScale and orbitScale
	$('.lock').click(function() {
		if (lockScales == false) {
			bodyScaleFactor = orbitScaleFactor;
			scaleBodies(1);
			// Make the interface change to Zoom with plus and minus buttons
			$('#controls svg path#Lock').addClass('white');
			$('.icons .lock').addClass('constrain', 370);
			$('.bodies, .orbits').slideUp();
			$('.zoom').slideDown();
			lockScales = true;
		} else if (lockScales == true) {
			// Make the interface change back
			$('#controls svg path#Lock').removeClass('white');
			$('.icons .lock').removeClass('constrain', 370);
			$('.bodies, .orbits').slideDown();
			$('.zoom').slideUp();
			lockScales = false;
		}
	});
	
	// Switch to the next or previous planetary system (single system only)
	$('.systems .button').click(function() {
		$('#space div').fadeOut('slow', function() {
			$(this).remove();
		});
		$('#labels tr').remove();
		activeBodies = [];
		if ( $(this).hasClass('changeSystemLeft') ) {
			var preceedingSystemIndex = allSystems.indexOf( activeSingleSystem ) - 1;
			if ( preceedingSystemIndex < 0 ) {
				preceedingSystemIndex = allSystems.length - 1;
			}
			for ( i = 0; i < allSystems[ preceedingSystemIndex ].length; i++ ) {
				displaySystem( allSystems[ preceedingSystemIndex ][i] );
				activeBodies.push( allSystems[ preceedingSystemIndex ][i] );
				activeSingleSystem = allSystems[ preceedingSystemIndex ];
			}
		} else if ( $(this).hasClass('changeSystemRight') ) {
			var subsequentSystemIndex = allSystems.indexOf( activeSingleSystem ) + 1;
			if ( subsequentSystemIndex > allSystems.length - 1 ) {
				subsequentSystemIndex = 0;
			}
			for ( i = 0; i < allSystems[ subsequentSystemIndex ].length; i++ ) {
				displaySystem( allSystems[ subsequentSystemIndex ][i] );
				activeBodies.push( allSystems[ subsequentSystemIndex ][i] );
				activeSingleSystem = allSystems[ subsequentSystemIndex ];
			}
		}
		labelsLogic();
		sphericalLogic(0);
		orbitsLogic(0);
		planetLogic(0);
		orbitAnimationLogic();
		$('.systemName p').text(activeSingleSystem[0].name);
	});
	
	// Enable or disable labels
	$('.showLabels').click(function() {
		if ( showLabels == false ) {
			showLabels = true;
			labelsLogic();
			$(this).addClass('on');
		} else if ( showLabels == true ) {
			showLabels = false;
			labelsLogic();
			$(this).removeClass('on');
		}
	});
	$('table').on('click', '.showData', function() {
		var x = $(this);
		toggleData(x);
	});
	
	// Hide or display the central planet
	$('.showPlanet').click(function() {
		if ( showPlanet == true ) {
			showPlanet = false;
			planetLogic('slow');
			$(this).addClass('on');
		} else if ( showPlanet == false ) {
			showPlanet = true;
			planetLogic('slow');
			$(this).removeClass('on');
		}
	});

	// Hide or display the orbits of the moons
	$('.showOrbits').click(function() {
		if ( showOrbits == true ) {
			showOrbits = false;
			orbitsLogic('slow');
			$(this).addClass('on');
		} else if ( showOrbits == false ) {
			showOrbits = true;
			orbitsLogic('slow');
			$(this).removeClass('on');
		}		
	});
	
	// Hide or display moons not spherical in shape (their orbit will dissapear as well)
	$('.sphericalOnly').click(function() {
		if ( sphericalOnly == false ) {
			sphericalOnly = true;
			sphericalLogic('slow');
			$(this).addClass('on');
		} else if ( sphericalOnly == true ) {
			sphericalOnly = false;
			sphericalLogic('slow');
			$(this).removeClass('on');
		}
	});
	
	// Show the information modal
	$('#info').click(function() {
		$('#darken, #darken img').fadeIn('slow');
		infoHeight();
	});
	$('#darken').click(function() {
		$('#darken, #darken img').fadeOut('slow');
	});
	
	$(window).resize(function() {
		infoHeight();
	});
	
	
	
	
	
	
	
	
});