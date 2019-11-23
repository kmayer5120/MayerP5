const uri = "api/pollenreadings";
let pollenReadings = null;

function getCount(data) {
    const el = $("#counter");
    let name = "Pollen Count Reading";
    if (data) {
        if (data > 1) {
            name = "Pollen Count Readings";
        }
        el.text(data + " " + name);
    } else {
        el.text("No " + name);
    }
}

$(document).ready(function () {
    getData();
});

function getData() {
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {
            const tBody = $("#pollen_readings");
            var itemsPerPage = $('#items_per_page').val();
            var counter = 1;

            $(tBody).empty();

            getCount(data.length);


            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(formatDate(item.date)))
                    .append($("<td></td>").text(item.pollenName))
                    .append($("<td></td>").text(item.location))
                    .append($("<td></td>").text(item.readingValue));

                tr.appendTo(tBody);
                if (counter == itemsPerPage) {
                    return false;
                }
                counter++;

            });
            pollenReadings = data;
        }
    });
}

function formatDate(date) {
    //remove the time part from the date because it is all the same value
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);

    return month + "/" + day + "/" + year;
}


