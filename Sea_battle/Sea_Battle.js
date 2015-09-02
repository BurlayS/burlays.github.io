    //-----------------------------Универсальная функция инициализации слоя canvas----------------
    function startCanvas(parameter, id, color) {
        var w = parameter;
        w.canvas = document.getElementById(id);
        w.ctx = w.canvas.getContext("2d");
        w.width = w.canvas.width;
        w.height = w.canvas.height;
        w.ctx.beginPath();
        w.ctx.fillStyle = color;
        w.ctx.fillRect(0, 0, w.width, w.height);
        w.ctx.closePath();
    };
    //---------------------------------Объект-затравка слоя canvas--------------------------------
    var layer_1 = {
        canvas: null,
        ctx: null,
        width: null,
        height: null
    };
    //--------------------------------Стартуем слой canvas--------------------------------

    startCanvas(layer_1, 'game_fields', 'navy');


    var pic = new Image();
    pic.src = 'cross.png';
    var phase = 0; // Создадим переменную phase для переключения режима игры
    var shotPriority = 'mine';
    var marker = 0;
    var arr_Enemy_Map = []; // массив с вражеской картой кораблей
    var arr_Self_Map = []; // массив с нашей картой кораблей
    //------
    var arr_Enemy_Map_Battle = []; //массив вражеской карты, который мы наполним в процессе борьбы
    var arr_Self_Map_Battle = [];
    arr_Self_Map.length = arr_Enemy_Map.length = 100;

    var shotVariants = [];
    //-------------------эти массивы заполняем "пустыми" значениями (0)--------------
    for (var i = 0; i < arr_Self_Map.length; i++) {
        arr_Self_Map[i] = 0;
        arr_Enemy_Map[i] = 0;
        arr_Self_Map_Battle[i] = 0;
        arr_Enemy_Map_Battle[i] = 0;
    };
    //-----------Создадим конструктор кнопок для переключения режима игры----------------
    function InfoBox(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.drawInfoBox = function(color, stroke_Or_Fill) {
            layer_1.ctx.save();
            layer_1.ctx.beginPath();
            if (stroke_Or_Fill == 'stroke') {
                layer_1.ctx.strokeStyle = color;
                layer_1.ctx.strokeRect(x, y, w, h);
            } else if (stroke_Or_Fill == 'fill') {
                layer_1.ctx.fillStyle = color;
                layer_1.ctx.fillRect(x, y, w, h);
            }
            layer_1.ctx.font = "30px Georgia";
            layer_1.ctx.closePath();
            layer_1.ctx.restore();
        };
        this.setText = function(text, text_X, text_Y, font, color) {
            layer_1.ctx.save();
            layer_1.ctx.font = "" + font + "px Georgia";
            layer_1.ctx.beginPath();
            layer_1.ctx.fillStyle = color;
            layer_1.ctx.fillText(text, text_X, text_Y);
            layer_1.ctx.closePath();
            layer_1.ctx.restore();
        };
        this.buttonPress = function() {
            if (phase < 2 || phase >= 12 && phase < 14) {
                phase = phase + 1;
            }
            if (phase == 14) {
                phase = 1;
            }
        };
        this.button2_press = function() {
            if (phase == 1 || phase == 12) {
                if (phase == 12) {
                    for (var i = 0; i < arr_Self_Map.length; i++) {
                        box1.arr_Cells[i].clearShip();
                        box2.arr_Cells[i].clearShip();
                        arr_Self_Map[i] = 0;
                        arr_Enemy_Map[i] = 0;
                    };
                };
                map_Generator(arr_Self_Map, box2); // автоматическое наполнение нашей карты
                phase = 12; // переброс фазы
            };
            //--------------действие кнопки "Назад"-----------
            if (phase > 1 && phase < 12) {
                for (var i = 0; i < arr_Self_Map.length; i++) {
                    arr_Self_Map[i] = 0;
                    box2.arr_Cells[i]['point1'] = 0;
                    box2.arr_Cells[i].clearShip();
                }
                phase = 1;
            }
            if (phase == 13) {
                switchMarker()
            }
        };
    }
    var infoBox = new InfoBox(920, 30, 300, 250); // Окно с инструкциями
    infoBox.drawInfoBox('white', 'stroke');
    var button = new InfoBox(920, 308, 300, 50); // Кнопка 1
    button.drawInfoBox('white', 'stroke');
    var button2 = new InfoBox(920, 387, 300, 50); // Кнопка 2

    var self_counter_box = new InfoBox(475, 387, 330, 50);
    self_counter_box.drawInfoBox('white', 'stroke');
    self_counter_box.setText('Русь:    ' + 0 + ' %', 565, 420, 30, 'lime');

    var enemy_counter_box = new InfoBox(30, 387, 330, 50);
    enemy_counter_box.drawInfoBox('white', 'stroke');
    enemy_counter_box.setText('Враги:    ' + 0 + ' %', 105, 420, 30, 'red');
    phaseOperation();

    //-----------------------------Отрисовка полей, циферок и буковок-----------------------------

    function BoxMaker(start_x, start_y) {
        var Cell = function(x_index, y_index) {
            this.w = this.h = 30; // ширина и высота клеточки
            this.x = start_x + (x_index * this.w);
            this.y = start_y + (y_index * this.h);
            this.x_index = x_index; // номер клеточки (имя, идентификатор по х)
            this.y_index = y_index; // номер клеточки (имя, идентификатор по у)
            this.point1 = 0; // переменная отвечает за то стоит корабль или нет
            this.mark = 'secret'; // 'secret', 'empty', 'ship', 'metka'
            this.prevMark = 'secret';
            this.drawCell = function() {
                layer_1.ctx.beginPath();
                layer_1.ctx.strokeStyle = 'white';
                layer_1.ctx.strokeRect(this.x, this.y, 30, 30);
                layer_1.ctx.fillStyle = 'white';
                layer_1.ctx.font = "20px Georgia";
                var self = this;
                var fill = function(param) {
                    layer_1.ctx.fillText(param, self.x + 10, self.y + 20);
                };
                if (y_index == 0 && x_index > 0) {
                    fill(x_index);
                };
                if (x_index == 0) {
                    if (y_index == 1) {
                        fill('А')
                    } else if (y_index == 2) {
                        fill('Б')
                    } else if (y_index == 3) {
                        fill('В')
                    } else if (y_index == 4) {
                        fill('Г')
                    } else if (y_index == 5) {
                        fill('Д')
                    } else if (y_index == 6) {
                        fill('Е')
                    } else if (y_index == 7) {
                        fill('Ж')
                    } else if (y_index == 8) {
                        fill('З')
                    } else if (y_index == 9) {
                        fill('И')
                    } else if (y_index == 10) {
                        fill('К')
                    };
                }
                layer_1.ctx.closePath();
            };
            this.drawCell(); // Отрисовка

            //-----------------------------функция отрисовки кораблей-----------------
            this.drawShip = function(color, shape) {
                //console.log('zapusk');
                layer_1.ctx.save();
                layer_1.ctx.beginPath();
                if (x_index > 0 && y_index > 0) {
                    layer_1.ctx.fillStyle = color;
                    layer_1.ctx.beginPath();
                    if (shape == 'triangle') {
                        this.prevMark = this.mark;
                        this.mark = 'metka';
                        layer_1.ctx.moveTo(this.x + 7, this.y + 22);
                        layer_1.ctx.lineTo(this.x + 15, this.y + 7);
                        layer_1.ctx.lineTo(this.x + 23, this.y + 22);
                        layer_1.ctx.fill();
                    } else if (shape == 'rect') {
                        this.prevMark = this.mark;
                        this.mark = 'ship';
                        layer_1.ctx.fillRect(this.x + 2, this.y + 2, this.w - 4, this.h - 4);
                    }
                };
                layer_1.ctx.closePath();
                layer_1.ctx.restore();
            };
            this.clearShip = function() {
                layer_1.ctx.save();
                layer_1.ctx.beginPath();
                layer_1.ctx.fillStyle = 'navy';
                layer_1.ctx.fillRect(this.x + 2, this.y + 2, 26, 26);
                layer_1.ctx.closePath();
                layer_1.ctx.restore();
            };
            this.drawShot = function(ship) {
                if (x_index > 0 && y_index > 0) {
                    if (ship == false) {
                        this.prevMark = this.mark;
                        this.mark = 'empty';
                        layer_1.ctx.save();
                        layer_1.ctx.beginPath();
                        layer_1.ctx.fillStyle = 'grey';
                        layer_1.ctx.arc(this.x + 15, this.y + 15, 7, 0, 2 * Math.PI, true);
                        layer_1.ctx.fill();
                        layer_1.ctx.closePath();
                        layer_1.ctx.restore();
                    }
                    if (ship == true) {
                        this.prevMark = this.mark;
                        this.mark = 'ship';
                        layer_1.ctx.save();
                        layer_1.ctx.beginPath();
                        layer_1.ctx.drawImage(pic, this.x + 3, this.y + 4);
                        layer_1.ctx.closePath();
                        layer_1.ctx.restore();

                    }
                };


            };
        };
        //--------------------------------------------------------------------------------------

        this.arr_Cells = []; //создаем массив для клеток без циферок и буковок
        for (var i = 0; i < 11; i++) {
            for (var j = 0; j < 11; j++) {
                this[i + '' + j] = new Cell(i, j); // создаем все клетки
                if (this[i + '' + j]['x_index'] > 0 && this[i + '' + j]['y_index'] > 0) { // не вставляем в массив клетки с циферками и буковками
                    this.arr_Cells.push(this[i + '' + j]);
                };
                delete this[i + '' + j]; // после записи клеток в массив, можно удалить их из самого объекта
            }
        };
    }
    var box1 = new BoxMaker(30, 30);
    var box2 = new BoxMaker(475, 30);
    //----------------------------------добавим карту кораблей-------------------------
    for (var s = 0; s < box1.arr_Cells.length; s++) {
        box1.arr_Cells[s]['point1'] = arr_Enemy_Map[s];
    };
    //----------------------------------отсек canvas event-----------------------------------
    //-------функция снятия и установки метки---------
    function addMark(index, event) {
        if (event.which == 1 && marker == 1 && box1.arr_Cells[index].mark != 'metka' || event.which == 3 && box1.arr_Cells[index].mark != 'metka') {
            box1.arr_Cells[index].drawShip('orange', 'triangle');
            box1.arr_Cells[index].mark = 'metka';
        } else if (event.which == 1 && marker == 1 && box1.arr_Cells[index].mark == 'metka' || event.which == 3 && box1.arr_Cells[index].mark == 'metka') {
            box1.arr_Cells[index].mark = box1.arr_Cells[index].prevMark
            if (box1.arr_Cells[index].prevMark == 'ship') {
                box1.arr_Cells[index].clearShip();
                box1.arr_Cells[index].drawShot(true);
            } else if (box1.arr_Cells[index].prevMark == 'secret') {
                box1.arr_Cells[index].clearShip();
            } else if (box1.arr_Cells[index].prevMark == 'empty') {
                box1.arr_Cells[index].clearShip();
                box1.arr_Cells[index].drawShot(false);
            }
        }
    }

    layer_1.canvas.addEventListener('click', mouse);
    layer_1.canvas.addEventListener('contextmenu', mouse);
    window.addEventListener('keyup', keyListener);

    function keyListener(event) {
        event = event || window.event;
        if (phase == 12) { // в этой фунеции не менять порядок блоков if.
            forButtonEvent(button, event); // иначе они будут срабатывать не по одному а по два сразу. 
        } // а это не надо.
        if (phase == 1) {
            forButtonEvent(button2, event);
            phase = 12;
        };
        if (phase == 0 || phase == 14) {
            forButtonEvent(button, event);
        }
    }

    function forButtonEvent(buttons, event) {
        console.log(event.type);
        if (buttons.x < event.offsetX && event.offsetX < buttons.x + buttons.w &&
            buttons.y < event.offsetY && event.offsetY < buttons.y + buttons.h && event.which == 1 ||
            event.keyCode == 13 && phase == 0 || event.keyCode == 13 && phase == 1 || event.keyCode == 13 && phase == 12 ||
            event.keyCode == 13 && phase == 14) {
            console.log(event.keyCode);
            if (buttons == button) {
                buttons.buttonPress(event);
                if (phase < 13) {
                    setShip_confirm(arr_Self_Map, box2, 2);
                };
                phaseOperation(); // введет изменения в зависимости от фазы
            };
            if (buttons == button2) {
                buttons.button2_press(event);
                if (phase !== 13) {
                    phaseOperation();
                }
            }
        }
    }

    function mouse(event) {
        event = event || window.event;
        //-----------phase section-----------
        forButtonEvent(button, event);
        forButtonEvent(button2, event);
        //-----------box1 section-------------
        for (var f = 0; f < box1.arr_Cells.length; f++) {
            if (box1.arr_Cells[f]['x'] <= event.offsetX && event.offsetX < box1.arr_Cells[f]['x'] + 29 &&
                box1.arr_Cells[f]['y'] <= event.offsetY && event.offsetY < box1.arr_Cells[f]['y'] + 29) {
                if (phase == 13 && marker == 0 && event.which == 1) {
                    //--------режим боя------------ 
                    battle(f); // сперва стреляем мы 

                    while (shotPriority == 'enemy') { // стреляет враг, пока не промахнется
                        battle();
                    }
                };
                if (marker == 1 && phase == 13 || event.which == 3 && phase == 13) {
                    event.preventDefault();
                    addMark(f, event);
                }
            }
            //-----------box2 section-------------
            if (box2.arr_Cells[f]['x'] <= event.offsetX && event.offsetX < box2.arr_Cells[f]['x'] + 29 &&
                box2.arr_Cells[f]['y'] <= event.offsetY && event.offsetY < box2.arr_Cells[f]['y'] + 29) {
                setShip(f, arr_Self_Map, box2);
            };
        };

    };

    //--------------------Функция управления фазами и текстом-----------------
    function setTextParagraph(text) {
        clear_and_drawProgress.call(infoBox);
        infoBox.setText(text, 930, 70, 20, 'orange');
        infoBox.setText('корабль, выбирая мышкой', 930, 90, 20, 'orange');
        infoBox.setText('нужные клетки', 930, 110, 20, 'orange');
        clear_and_drawProgress.call(button);
        button.setText('Подтвердить', 1000, 342, 25, 'pink');

    }

    function phaseOperation() {
        if (phase == 0) {
            infoBox.setText('Морской бой', 950, 170, 40, 'pink');
            button.setText('Играть!', 1020, 342, 25, 'lime');
        }

        if (phase == 1) {
            for (var i = 0; i < arr_Self_Map.length; i++) { // очистка полей и сброс всех параметров 
                arr_Self_Map[i] = 0;
                arr_Enemy_Map[i] = 0;
                arr_Self_Map_Battle[i] = 0;
                arr_Enemy_Map_Battle[i] = 0;
                box1.arr_Cells[i]['point1'] = 0;
                box1.arr_Cells[i]['mark'] = 'secret'; //очищаем эту отметку
                box1.arr_Cells[i]['prevMark'] = 'secret'; //очищаем и эту отметку
                box2.arr_Cells[i]['point1'] = 0;
                box1.arr_Cells[i].clearShip();
                box2.arr_Cells[i].clearShip();
                progress();
            };
            clear_and_drawProgress.call(infoBox);
            infoBox.setText('Расставьте корабли', 955, 150, 25, 'orange');
            infoBox.setText('или нажмите ENTER.', 955, 180, 25, 'orange');
            clear_and_drawProgress.call(button);
            button.setText('Расставить вручную', 965, 342, 22, 'lime');
            button2.drawInfoBox('white', 'stroke');
            clear_and_drawProgress.call(button2);
            button2.setText('Расставить автоматически', 935, 419, 22, 'lime');
        } else if (phase == 2) {
            setTextParagraph('Разместите четырехпалубный');
            clear_and_drawProgress.call(button2);
            button2.setText('Назад', 1035, 419, 22, 'pink');
        } else if (phase == 3) {
            setTextParagraph('Разместите трехпалубный');
        } else if (phase == 4) {
            setTextParagraph('Разместите трехпалубный');
        } else if (phase == 5) {
            setTextParagraph('Разместите двухпалубный');
        } else if (phase == 6) {
            setTextParagraph('Разместите двухпалубный');
        } else if (phase == 7) {
            setTextParagraph('Разместите двухпалубный');
        } else if (phase == 8) {
            setTextParagraph('Разместите одинарный');
        } else if (phase == 9) {
            setTextParagraph('Разместите одинарный');
        } else if (phase == 10) {
            setTextParagraph('Разместите одинарный');
        } else if (phase == 11) {
            setTextParagraph('Разместите одинарный');
        } else if (phase == 12) {
            clear_and_drawProgress.call(button2);
            button2.setText('Обновить карту', 990, 419, 22, 'lime');
            map_Generator(arr_Enemy_Map, box1);
            clear_and_drawProgress.call(infoBox);
            infoBox.setText('Готово!', 1005, 150, 35, 'orange');
            infoBox.setText('Нажмите "Развалить врага"', 940, 190, 20, 'orange');
            infoBox.setText('Нажмите "или ENTER.', 965, 210, 20, 'orange');
            clear_and_drawProgress.call(button);
            button.setText('Развалить врага!', 953, 342, 30, 'yellow');

            setTimeout(function() {
                for (var i = 0; i < arr_Self_Map.length; i++) {
                    if (arr_Self_Map[i] == 6) {
                        box2.arr_Cells[i].clearShip(i);
                    }
                }
            }, 1000);

        } else if (phase == 13) {
            clear_and_drawProgress.call(button2);
            button2.setText('Поставить метку', 985, 419, 22, 'pink');
            clear_and_drawProgress.call(infoBox);
            infoBox.setText('FIGHT!', 1008, 100, 35, 'yellow');
            infoBox.setText('Стреляйте по полю врага', 940, 140, 20, 'orange');
            infoBox.setText('выбирая мышкой нужные', 940, 160, 20, 'orange');
            infoBox.setText('клетки. Не забывйте', 940, 180, 20, 'orange');
            infoBox.setText('ставить метки.', 940, 200, 20, 'orange');
            infoBox.setText('Их можно ставить', 940, 220, 20, 'orange');
            infoBox.setText('специальной кнопкой внизу', 940, 240, 20, 'orange');
            infoBox.setText('или правой кнопкой мыши.', 940, 260, 20, 'orange');
            clear_and_drawProgress.call(button);
            button.setText('Играть заново', 985, 342, 25, 'green');
        } else if (phase == 14) {
            clear_and_drawProgress.call(button);
            button.setText('Играть заново', 972, 342, 30, 'yellow');
            //-----------------дорисовка кораблей, в которые не попали----------
            (function drawLast() {
                for (var i = 0; i < arr_Self_Map.length; i++) {
                    if (arr_Enemy_Map[i] == 5 && arr_Enemy_Map_Battle[i] !== 7) {
                        box1.arr_Cells[i].drawShip('lime', 'rect');
                    };
                    if (arr_Self_Map[i] == 5 && arr_Self_Map_Battle[i] !== 7) {
                        box2.arr_Cells[i].drawShip('lime', 'rect');
                    };
                }
            })();
        }

    };
    //--------Эта функция почистит клетки от фигур, а поля от текста--------      
    function clear_and_drawProgress(x, y, w, h, color) {
        layer_1.ctx.save();
        layer_1.ctx.beginPath();
        if (color == undefined) {
            layer_1.ctx.fillStyle = 'navy';
        } else {
            layer_1.ctx.fillStyle = color;
        };
        layer_1.ctx.fillRect(this.x + 2, this.y + 2, this.w - 4, this.h - 4);
        layer_1.ctx.fillRect(x, y, w, h);
        layer_1.ctx.closePath();
        layer_1.ctx.restore();
    };

    function switchMarker(event) { // управление меткой
        if (marker == 0) {
            marker = 1;
            clear_and_drawProgress.call(button2);
            button2.setText('Отключить режим метки', 940, 419, 22, 'pink');
            console.log('marker', marker, 'button2', button2);
        } else if (marker == 1) {
            marker = 0;
            clear_and_drawProgress.call(button2);
            button2.setText('Поставить метку', 985, 419, 22, 'pink');
        }
    };
    Array.prototype.equalElements = function(value) { // эта функция ищет в массиве элементы
        var equalElementsQuantity = 0; // с одинаковыми значениями и возвращает их колличество
        for (var i = 0; i < this.length; i++) {
            if (this[i] == value) {
                equalElementsQuantity += 1;
            }
        }
        return equalElementsQuantity;
    }

    function progress() {
        var selfProgress = arr_Enemy_Map_Battle.equalElements(7) * 5;
        var enemyProgress = arr_Self_Map_Battle.equalElements(7) * 5;
        var selfProgressLine = 0;
        var enemyProgressLine = 0;
        //--------расчет линии прогресса
        selfProgressLine = arr_Enemy_Map_Battle.equalElements(7) * ((self_counter_box.w - 2) / 20);
        enemyProgressLine = arr_Self_Map_Battle.equalElements(7) * ((enemy_counter_box.w - 2) / 20);
        //--------очистка окошек
        clear_and_drawProgress(self_counter_box.x + 2, self_counter_box.y + 2, self_counter_box.w - 2, self_counter_box.h - 2);
        clear_and_drawProgress(enemy_counter_box.x + 2, enemy_counter_box.y + 2, enemy_counter_box.w - 2, enemy_counter_box.h - 2);
        //--------отрисовка линии прогресса
        clear_and_drawProgress(self_counter_box.x + 2, self_counter_box.y + 2, selfProgressLine, self_counter_box.h - 2, 'purple');
        clear_and_drawProgress(enemy_counter_box.x + 2, enemy_counter_box.y + 2, enemyProgressLine, enemy_counter_box.h - 2, 'purple');
        //--------восстановление надписей
        self_counter_box.setText('Русь:    ' + selfProgress + ' %', 565, 420, 30, 'lime');
        enemy_counter_box.setText('Враги:    ' + enemyProgress + ' %', 105, 420, 30, 'red');

        if (enemyProgress == 100 && phase !== 1) {
            phase = 14;
            phaseOperation();
            clear_and_drawProgress(enemy_counter_box.x + 2, enemy_counter_box.y + 2, enemyProgressLine, enemy_counter_box.h - 2, 'pink');
            enemy_counter_box.setText('Враги:    ' + enemyProgress + ' %', 105, 420, 30, 'red');
            clear_and_drawProgress.call(infoBox);
            infoBox.setText('Тризда вам,', 980, 155, 35, 'orange');
            infoBox.setText('ребята!', 1020, 200, 35, 'orange');
        }
        if (selfProgress == 100 && phase !== 1) {
            phase = 14;
            phaseOperation();
            clear_and_drawProgress(self_counter_box.x + 2, self_counter_box.y + 2, selfProgressLine, self_counter_box.h - 2, 'pink');
            self_counter_box.setText('Русь:    ' + selfProgress + ' %', 565, 420, 30, 'green');
            clear_and_drawProgress.call(infoBox);
            infoBox.setText('Ты просто', 985, 155, 35, 'orange');
            infoBox.setText('лучший!', 1000, 200, 35, 'orange');
        }

    };