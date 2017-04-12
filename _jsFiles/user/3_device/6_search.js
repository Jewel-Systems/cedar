// FILENAME: 6_search.js
// DESCRIPTION: Search functions for the Users management page. Search functions include: Device ID, Device Renter.

$(document).one("ajaxStop", function() {
  $('form#searchDevice').submit(function(event) {
    var data = $(this).serializeArray();

    $.get(domain + "device", function(ddata) {
      var devices = ddata.data;
      checkDeviceValues(data[0].value, data[1].value, devices);
    });

    event.preventDefault();
  });
});

function checkDeviceValues(value, type, devices) {
  if ($.isNumeric(value)) {
    if (type == "id") {
      searchByDeviceID(value, devices);
    } else {
      searchByRenter(value, devices);
    }
  } else {
    displayDevices(devices);
  }
}

function searchByDeviceID(value, devices) {
  devices = devices.filter(function(n) {
    return value.indexOf(n.id) > -1;
  });

  displayDevices(devices);
}

function searchByRenter(value, devices) {
  devices = devices.filter(function(n) {
    return value.indexOf(n.loaned_by) > -1;
  });

  displayDevices(devices);
}
