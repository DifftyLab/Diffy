
var MEDIA_EXT = ['mp4', 'm4v', 'm4v', 'webm', 'm4a', 'mp3', 'wav', 'aac', 'ogg', 'oga'];
var stunlist = {
	urls: 'stun:stun01.sipphone.com',
	urls: 'stun:stun.ekiga.net',
	urls: 'stun:stun.fwdnet.net',
	urls: 'stun:stun.ideasip.com',
	urls: 'stun:stun.iptel.org',
	urls: 'stun:stun.rixtelecom.se',
	urls: 'stun:stun.schlund.de',
	urls: 'stun:stun.l.google.com:19302',
	urls: 'stun:stun1.l.google.com:19302',
	urls: 'stun:stun2.l.google.com:19302',
	urls: 'stun:stun3.l.google.com:19302',
	urls: 'stun:stun4.l.google.com:19302',
	urls: 'stun:stunserver.org',
	urls: 'stun:stun.softjoys.com',
	urls: 'stun:stun.voiparound.com',
	urls: 'stun:stun.voipbuster.com',
	urls: 'stun:stun.voipstunt.com',
	urls: 'stun:stun.voxgratia.org',
	urls: 'stun:stun.xten.com',
	urls: '23.21.150.121:3478',
	urls: 'iphone-stun.strato-iphone.de:3478',
	urls: 'numb.viagenie.ca:3478',
	urls: 's1.taraba.net:3478',
	urls: 's2.taraba.net:3478',
	urls: 'stun.12connect.com:3478',
	urls: 'stun.12voip.com:3478',
	urls: 'stun.1und1.de:3478',
	urls: 'stun.2talk.co.nz:3478',
	urls: 'stun.2talk.com:3478',
	urls: 'stun.3clogic.com:3478',
	urls: 'stun.3cx.com:3478',
	urls: 'stun.a-mm.tv:3478',
	urls: 'stun.aa.net.uk:3478',
	urls: 'stun.acrobits.cz:3478',
	urls: 'stun.actionvoip.com:3478',
	urls: 'stun.advfn.com:3478',
	urls: 'stun.aeta-audio.com:3478',
	urls: 'stun.aeta.com:3478',
	urls: 'stun.alltel.com.au:3478',
	urls: 'stun.altar.com.pl:3478',
	urls: 'stun.annatel.net:3478',
	urls: 'stun.antisip.com:3478',
	urls: 'stun.arbuz.ru:3478',
	urls: 'stun.avigora.com:3478',
	urls: 'stun.avigora.fr:3478',
	urls: 'stun.awa-shima.com:3478',
	urls: 'stun.awt.be:3478',
	urls: 'stun.b2b2c.ca:3478',
	urls: 'stun.bahnhof.net:3478',
	urls: 'stun.barracuda.com:3478',
	urls: 'stun.bluesip.net:3478',
	urls: 'stun.bmwgs.cz:3478',
	urls: 'stun.botonakis.com:3478',
	urls: 'stun.budgetphone.nl:3478',
	urls: 'stun.budgetsip.com:3478',
	urls: 'stun.cablenet-as.net:3478',
	urls: 'stun.callromania.ro:3478',
	urls: 'stun.callwithus.com:3478',
	urls: 'stun.cbsys.net:3478',
	urls: 'stun.chathelp.ru:3478',
	urls: 'stun.cheapvoip.com:3478',
	urls: 'stun.ciktel.com:3478',
	urls: 'stun.cloopen.com:3478',
	urls: 'stun.colouredlines.com.au:3478',
	urls: 'stun.comfi.com:3478',
	urls: 'stun.commpeak.com:3478',
	urls: 'stun.comtube.com:3478',
	urls: 'stun.comtube.ru:3478',
	urls: 'stun.cope.es:3478',
	urls: 'stun.counterpath.com:3478',
	urls: 'stun.counterpath.net:3478',
	urls: 'stun.cryptonit.net:3478',
	urls: 'stun.darioflaccovio.it:3478',
	urls: 'stun.datamanagement.it:3478',
	urls: 'stun.dcalling.de:3478',
	urls: 'stun.decanet.fr:3478',
	urls: 'stun.demos.ru:3478',
	urls: 'stun.develz.org:3478',
	urls: 'stun.dingaling.ca:3478',
	urls: 'stun.doublerobotics.com:3478',
	urls: 'stun.drogon.net:3478',
	urls: 'stun.duocom.es:3478',
	urls: 'stun.dus.net:3478',
	urls: 'stun.e-fon.ch:3478',
	urls: 'stun.easybell.de:3478',
	urls: 'stun.easycall.pl:3478',
	urls: 'stun.easyvoip.com:3478',
	urls: 'stun.efficace-factory.com:3478',
	urls: 'stun.einsundeins.com:3478',
	urls: 'stun.einsundeins.de:3478',
	urls: 'stun.ekiga.net:3478',
	urls: 'stun.epygi.com:3478',
	urls: 'stun.etoilediese.fr:3478',
	urls: 'stun.eyeball.com:3478',
	urls: 'stun.faktortel.com.au:3478',
	urls: 'stun.freecall.com:3478',
	urls: 'stun.freeswitch.org:3478',
	urls: 'stun.freevoipdeal.com:3478',
	urls: 'stun.fuzemeeting.com:3478',
	urls: 'stun.gmx.de:3478',
	urls: 'stun.gmx.net:3478',
	urls: 'stun.gradwell.com:3478',
	urls: 'stun.halonet.pl:3478',
	urls: 'stun.hellonanu.com:3478',
	urls: 'stun.hoiio.com:3478',
	urls: 'stun.hosteurope.de:3478',
	urls: 'stun.ideasip.com:3478',
	urls: 'stun.imesh.com:3478',
	urls: 'stun.infra.net:3478',
	urls: 'stun.internetcalls.com:3478',
	urls: 'stun.intervoip.com:3478',
	urls: 'stun.ipcomms.net:3478',
	urls: 'stun.ipfire.org:3478',
	urls: 'stun.ippi.fr:3478',
	urls: 'stun.ipshka.com:3478',
	urls: 'stun.iptel.org:3478',
	urls: 'stun.irian.at:3478',
	urls: 'stun.it1.hr:3478',
	urls: 'stun.ivao.aero:3478',
	urls: 'stun.jappix.com:3478',
	urls: 'stun.jumblo.com:3478',
	urls: 'stun.justvoip.com:3478',
	urls: 'stun.kanet.ru:3478',
	urls: 'stun.kiwilink.co.nz:3478',
	urls: 'stun.kundenserver.de:3478',
	urls: 'stun.l.google.com:19302',
	urls: 'stun.linea7.net:3478',
	urls: 'stun.linphone.org:3478',
	urls: 'stun.liveo.fr:3478',
	urls: 'stun.lowratevoip.com:3478',
	urls: 'stun.lugosoft.com:3478',
	urls: 'stun.lundimatin.fr:3478',
	urls: 'stun.magnet.ie:3478',
	urls: 'stun.manle.com:3478',
	urls: 'stun.mgn.ru:3478',
	urls: 'stun.mit.de:3478',
	urls: 'stun.mitake.com.tw:3478',
	urls: 'stun.miwifi.com:3478',
	urls: 'stun.modulus.gr:3478',
	urls: 'stun.mozcom.com:3478',
	urls: 'stun.myvoiptraffic.com:3478',
	urls: 'stun.mywatson.it:3478',
	urls: 'stun.nas.net:3478',
	urls: 'stun.neotel.co.za:3478',
	urls: 'stun.netappel.com:3478',
	urls: 'stun.netappel.fr:3478',
	urls: 'stun.netgsm.com.tr:3478',
	urls: 'stun.nfon.net:3478',
	urls: 'stun.noblogs.org:3478',
	urls: 'stun.noc.ams-ix.net:3478',
	urls: 'stun.node4.co.uk:3478',
	urls: 'stun.nonoh.net:3478',
	urls: 'stun.nottingham.ac.uk:3478',
	urls: 'stun.nova.is:3478',
	urls: 'stun.nventure.com:3478',
	urls: 'stun.on.net.mk:3478',
	urls: 'stun.ooma.com:3478',
	urls: 'stun.ooonet.ru:3478',
	urls: 'stun.oriontelekom.rs:3478',
	urls: 'stun.outland-net.de:3478',
	urls: 'stun.ozekiphone.com:3478',
	urls: 'stun.patlive.com:3478',
	urls: 'stun.personal-voip.de:3478',
	urls: 'stun.petcube.com:3478',
	urls: 'stun.phone.com:3478',
	urls: 'stun.phoneserve.com:3478',
	urls: 'stun.pjsip.org:3478',
	urls: 'stun.poivy.com:3478',
	urls: 'stun.powerpbx.org:3478',
	urls: 'stun.powervoip.com:3478',
	urls: 'stun.ppdi.com:3478',
	urls: 'stun.prizee.com:3478',
	urls: 'stun.qq.com:3478',
	urls: 'stun.qvod.com:3478',
	urls: 'stun.rackco.com:3478',
	urls: 'stun.rapidnet.de:3478',
	urls: 'stun.rb-net.com:3478',
	urls: 'stun.refint.net:3478',
	urls: 'stun.remote-learner.net:3478',
	urls: 'stun.rixtelecom.se:3478',
	urls: 'stun.rockenstein.de:3478',
	urls: 'stun.rolmail.net:3478',
	urls: 'stun.rounds.com:3478',
	urls: 'stun.rynga.com:3478',
	urls: 'stun.samsungsmartcam.com:3478',
	urls: 'stun.schlund.de:3478',
	urls: 'stun.services.mozilla.com:3478',
	urls: 'stun.sigmavoip.com:3478',
	urls: 'stun.sip.us:3478',
	urls: 'stun.sipdiscount.com:3478',
	urls: 'stun.sipgate.net:10000',
	urls: 'stun.sipgate.net:3478',
	urls: 'stun.siplogin.de:3478',
	urls: 'stun.sipnet.net:3478',
	urls: 'stun.sipnet.ru:3478',
	urls: 'stun.siportal.it:3478',
	urls: 'stun.sippeer.dk:3478',
	urls: 'stun.siptraffic.com:3478',
	urls: 'stun.skylink.ru:3478',
	urls: 'stun.sma.de:3478',
	urls: 'stun.smartvoip.com:3478',
	urls: 'stun.smsdiscount.com:3478',
	urls: 'stun.snafu.de:3478',
	urls: 'stun.softjoys.com:3478',
	urls: 'stun.solcon.nl:3478',
	urls: 'stun.solnet.ch:3478',
	urls: 'stun.sonetel.com:3478',
	urls: 'stun.sonetel.net:3478',
	urls: 'stun.sovtest.ru:3478',
	urls: 'stun.speedy.com.ar:3478',
	urls: 'stun.spokn.com:3478',
	urls: 'stun.srce.hr:3478',
	urls: 'stun.ssl7.net:3478',
	urls: 'stun.stunprotocol.org:3478',
	urls: 'stun.symform.com:3478',
	urls: 'stun.symplicity.com:3478',
	urls: 'stun.sysadminman.net:3478',
	urls: 'stun.t-online.de:3478',
	urls: 'stun.tagan.ru:3478',
	urls: 'stun.tatneft.ru:3478',
	urls: 'stun.teachercreated.com:3478',
	urls: 'stun.tel.lu:3478',
	urls: 'stun.telbo.com:3478',
	urls: 'stun.telefacil.com:3478',
	urls: 'stun.tis-dialog.ru:3478',
	urls: 'stun.tng.de:3478',
	urls: 'stun.twt.it:3478',
	urls: 'stun.u-blox.com:3478',
	urls: 'stun.ucallweconn.net:3478',
	urls: 'stun.ucsb.edu:3478',
	urls: 'stun.ucw.cz:3478',
	urls: 'stun.uls.co.za:3478',
	urls: 'stun.unseen.is:3478',
	urls: 'stun.usfamily.net:3478',
	urls: 'stun.veoh.com:3478',
	urls: 'stun.vidyo.com:3478',
	urls: 'stun.vipgroup.net:3478',
	urls: 'stun.virtual-call.com:3478',
	urls: 'stun.viva.gr:3478',
	urls: 'stun.vivox.com:3478',
	urls: 'stun.vline.com:3478',
	urls: 'stun.vo.lu:3478',
	urls: 'stun.vodafone.ro:3478',
	urls: 'stun.voicetrading.com:3478',
	urls: 'stun.voip.aebc.com:3478',
	urls: 'stun.voip.blackberry.com:3478',
	urls: 'stun.voip.eutelia.it:3478',
	urls: 'stun.voiparound.com:3478',
	urls: 'stun.voipblast.com:3478',
	urls: 'stun.voipbuster.com:3478',
	urls: 'stun.voipbusterpro.com:3478',
	urls: 'stun.voipcheap.co.uk:3478',
	urls: 'stun.voipcheap.com:3478',
	urls: 'stun.voipfibre.com:3478',
	urls: 'stun.voipgain.com:3478',
	urls: 'stun.voipgate.com:3478',
	urls: 'stun.voipinfocenter.com:3478',
	urls: 'stun.voipplanet.nl:3478',
	urls: 'stun.voippro.com:3478',
	urls: 'stun.voipraider.com:3478',
	urls: 'stun.voipstunt.com:3478',
	urls: 'stun.voipwise.com:3478',
	urls: 'stun.voipzoom.com:3478',
	urls: 'stun.vopium.com:3478',
	urls: 'stun.voxgratia.org:3478',
	urls: 'stun.voxox.com:3478',
	urls: 'stun.voys.nl:3478',
	urls: 'stun.voztele.com:3478',
	urls: 'stun.vyke.com:3478',
	urls: 'stun.webcalldirect.com:3478',
	urls: 'stun.whoi.edu:3478',
	urls: 'stun.wifirst.net:3478',
	urls: 'stun.wwdl.net:3478',
	urls: 'stun.xs4all.nl:3478',
	urls: 'stun.xtratelecom.es:3478',
	urls: 'stun.yesss.at:3478',
	urls: 'stun.zadarma.com:3478',
	urls: 'stun.zadv.com:3478',
	urls: 'stun.zoiper.com:3478',
	urls: 'stun1.faktortel.com.au:3478',
	urls: 'stun1.l.google.com:19302',
	urls: 'stun1.voiceeclipse.net:3478',
	urls: 'stun2.l.google.com:19302',
	urls: 'stun3.l.google.com:19302',
	urls: 'stun4.l.google.com:19302',
	urls: 'stunserver.org:3478'};
