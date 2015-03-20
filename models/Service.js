var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Service Model
 * ==========
 */

var Service = new keystone.List('Service', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Service.add({
	title: { type: String, required: true },
	categories: { type: Types.Relationship, ref: 'ServiceCategory', many: true },
	heroImage: { type: Types.CloudinaryImage },
	content: { type: Types.Markdown, height: 400 },
	
	serviceBackgroundImage: { type: Types.CloudinaryImage }
});

//Service.defaultColumns = 'title, state|20%, publishedDate|20%';
Service.register();
