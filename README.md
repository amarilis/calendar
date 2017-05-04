## Календарь на чистом Javascript

Календарь сделан с русскими буквами и добавляется `input` в виде **дд.мм.гггг**

Календарь появляется при клике на `input` с классом `calendar`.

Для подключения необходимо вставить скрипт календаря:

    <script src="calendar.js"></script>

или

    <script src="calendar.min.js"></script>

**Важно** поставить тег `script` **после** тегов `input`.

---

Для вызова календаря из Вашего кода следует применять конструкцию:

**HTML**

    <input type="text" class="abcde" calendar="www" placeholder="Date">

В `input` следует **обязательно** добавить атрибут `calendar`.

**Javascript**

    document.querySelector('.abcde').addEventListener('click',function (e) {
        calendar.selectDate('3','10','1650',this.getAttribute('calendar'));
        e.stopPropagation();
    },false);

Необходимо делать вызов через **`addEventListener`**

В вызове:
- `'3'` - день
- `'10'` - месяц
- `'1650'` - год
- `this.getAttribute('calendar')` - атрибут `calendar`
- `e.stopPropagation();` - для предотвращения всплытия

Параметры даты должны быть **обязательно** в кавычках.


