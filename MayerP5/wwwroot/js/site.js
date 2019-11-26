const uri = "api/pollenreadings";
let pollenReadings = null;

function displayCount(displayed, dataSetSize) {
    const el = $("#counter");
    let name = "Pollen Count Reading";
    if (displayed) {
        if (displayed > 1) {
            name = "Pollen Count Readings Displayed";
        }
        el.text(displayed + " " + name);
    } else {
        el.text("No " + name + "s Displayed");
    }

    el.append(" out of " + dataSetSize);
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
            const dataSetSize = data.length;
            var itemsPerPage = $("#items_per_page").val();
            var pageNumber = $("#page_number").val();
            var numPages = 1;
            var currentPage = 1;
            var counter = 1;

            $(tBody).empty();

            numPages = getNumberOfPages(itemsPerPage, data.length);

            $('#number_of_pages').text("Number of Pages: " + numPages);



            data = data.slice((itemsPerPage * pageNumber) - itemsPerPage, itemsPerPage * pageNumber);

            displayCount(data.length, dataSetSize);

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.id))
                    .append($("<td></td>").text(formatDate(item.date)))
                    .append($("<td></td>").text(item.pollenName))
                    .append($("<td></td>").text(item.location))
                    .append($("<td></td>").text(item.readingValue))
                    .append($("<td></td>").html(`<button class=btn-primary onclick=displayDetails(${counter}) id=btn_details_${counter}>Details</button>`));

                tr.appendTo(tBody);
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

    return new Date(month + "/" + day + "/" + year);
}

function getNumberOfPages(itemsPerPage, dataSetSize) {
    if (itemsPerPage > 0) {
        return Math.floor(dataSetSize / itemsPerPage);
    }
    else {
        alert("Items per page must be positive");
        return 1;
    }
}

function displayDetails(itemNumber) {
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {
            const tBody = $("#pollen_readings");
            $(tBody).empty();
            $()
        }
    });
}