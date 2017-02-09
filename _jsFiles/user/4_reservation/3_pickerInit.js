// FILENAME: pickerInit.js
// Description: Setup file for the bootstrap-material-datetimepicker

$(document).ajaxStop(function() {
  $('#endTime').bootstrapMaterialDatePicker({ format : 'YYYY/MM/DD HH:mm:ss', lang : 'en', weekStart : 1, cancelText : 'ANNULER' });
  $('#startTime').bootstrapMaterialDatePicker({ format : 'YYYY/MM/DD HH:mm:ss', minDate : new Date(), lang : 'en', weekStart : 1, cancelText : 'ANNULER' }).on('change', function(e, date) {
    $('#endTime').bootstrapMaterialDatePicker('setMinDate', date);
  });
  $('#safeZone').bootstrapMaterialDatePicker({ date: false, shortTime: false, format: 'HH:mm:ss' });
});
