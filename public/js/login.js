function login(e){$.ajaxSetup({error:AjaxError}),$.ajax({url:domain+"testauth",type:"POST",data:JSON.stringify({username:e,password:""}),contentType:"application/json",success:function(e,r,a){var t=e.data;"student"!=t.type?(sessionStorage.setItem("user_id",t.id),window.location="auth"):getUserDetails(t.id)},error:function(e,r,a){0===e.readyState?errorMsg("The server may be down."):4===e.readyState&&errorMsg("Sorry can't recognise that QR code, talk to your IT admin please.")}})}void 0!==sessionStorage.udata&&(window.location="user"),$("form.password").submit(function(e){var r=sessionStorage.user_id,a=$(this).serializeArray();$.ajaxSetup({error:AjaxError}),$.ajax({url:domain+"testauth",type:"POST",data:JSON.stringify({username:r,password:a[0].value}),contentType:"application/json",success:function(e,r,a){getUserDetails(e.data.id)},error:function(e,r,a){errorMsg("Sorry can't recognise that QR code, talk to your IT admin please.")}}),e.preventDefault()});