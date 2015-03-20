var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Partner Model
 * ==========
 */

var Partner = new keystone.List('Partner', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Partner.add({
	title: { type: String, required: true },
	position: { type: String },
	description: { type: Types.Markdown, height: 400 },
	image: { type: Types.CloudinaryImage }
});

Partner.register();
