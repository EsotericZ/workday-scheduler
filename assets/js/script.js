const date = moment().format('dddd, MMM Do');
$("#currentDay").html(date);

let times = [9, 10, 11, 12, 13, 14, 15, 16, 17]

function colorChanger() {
    const now = moment().format('h');
    for (let i = 0; i < times.length; i++) {
        if (now > times[i]) {
            $(`#${times[i]}`).attr('class', 'col-10 past');
        } else if (now == times[i]) {
            $(`#${times[i]}`).attr('class', 'col-10 present');
        }        
    }
}

$(function() {
    setInterval(colorChanger, 1000);
});

// STORE ALL NOTES
let store = [];
$(".saveBtn").click(function() {
    let time = $(this).parent().children()[0].innerHTML;
    let message = $(this).parent().children()[1].value;
    let add = { time: time, message: message};
    store.push(add);
    localStorage.setItem("store", JSON.stringify(store));
});

// RETRIEVE ALL NOTES FROM STORAGE
let storedData = JSON.parse(localStorage.getItem('store'));
storedData.forEach(element => {
    let checkTime = element.time;
    let checkMsg = element.message;
    for (let i = 0; i < times.length; i++) {
        let checkId = $(`#${times[i]}`).parent().children()[0].innerHTML;
        if (checkTime == checkId) {
            $(`#${times[i]}`).parent().children()[1].textContent = checkMsg;
        }
    }
});