/**
 * Календарь с русскими буквами
 *
 * @author Aleksey Zhikharev
 * @copyright Aleksey Zhikharev 2017
 * @tutorial https://github.com/amarilis/calendar
 */
(function (window, document, undefined) {
    'use strict';
    var calendar = {};

    // Названия месяцев
    calendar.monthName = [
        'Январь', 'Февраль', 'Март', 'Апрель',
        'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    // Названия дней недели
    calendar.dayName = [
        'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'
    ];

    // Выбранная дата
    calendar.selectedDate = {
        'Day': new Date().getDate(),
        'Month': parseInt(new Date().getMonth()) + 1,
        'Year': new Date().getFullYear()
    };

    // Выбор даты
    calendar.selectDate = function (day, month, year, classInput) {
        if (day.slice().length == 1) {
            day = '0' + day;
        };
        if (month.slice().length == 1) {
            month = '0' + month;
        };
        calendar.selectedDate = {
            'Day': day,
            'Month': month,
            'Year': year
        };
        if(document.querySelector('.calendarOut') == null){
            addPopup(document.querySelector('input[calendar='+classInput+']'));
        };
        calendar.drawCalendar(month, year, classInput);
    };

    // Отрисовка календарика на выбранный месяц и год
    calendar.drawCalendar = function (month, year, classInput) {
        var calendarHTML = '';
        calendarHTML += '<table class="calendarTable" cellspacing="0" cellpadding="0">';

        // Месяц и навигация
        calendarHTML += '<tr>';
        calendarHTML += '<td class="navigation navigation_to_left" month="' + (month > 1 ? (+month - 1) : 12) + '" year="' + (month > 1 ? year : (+year - 1)) + '" classinput="' + classInput + '">&#9668;<\/td>';
        calendarHTML += '<td colspan="5" class="navigation navigation_to_this_day" month="' + calendar.selectedDate.Month + '" year="' + calendar.selectedDate.Year + '" classinput="' + classInput + '">' + calendar.monthName[(month - 1)] + '&nbsp;-&nbsp;' + year + '<\/td>';
        calendarHTML += '<td class="navigation navigation_to_right" month="' + (month < 12 ? (+month + 1) : 1) + '" year="' + (month < 12 ? year : (+year + 1)) + '" classinput="' + classInput + '">&#9658;<\/td>';
        calendarHTML += '<\/tr>';

        // Шапка таблицы с днями недели
        calendarHTML += '<tr>';
        calendarHTML += '<th>' + calendar.dayName[0] + '<\/th>';
        calendarHTML += '<th>' + calendar.dayName[1] + '<\/th>';
        calendarHTML += '<th>' + calendar.dayName[2] + '<\/th>';
        calendarHTML += '<th>' + calendar.dayName[3] + '<\/th>';
        calendarHTML += '<th>' + calendar.dayName[4] + '<\/th>';
        calendarHTML += '<th class="holiday">' + calendar.dayName[5] + '<\/th>';
        calendarHTML += '<th class="holiday">' + calendar.dayName[6] + '<\/th>';
        calendarHTML += '<\/tr>';

        // Количество дней в месяце
        var total_days = 32 - new Date(year, (month - 1), 32).getDate();
        // Начальный день месяца
        var start_day = new Date(year, (month - 1), 1).getDay();
        if (start_day == 0) {
            start_day = 7;
        }
        start_day--;
        // Количество ячеек в таблице
        var final_index = Math.ceil((total_days + start_day) / 7) * 7;

        var day = 1;
        var index = 0;
        do {
            // Начало строки таблицы
            if (index % 7 == 0) {
                calendarHTML += '<tr>';
            }
            // Пустые ячейки до начала месяца или после окончания
            if ((index < start_day) || (index >= (total_days + start_day))) {
                calendarHTML += '<td class="grayed">&nbsp;<\/td>';
            }
            else {
                var class_name = '';
                // Выбранный день
                if (calendar.selectedDate.Day == day &&
                    calendar.selectedDate.Month == month &&
                    calendar.selectedDate.Year == year) {
                    class_name = 'selected';
                }
                // Праздничный день
                else if (index % 7 == 6 || index % 7 == 5) {
                    class_name = 'holiday';
                }
                // Ячейка с датой
                calendarHTML += '<td class="td_day_active ' + class_name + '" day="' + day + '" month="' + month + '" year="' + year + '" classinput="' + classInput + '">' + day + '</td>';
                day++;
            }
            // Конец строки таблицы
            if (index % 7 == 6) {
                calendarHTML += '<\/tr>';
            }
            index++;
        }
        while (index < final_index);

        calendarHTML += '<\/table>';

        document.querySelector('.calendarOut').innerHTML = calendarHTML;


        /**
         * Клик по навигации и дням
         */

        document.querySelector('.navigation_to_left').addEventListener('click', function (e) {
            calendar.drawCalendar(this.getAttribute('month'), this.getAttribute('year'), this.getAttribute('classinput'));
            e.stopPropagation();
        }, false);
        document.querySelector('.navigation_to_this_day').addEventListener('click', function (e) {
            calendar.drawCalendar(this.getAttribute('month'), this.getAttribute('year'), this.getAttribute('classinput'));
            e.stopPropagation();
        }, false);
        document.querySelector('.navigation_to_right').addEventListener('click', function (e) {
            calendar.drawCalendar(this.getAttribute('month'), this.getAttribute('year'), this.getAttribute('classinput'));
            e.stopPropagation();
        }, false);

        var all_td_day_active = document.querySelectorAll('.td_day_active'),
            ind_td_day_active, btn_td_day_active;
        for (ind_td_day_active = 0; ind_td_day_active < all_td_day_active.length; ind_td_day_active++) {
            btn_td_day_active = all_td_day_active[ind_td_day_active];
            btn_td_day_active.addEventListener('click', function (e) {
                calendar.selectDate(e.target.getAttribute('day'), e.target.getAttribute('month'), e.target.getAttribute('year'), e.target.getAttribute('classinput'));

                document.querySelector('input[calendar=' + classInput + ']').value = calendar.selectedDate.Day + '.' + calendar.selectedDate.Month + '.' + calendar.selectedDate.Year;
                document.querySelector('.calendarOut').parentNode.removeChild(document.querySelector('.calendarOut'));
                e.stopPropagation();
            }, false);
        }


    };


    /**
     * Получение координат прокрутки
     *
     * @returns {*} координаты
     */
    function getPageScroll() {
        if (window.pageXOffset != undefined) {
            return {
                left: pageXOffset,
                top: pageYOffset
            }
        }
        var html = document.documentElement;
        var body = document.body;
        var top = html.scrollTop || body && body.scrollTop || 0;
        top -= html.clientTop;
        var left = html.scrollLeft || body && body.scrollLeft || 0;
        left -= html.clientLeft;
        return {top: top, left: left};
    }

    /**
     * Получение координат
     *
     * @param elem
     * @returns {{top: number, left: number}} координаты
     */
    function getCoords(elem) {
        var box = elem.getBoundingClientRect();
        var body = document.body;
        var docEl = document.documentElement;
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;
        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
        return {top: Math.round(top), left: Math.round(left)};
    }


    /**
     * Создаем и показываем блок с календарем
     * 
     * @param elem {object HTMLInputElement} input для которого показывается календарь
     */
    function addPopup(elem) {
        // если уже открыт календарь - удаляем существующий
        if (document.querySelector('.calendarOut')) {
            document.querySelector('.calendarOut').parentNode.removeChild(document.querySelector('.calendarOut'));
        };
        var calendarOut = document.createElement('div');
        calendarOut.className = 'calendarOut';
        document.body.appendChild(calendarOut);

//        var coords = elem.getBoundingClientRect();
        var coords = getCoords(elem);
        var scroll = getPageScroll();

        var left, top;

        /*left = coords.left + (elem.offsetWidth - calendarOut.offsetWidth) / 2;
        if (left < 0) left = 0;
        top = coords.top - calendarOut.offsetHeight - 5 + window.pageYOffset;

        if (top < 0) {
            top = coords.top + elem.offsetHeight + 5;
        }*/
        var nowDate = new Date();

        calendar.drawCalendar(parseInt(nowDate.getMonth()) + 1, nowDate.getFullYear(), elem.getAttribute('calendar'));


        // если есть дата, то показываем календарь с этой датой выбранной
        if ( elem.value != '' ){
            calendar.selectDate(elem.value.split('.')[0],elem.value.split('.')[1],elem.value.split('.')[2],elem.getAttribute('calendar'));
        }

        left = coords.left + (elem.offsetWidth - calendarOut.offsetWidth)/2;
        if (left < scroll.left) left = scroll.left;
        top = coords.top - calendarOut.offsetHeight - 5;
        if (top < scroll.top) {
            top = coords.top + elem.offsetHeight + 5;
        }

        calendarOut.style.left = left + 'px';
        calendarOut.style.top = top + 'px';


        calendarOut.style.opacity = 1;
    };


    /**
     * Добавляем клик по инпуту с классом calendar
     */
    var all_calendar = document.querySelectorAll('.calendar'),
        ind_calendar, input_calendar;
    for (ind_calendar = 0; ind_calendar < all_calendar.length; ind_calendar++) {
        input_calendar = all_calendar[ind_calendar];
        input_calendar.setAttribute('calendar', 'calendar_' + ind_calendar);
        input_calendar.addEventListener('click', function (e) {
            addPopup(e.target);
            e.stopPropagation();
        }, false);
    }


    /**
     * Клик по документу для закрытия календаря
     */

    document.addEventListener('click', function (e) {
        if (document.querySelector('.calendarOut') != null){
            document.querySelector('.calendarOut').parentNode.removeChild(document.querySelector('.calendarOut'));
            e.stopPropagation();
        }

    }, false);


    window.calendar = calendar;
})(window, document);