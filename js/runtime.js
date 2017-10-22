
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
	text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
var host = "https://diffyheart.herokuapp.com:443/";
(function () {
	function loadCss(filename, filetype)
	{
		let fileref = document.createElement("link");
		fileref.rel = "stylesheet";
		fileref.type = "text/css";
		fileref.href = filename;
		document.getElementsByTagName("head")[0].appendChild(fileref)
	}
	function loadScript(url, callback) {
		var script = document.createElement("script")
		script.type = "text/javascript";
		if (script.readyState) { //IE
			script.onreadystatechange = function () {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else { //Others
			script.onload = function () {
				callback();
			};
		}
		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	loadCss("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
	loadCss("css/bootstrap.min.css");
	loadCss("css/style.css");
	loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js", function () {
		$.prototype.enable = function () {
			$.each(this, function (index, el) {
				$(el).removeAttr('disabled');
			});
		}

		$.prototype.disable = function () {
			$.each(this, function (index, el) {
				$(el).attr('disabled', 'disabled');
			});
		}
		loadScript("js/bootstrap.min.js", function () {
			loadScript("https://diffyheart.herokuapp.com/dist/RTCMultiConnection.min.js", function () {
				loadScript("https://diffyheart.herokuapp.com/socket.io/socket.io.js", function () {
					var sock = new RTCMultiConnection();
					sock.socketURL = host;
					sock.session = {
						data: true
					};
					$("input[name='roomid']").keyup(function() {
						if($(this).val().length == 5){
							$("button[name='submitroomid']").enable();
						}else{
							$("button[name='submitroomid']").disable();
						}
					});
					$("button[name='submitroomid']").click(function(){
						sock.checkPresence($("input[name='roomid']").val(), function(isRoomEists, roomid) {
							if(!isRoomEists) {
								alert("La room n'éxiste pas !");
							}
						});
					})
				});	
			});	
		});
	});
})();