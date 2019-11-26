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
            var numPages = 1;
            var counter = 1;

            $(tBody).empty();

            //avoid division by zero
            numPages = getNumberOfPages(itemsPerPage, data.length);
            $('#number_of_pages').text("Number of Pages: " + numPages);

            data = data.slice(0, itemsPerPage);

            displayCount(data.length, dataSetSize);

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.id))
                    .append($("<td></td>").text(formatDate(item.date)))
                    .append($("<td></td>").text(item.pollenName))
                    .append($("<td></td>").text(item.location))
                    .append($("<td></td>").text(item.readingValue));

                tr.appendTo(tBody);
                if (counter == itemsPerPage) {
                    //break out of for each loop
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

    return new Date(month + "/" + day + "/" + year);
}

function getNumberOfPages(itemsPerPage, dataSetSize) {
    if (itemsPerPage > 0) {
        return Math.floor(dataSetSize / itemsPerPage);
    }
    else {
        return "Items per page must be positive";
    }
}