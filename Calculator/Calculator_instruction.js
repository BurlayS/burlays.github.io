var instruction = function()
	{
		var inst = document.createElement("div");
		document.body.appendChild(inst);
		var ul = document.createElement("ul");
		inst.appendChild(ul);
		ul.innerHTML = "Instruction:";
		var li1 = document.createElement("li");
		ul.appendChild(li1);
		li1.innerHTML = 'you can press the "s" button on your keyboard instead of "+/-" button;';
		var li2 = document.createElement("li");
		ul.appendChild(li2);
		li2.innerHTML = 'press the "k" button on your keyboard to get the square root  value.' 
		inst.style.marginLeft = "700px";
		inst.style.fontSize = "large";
		inst.style.marginTop = "10px";
	};
//instruction();