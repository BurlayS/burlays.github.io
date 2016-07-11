var startFieldcoordX = 150;//($('#game-field').width()/2)-rebro/2; // starying ccoords of the field area
var startFieldcoordY= 25; //($('#game-field').height()/2)-rebro/2;
 // console.log($('#game_field').width() ,' stx');
var settings = settings_D;//setSettings('D');
var cellWidth;
var discretRebro;
var totalColors;
var buttons = [];
var fieldElements;
var fieldElementsDestination;
var difficultyElements;
var colorElements; 
var confirmedDifficultyelement;
var stepsCounter;
var currentDifficultyLevel = startDifficultyLevel;

function applySettings(){
	console.log('apply');
	cellWidth = settings.cellWidth;
	discretRebro = rebro/cellWidth;
	totalColors = settings.totalColors;

	fieldElements = [];
	fieldElementsDestination = [];
	difficultyElements = [];
	colorElements = []; 
	// var focusedColor;
	stepsCounter = 0;
};

function init(){
	applySettings();
	createFieldCells();
	createOperatingElements();
	createButtons();
	$(document).ready(function(){
		customEvents.dispatchEvent('stepsCounterChanged', stepsCounter);
	});
};
//--------------------------------------------------------customEnents

var EventDispatcher = function(){
			this.events = {};
			this.addListener = function(eventName, callback){
				var ev = this.events[eventName] || [];
				var isCallback = false;
				for(var s=0; s<ev.length; s++){
					if(ev[s].toString() == callback.toString()){
						isCallback = true;
					};
				};
				if (isCallback == false){
					ev.push(callback);
					this.events[eventName] = ev;	
				};
			};

			this.dispatchEvent = function(eventName, data){
				if(this.events[eventName].length){
					for(var s=0; s<this.events[eventName].length; s++){
						this.events[eventName][s](data);
					};	
				};
			};
		};

