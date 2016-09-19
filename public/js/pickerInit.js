$(document).ajaxStop(function() {
  $('#startTime').bootstrapMaterialDatePicker({ format : 'YYYY/MM/DD HH:mm:ss', lang : 'en', weekStart : 1, cancelText : 'ANNULER' });
  $('#endTime').bootstrapMaterialDatePicker({ format : 'YYYY/MM/DD HH:mm:ss', lang : 'en', weekStart : 1, cancelText : 'ANNULER' });
  $('#safeZone').bootstrapMaterialDatePicker({ date: false, shortTime: false, format: 'HH:mm:ss' });
});
