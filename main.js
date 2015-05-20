var toxcore = require('toxcore');
var logger = console;

var tox = new toxcore.Tox({data: "/home/silvea/.config/tox/bot.tox"});

tox.bootstrapSync("127.0.0.1", 33445,
	"58B91B8A4EE53B98A4D627DFD724750B7A058BADA453C0FF8FA251841997B16F");

tox.bootstrapSync("178.62.250.138", 33445,
	"788236D34978D1D5BD822F0A5BEBD2C53C64CC31CD3149350EE27D4D9A2F9B6B");

tox.bootstrapSync("144.76.60.215", 33445,
	"04119E835DF3E78BACF0F84235B300546AF8B936F035185E2A8E9E0A67C8924F");

tox.on('selfConnectionStatus', function(e) {
    logger.log('debug', (e.isConnected() ? 'Connected to' : 'Disconnected from') + ' the tox network');
  });

tox.on('friendRequest', function(e) {
    logger.log('debug', 'Accepting tox friend request', { publicKey: e.publicKeyHex(), message: e.message() });
    tox.addFriendNoRequestSync(e.publicKey());

    tox.saveToFile("/home/silvea/.config/tox/bot.tox", function(err) {
      if(!err) {
        logger.log('debug', 'Saved tox state to file');
      } else {
        logger.error(err, 'Error occurred while saving tox state to file');
      }
    });

  });

tox.setNameSync("Whorebot");
tox.setStatusMessageSync("Toxing on Whoretox");

var users = {};

  tox.on('friendMessage', function(e) {
    var friendName = tox.getFriendNameSync(e.friend());

if (!users.hasOwnProperty(e.friend()))
{
users[e.friend()] = 0;
}
switch (users[e.friend()])
{
//tox.sendFriendMessageSync(e.friend(), "", 0);

	case 0:
		tox.sendFriendMessageSync(e.friend(), "Hey cutie... <3", 0);
		break;
	case 1:
		tox.sendFriendMessageSync(e.friend(), "I just got out for spring break, and am horny as fuck...", 0);
		break;
	case 2:
		tox.sendFriendMessageSync(e.friend(), "Are you into college girls?", 0);
		break;
	case 3:
		tox.sendFriendMessageSync(e.friend(), "Mmm... Baby you are making me so wet...", 0);
		break;
	case 4:
		tox.sendFriendMessageSync(e.friend(), "Here, come on to this site http://riddlydiddly.com/", 0);
		break;
	case 5:
		tox.sendFriendMessageSync(e.friend(), "Just enter your credit card details and join my room... I'll be waiting~", 0);
		break;
	default:
		tox.sendFriendMessageSync(e.friend(), "is resetting state...", true);
		users[e.friend()] = -1;
}

++users[e.friend()];

    logger.log('debug', 'Received friend message', e);//{ friendNumber: e.friend(), friend: friendName, message: e.message() });
    //tox.sendFriendMessageSync(e.friend(), "Recieved: " + e.message(), e.messageType());
  });

tox.start();
