var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * ReferenceCompanyLogo Model
 * =============
 */

var ReferenceCompanyLogo = new keystone.List('ReferenceCompanyLogo', {
	map: { name: 'title' },
	autokey: { from: 'name', path: 'key', unique: true }
});

ReferenceCompanyLogo.add({
	title: { type: String, required: true },
	image: { type: Types.CloudinaryImage }
});

ReferenceCompanyLogo.register();
