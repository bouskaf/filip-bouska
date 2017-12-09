(function(){Meteor.dkoo = {
	checkUser: function(userId) {
		return true
	}
};

Meteor.users.deny({
	update: function() {
		return true;
	}
});
}).call(this);

//# sourceMappingURL=user.js.map
