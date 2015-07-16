function Auth($firebaseAuth, $firebaseObject) {
    var ref = new Firebase("https://eventsboard.firebaseio.com");
    var auth = $firebaseAuth(ref);
    var profileRef = new Firebase("https://eventsboard.firebaseio.com/profiles")


var Auth = {
		user: {},

    createProfile: function(uid, user) {
      var d = new Date(); 
      var tid = d.getTime();
      var profile = {
        uid: uid,
      	tid: tid,
        name: user.name,
        email: user.email
        };      
     

      var profileRef = new Firebase("https://eventsboard.firebaseio.com/profiles");
      return profileRef.child(uid).set(profile, function(error) {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Profile set successfully!");
      }
    });
    },

    getProfile: function(uid) {
      return $firebaseObject(ref.child('profiles').child(uid));
    },

    login: function(user) {
      return auth.$authWithPassword(
        {email: user.email, password: user.password}
      );
    },

    register: function(user) {
      return auth.$createUser({email: user.email, password: user.password})
        .then(function() {
          // authenticate so we have permission to write to Firebase
          return Auth.login(user);

        })
        .then(function(data) {
          // store user data in Firebase after creating account


          return Auth.createProfile(data.uid, user);
        });
    },

    logout: function() {
      auth.$unauth();
    },

		changePassword: function(user) {      
			return auth.$changePassword({email: user.email, oldPassword: user.oldPass, newPassword: user.newPass});
		},

    signedIn: function() {
      return !!Auth.user.provider; //using !! means (0, undefined, null, etc) = false | otherwise = true
    },

    requireAuth: function() {
      return auth.$requireAuth();
    }
	};

	auth.$onAuth(function(authData) {
		if(authData) {      
      angular.copy(authData, Auth.user);
      Auth.user.profile = $firebaseObject(ref.child('profiles').child(authData.uid));			
		} else {
      if(Auth.user && Auth.user.profile) {
        Auth.user.profile.$destroy();
      }

      angular.copy({}, Auth.user);
		}
	});

	return Auth;	

};

angular
    .module('eventsBoard')
    .factory('Auth', Auth)
