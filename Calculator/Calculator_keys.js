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


