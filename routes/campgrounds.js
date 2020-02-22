const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware');

//INDEX - show all campgrounds
router.get('/', (req, res) => {
	//get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', { campgrounds: allCampgrounds, currentUser: req.user });
		}
	});
});

//CREATE - add new campbround to DB
router.post('/', middleware.isLoggedIn, (req, res) => {
	//get data from form and add to campgrounds array
	let name = req.body.name;
	let price = req.body.price;
	let image = req.body.image;
	let desc = req.body.description;
	let author = {
		id: req.user._id,
		username: req.user.username
	};
	let newCampground = {
		name: name,
		price: price,
		image: image,
		description: desc,
		author: author
	};
	//Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect('/campgrounds');
		}
	});
});

//NEW - show form to create a new campground
router.get('/new', middleware.isLoggedIn, (req, res) => {
	res.render('campgrounds/new');
});

//SHOW - shows more info about one campground
router.get('/:id', (req, res) => {
	//find the campground with provided ID
	Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
		if (err) {
			console.log(err);
		} else {
			//render the campgroud
			res.render('campgrounds/show', { campground: foundCampground });
		}
	});
});

//Edit campground route
router.get('/:id/edit', middleware.checkCampGroundOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		res.render('campgrounds/edit', { campground: foundCampground });
	});
});

//Update campground route
router.put('/:id', middleware.checkCampGroundOwnership, (req, res) => {
	//find and updated correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if (err) {
			res.redirect('/campground');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

//Destroy route
router.delete('/:id', middleware.checkCampGroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err, campgroundRemoved) => {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		}
		Comment.deleteMany({ _id: { $in: campgroundRemoved.comments } }, (err) => {
			if (err) {
				console.log(err);
			}
			res.redirect('/campgrounds');
		});
	});
});

module.exports = router;
