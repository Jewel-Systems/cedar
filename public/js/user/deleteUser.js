$(document).ajaxStop(function(){$("form.delete").submit(function(e){var t=confirm("Are you sure you want to delete the user?");if(t){var s=$(this).serializeArray();$.ajax({url:domain+"user/"+s[0].value,type:"DELETE",success:function(e,t,s){$("table.users-table tbody").empty(),statusMsg("User is deleted"),getUsers()},error:function(e,t,s){console.log(e.statusText)}})}e.preventDefault()})});