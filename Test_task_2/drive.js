$(document).ready(function() {
    //---------------building the table--------
    $('<table id = "myTable"></table>').appendTo("body");
    $('<thead id = "thead"></thead>').appendTo("#myTable");
    $('#thead').append('<th>Код товара</th>', '<th>Название</th>', '<th>Количество</th>',
        '<th>Цена</th>', '<th>Списать</th>');
    //---------------constructor for items-----        
    var Item = function(code, name, quantity, price, image, desc) {
            this.code = code;
            this.name = name;
            this.price = price;
            this.quantity = quantity;
            this.image = image;
            this.desc = desc;
        }
        //---------------producing the items and adding them to array---        
    var item_1 = new Item(1, 'Кресло', 34, 20, 'IMG/armchair.jpg', 'Неимоверно удобное кресло');
    var item_2 = new Item(2, 'Лампа', 28, 20, 'IMG/lamp.jpg', 'Отличная стильная лампа. Может работать без электричества!');
    var item_3 = new Item(3, 'Диван', 10, 200, 'IMG/sofa.jpg', 'Великолепный диван. Списать его можно только домой :)');

    var data = [item_1, item_2, item_3];
    //---------------adding item properties into the table----------
    for (var i = 0; i < data.length; i++) {
        var tRow = $('<tr id = "tr' + i + '"></tr>');
        tRow.appendTo('#myTable');
        tRow.append('<td id=' + i + ' class = "td_Info">' + data[i].code + '</td>', '<td>' + data[i].name + '</td>',
            '<td id = "quantity' + i + '"' + '>' + data[i].quantity + ' шт.' + '</td>', '<td>' + data[i].price + ' $' + '</td>',
            '<td class = "td_WriteOff" data="' + i + '"><img class =' + i + ' src="IMG/garbage.png"></td>');
        $('td:not([class])').addClass('td_NotClicked');
        //---------------event which calls information popup window-----              
        $('#' + i).click(function(e) {
            PopUp_Info(e.target.id);
        });
        //---------------event which calls write off window. Bubbling works-              
        $('[data=' + i + ']').click(function(e) {
            console.log($(this).attr('data'));
            PopUp_WriteOff($(this).attr('data'));
        })
    };
    //--------------information window function for "click" event---
    function PopUp_Info(i) {
        console.log(i);
        $('<div id="window-popup"><div id="window-content"></div></div>').appendTo('body');
        $('<div id = "close"><img src="IMG/close-button.gif"></div>').appendTo('#window-content');

        $('<div class = "text"><img id = "pic" src=' + data[i].image + '></div>').appendTo('#window-content');
        $('<div class = "text"><b>' + data[i].name + '</b></div>').appendTo('#window-content');
        $('<hr>').appendTo('#window-content');
        $('<div id = "description">' + data[i].desc + '</div>').appendTo('#window-content');
        $('#close').click(function() {
            $('#window-popup').remove();
        });
    };
    //--------------write off function for "click" event----- ------        
    function PopUp_WriteOff(i) {
        $('form').remove();
        $('<form><div>Количество к списанию <input id = "input" type="text" size="5"></div><div><button id="button_WriteOff"><img src="IMG/Trash_button.png" alt = "img"> Списать</button><button id="cancel"><img src="IMG/close_button_2.gif" alt = "img"> Отменить</button></div></form>').appendTo($('#tr' + i));
        $('#button_WriteOff').click(function(e) { //this function confirms writing off action and calcules the rest
            e.preventDefault();
            data[i].quantity = data[i].quantity - ($('#input').val());
            $('form').remove();
            $('#quantity' + i).html(data[i].quantity + ' шт.');

        });
        $('#cancel').click(function(e) { // this function cancels write off window
            e.preventDefault();
            $('form').remove();
        });

    };
});