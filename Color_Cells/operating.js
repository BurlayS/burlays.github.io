

//---------------------------------------------click section
$('#operating').mousemove(function(){

	hover('operating-0', colorElements, event);
});
$('#score').mousemove(function(){
	mouseOnScoreCanvas(event);
});

$('#difficulty').mousemove(function(){

	hover('difficulty', difficultyElements, event, 100);
});
function mouseOnScoreCanvas(event){
	// console.log('rtt');
	customEvents.dispatchEvent('mouseOnScoreCanvas', {mouseX : event.offsetX, mouseY : event.offsetY});
};
var previousElement;
function hover(canvasID, hoverElements, event, cleanZone){
	if(!cleanZone){
		cleanZone = 0;
	};
	var selectedElement = [];
	if(selectedElement[0]!==previousElement){
		customEvents.dispatchEvent('removeHover', {canvasID : canvasID, elements : hoverElements, elementToClean : previousElement, cleanZone : cleanZone});
	};
	for(var s=0; s<hoverElements.length; s++){
		if(
			event.offsetX > hoverElements[s].x*($('#operating-0').width()/250)-hoverElements[s].radius*($('#operating-0').width()/250) &&  // отбор по координатам
		   	event.offsetX < hoverElements[s].x*($('#operating-0').width()/250)+hoverElements[s].radius*($('#operating-0').width()/250) &&  //($('#operating-0').width()/250) - это вычисление фактической координаты элемента на canvas при изменении размера окна браузера
		   	event.offsetY > hoverElements[s].y*($('#operating-0').height()/200)-hoverElements[s].radius*($('#operating-0').width()/250) &&
		   	event.offsetY < hoverElements[s].y*($('#operating-0').height()/200)+hoverElements[s].radius*($('#operating-0').width()/250)
		  ){
				selectedElement.push(hoverElements[s]);   // в этом массиве може оказаться один или 2 элемента
		   }
		 if(selectedElement.length>0){
			customEvents.dispatchEvent('hoverElement', {canvasID : canvasID, element : selectedElement[0]});  // выдиляем для рисования и нажатия только один элемент 
			// customEvents.dispatchEvent('selectedDifficulty', confirmedDifficultyElement);
			previousElement = selectedElement['0'];
		 }
	};

};

$('#operating').click(function(){
	customEvents.dispatchEvent('clickToColor');
});	

$('#difficulty').click(function(){
	customEvents.dispatchEvent('clickToDifficulty');
});	
$('#score').click(function(){
	// console.log('cl');
	customEvents.dispatchEvent('clickToScore');
});
$('#operating').mouseleave(function(){
	customEvents.dispatchEvent('refreshReadyElements');
});

$('#difficulty').mouseleave(function(){
	customEvents.dispatchEvent('refreshReadyElements');
});

$('#score').mouseleave(function(){
	customEvents.dispatchEvent('refreshButton');
});