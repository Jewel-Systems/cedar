$(document).ajaxComplete(function(){$("#endTime").bootstrapMaterialDatePicker({format:"YYYY/MM/DD HH:mm:ss",lang:"en",weekStart:1,cancelText:"ANNULER"}),$("#startTime").bootstrapMaterialDatePicker({format:"YYYY/MM/DD HH:mm:ss",lang:"en",weekStart:1,cancelText:"ANNULER"}).on("change",function(e,t){$("#endTime").bootstrapMaterialDatePicker("setMinDate",t)}),$("#safeZone").bootstrapMaterialDatePicker({date:!1,shortTime:!1,format:"HH:mm:ss"})});