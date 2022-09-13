window.onload = function() {
	var menuButton = document.getElementById("menuButton");
	var topNav = document.getElementById("topNav");

	var menuShow = false;

	menuButton.addEventListener("click", function() {
		if(menuShow) {
			topNav.className = "navbar-menu";
			menuButton.className = 'navbar-burger burger';
			menuShow = false;
		} else {
            topNav.className = "navbar-menu is-active";
            menuButton.className = 'navbar-burger burger is-active';
			menuShow = true;
		}
	});
};