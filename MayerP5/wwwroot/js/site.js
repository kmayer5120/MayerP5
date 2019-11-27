/*
 * Programmer:  Kyle Mayer
 * Email:       kmayer1@cnm.edu
 * Date:        11/22/2019
 * Program:     P5 Open Data API and SPA 
 * File:        site.js
*/

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

function updateTable(data) {
    const tBody = $("#pollen_readings");
    $(tBody).empty();
    var counter = 1;

    $.each(data, function (key, item) {
        const tr = $("<tr></tr>")
            .append($("<td></td>").text(item.id))
            .append($("<td></td>").text(formatDate(item.date)))
            .append($("<td></td>").text(item.pollenName))
            .append($("<td></td>").text(item.location))
            .append($("<td></td>").text(item.readingValue))
            .append($("<td></td>").html(`<button class=btn-primary onClick=displayDetails(${counter}) id=btn_details_${counter}>Details</button>`));
        tr.appendTo(tBody);
        counter++;
    });
}

function displayTableData() {
    //Use ajax call to get all table data and display 
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {
            const dataSetSize = data.length;
            const detailsDiv = $("#detail_view");
            var numPages = 1;
            var itemsPerPage = $("#items_per_page").val();
            var pageNumber = $("#page_number").val();

            numPages = getNumberOfPages(itemsPerPage, data.length);
            $('#number_of_pages').text("Number of Pages: " + numPages);

            //slice data to the length and bounds of user input from fields
            data = data.slice((itemsPerPage * pageNumber) - itemsPerPage, itemsPerPage * pageNumber);

            displayCount(data.length, dataSetSize);

            //show table view when returning from detail view
            $("#table_view").show();
            //clear out detailsDiv to prevent duplicates
            detailsDiv.html("");

            updateTable(data);

            pollenReadings = data;
        }
    });
}

function displayDetails(id) {
    $.ajax({
        type: "GET",
        url: `api/pollenreadings/${id}`,
        cache: false,
        success: function (data) {
            const detailsDiv = $("#detail_view");
            const tableDiv = $("#table_view");
            console.log(id);

            //create query string for a google search
            var googleSearchURL = "http://www.google.com/search?q=";
            var searchTerms = data.pollenName.split(" ").join("+");
            googleSearchURL += searchTerms + "+allergy";
            console.log(googleSearchURL);

            detailsDiv.append("<div class='jumbotron'><h1>Details</h1></div>")
                .append(`<h3>Pollen Reading ID: ${data.id}`)
                .append(`<p>Date: ${formatDate(data.date)}</p>`)
                .append(`<p>Pollen type: ${data.pollenName}</p>`)
            //handle weird misspelling of Unidentified in dataset 
            //and only show link if pollen name is indentified
            if (!(data.pollenName == "Unidentied")) {
                detailsDiv.append(`<p><a href="${googleSearchURL}">More information on ${data.pollenName}</a></p>`);
            }
            detailsDiv.append(`<p>Reading: ${data.readingValue} pollen/spores per cubic meter </p>`)
                .append(`<p>Pollen type: ${data.pollenName}</p>`)
                .append(`<p>Collected at: ${data.location}</p>`)
                .append('<button class="btn-primary" onclick="displayTableData()">Back to Table View</button>');

            //toggle visibility
            tableDiv.hide();
            detailsDiv.show();

            pollenReadings = data;
        }
    });
}

$(document).ready(function () {
    displayTableData();
});

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