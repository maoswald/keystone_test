var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Reference Model
 * ==========
 */

var Reference = new keystone.List('Reference', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Reference.add({
	title: { type: String, required: true },
	content: {
		heroImage: { type: Types.CloudinaryImage },
		brief: { type: Types.Textarea, height: 150 },
		images: { type: Types.CloudinaryImages },
		extended: { type: Types.Markdown, height: 400 }
	}
});

Reference.register();
