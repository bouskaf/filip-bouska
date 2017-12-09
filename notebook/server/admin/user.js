Meteor.dkoo = {
	checkUser: function(userId) {
		return true
	}
};

Meteor.users.deny({
	update: function() {
		return true;
	}
});