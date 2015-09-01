var cx = function(par) {console.log(par)};   // для краткости

var calc = function()
	{
		document.body.style.backgroundColor = "#FFF68F";
		var div1 = document.createElement('div');
		document.body.appendChild(div1);
//------------------------------------------------------------------------------------------------display
		var display = document.createElement("div");
		document.body.appendChild(display);
		display.setAttribute("align", "right");

		display.style.position = "absolute";
		display.style.marginLeft = "42px";
		display.style.marginTop = "25px";
		display.style.width = "295px";
		display.style.fontSize = "xx-large";
		display.style.backgroundColor = "yellow";
		//display.style.borderColor = "#8B8989";
		display.style.borderStyle = "double";
		
		var workString = "0";
		var memory1;
		var memory2;
		var btnEqualSwitcher = 1;
		var toDisplay = function() 
	    	{
	    		display.innerHTML = workString;
	    	};
		toDisplay();
	//-------------------------------------------------------------------------------------------ButtonCreator
		var ButtonCreator = function(name)
			{
				this.el = document.createElement("BUTTON");
						this.el.name = name.toString();
						this.el.setAttribute("id", name);
						document.body.appendChild(this.el);
						this.el.innerHTML = this.el.name;
			};
	//------------------------------------------------------------------------------------------setStyle() for buttons		
		ButtonCreator.prototype.setStyle = function (x, y, width, height)
			{
				this.el.style.position = "absolute";
				this.el.style.left = "" + x + "px";
				this.el.style.top = "" + y + "px";
				this.el.style.width = "" + width + "px";
				this.el.style.height = "" + height + "px";
				this.el.style.fontSize = "x-large";
				this.el.style.backgroundColor = "#90EE90";
				this.el.style.borderColor = "#8B8989";
				//this.el.style.color = "black";
			};	
			
	//-------------------------------------------------------------------------------------------operateButtons		
		var btnClean = new ButtonCreator("CLEAN");
		var btnDot = new ButtonCreator(".");
		var btnPlus = new ButtonCreator("+");
		var btnMinus = new ButtonCreator("-");
		var btnMultiply = new ButtonCreator("*");
		var btnDevide = new ButtonCreator("/");
		var btnSQRT = new ButtonCreator("&#8730");
		var btnSign = new ButtonCreator("+/-");
		var btnEquals = new ButtonCreator("=");		
	//-------------------------------------------------------------------------------------------numberButtons
		var numberButtons = [];	
		for (var i = 0; i < 10; i++)
				{
					numberButtons.push(new ButtonCreator(i))
				};	
	//-------------------------------------------------------------------------------------------Placing & setting style properties
		numberButtons[0].setStyle(110, 280, 50, 50);
		numberButtons[1].setStyle(50, 220, 50, 50);
		numberButtons[2].setStyle(110, 220, 50, 50);
		numberButtons[3].setStyle(170, 220, 50, 50);
		numberButtons[4].setStyle(50, 160, 50, 50);
		numberButtons[5].setStyle(110, 160, 50, 50);
		numberButtons[6].setStyle(170, 160, 50, 50);
		numberButtons[7].setStyle(50, 100, 50, 50);
		numberButtons[8].setStyle(110, 100, 50, 50);
		numberButtons[9].setStyle(170, 100, 50, 50);

		btnClean.setStyle(50, 400, 300, 50);	
		btnDot.setStyle(50, 280, 50, 50);	  
		btnPlus.setStyle(250, 100, 100, 50);	 
		btnMinus.setStyle(250, 160, 100, 50);	 
		btnMultiply.setStyle(250, 220, 100, 50);	 
		btnDevide.setStyle(250, 280, 100, 50);	 
		btnSQRT.setStyle(50, 340, 170, 50);	
		btnSign.setStyle(170, 280, 50, 50);	 
		btnEquals.setStyle(250, 340, 100, 50);		
	//**************************************************************************************************************************
	//----------------------------------------Кроссбраузерная функция для получения символов с клавиатуры для события "keypress"	
		// event.type должен быть keypress
		var getChar = function (event) 
			{
		 		if (event.which == null)
					{  // IE
			    		if (event.keyCode < 32)
			   				{
			   					return null;
			   				}
			   			else
			   				{      // спец. символ
			    				return String.fromCharCode(event.keyCode);
			    			} 
					} 
			 
			  	else if (event.which!=0 && event.charCode!=0) 
			  		{ // все кроме IE
			    		if (event.which < 32) 
			    			{
			    				return null;
			    			} // спец. символ
			    		else
			    			{	
			    				return String.fromCharCode(event.which); // остальные
			    			};
			    	}		
			    else
			    	{
			    		 return null; // спец. символ		
			    	};			
			}; 

	//**************************************************************************************************************************
	//-------------------------------------------------------------------------------------------Events & Listeners
	//-------------------------------------------------------------------------------------------numberButtons[0]Listener (zero)	
		var zeroListener = function(param)
			{
				if (workString == "0") 
					{} 
				else 
					{
						workString += param; 
						toDisplay();
					}
			};
		numberButtons[0].el.addEventListener( "click", function() 
			{ 
				zeroListener(0);
			});

		document.addEventListener("keypress", function()  //--------------------------keypress
		{
			var g = getChar(event);
			if(g =="0")
				{
					zeroListener(g);
				};
		})

	//-------------------------------------------------------------------------------------------numberButtonsListener (All)
		var numberButtonsListener = function(param)
			{
				if (workString === "0") 
					{
						workString = param; 
						toDisplay();
					} 
				else 
					{
						workString += param; 
						toDisplay();
					}
			};

		for (var v = 1; v < 10; v++)
			{  
				numberButtons[v].el.addEventListener("click", function() 
					{ 
						numberButtonsListener(this.name);
					});
			};
				
		document.addEventListener("keypress", function()   //-------------------------keypress
			{
				var g = getChar(event);
				if(g==1||g==2||g==3||g==4||g==5||g==6||g==7||g==8||g==9)  // можно это условие подать и через массив с помощью метода 
					{                                                     //Array.prototype.find(). Но он новый пока мало чем поддерживается. 
						numberButtonsListener(g);
					};				
			});	
			
	//--------------------------------------------------------------------------------------------btnDot Listener   
		var btnDotListener = function()
			{ 
				if (workString.indexOf(".") == "-1") 
					{
						workString += btnDot.el.name.toString();
						toDisplay();
					} 
			};
		btnDot.el.addEventListener("click", function()
			{
				btnDotListener();
			});
		document.addEventListener("keydown", function()  //--------------------------keydown
		{
			if(event.keyCode == 110 || event.keyCode == 190)
				{
					btnDotListener();
				};
		});
	//-------------------------------------------------------------------------------------------btnClean_Listener	
		var btnCleanListener = function() 
			{
				workString = "0"; 
				toDisplay();	
				btnEqualSwitcher = 1;
				operateSwitcher = 0;
				clicked = "neutral";
				result = 0;
				memory1 = 0;
				memory2 = 0;		
			};

		btnClean.el.addEventListener("click", function() 
			{
				btnCleanListener();
			});

		document.addEventListener("keypress", function()  //--------------------------keypress
		{
			var g = getChar(event);
			if(g ==" ")
				{
					btnCleanListener();
				};
		});

	//-------------------------------------------------------------------------------------------Operate
		var result;
		var clicked = "neutral";
		var operateSwitcher = 0;
		var workNumber = function()
			{
			  return parseFloat(workString);
			};

		var reaction = function(action)
			{
				var react = function()
					{
						memory1 = workNumber();
						workString = "0";
						btnEqualSwitcher = 1;
						clicked = action;
						operateSwitcher = 1;
					};

				if (operateSwitcher == 0)
					{
						react();
					}
				else
					{
						btnEqualsListener();
						react();
					};	
					//cx(operateswitcher);	
			};
//----------------------------------------------------------------------------------------------OperateButtons[]			
		var operateButtons = [btnPlus, btnMinus, btnMultiply, btnDevide];

		for (var i = 0; i < operateButtons.length; i++)
			{	
				operateButtons[i].el.addEventListener("click", function() 
					{
						reaction(this.name.toString())
					})
			};

		document.addEventListener("keypress", function()  //--------------------------keypress
			{
				var g = getChar(event);
				for (var i = 0; (i < 3); i++)
					{
						if(g == operateButtons[i].el.name)
						{
							reaction(operateButtons[i].el.name);
						};
					};
			});	
//------------------------------------------------------------------------------------keyDown for btnDevide		
		document.addEventListener("keydown", function()
			{
				if(event.keyCode == 220)
					{
						reaction(btnDevide.el.name);	
					};
			});
	    var displayResult = function()
	    	{
	    		try
					{
						workString = result.toString();
						toDisplay();
						memory1 = result;
					}
					
				catch(err)
					{
						result = 0;
					}
			};		
	//------------------------------------------------------------------------------------------btnSQRT_Listener				
		var btnSQRTListener = function() 
			{
				var wm = workNumber();
				if (wm >= 0)
					{
		 				result = Math.sqrt(wm); 
		 			}
		 		else
		 			{
		 				wm = (-1)*wm;	
		 				result = Math.sqrt(wm); 
		 				result = "" + result + "*" + "i";
		 			};
		 		displayResult();
		 	};

		btnSQRT.el.addEventListener ("click", function()
			{
				btnSQRTListener(); 
		 	});	

		document.addEventListener("keypress", function()  //--------------------------keypress
			{
				var g = getChar(event);
				if(g =="k" || g == "л")
					{
						btnSQRTListener();
					};
			});
		//------------------------------------------------------------------------------------------btnSign_Listener				
		var btnSignListener = function() 
			{
		 		result = workNumber()*(-1); 
		 		displayResult();
		 	};

		btnSign.el.addEventListener ("click", function()
			{
				btnSignListener(); 
		 	});	

		document.addEventListener("keypress", function()  //--------------------------keypress
			{
				var g = getChar(event);
				if(g =="s" || g == "ы"||g == "і")
					{
						btnSignListener();
					};
			});
	//------------------------------------------------------------------------------------------btnEquals_Listener	
		var btnEqualsListener = function() 
			{
				if (btnEqualSwitcher == 1)
					{	
						memory2 = workNumber();
					};
				if (clicked == "+") 
					{
						result = memory1 + memory2;
					}
				else if (clicked == "-")
					{
						result = memory1 - memory2;
					}
				else if (clicked == "*")
					{
						result = memory1 * memory2;
					}
				else if (clicked == "/")
					{
						result = memory1 / memory2;
					}							
				displayResult();
				btnEqualSwitcher += 1;
				//cx(memory1 + "  m1");
				//cx(memory2 + "  m2");
				//cx(btnEqualSwitcher + "  switcher");	
			};

		btnEquals.el.addEventListener ("click", function()
			{
				btnEqualsListener();
				operateSwitcher = 0;	
			});

		document.addEventListener("keydown", function()  //--------------------------keydown
			{
				if(event.keyCode == 187 || event.keyCode == 13)
					{
						btnEqualsListener();
						operateSwitcher = 0;
					};
			});
	//-----------------------------------------------------------------------------------------backSpace_Listener
		document.addEventListener("keydown", function()  //---------------------------keydown
			{
				if(event.keyCode == 8)
					{
						//cx(event.keyCode);
						workString = workString.substring(0, workString.length - 1);
						toDisplay();
					};
			});
	};
function driveCalc ()
	{
		calc();
		instruction();
	};					