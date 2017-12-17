var channel = null;
var tclient = null;
var clientjs = null;
var player = null;
(function() {
	function LoadCss(url) {
		let queue = []
		let funcload = () => {
			var url = queue.shift();
			let fileref = document.createElement("link");
			fileref.rel = "stylesheet";
			fileref.type = "text/css";
			fileref.href = url;
			document.getElementsByTagName("head")[0].appendChild(fileref)
			if (queue.length > 0) {
				funcload();
			}
		}
		queue = queue.concat(url)
		funcload();
	}
	function LoadScript(url, callback) {
		let queue = []
		let funcload = () => {
			var url = queue.shift();
			var script = document.createElement("script")
			script.type = "text/javascript";
			if (script.readyState) { //IE
				script.onreadystatechange = function () {
					if (script.readyState == "loaded" || script.readyState == "complete") {
						script.onreadystatechange = null;
						if (queue.length == 0) {
							callback();
						} else {
							funcload();
						}
					}
				};
			} else { //Others
				script.onload = function () {
					if (queue.length == 0) {
						callback();
					} else {
						funcload();
					}
				};
			}
			script.src = url;
			document.getElementsByTagName("head")[0].appendChild(script);
		}
		queue = queue.concat(url)
		funcload();
	}
	LoadCss([
		"css/font-awesome.min.css",
		"css/bootstrap.min.css", 
		"player/mediaelementplayer.min.css", 
		"css/dropzone.css", 
		"css/style.css"
		]);
	LoadScript([
		"js/jquery-3.2.1.min.js",
		"js/popper.min.js",
		"js/bootstrap.min.js",
		"js/jquery.mobile-1.4.5.min.js",
		"https://diffyheart.herokuapp.com:443/socket.io/socket.io.js",
		"https://diffyheart.herokuapp.com:443/dist/RTCMultiConnection.js",
		"js/clientjs.min.js",
		"js/webtorrent.min.js",
		"js/VideoStream.min.js",
		"player/mediaelement-and-player.min.js",
		"js/dropzone.js",
		"js/fastclick.js",
		"js/emoji.min.js",
		"js/jquery.emoji.js",
		"js/utils.js"
	], function() {
		var LinkType = defineEnum({
			Unknown: {
				value: 0,
				string: 'unknown'
			},
			Magnet: {
				value: 1,
				string: 'magnet'
			},
			VideoMP4: {
				value: 2,
				string: 'video-mp4'
			},
			Torrent: {
				value: 3,
				string: 'torrent'
			}
		});
		clientjs = new ClientJS();
		tclient = new WebTorrent({
			dht: false
		});
		channel = new RTCMultiConnection();
		channel.userid = clientjs.getFingerprint();
		channel.extra.username = clientjs.getFingerprint();
		channel.extra.started = false;
		channel.extra.starttime = 0;

		channel.socketURL = 'https://diffyheart.herokuapp.com:443/';
		channel.session = {
			data: true
		};
		channel.sdpConstraints.mandatory = {
			OfferToReceiveAudio: false,
			OfferToReceiveVideo: false
		};
		//channel.iceServers.push(stunlist);
		var playtime = 0;
		var roomid = $('#roomid');
		var submitroomid = $('#submitroomid');
		var createroom = $('#createroom');

		var fileselected = $('#fileselected');
		var filename = $('#filename')
		var linkselected = $('#linkselected');

		var playerstreaming = $('#streamingplayer');
		var inputchatbox = $('#chat-input');
		var livechatbox = $('#chat-output');
		var sendmessagebtn = $('#msg-submit');
		var createroomdesign = $('#createroomdesign');
		var roomdesign = $('#roomdesign');
		var maindesign = $('main[role=\'main\']');
		var numpeers = $('#numpeers');
		var numconnected = $('#numconnected');
		var playstream = $('#playstream');

		//TODO AJout du bouton que si créateur
		//$(".mejs__controls").show();
		//$(".mejs__overlay").show();
		$("div#seeddropzone").dropzone({
			maxFiles: 1,
			maxFilesize: 1,
			maxFilesize: 10, //mb
			acceptedFiles: '.torrent,video/mp4,video/m4a,video/m4v',
			addRemoveLinks: true,
			autoProcessQueue: false, // used for stopping auto processing uploads
			autoDiscover: false
		});
		player = new MediaElementPlayer('streamingplayer', {
			//features: ['current', 'broadcast', 'duration', 'volume', 'fullscreen'],
			enableKeyboard: false,
			clickToPlayPause: false,
			stretching: "responsive",
			pluginPath: "player/",
			startVolume: 0.5,
			forceLive: true,
			pauseOtherPlayers: false,
			alwaysShowControls: true,
			hideCaptionsButtonWhenEmpty: false //Show caption
		});

		playstream.click(function() {
			if (channel.isInitiator) {
				playstream.disable();
				playstream.blur();
				channel.extra.started = true;
				channel.extra.starttime = Date.now();
				channel.updateExtraData();
			}
		})
		roomid.keyup(function(event) {
			if (roomid.val().length == 5 && roomid[0].checkValidity()) {
				submitroomid.enable();
				if (event.which == 13) {
					submitroomid.click();
				}
			} else {
				submitroomid.disable();
			}
		});
		fileselected.change(function() {
			if (fileselected[0].files.length > 0) {
				linkselected.val('');
				filename.val(fileselected[0].files[0].name);
				createroom.enable();
			}
		});
		linkselected.keyup(function() {
			if (fileselected[0].files.length > 0 || filename.val().length > 0) {
				fileselected.val('');
				filename.val('');
			} else {
				if(linkselected.val().length > 0 && linkselected[0].checkValidity()){
					createroom.enable();
				}else{
					createroom.disable();
				}
			}
		});
		submitroomid.click(function() {
			submitroomid.addClass("m-progress");
			submitroomid.disable();
			roomid.disable();
			channel.checkPresence(roomid.val(), function(isRoomExists, room) {
				if (!isRoomExists) {
					alert("La room n'éxiste pas !");
					location.hash = "";
					roomid.val('');
					submitroomid.disable();
				} else {
					JoinRoomByID(room);
				}
				submitroomid.removeClass("m-progress");
				submitroomid.enable();
				roomid.enable();
			});
		});
		createroom.click(function() {
			if (!window.FileReader) {
				return console.error("FileReader API is not supported by your browser.");
			} else if (!window.Blob) {
				return console.error("Blob API is not supported by your browser.");
			} else if (!WebTorrent.WEBRTC_SUPPORT) {
				return console.error("WebRTC API is not supported by your browser.");
			}
			if (fileselected[0].files.length == 1) {
				let mycurrentfile = fileselected[0].files[0];
				switch (mycurrentfile.type) {
					case "video/mp4":
						return CreateRoomBySeed(mycurrentfile); // TO TEST
					case "":
						if (mycurrentfile.name.endsWith('.torrent')) {
							return CreateRoomByMagnetAndURL(mycurrentfile);
							//return console.warn("The torrent file upload function has not been incorporated yet."); // TO DO
						} else {
							return console.error(mycurrentfile.name + " is not supported by Diffy.");
						}
					default:
						return console.error(mycurrentfile.type + " is not supported by Diffy.");
				}
			} else if (linkselected.val().length > 0) {
				let currentlink = linkselected.val();
				switch (GetTypeOfLink(currentlink)) {
					case LinkType.Magnet:
						return CreateRoomByMagnetAndURL(currentlink);
					case LinkType.Torrent:
						return CreateRoomByMagnetAndURL(currentlink);
					case LinkType.VideoMP4:
						return console.warn("The mp4 link function has not been incorporated yet."); // TO DO
				}
			}
		});
		inputchatbox.keypress(function(event) {
			if (event.which == 13) {
				sendmessagebtn.click();
			}
		});
		sendmessagebtn.click(function() {
			SendMessage(inputchatbox.val());
			AddChatBox("You", inputchatbox.val());
			inputchatbox.val('');
		});
		channel.onmessage = function(event) {
			switch (event.data["type"]) {
				case "message":
					if (event.userid == channel.sessionid) {
						AddChatBox("Owner", event.data["data"]);
						//AddChatBox(generateName(event.userid), event.data["data"]);
					} else {
						AddChatBox(generateName(event.userid), event.data["data"]);
					}
					break;
			}
		};
		channel.onUserStatusChanged = (event) => {
			numconnected.text(channel.peers.getLength());
		};
		channel.onExtraDataUpdated = (event) => {
			if (event.userid == channel.sessionid) {
				if(event.extra.started){
					alert("live started");
				}
			}
		};
		channel.onleave = (event) => {
			log(generateName(event.userid) + " left");
		};
		/*
		channel.onleave = (event) => {
			log(generateName(event.userid) + " joined");
			console.log("onopen");
		}*/ // BUG TO FIX
		function log(message) {
			var el = $('<li>').addClass('log').text(message);
			livechatbox.append(el);
		}

		function SendMessage(message) {
			channel.send({
				'type': 'message',
				'data': message
			});
		}

		function AddChatBox(userid, msg) {
			let line = $('<li class="list-group-item"><strong>' + escapeHtml(userid) + ':</strong> </span>');
			let message = $('<span class="text" />').text(msg).html();
			line.append(message);
			livechatbox.append(line.emoji()).fadeIn(1000);
			livechatbox.scrollTop(livechatbox[0].scrollHeight);
		}

		function CreateRoomByMagnetAndURL(torrentfile, nocreate = false) {
			tclient.add(torrentfile, {
				announce: "wss://tracker-diffyheart.herokuapp.com"
			}, (torrent) => {
				var file = torrent.files.find((file) => {
					return file.name.endsWith('.mp4')
				});
				if (file) {
					if (!nocreate) {
						var nowroom = makeid();
						channel.extra.magnet = torrent.magnetURI;
						channel.open(nowroom);
						InitDesignToRoom(nowroom)
					}
					VideoStream(file, player.media);
					setInterval(onPeers(torrent), 1000);
				} else {
					torrent.destroy();
					console.error("This torrent is not compatible (only mp4).");
				}
			});
		}

		function InitDesignToRoom(room) {
			history.pushState(history.state, null, "#" + room);
			createroomdesign.hide("slow", function() {});
			if (channel.isInitiator) {
				playstream.show();
			}
			roomdesign.show(500);
			maindesign.prepend("<div class=\"alert alert-info alert-dismissible fade show\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>Room ID: <strong onclick=\"autoselect(this)\">" + room + "</strong>, or <a href=\"#" + room + "\" class=\"alert-link\">Link</a></div>").show(1000);
		}

		function JoinRoomByID(room) {
			channel.join(room);
			InitDesignToRoom(room);
		}

		function CreateRoomBySeed(currentfile) {
			tclient.seed(currentfile, (torrent) => {
				var nowroom = makeid();
				channel.open(nowroom);
				InitDesignToRoom(nowroom);
				VideoStream(torrent.files[0], player.media);
				setInterval(onPeers(torrent), 500);
			});
		}

		function onPeers(torrent) {
			numpeers.html(torrent.numPeers);
		}

		function GetTypeOfLink(infolink) {
			switch (true) {
				case (infolink.match(/^magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32}/i) !== null):
					return LinkType.Magnet;
				case (infolink.match(/^https?:\/\/[\S]+?\.(mp4|m4a|m4v)/i) !== null):
					return LinkType.VideoMP4;
				case (infolink.match(/^https?:\/\/[\S]+?\.torrent/i) !== null):
					return LinkType.Torrent;
				default:
					return LinkType.Unknown;
			}
		}
		if (location.hash !== "") {
			let rooom = location.hash.substring(1, 6);
			if (rooom.length == 5) {
				roomid.val(rooom);
				submitroomid.click();
			}
		}
		$("#choosemovie").click(function() {

		});
	});
})();