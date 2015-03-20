var keystone = require('keystone'),
		Types = keystone.Field.Types;

/**
 * HeaderImage Model
 * =============
 */

var HeaderImage = new keystone.List('HeaderImage', {
	map: { name: 'title' },
	autokey: { from: 'name', path: 'key', unique: true }
});

HeaderImage.add({
	title: { type: String, required: true },
	image: { type: Types.CloudinaryImage, autoCleanup: true, required: true, initial: false }
});

HeaderImage.register();
