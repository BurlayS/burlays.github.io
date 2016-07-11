function setSize(){

	if(window.innerWidth >= window.innerHeight){

		if(window.innerHeight >= window.innerWidth*0.46){

			$('#game-field').css('width', window.innerWidth*0.659);
			$('#game-field').css('height', window.innerWidth*0.476);

			$('#operating-0').css('width', window.innerWidth*0.183);
			$('#operating-0').css('height', window.innerWidth*0.14605);

			$('#score').css('width', window.innerWidth*0.183);
			$('#score').css('height', window.innerWidth*0.172);

			$('#difficulty').css('width', window.innerWidth*0.183);
			$('#difficulty').css('height', window.innerWidth*0.14605);

		} else {

			$('#game-field').css('width', window.innerHeight*1.3845);
			$('#game-field').css('height', window.innerHeight*0.95);

			$('#operating-0').css('width', window.innerHeight*0.376);
			$('#operating-0').css('height', window.innerHeight*0.29);

			$('#score').css('width', window.innerHeight*0.376);
			$('#score').css('height', window.innerHeight*0.33);

			$('#difficulty').css('width', window.innerHeight*0.376);
			$('#difficulty').css('height', window.innerHeight*0.29);

		}


	}//else{

	// 	// mobile devices

	// }

};

setSize();

console.log($('#operating-0').width(), ' opw');
 
 var rebro = 600;
 var designColor = '#8B0000';
 var backgroundColor = '#FAF0E6';
 var startDifficultyLevel = 3;
 // var colors = ['#228B22', '#191970', '#8B4513', '#EE0000', '#FFFF00', '#00EEEE', '#FF00FF', '#9400D3', '#FFC1C1', '#000'];
 

//-------------------------------------------BANK--------------------------------------------
// function setSettings(level){

	 var settings_A = {
	 	totalConglomerates : 0,
	 	cellWidth: 60,
	 	radius : 30,
	 	totalColors: 5,
	 	colorCells : [
					 	{x : 50, y : 65,  color: '#191970'},
					 	{x : 125, y : 65,  color: '#228B22'},
					 	{x : 200, y : 65,  color: '#EE0000'},
					 	{x : 50, y : 140,  color: '#8B4513'},
					 	{x : 125, y : 140,  color: '#FFFF00'},
					 	{x : 200, y : 140,  color: '#6495ED'}
		 			]	
	 };

	var settings_B = {
		totalConglomerates : 0,
	 	cellWidth: 40,
	 	radius : 30,
	 	totalColors: 5,
	 	colorCells : [	

	 					{x : 50, y : 65,  color: '#191970'},
						{x : 125, y : 65,  color: '#228B22'},
						{x : 200, y : 65,  color: '#EE0000'},
						{x : 50, y : 140,  color: '#8B4513'},
						{x : 125, y : 140,  color: '#FFFF00'},
						{x : 200, y : 140,  color: '#6495ED'}

					 	// {x : $('#operating-0').width()*0.2, y : $('#operating-0').height()*0.325,  color: '#191970'},
					 	// {x : $('#operating-0').width()*0.5, y : $('#operating-0').height()*0.325,  color: '#228B22'},
					 	// {x : $('#operating-0').width()*0.8, y : $('#operating-0').height()*0.325,  color: '#EE0000'},
					 	// {x : $('#operating-0').width()*0.2, y : $('#operating-0').height()*0.7,  color: '#8B4513'},
					 	// {x : $('#operating-0').width()*0.5, y : $('#operating-0').height()*0.7,  color: '#FFFF00'},
					 	// {x : $('#operating-0').width()*0.8, y : $('#operating-0').height()*0.7,  color: '#6495ED'}
		 			]	
	 };

	 var settings_C = {
	 	totalConglomerates : 10,
	 	cellWidth : 40,
	 	radius : 30,
	 	totalColors : 7,
	 	colorCells : [
					 	{x : 40, y : 65, color : '#191970'},
					 	{x : 95, y : 65, color : '#228B22'},
					 	{x : 150, y : 65, color : '#EE0000'},
					 	{x : 205, y : 65, color : '#8B4513'}, 
					 	{x : 40, y : 140, color : '#FFFF00'},
					 	{x : 95, y : 140, color : '#6495ED'},
					 	{x : 150, y : 140, color : '#00FF7F'},
					 	{x : 205, y : 140, color : '#9400D3'}
		 			]	
	 };

	 var settings_D = {
	 	totalConglomerates : 20,
	 	cellWidth : 30,
	 	radius : 30,
	 	totalColors : 7,
	 	colorCells : [
					 	{x : 40, y : 65, color : '#191970'},
					 	{x : 95, y : 65, color : '#228B22'},
					 	{x : 150, y : 65, color : '#EE0000'},
					 	{x : 205, y : 65, color : '#8B4513'}, 
					 	{x : 40, y : 140, color : '#FFFF00'},
					 	{x : 95, y : 140, color : '#6495ED'},
					 	{x : 150, y : 140, color : '#00FF7F'},
					 	{x : 205, y : 140, color : '#9400D3'}
		 			]	
	 };

	 var settings_E = {
	 	totalConglomerates : 30,
	 	cellWidth : 12,
	 	radius : 30,
	 	totalColors : 9,
	 	colorCells : [
					 	{x: 40, y: 65, color : '#191970'},
					 	{x: 82, y: 65, color : '#228B22'},
					 	{x: 124, y: 65, color : '#EE0000'},
					 	{x: 166, y: 65, color : '#8B4513'},
					 	{x: 208, y: 65, color : '#FFFF00'},
					 	{x: 40, y: 140, color : '#6495ED'},
					 	{x: 82, y: 140, color : '#00FF7F'},
					 	{x: 124, y: 140, color : '#9400D3'},
					 	{x: 166, y: 140, color : '#FFC1C1'},
					 	{x: 208, y: 140, color : '#000'}
	 				]
	 	
	 };

	 var settings_F = {
	 	totalConglomerates : 60,
	 	cellWidth : 10,
	 	radius : 30,
	 	totalColors : 9,
	 	colorCells : [	
				 	{x : 35, y: 55, color : '#191970'},
				 	{x : 80, y: 55, color : '#228B22'},
				 	{x : 125, y: 55, color : '#EE0000'},
				 	{x : 170, y: 55, color : '#8B4513'},
				 	{x : 215, y: 55, color : '#FFFF00'},
				 	{x : 35, y: 120, color : '#00EEEE'},
				 	{x : 80, y: 120, color : '#00FF7F'},
				 	{x : 125, y: 120, color : '#9400D3'},
				 	{x : 170, y: 120, color : '#FFC1C1'},
				 	{x : 215, y: 120, color : '#000'}
	 			]
	 };

// 	if(!level){
// 		return settings_D;
// 	}else{
// 		switch(level){
// 			case('A'): return settings_A;
// 			break;
// 			case('B'): return settings_B;
// 			break;
// 			case('C'): return settings_C;
// 			break;
// 			case('D'): return settings_D;
// 			break;
// 			case('E'): return settings_E;
// 			break;
// 			default : return settings_E;
// 		};
// 	};
// };
var difficultyEls = {
	color : '#8B0000',
	y : 135,
	difficultyCells : [
		{x : 17, radius : 10, level : settings_A},
		{x : 51, radius : 15, level : settings_B},
		{x : 95, radius : 20, level : settings_C},
		{x : 149, radius : 25, level : settings_D},
		{x : 213, radius : 30, level : settings_E}
	]
};
