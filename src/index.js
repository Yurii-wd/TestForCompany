import './style/mstyle.scss';
import img from '../assets/cancel.png';
const days = [
    {
        name: 'Monday',
        shortName: 'Mon',
        index: 0
    },
    {
        name: 'Tuesday',
        shortName: 'Tue',
        index: 1
    },
    {
        name: 'Wednesday',
        shortName: 'Wed',
        index: 2
    },
    {
        name: 'Thursday',
        shortName: 'Thu',
        index: 3
    },
    {
        name: 'Friday',
        shortName: 'Fri',
        index: 4
    }
]

const hours = [
    {
        index: 0,
        text: '10:00',
        value: 10
    },
    {
        index: 1,
        text: '11:00',
        value: 11
    },
    {
        index: 2,
        text: '12:00',
        value: 12
    },
    {
        index: 3,
        text: '13:00',
        value: 13
    },
    {
        index: 4,
        text: '14:00',
        value: 14
    },
    {
        index: 5,
        text: '15:00',
        value: 15
    },
    {
        index: 6,
        text: '16:00',
        value: 16
    },
    {
        index: 7,
        text: '17:00',
        value: 17
    },
    {
        index: 8,
        text: '18:00',
        value: 18
    }
]

 function goCalendar() {
     window.location.href = './index.html';
 }

 /* Cancel create event */
function onCancelCreateEvent() {
    goCalendar();
}

function initCancelCreateEventButton() {
    const cancelEventButton = document.getElementById('cancel-event-btn');
    cancelEventButton.onclick = onCancelCreateEvent;
}
function getEventsFromStorage() {
    const string = localStorage.getItem('events');
    return JSON.parse(string);
}

 /* Create event */

function onRoomBusy() {
    alert('BUSY MF!!!')
}

function checkIsRoomFree(event) {
    const events = getEventsFromStorage();
    const day = event.day;
    const time = event.time;
    const existed = events.findIndex( item => item.day === day && item.time === time);
    return existed === -1;
}

function saveEvent(event) {
    const events = getEventsFromStorage();
    const isFree = checkIsRoomFree(event);
    if (isFree) {
        events.push(event);
        const string = JSON.stringify(events);
        localStorage.setItem('events', string);
        goCalendar();
    } else {
        onRoomBusy();
    }

}

function getSelectedParticipants(){
    const participantsCollection = document.getElementById('participants').selectedOptions;
    const participants = Array.from(participantsCollection);

    return participants.map(item => item.value);
}

function onCreateEvent() {
    const eventName = document.getElementById('event-name').value;
    const participants = getSelectedParticipants();
    const day = document.getElementById('day').value;
    const time = document.getElementById('time').value;

    const event = {
        name: eventName,
        day: day,
        time: time,
        participants: participants
    };

    saveEvent(event);
}

function initCreateEventButton() {
    const createButton = document.getElementById('create-btn');
    createButton.onclick = onCreateEvent;
    console.log('createButton');
}

/* New event */
function goNewEventPage() {
    window.location.href = './form.html';
}

function onNewEventClick() {
    goNewEventPage();
}

function initNewEventButton() {
    const newEventButton = document.getElementById('new-event-btn');
    newEventButton.onclick = onNewEventClick;
}

/* Fill calendar */
function parseEventsToCalendarPosition() {
    const events = getEventsFromStorage();
    return events.map( event => {
        const time = Number(event.time);
        const column = days.find( day => day.name === event.day ).index;
        const row = hours.find( hour => hour.value === time).index;
        return {
            name: event.name,
            col: column,
            row: row
        };
    });
}

function fillCalendar() {
    const calendar = document.getElementById('calendar');
    const rows = Array.from(calendar.rows).slice(1);
    const data = parseEventsToCalendarPosition();

    data.map( item => {
        const columnIndex = item.col;
        const rowIndex = item.row;
        const columns = Array.from(rows[rowIndex].cells).slice(1);
        const cell = columns[columnIndex];
        cell.innerHTML = item.name;
    });
}

function initCalendar() {
    fillCalendar();
}

window.onload = () => {
    try {
        initNewEventButton();
    }
    catch (error) {
        console.error(error);
    }

    try {
        initCreateEventButton();
    } catch (error) {
        console.error(error);
    }

    try {
        initCancelCreateEventButton();
    } catch (error) {
        console.error(error);
    }

    try {
        initCalendar();
    } catch (error) {
        console.error(error);
    }
}

