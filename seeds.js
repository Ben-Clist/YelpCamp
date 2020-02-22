const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

let data = [
	{
		name: "Cloud's Rest",
		image:
			'https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		description:
			'Eiusmod ipsum officia officia elit deserunt ut pariatur. Lorem occaecat ut cillum minim reprehenderit tempor adipisicing consequat. Cillum irure culpa enim Lorem esse tempor non est excepteur. Consequat do excepteur qui cupidatat aute consequat reprehenderit eiusmod. Duis reprehenderit minim mollit irure laborum minim duis occaecat sunt irure ad mollit laboris. Ea in ipsum voluptate aute excepteur enim exercitation magna fugiat eu. Quis proident tempor id in quis excepteur velit eu nostrud.'
	},
	{
		name: 'Desert Mesa',
		image:
			'https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		description:
			'Lorem elit minim occaecat occaecat aute eu sunt ea culpa est. Excepteur commodo duis tempor ex incididunt do. Magna aute adipisicing elit ex Lorem adipisicing cillum ad qui laborum ipsum.'
	},
	{
		name: 'Canyon Floor',
		image:
			'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		description:
			'Lorem elit amet reprehenderit laborum magna sunt sit exercitation sunt id nulla. Quis deserunt enim excepteur aliqua nostrud eiusmod. Anim sit quis et duis laboris veniam qui pariatur sit anim. Occaecat proident ad adipisicing et elit non in cupidatat magna reprehenderit. Culpa ex Lorem duis non minim aliquip non dolore pariatur ullamco cillum nostrud eiusmod. Ipsum mollit pariatur ipsum culpa occaecat Lorem.'
	}
];

function seedDB() {
	//Remove all campgrounds
	Campground.deleteMany({}, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('removed campgrounds');
			//add a few campgrounds
			data.forEach((seed) => {
				Campground.create(seed, (err, campground) => {
					if (err) {
						console.log(err);
					} else {
						console.log('added a campground');
						//create a comment
						Comment.create(
							{
								text: 'This place is great, but I wish there was Internet',
								author: 'Homer'
							},
							(err, comment) => {
								if (err) {
									console.log(err);
								} else {
									campground.comments.push(comment);
									campground.save();
									console.log('created new comment');
								}
							}
						);
					}
				});
			});
		}
	});
}

module.exports = seedDB;
