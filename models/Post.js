var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		heroImage: { type: Types.CloudinaryImage },
		brief: { type: Types.Textarea, height: 150 },
		images: { type: Types.CloudinaryImages },
		extended: { type: Types.Markdown, height: 400 }
	}
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.schema.methods.isPublished = function() {
	return this.state == 'published';
};

Post.defaultColumns = 'title, state|20%, publishedDate|20%';
Post.register();
