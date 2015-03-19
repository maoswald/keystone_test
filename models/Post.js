var keystone = require('keystone'),
	Types = keystone.Field.Types,

	fb = require('../lib/facebookFactory');

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
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },

	publishOnFacebook: { type: Types.Boolean }, //maybe immutable after post
	facebookText: { type: Types.Html, wysiwyg: false },
	facebookPostId: { type: String, noedit: true, nocreate: true, nodelete: true }
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.schema.methods.isPublished = function() {
	return this.state == 'published';
};

Post.schema.post('save', function() {	
	var facebook = fb(process.env.FACEBOOK_ACCESS_TOKEN);
	if(this.isPublished() && this.publishOnFacebook && !this.facebookPostId && this.facebookText) {
		var that = this;
		facebook.createPost(this.facebookText, function (id) { that.facebookPostId = id; that.save(); });
	}
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