var customEvents = new EventDispatcher();
init();
//--------------------------------------------------------
function createButtons(){
	var focusedButton = {};
	function Button(canvasID, x, y, radius, width, height, fillColor, font, fontColor, deltaX, deltaY, text){
		var self = this;
		this.canvasID = canvasID;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.radius = radius;
		this.fillColor = fillColor;
		this.font = font;
		this.fontColor = fontColor;
		this.deltaX = deltaX;
		this.deltaY = deltaY;
		this.text = text;
		this.draw = function(){
			$(document).ready(function(){
				customEvents.dispatchEvent('drawButton', self);
			});
		};
		this.draw();
		this.listenToMouse = function(){
			customEvents.addListener('mouseOnScoreCanvas', initHover);
		};
		this.listenToMouse();
		function initHover(data){
			self.hover(data);
		};
		function removeHoverButton(){
			focusedButton = {};
			customEvents.dispatchEvent('removeHoverButton', self);
		};
		this.hover = function(data){
					focusedButton = this;
					// console.log(focusedButton, ' fb');
					var hoveredButton = {};
					for (var property in self){
						hoveredButton[property] = self[property];
					};
					hoveredButton.y -= 4;
					hoveredButton.radius +=4;
					hoveredButton.font = '21px Arial';
					hoveredButton.deltaX += 3;
					hoveredButton.deltaY += 4;
					customEvents.dispatchEvent('drawHoverButton', hoveredButton);
					// console.log(hoveredButton ,' hover');
		};
		this.removeHover = function(){
				customEvents.dispatchEvent('removeHoverButton', self);
		};
	};
	var newGameButton = new Button('score', 72, 40, 20, 120, 45, designColor, '20px Arial', backgroundColor, 45, 26, 'new game');
	var helpButton = new Button ('score', 197, 40, 20, 80, 45, designColor, '20px Arial', backgroundColor, 17, 26, 'help');

	helpButton.clickAction = function(){
		console.log(this, ' this');
			this.removeHover();	
		alert('INSTRUCTION \n The game starts from the top left corner of the field. Press color buttons to add new cells to the figure you are building. The goal is to make whole game field of single color within less steps.');
	}; 
	newGameButton.clickAction = function(){
		this.removeHover();
		setNewGame();
	};
	buttons.push(helpButton);
	buttons.push(newGameButton);
	customEvents.addListener('mouseOnScoreCanvas', initHover);
	customEvents.addListener('clickToScore', clickToScore);
	customEvents.addListener('refreshButton', function(){
		for(var s=0; s<buttons.length; s++){
			buttons[s].draw();
		};
	});
	function clickToScore(){
		if(focusedButton!={}){
			console.log(focusedButton, 'cl');
			focusedButton.clickAction();	
		};
	};
	function initHover(data){
		for(var s=0; s<buttons.length; s++){
			if(data.mouseX > buttons[s].x*($('#score').width()/250)-buttons[s].radius*($('#score').width()/250)*2.2 &&   //2.2  - уточняющий коеффициент
			   data.mouseX < buttons[s].x*($('#score').width()/250)-buttons[s].radius*($('#score').width()/250)+buttons[s].width*0.6*($('#score').width()/250) &&  //0.6 - уточняющий коеффициент
			   data.mouseY > buttons[s].y*($('#score').height()/235) &&
			   data.mouseY < buttons[s].y*($('#score').height()/235)+buttons[s].height*($('#score').height()/235)
			   ){
					buttons[s].hover();
			}else{
				buttons[s].draw();
			};
		};
	}

};
function createFieldCells(){
	function random(min, max){
		var rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.round(rand);
	};
	fieldElements = [];
 	var conglomerates = [];
	function FieldElement(numberX, numberY, coordX, coordY){  // функция-конструктор для создания элемента-клетки
		this.nX = numberX;
		this.nY = numberY;
		this.coordX = coordX;
		this.coordY = coordY;
		this.statusChanged = true;
		// this.status = false;
		this.status = setPrimaryStatus.call(this);
		this.color = null;
			
		function setPrimaryStatus() {

			// return settings.colorCells[random(min, max)].color; // возвращаем строковое значение цвета
	  		// };
			if(this.nX == 0 && this.nY == 0){
				return true;
			}else{
				return false;
			}; 
		};
	};

	function setColor(){
		for(var s=0; s<fieldElements.length; s++){
			if(fieldElements[s].color == null){
				fieldElements[s].color = settings.colorCells[random(0, totalColors)].color;
				// fieldElements[s].color = 'white';
			};
		};
	};

	function setStatus(){

		var startPointColor = function(){
			for(var s=0; s<fieldElements.length; s++){
					console.log(fieldElements[s], 'zzzzzzzzzzzzz');
				if(fieldElements[s].status == true){
					return fieldElements[s].color;
				};
			};
		}();

		function loopStatus(){
		    for(var s=0; s<fieldElements.length; s++){
		    	if(fieldElements[s].status == true){
			   		for(var i=0; i<fieldElements.length; i++){
		    			if(fieldElements[i].status == false && fieldElements[i].color == startPointColor){
			    			if(fieldElements[i].nX == fieldElements[s].nX-1 && fieldElements[i].nY == fieldElements[s].nY || 
				    			fieldElements[i].nX == fieldElements[s].nX+1 && fieldElements[i].nY == fieldElements[s].nY || 
				    			fieldElements[i].nY == fieldElements[s].nY-1 && fieldElements[i].nX == fieldElements[s].nX|| 
				    			fieldElements[i].nY == fieldElements[s].nY+1 && fieldElements[i].nX == fieldElements[s].nX){
				    				   	fieldElements[i].status = true;
				    			
				    		}; 
				    	};
				    };
				   };
			};  	

		};

		for(var s=0; s<discretRebro; s++){
			loopStatus();
		};
	
	};

	function makeConglomerates(totalConglomerates){

		for(var s=0; s<totalConglomerates; s++){
			conglomerates.push(new Conglomerate());
		};

		function grow(){
			return random(0, 1) == 1;
		};
		function Conglomerate(){
			console.log('cgl');
			var congl = {};
			this.basicX = random(0, discretRebro);
			this.basicY = random(0, discretRebro);
			this.color = settings.colorCells[random(0, totalColors)].color;
			this.points = [];

			generateTails(this.basicX, this.basicY, congl);
			generateTails(this.basicX, this.basicY, congl);

			this.points.push({x : this.basicX, y : this.basicY }); // вводим в points главную точку конгломерата
			for (var property in congl){
				this.points.push(congl[property]); 
			};
			for(var s=0; s<fieldElements.length; s++){
				for(var i=0; i<this.points.length; i++){
					if(fieldElements[s].nX == this.points[i].x && fieldElements[s].nY == this.points[i].y){
						fieldElements[s].color = this.color;
					};
				}
			}
		};

		function generateTails(basicX, basicY, congl){

			if(grow() == true){
				if(congl.firstPointTop){
					congl.secondPointTop = {x : basicX, y : basicY-2};	
				}else{
					congl.firstPointTop = {x : basicX, y : basicY-1};
				}
			};

			if(grow() == true){
				if(congl.firstPointRight){
					congl.secondPointRight = {x : basicX+2, y : basicY};
				}else{
					congl.firstPointRight = {x : basicX+1, y : basicY};
				};
			};

			if(grow() == true){
				if(congl.firstPointBottom){
					congl.secondPointBottom = {x : basicX, y : basicY+2};
				}else{
					congl.secondPointBottom = {x : basicX, y : basicY+1};
				};
			};

			if(grow() == true){
				if(congl.firstPointLeft){
					congl.secondPointLeft = {x : basicX-2, y : basicY};
				}else{
					congl.firstPointLeft = {x : basicX-1, y : basicY};
				};	
			};
				
		};
		console.log(conglomerates, '  conglomerates');
	};

	for(var y=0; y<discretRebro; y++){   // заполнение массива элементами-клетками
		for(var x=0; x<discretRebro; x++){
			fieldElements.push(new FieldElement(x, y, startFieldcoordX+cellWidth*x, startFieldcoordY+cellWidth*y));
		};
	};

	makeConglomerates(settings.totalConglomerates);
	setColor();
	setStatus();


	$(document).ready(function(){
		customEvents.dispatchEvent('statusChanged', fieldElements);
	});
		
};

