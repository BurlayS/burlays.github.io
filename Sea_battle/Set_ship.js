//------------------------Функция наполнения массива нашими кораблями---------   
var arrPosition = [];
console.log(arrPosition.length); // массив переменных, которые запомнят положение выбранных для 
                                 // кораблей точек в массиве-карте.
var fixedDelta;
var delta = [1];
var arr_field_top = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
var arr_field_bottom = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
Array.prototype.compare_some = function (value){ // эта функция узнает есть ли в массиве искомое значение и выдает true или false
            function cx(item){
                return item == value;
                }
                return(this.some(cx));
            };
Array.prototype.compare_every = function (value){ // эта функция узнает все ли значения массива равны искомому и выдает true или false
            function cx(item){
                return item == value;
                }
                return(this.every(cx));
            };    
function setShip(index, arr_Map, box, ship_type) {
    /* Мы будем вычислять разницу по массиву
     между положениями текущей и предидущей точки и сможем судить о том
     корректно ли расставляются корабли. Если некорректно - подсветим красным. 
    */
    function fill_arrMap_arrPosition(ship_type) {
        function fill_arrPosition(){
            if (arrPosition[arrPosition.length - 1] < index) {
                arrPosition.push(index);
            } else if (arrPosition[arrPosition.length - 1] > index) {
                arrPosition.unshift(index);
            }
            };
        if (arr_Map[index] == 0 && ship_type>arrPosition.length){
                if (arrPosition.length == 0) {
                    arrPosition.push(index);
                } else if (arrPosition.length > 0) {
                    if(arr_field_top.compare_some(index)==false && arr_field_bottom.compare_some(index)==false){
                        fill_arrPosition();
                    }
                    if(arr_field_top.compare_some(index)==true && arr_field_top.compare_some(index-1)==true||
                       arr_field_top.compare_some(index)==true && arr_field_top.compare_some(index-1)==true ){
                        fill_arrPosition();
                    }
                    if(arr_field_top.compare_some(index)==true && arr_Map[index-1]!== 1){
                        fill_arrPosition();
                    }
                    if(arr_field_bottom.compare_some(index)==true && arr_Map[index+1]!==1){
                        fill_arrPosition();
                    }
                }
            delta_func();
            if(delta.compare_every(1)==true || 
               delta.compare_every(10)==true){
            arr_Map[index] = 1;
            
                } else{
                    if(arrPosition[0]==index){
                        arrPosition.shift();
                    } else if(arrPosition[arrPosition.length-1]==index){
                        arrPosition.pop();
                    };
                }
        } else if (arr_Map[index] == 1 && arrPosition[arrPosition.length-1]==index || arr_Map[index] == 1 && arrPosition[0]==index) {
            arr_Map[index] = 0;
            if (arrPosition[0] == index) {
                arrPosition.shift();
            } else if (arrPosition[arrPosition.length - 1] == index) {
                arrPosition.pop();
            }
            delta_func();
             button.setText('Подтвердить', 1000, 342, 25, 'white');
        }
        if(arrPosition.compare_some(index) == false && arr_Map[index] == 1){
            arr_Map[index] = 0;
        };

    };
    function delta_func() {   // функция расчета delta
        if(arrPosition.length<2){
            delta = [1];
        } else {
        delta = [];
        for (var i = 1; i < arrPosition.length; i++) {
            delta.unshift(arrPosition[arrPosition.length - i] - arrPosition[arrPosition.length - i - 1]);
        };
    };
    };
    function fillCell(color) {
        if(box == box2){
            if (arrPosition.compare_some(index) == true && arr_Map[index]==1) {
                box.arr_Cells[index].drawShip('yellow', 'rect');
            };
            if (arrPosition.compare_some(index) == false && arr_Map[index] == 0) {
                clear_and_drawProgress.call(box.arr_Cells[index]);
            };
            if(arrPosition.compare_some(index) == true && arr_Map[index] == 0){
                setTimeout(function() // этот setTimeout нужен!!!!!
                    {
                        box.arr_Cells[index].drawShip('red', 'rect');
                        infoBox.setText('Ошибка!', 1000, 180, 30, 'red');
                    }, 10);
                setTimeout(function()
                    {
                        clear_and_drawProgress.call(box.arr_Cells[index]);
                        clear_and_drawProgress(925, 150, 290, 100);
                    }, 1000);
            }
        }
    }
    //--------------------------------------------------------------------
    function create_ship (ship_type) {
        if(ship_type == 'auto'){
            ship_type = 4;
        };
        if (arrPosition.length < ship_type+1){
        fill_arrMap_arrPosition(ship_type); // просто заполним первую клетку. delta считать не из чего
        };
        if (arrPosition.length == 1 || arrPosition.length == 0) {
            fillCell('yellow');
        };
        if (arrPosition.length == 2) {
            /* В этом месте функция fill_arrMap_arrPosition() отработала уже дважды. То есть 
            есть уже две заполненные клетки и можно посчитать delta. Если delta = 1 или -1,
            то мы строим корабль по вертикали. Если delta равняется 10 или -10, - то
            по горизонтали. Когда delta выбрана (1 или 10), 
            для дальнейших шагов мы запишем эту величину в fixedDelta.*/
            delta_func();
            if (delta[0] == 1 || delta[0] == 10) {
                fillCell('yellow');
                fixedDelta = delta[0];
            } else {
                fillCell('red');
            }
        }
        if (arrPosition.length == 3) {
            delta_func();
            if (delta[0] == delta[1] && delta[1] == fixedDelta) {
                fillCell('yellow');
            } else {
                fillCell('red');
            }
        };
        if (arrPosition.length == 4) {
            delta_func();
            if (delta[0] == delta[1] && delta[1] == delta[2] && delta[2] == fixedDelta) {
                fillCell('yellow');
            } else {
                fillCell('red');
            }
        };
        if (arrPosition.length == ship_type){
            clear_and_drawProgress.call(button);
            button.setText('Подтвердить', 980, 342, 30, 'lime');
        };
}
    //--------------------------------------------------------------------
    if (phase ==1) {
            create_ship(ship_type);
        };
    if (phase == 2) {
        create_ship(4);
    };
    if (phase == 3){
        create_ship(3);
    };
    if (phase == 4){
        create_ship(3);
    };
    if (phase == 5){
        create_ship(2);
    };
    if (phase == 6){
        create_ship(2);
    };
    if (phase == 7){
        create_ship(2);
    };
    if (phase == 8){
        create_ship(1);
    };
    if (phase == 9){
        create_ship(1);
    };
    if (phase == 10){
        create_ship(1);
    };
    if (phase == 11){
        create_ship(1);
    };
    if(phase == 12){
        create_ship(ship_type);
    }
};
//-------------------Функция подтверждения установки корабля--------------          
function setShip_confirm(arr_Map, box) {
    if (phase==1 ||
        phase == 2 && arrPosition.length == 4 ||
        phase == 3 && arrPosition.length == 3 ||
        phase == 4 && arrPosition.length == 3 ||
        phase == 5 && arrPosition.length == 2 ||
        phase == 6 && arrPosition.length == 2 ||
        phase == 7 && arrPosition.length == 2 ||
        phase == 8 && arrPosition.length == 1 ||
        phase == 9 && arrPosition.length == 1 ||
        phase == 10 && arrPosition.length == 1 ||
        phase == 11 && arrPosition.length == 1 ||
        phase == 12 ){
        for (var i = 0; i < arr_Map.length; i++) {
            if (arr_Map[i] == 1) { // ставим 5 вместо всех единиц
                arr_Map[i] = 5;
                box.arr_Cells[i]['point1']=arr_Map[i];
            };
        };
        //-------------------------
        function front_back_corner_points(s, length, arr_field) {
            if (arr_Map[arrPosition[length - 1] + s] !== undefined) {

                function fx(number) {
                    return number == arrPosition[length - 1];
                };
                if (arr_field.some(fx) == false) {
                    arr_Map[arrPosition[length - 1] + s] = 6;
                };
                if (fixedDelta == 10 && arr_Map[arrPosition[0]-10]!==undefined) { 
                    arr_Map[arrPosition[0] - 10] = 6;
                };
                if (fixedDelta == 10 && arr_Map[arrPosition[arrPosition.length - 1] + 10]!==undefined){
                    if (arrPosition[arrPosition.length - 1] !== 99) {
                        arr_Map[arrPosition[arrPosition.length - 1] + 10] = 6;
             };
            };
        };
        }
        function side_points(s, length, arr_field) {
            if (arr_field.compare_some(arrPosition[length-1])==false) {
                for (var i = 0; i < arrPosition.length; i++) {
                    if (arr_Map[arrPosition[i] + s] !== undefined) {
                        arr_Map[arrPosition[i] + s] = 6;
                    };
                };
            };
        };
        //-----------------------------------для вертикальных кораблей--------------------
        if (fixedDelta == 1) {
            //-------------------------торцевые точки корабля-----------------
            front_back_corner_points(1, arrPosition.length, arr_field_bottom);
            front_back_corner_points((-1), 1, arr_field_top);
            //-------------------------угловые точки корабля------------------
            front_back_corner_points(11, arrPosition.length, arr_field_bottom);
            front_back_corner_points(-9, arrPosition.length, arr_field_bottom);
            front_back_corner_points(9, 1, arr_field_top);
            front_back_corner_points(-11, 1, arr_field_top);
            //-------------------------боковые точки корабля------------------
            side_points(10, arrPosition.length, arr_field_bottom);
            side_points(-10, arrPosition.length, arr_field_bottom);
            side_points(-10, 1, arr_field_top);
            side_points(10, 1, arr_field_top);
        };
        //------------------------------------для горизонтальных кораблей-----------------
        if (fixedDelta == 10) {
            //-------------------------торцевые точки корабля-----------------
            front_back_corner_points(10, arrPosition.length, arr_field_top);//ok
            front_back_corner_points((-10), 1, arr_field_bottom);
            //-------------------------угловые точки корабля------------------
            front_back_corner_points(11, arrPosition.length, arr_field_bottom);
            front_back_corner_points(9, arrPosition.length, arr_field_top);
            front_back_corner_points(-11, 1, arr_field_top);
            front_back_corner_points(-9, 1, arr_field_bottom);
            //-------------------------боковые точки корабля------------------
            side_points(1, 1, arr_field_bottom);
            side_points(-1, 1, arr_field_top);
        };
        //----------------Отрисовка запретных синих треугольников
        for (var i = 0; i < arr_Map.length; i++) {
            if (arr_Map[i] == 6 && box == box2) {
                //try{
                box.arr_Cells[i].drawShip('blue', 'triangle');
            };
        };
        arrPosition = [];
        if (phase>1 && phase<12){
        phase = phase+1;
        delta = [];
    };
    }
};