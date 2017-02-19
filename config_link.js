$.ajax({
  url: 'localhost:200/link/config',
  type: 'POST',
  contentType: 'application/json',
  data: '{"server":{"protocol":"http","port":53455,"host":"steve.zanity.net","base":"/Users/<user>/Documents/link-server/web/public"},"errors":{}}',
  error: function(error) {
    console.log(error);
  }
});
