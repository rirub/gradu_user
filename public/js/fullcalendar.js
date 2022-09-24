document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    firstDay: 1,
        titleFormat: function (date) {
        year = date.date.year;
        month = date.date.month + 1;

        return year + "년 " + month + "월";
        },
    });

    calendar.render();
});

