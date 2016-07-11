	var operatingCanvas = {};
	var ctxOperating = {};
	
	// for(var s=0; s<10; s++){
	// 	$('#operating').append('<canvas class="operating-layers" id="operating-'+s+'" width=250 height=200></canvas>');
	// 	operatingCanvas[s] = document.querySelector('#operating-'+s);
	// 	ctxOperating[s] = operatingCanvas[s].getContext('2d');
	// };
	$('#operating-0').removeClass('operating-layers');
	$('canvas').css('background-color', backgroundColor);
	
	var gameFieldCanvas = document.querySelector('#game-field');
	var scoreCanvas = document.querySelector('#score');
	var difficultyCanvas = document.querySelector('#difficulty');

	var ctxGameField = gameFieldCanvas.getContext('2d');
	var ctxScore = scoreCanvas.getContext('2d');
	var ctxDifficulty = difficultyCanvas.getContext('2d');
	
	function createField(ctx, startX, startY, width, height){
		ctx.beginPath();
		ctx.strokeStyle = '#8B0000';
		ctx.strokeRect(startX, startY, width, height);
		ctx.closePath();
		ctx.restore();
	};

	function addText(canvasID, x, y, font, fontColor, text){
		var ctx = document.querySelector('#'+canvasID).getContext('2d');
		ctx.beginPath();
		// ctx.strokeStyle = '#8B0000';
		ctx.fillStyle = fontColor;
		ctx.font = font;
		ctx.fillText(text, x, y);
		ctx.closePath();
		ctx.restore();
	};
	addText('difficulty', 30, 35, "25px Arial", '#8B0000','Choose difficulty');
	addText('difficulty', 95, 60, "25px Arial", '#8B0000','level');
	createField(ctxGameField, startFieldcoordX, startFieldcoordY, rebro, rebro);
	drawRect('game-field', {})
	function drawRect(canvasID, element){
		// if(element.statusChanged && element.statusChanged == true){
	 //        element.statusChanged = false; // сбрасываем метку об изменении статуса
		// };
		var ctx = document.querySelector('#'+canvasID).getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = element.color;
		ctx.fillRect(element.coordX, element.coordY, cellWidth, cellWidth);
		ctx.closePath();
	    ctx.restore();
	};
	
	function drawCircle(canvasID, element, radius, color){
		
		var context = Graphics2D.id(canvasID);
		context.circle({
		    cx : element.x,
		    cy : element.y,
		    radius : radius || element.radius,
		    fill : color || element.color,
		    stroke : designColor
		    //lineWidth : 10
		});
	};

	function drawButton(data){
		var canvas = document.querySelector('#'+data.canvasID);
		var ctx = canvas.getContext('2d');
		var rectWidth = data.width - 2*data.radius;
		ctx.beginPath();
		ctx.clearRect(data.x-data.width/2, data.y-10, data.x+data.width/2, data.height+20);
		ctx.fillStyle = data.fillColor;
		// ctx.fillRect(x, y, rectWidth, height);
		ctx.arc(data.x-rectWidth/2, data.y+data.radius, data.radius, Math.PI/2, 3*Math.PI/2);
		ctx.arc(data.x+rectWidth/2, data.y+data.radius, data.radius, -Math.PI/2, Math.PI/2);
		ctx.fill();
		ctx.closePath();
	    ctx.restore();
	    addText(data.canvasID, data.x-data.deltaX, data.y+data.deltaY, data.font, data.fontColor, data.text);
	};
	// drawButton('score', 32, 20, 120, 45, designColor, '20px Arial', backgroundColor, -9, 'new game');
	// drawButton('score', 160, 20, 100, 45, designColor, '20px Arial', backgroundColor, 10, 'help');

	function drawSelectedDifficultyPoint(element){
		// console.log('s/el');
		drawCircle('difficulty', element, 8, backgroundColor);
	};

	function drawFieldElements(data){
			for(var s=0; s<data.length; s++){
				drawRect('game-field', data[s]);
			};
	};

	function drawRoundElements(data){
		clear(data.canvasID, data.cleanZone);
		for(var s=0; s<data.elements.length; s++){
			drawCircle(data.canvasID, data.elements[s], data.elements[s].radius);
		};
	};

	function drawHoverElement(data){
		// var delta = 0;
		// var radius = data.element.radius;
		// 		console.log(radius, ' rad');
		// var intervalID = setInterval(toAnimate, 10);
		// function toAnimate(){
		// 	if(delta < 5){	
				drawCircle(data.canvasID, data.element, data.element.radius + 4);
				customEvents.dispatchEvent('selectedDifficulty', confirmedDifficultyElement);
				// delta++;
		// 	}else{
		// 		clearInterval(intervalID);
		// 	}
		// };
	};
	
	function removeHover(data){
		focusedColor = null;
		// console.log('ggggg');
		clear(data.canvasID, 0, data.elementToClean);
		// console.log(data.elementToClean, ' dec');
		customEvents.dispatchEvent('elementsReady', {canvasID : data.canvasID, elements : data.elements, cleanZone : data.cleanZone});
		customEvents.dispatchEvent('selectedDifficulty', confirmedDifficultyElement);
	};
	function clear(canvasID, cleanZone, elementToClean){
		if(!cleanZone)
			cleanZone = 0;
		// console.log(cleanZone, ' clz');
		var canvas = document.querySelector('#'+canvasID);
		var ctx = canvas.getContext('2d');
		ctx.beginPath();
		if(!elementToClean){
			ctx.clearRect(0, 0+cleanZone, canvas.width, canvas.height);
		}else{
			ctx.clearRect(elementToClean.x - elementToClean.radius-10, 
						  elementToClean.y - elementToClean.radius-10, 
						  elementToClean.x + 2*elementToClean.radius+10, 
						  elementToClean.y + 2*elementToClean.radius+10
						 );
		};
		ctx.fillStyle = 'rgba(100,150,185, 0)';
	    ctx.restore();
	};
	function showStepsCounter(data){
		clear('score', 100);
		addText('score', 80, 175, "25px Arial", '#8B0000', 'steps:  '+data);
	};
	showStepsCounter(0);
	customEvents.addListener('statusChanged', drawFieldElements);
	customEvents.addListener('elementsReady', drawRoundElements);
	// customEvents.addListener('difficultyElements', drawRoundElements);
	customEvents.addListener('hoverElement', drawHoverElement);
	customEvents.addListener('removeHover', removeHover);
	customEvents.addListener('stepsCounterChanged', showStepsCounter);
	customEvents.addListener('selectedDifficulty', drawSelectedDifficultyPoint);
	customEvents.addListener('drawButton', drawButton);
	customEvents.addListener('drawHoverButton', drawButton);
	customEvents.addListener('removeHoverButton', drawButton);
