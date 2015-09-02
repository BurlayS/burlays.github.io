 var enemyShotStatus = {
    status: 'promah',
    value: null
};

function shot(index, arr_Map, box) { // описание выстрела
    if (box.arr_Cells[index]['point1'] == 0 && arr_Map[index] != 8) {
        // 7 - попадание  // 8 - значит промах
        arr_Map[index] = 8;
        if (box == box2) {
            enemyShotStatus.status = 'promah';
            enemyShotStatus.value = index;
        }
        if (shotPriority == 'enemy') {
            shotPriority = 'mine';
        } else if (shotPriority == 'mine') {
            shotPriority = 'enemy';
        }
    } else if (box.arr_Cells[index]['point1'] == 5) {
        arr_Map[index] = 7;
        if (box == box2) {
            enemyShotStatus.status = 'popal';
            enemyShotStatus.value = index;
        }

        function diagonalPointsPermission(point) {
            if (arr_Map[index + point] !== undefined) {
                arr_Map[index + point] = 9; // смысл как и 8 только без отрисовки
            }
        }
        if (arr_field_top.compare_some(index) == false && arr_field_bottom.compare_some(index) == false) {
            diagonalPointsPermission(9);
            diagonalPointsPermission(11);
            diagonalPointsPermission(-9);
            diagonalPointsPermission(-11);
        }
        if (arr_field_top.compare_some(index) == true) {
            diagonalPointsPermission(11);
            diagonalPointsPermission(-9);
        }
        if (arr_field_bottom.compare_some(index) == true) {
            diagonalPointsPermission(-11);
            diagonalPointsPermission(9);
        }
    }
    for (var i = 0; i < arr_Map.length; i++) {
        if (arr_Map[i] == 7) {
            progress();
            box.arr_Cells[i].drawShot(true);
        };
        if (arr_Map[i] == 8) {
            box.arr_Cells[i].drawShot(false);
        }
    }
};

function battle(index) {
    if (shotPriority == 'mine') {
        shot(index, arr_Enemy_Map_Battle, box1);
    } else if (shotPriority == 'enemy') {
        shot(shotGenerator(), arr_Self_Map_Battle, box2);
    }
}
var arr_Self_Map_Battle_inverted = [];

function shotGenerator() {
    arr_Self_Map_Battle_inverted = [];
    for (var i = 0; i < arr_Self_Map_Battle.length; i++) {
        if (arr_Self_Map_Battle[i] == 0) {
            arr_Self_Map_Battle_inverted.push(i);
        }
    }
    console.log(arr_Self_Map_Battle_inverted);
    var shot;
    //--------------------в случае попадания заполним массив shotVariants окресными точками-------
    if (enemyShotStatus.status == 'popal') {
        if (arr_Self_Map_Battle[enemyShotStatus.value - 10] == 0 && shotVariants.compare_some(enemyShotStatus.value - 10) == false) {
            shotVariants.push(enemyShotStatus.value - 10);
        };
        if (arr_Self_Map_Battle[enemyShotStatus.value + 10] == 0 && shotVariants.compare_some(enemyShotStatus.value + 10) == false) {
            shotVariants.push(enemyShotStatus.value + 10);
        };
        if (arr_Self_Map_Battle[enemyShotStatus.value - 1] == 0 && arr_field_bottom.compare_some(enemyShotStatus.value - 1) == false &&
            shotVariants.compare_some(enemyShotStatus.value - 1) == false) {
            shotVariants.push(enemyShotStatus.value - 1);
        };
        if (arr_Self_Map_Battle[enemyShotStatus.value + 1] == 0 && arr_field_top.compare_some(enemyShotStatus.value + 1) == false &&
            shotVariants.compare_some(enemyShotStatus.value + 1) == false) {
            shotVariants.push(enemyShotStatus.value + 1);
        };
    };
    if (shotVariants.length == 0) {
        random(0, arr_Self_Map_Battle_inverted.length - 1);
        shot = arr_Self_Map_Battle_inverted[rand];
    }
    if (enemyShotStatus.status == 'popal' && shotVariants.length !== 0) {
        shot = shotVariants.shift();
    };
    if (enemyShotStatus.status == 'promah' && shotVariants.length !== 0) {

        shot = shotVariants.shift();
    };
    return shot;
};