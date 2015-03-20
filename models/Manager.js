var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Manager Model
 * ==========
 */

var Manager = new keystone.List('Manager', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Manager.add({
	title: { type: String, required: true },
	position: { type: String },
	description: { type: Types.Markdown, height: 400 },
	image: { type: Types.CloudinaryImage }
});

Manager.register();
