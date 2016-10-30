$(document).ajaxComplete(function() {
  $('#endTime').bootstrapMaterialDatePicker({ format : 'YYYY/MM/DD HH:mm:ss', lang : 'en', weekStart : 1, cancelText : 'ANNULER' });
  $('#startTime').bootstrapMaterialDatePicker({ format : 'YYYY/MM/DD HH:mm:ss', lang : 'en', weekStart : 1, cancelText : 'ANNULER' }).on('change', function(e, date) {
    $('#endTime').bootstrapMaterialDatePicker('setMinDate', date);
  });
  $('#safeZone').bootstrapMaterialDatePicker({ date: false, shortTime: false, format: 'HH:mm:ss' });
});
