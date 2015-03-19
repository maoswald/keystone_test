var FB = require('fb');

exports = module.exports = function(apiToken) {

	FB.setAccessToken(apiToken);
	
	return {
		createPost: function(msg, callback) {
			FB.api('me/feed', 'post', { message: msg }, function (res) {
				if(!res || res.error) {
					console.log(!res ? 'error occurred' : res.error);
					return;
				}
				console.log('Post Id: ' + res.id);
				callback(res.id);
			});
		}		
	}
};

//todo longtime token fetchen
//todo post to page 
