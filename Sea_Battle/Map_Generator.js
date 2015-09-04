var rand;
var fixed_rand = 1;

function random(n, m) {
    m = parseInt(m);
    n = parseInt(n);
    rand = Math.floor(Math.random() * (n - m + 1)) + m;
};

function map_Generator(arr_Map, box) {
    this.arr_Map = arr_Map;
    this.box = box;
    var self = this;
    arrPosition = [];
    delta = [1];

    function loop(ship_type) {
        while (arrPosition.length !== ship_type) {
            random(0, self.arr_Map.length);
            setShip(rand, arr_Map, self.box, ship_type);
        }
    };

    function auto_ship_create(ship_type) {
        loop(ship_type);
        setShip_confirm(self.arr_Map, self.box);
    };
    auto_ship_create(4);
    auto_ship_create(3);
    auto_ship_create(3);
    auto_ship_create(2);
    auto_ship_create(2);
    auto_ship_create(2);
    auto_ship_create(1);
    auto_ship_create(1);
    auto_ship_create(1);
    auto_ship_create(1);
};