// createFieldCells();

function createOperatingElements(){
	function OperatingElement(x, y, radius, color, difficulty_settings){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		if(difficulty_settings){
			this.difficulty_settings = difficulty_settings;
		};
	};

	for(var s=0; s<settings.colorCells.length; s++){
		colorElements.push(new OperatingElement(settings.colorCells[s].x, settings.colorCells[s].y,  settings.radius, settings.colorCells[s].color));		
	};

	for(var s=0; s<difficultyEls.difficultyCells.length; s++){
		 difficultyElements.push(new OperatingElement(difficultyEls.difficultyCells[s].x, difficultyEls.y, difficultyEls.difficultyCells[s].radius, difficultyEls.color, difficultyEls.difficultyCells[s].level));
	};

	switch(settings){
			case(settings_A) : confirmedDifficultyElement = difficultyElements[0];
							   break;
			case(settings_B) : confirmedDifficultyElement = difficultyElements[1];
							   break;
			case(settings_C) : confirmedDifficultyElement = difficultyElements[2];
							   break;
			case(settings_D) : confirmedDifficultyElement = difficultyElements[3];
							   break;
			case(settings_E) : confirmedDifficultyElement = difficultyElements[4];
							   break;
		};

	customEvents.addListener('refreshReadyElements', refreshReadyElements);	

	$(document).ready(function(){
		customEvents.dispatchEvent('refreshReadyElements');

	});
		function refreshReadyElements(){


			var data_colorElements = {
				canvasID : 'operating-0', 
				elements : colorElements,
			};
			var data_difficultyElements = {
				canvasID : 'difficulty',
				elements : difficultyElements,
				cleanZone : 100
			};
			customEvents.dispatchEvent('elementsReady', data_colorElements);
			customEvents.dispatchEvent('elementsReady', data_difficultyElements);
			customEvents.dispatchEvent('selectedDifficulty', confirmedDifficultyElement);
			// console.log(difficultyElements, ' diff');
		};
};
// createOperatingElements();
// customEvents.addListener('focused', )
//---------------------------------------------------------------------hoverElement
(function actionsOnColors(){
	var focusedColor;
	customEvents.addListener('hoverElement', hoverColorElement);
	function hoverColorElement(data){
		focusedColor=data.element.color;
	};
	customEvents.addListener('clickToColor', clickToColor);
	function clickToColor(){
		if(focusedColor !== null){
		    for(var s=0; s<fieldElements.length; s++){
		    	if(fieldElements[s].status == true){
		    		fieldElements[s].color = focusedColor;
		    		//fieldElements[s].color = focusedColor;
		    		for(var i=0; i<fieldElements.length; i++){
		    			if(fieldElements[i].status == false && fieldElements[i].color == focusedColor){
		    			// console.log(fieldElements[s], 'yyy');
			    			if(fieldElements[i].nX == fieldElements[s].nX-1 && fieldElements[i].nY == fieldElements[s].nY || 
			    				fieldElements[i].nX == fieldElements[s].nX+1 && fieldElements[i].nY == fieldElements[s].nY || 
			    				fieldElements[i].nY == fieldElements[s].nY-1 && fieldElements[i].nX == fieldElements[s].nX|| 
			    				fieldElements[i].nY == fieldElements[s].nY+1 && fieldElements[i].nX == fieldElements[s].nX)
			    					{
			    					   	fieldElements[i].status = true;
			    					   	clickToColor();
			    					   	return;
			    					};
		    			};
		    		};

		    	};
		    };
		    stepsCounter += 1;
		    customEvents.dispatchEvent('statusChanged', fieldElements);
		    customEvents.dispatchEvent('stepsCounterChanged', stepsCounter);
		};
	};
})();
(function actionsOnDifficultyEls(){
	var current_settings;
	var focusedElement;
	var confirmedElement = difficultyElements[currentDifficultyLevel];
	customEvents.addListener('hoverElement', hoverDifficultyElement);
	function hoverDifficultyElement(data){
		  // console.log(data, ' dde');
		if(!data.element.difficulty_settings)
			return;
		current_settings = data.element.difficulty_settings;
		focusedElement = data.element;
	};
	customEvents.addListener('clickToDifficulty', clickToDifficulty);
	function clickToDifficulty(){
		settings = current_settings;
		console.log(currentDifficultyLevel, ' cdl');
		confirmedElement = focusedElement;
		setNewGame();
		// // 	init();
		// customEvents.dispatchEvent('stepsCounterChanged', stepsCounter);
		// customEvents.dispatchEvent('selectedDifficulty', confirmedElement);
		// // };
	};
	
})();

function setNewGame(){
	if(stepsCounter!=0)	
		if(!confirm('New game?'))
			return;
	init();
			
};