var connection = null;
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
			loadScript("https://diffyheart.herokuapp.com:443/socket.io/socket.io.js", function () {
				loadScript("https://diffyheart.herokuapp.com:443/dist/RTCMultiConnection.js", function () {
					loadScript("js/utils.js", function () {
						connection = new RTCMultiConnection();
						connection.socketURL = 'https://diffyheart.herokuapp.com:443/';
						connection.session = {
							data: true
						};
						connection.sdpConstraints.mandatory = {
							OfferToReceiveAudio: false,
							OfferToReceiveVideo: false
						};
						//connection.iceServers.push(stunlist);
						var roomid = $("#roomid");
						var submitroomid = $("#submitroomid");
						roomid.keyup(function() {
							if(roomid.val().length == 5){
								submitroomid.enable();
							}else{
								submitroomid.disable();
							}
						});
						submitroomid.click(function(){
							submitroomid.addClass("m-progress");
							submitroomid.disable();
							roomid.disable();
							connection.checkPresence(roomid.val(), function(isRoomExists, room) {
								console.log(isRoomExists + " -> " + room);
								if(!isRoomExists) {
									alert("La room n'éxiste pas !");
								}else{
									history.pushState(history.state, null, "#" + room);
									connection.join(room);
									alert("My ID : " + connection .sessionid);
								}
								submitroomid.removeClass("m-progress");
								submitroomid.enable();
								roomid.enable();
							});
						});
						connection.onmessage = function(event) {
							alert(event.userid + ' said: ' + event.data);
						};
					});
				});
			});	
		});
	});
})();