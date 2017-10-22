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
		loadScript("js/bootstrap.min.js", function () {
			loadScript("js/peer.min.js", function () {
				console.log("loaded");		
			});	
		});
	});
})();