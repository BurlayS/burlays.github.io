$(document).ready(function() {
    $.getJSON("http://cm.mmi.macc.com.ua/tests/sample.php", function(data) {
        $('<table id = "myTable"></table>').appendTo("body");
        $('<thead id = "thead"></thead>').appendTo("#myTable");
        $('#thead').append('<th>ID</th>', '<th>Название</th>', '<th>Авторы</th>',
            '<th>Дата</th>', '<th>Номер</th>');
        for (var i = 0; i < data.length; i++) {
            var tRow = $('<tr id = tr' + i + '></tr>');
            tRow.appendTo('#myTable');
            tRow.append('<td id =' + '"' + i + '" class = "tdClicked">' + data[i].id + '</td>', '<td>' + data[i].name + '</td>',
                '<td>' + data[i].author + '</td>', '<td>' + data[i].date + '</td>',
                '<td>' + data[i].number + '</td>');
            $('td:not(.tdClicked)').addClass('tdNotClicked');
            tRow.click(function(e) {
                if (e.target.className == "tdClicked") {
                    PopUp(e.target.id)
                };
            });
        };

        function PopUp(i) {
            $('<div id="window-popup"><div id="window-content"></div></div>').appendTo('body');
            $('<div id = "close"><img src="close-button.gif"></div>').appendTo('#window-content');

            $('<div id = "name">' + data[i].name + '</div>').appendTo('#window-content')
            $('<div class = "text"><img id = "pic" src=' + data[i].img + '></div>').appendTo('#window-content');
            $('<div class = "text">' + 'Авторы: ' + data[i].author + '|' + 'Дата: ' + data[i].date + '|' + 'Номер: ' + data[2].number + '</div>').appendTo('#window-content');
            $('<hr>').appendTo('#window-content');
            $('<div>' + data[i].description + '</div>').appendTo('#window-content');
            $('#close').click(function() {
                $('#window-popup').remove();
            });
        };
    });
});