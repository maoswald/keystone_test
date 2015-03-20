var keystone = require('keystone');

/**
 * ServiceCategory Model
 * ==================
 */

var ServiceCategory = new keystone.List('ServiceCategory', {
	autokey: { from: 'name', path: 'key', unique: true }
});

ServiceCategory.add({
	name: { type: String, required: true }
});

ServiceCategory.relationship({ ref: 'Service', path: 'categories' });

ServiceCategory.register();
