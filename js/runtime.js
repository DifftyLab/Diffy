var channel = null;
var gun = null;
var tclient = null;
var clientjs = null;
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
	loadCss("css/font-awesome.min.css");
	loadCss("css/bootstrap.min.css");
	loadCss("css/style.css");
	loadCss("player/mediaelementplayer.min.css");
	loadScript("js/jquery-3.2.1.min.js", function () {
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
			loadScript("https://diffyheart.herokuapp.com:443/socket.io/socket.io.js", function () {
				loadScript("https://diffyheart.herokuapp.com:443/dist/RTCMultiConnection.js", function () {
					loadScript("js/clientjs.min.js", function(){
						loadScript("js/webtorrent.min.js", function () {
							loadScript("js/VideoStream.min.js", function () {
								loadScript("player/mediaelement-and-player.min.js", function () {
									loadScript("js/tilt.jquery.js", function(){
										$('.tilt-poster').tilt({
											scale: 1.05,
											perspective: 500
										});
									});
									loadScript("js/emoji.min.js", function(){
										loadScript("js/jquery.emoji.js", function(){
											loadScript("js/gun.min.js", function(){
												loadScript("js/utils.js", function () {
													var LinkType = defineEnum({
														Unknown : {
															value : 0,
															string : 'unknown'
														},
														Magnet : {
															value : 1,
															string : 'magnet'
														},
														VideoMP4 : {
															value : 2,
															string : 'video-mp4'
														}
													});
													clientjs = new ClientJS();
													tclient = new WebTorrent();
													channel = new RTCMultiConnection();
													channel.userid = clientjs.getFingerprint();
													channel.socketURL = 'https://diffyheart.herokuapp.com:443/';
													channel.session = {
														data: true
													};
													channel.sdpConstraints.mandatory = {
														OfferToReceiveAudio: false,
														OfferToReceiveVideo: false
													};
													//channel.iceServers.push(stunlist);
													var roomid = $('#roomid');
													var submitroomid = $('#submitroomid');
													var createroom = $('#createroom');

													var fileselected = $('#fileselected');
													var linkselected = $('#linkselected');

													var playerstreaming = $('#streamingplayer');
													var inputchatbox = $('#chat-input');
													var livechatbox = $('#chat-output');

													var createroomdesign = $('#createroomdesign');
													var roomdesign = $('#roomdesign');
													var maindesign = $('main[role=\'main\']');
													var numpeers = $('span#numpeers');
													var numconnected = $('span#numconnected');
													/*
													playerstreaming.mediaelementplayer({
														stretching: "responsive",
														pluginPath: "player/",
													// When using jQuery's `mediaelementplayer`, an `instance` argument
													// is available in the `success` callback
														success: function(mediaElement, originalNode, instance) {
															// do things
														}
													});*/
													roomid.keypress(function() {
														if(roomid.val().length == 5){
															submitroomid.enable();
														}else{
															submitroomid.disable();
														}
													});
													fileselected.change(function(){
														if(linkselected[0].length > 0){
															console.log("LINK: reset");
															document.getElementById("inputroom").reset();
														}
													});
													linkselected.keypress(function(){
														if(fileselected[0].files.length > 0){
															console.log("FILE: reset");
															document.getElementById("inputroom").reset(); 
														}
													});
													submitroomid.click(function(){
														submitroomid.addClass("m-progress");
														submitroomid.disable();
														roomid.disable();
														channel.checkPresence(roomid.val(), function(isRoomExists, room) {
															if(!isRoomExists) {
																alert("La room n'éxiste pas !");
															}else{
																JoinRoomByID(room);
															}
															submitroomid.removeClass("m-progress");
															submitroomid.enable();
															roomid.enable();
														});
													});
													createroom.click(function(){
														if(!window.FileReader){
															return console.error("FileReader API is not supported by your browser.");
														}else if(!window.Blob){
															return console.error("Blob API is not supported by your browser.");
														}else if(!WebTorrent.WEBRTC_SUPPORT){
															return console.error("WebRTC API is not supported by your browser.");
														}
														if(fileselected[0].files.length == 1){
															let mycurrentfile = fileselected[0].files[0];
															switch(mycurrentfile.type){
																case "video/mp4":
																	return CreateRoomBySeed(mycurrentfile, playerstreaming); // TO TEST
																case "":
																	if(mycurrentfile.name.endsWith('.torrent')){
																		return CreateRoomByMagnetAndURL(mycurrentfile, playerstreaming);
																		//return console.warn("The torrent file upload function has not been incorporated yet."); // TO DO
																	}else{
																		return console.error(mycurrentfile.name + " is not supported by Diffy.");
																	}
																default:
																	return console.error(mycurrentfile.type + " is not supported by Diffy.");
															}
														}else if(linkselected.val().length > 0) {
															let currentlink = linkselected.val();
															switch(GetTypeOfLink(currentlink)){
																case LinkType.Magnet:
																	return CreateRoomByMagnetAndURL(currentlink, playerstreaming);
																case LinkType.VideoMP4:
																	return console.warn("The mp4 link function has not been incorporated yet."); // TO DO
															}
														}
													});
													inputchatbox.keypress(function(event){
														if(event.which == 13){
															SendMessage(inputchatbox.val());
															AddChatBox("You", inputchatbox.val());
															inputchatbox.val('');
														}
													});
													channel.onmessage = function(event) {
														console.log(event.isInitiator);
														switch(event.data["type"]){
															case "message":
																if(event.isInitiator){
																	AddChatBox("Owner", event.data["data"]);
																}else{
																	AddChatBox(event.userid, event.data["data"]);
																}
																break;
														}
													};
													channel.onUserStatusChanged = function(status){
														numconnected.text(channel.peers.getLength());
													};
													function SendMessage(message){
														channel.send({'type':'message', 'data':message});
													}
													function AddChatBox(userid,msg){
														let line = $('<li class="list-group-item"><strong>' + escapeHtml(userid) + ':</strong> </span>');
														let message = $('<span class="text" />').text(escapeHtml(msg)).html();
														line.append(message);
														livechatbox.append(line).fadeIn(1000);
														livechatbox.scrollTop(livechatbox[0].scrollHeight);
													}
													function CreateRoomByMagnetAndURL(torrentfile, webplayer){
														tclient.add(torrentfile, function (torrent) {
															var file = torrent.files.find(function (file) {
																return file.name.endsWith('.mp4')
															});
															if(file){
																var nowroom = makeid();
																channel.open(nowroom);
																InitDesignToRoom(nowroom);
																VideoStream(file, webplayer[0]);
																setInterval(function(){numpeers.html(torrent.numPeers)}, 500);
															}else{
																torrent.destroy();
																return console.error("This torrent is not compatible (only mp4).");
															}
														});
													}
													function InitDesignToRoom(room){
														history.pushState(history.state, null, "#" + room);
														createroomdesign.hide( "slow", function() {});
														roomdesign.show(500);
														maindesign.prepend("<div class=\"alert alert-info\" role=\"alert\">Room ID: <strong onclick=\"autoselect(this)\">" + room + "</strong>, or <a href=\"#" + room +"\" class=\"alert-link\">Link</a></div>").show(1000);
													}
													function JoinRoomByID(room){
														channel.join(room);
														InitDesignToRoom(room);
													}
													function CreateRoomBySeed(currentfile, webplayer){ // TODO Deprecated
														tclient.seed(currentfile, function (torrent) {
															CreateRoomByMagnetAndURL(torrent.magnetURI, webplayer);
														});
													}
													function GetTypeOfLink(infolink){
														switch(true){
															case (infolink.match(/^magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32}/i) !== null):
																return LinkType.Magnet;
															case (infolink.match(/^http(s)?:\/\/[\S]+?\.(mp4|m4a|m4v)/i) !== null):
																return LinkType.VideoMP4;
															default:
																return LinkType.Unknown;
														}
													}
													if(location.hash != ""){
														let rooom = location.hash.substring(1,6);
														if(rooom.length == 5){
															roomid.val(rooom);
															submitroomid.click();
														}
													}
													$("#choosemovie").click(function(){
														gun = Gun('https://db-diffyheart.herokuapp.com/gun');
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});	
		});
	});
})();