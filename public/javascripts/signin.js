function Validator()  {
	this.errorInfo = "";
	this.checkUsername = function(username) {
		if (/^[a-zA-Z][0-9a-zA-Z_]{5,17}$/.test(username)) {
			return true;	/*匹配正则不要多加空格*/
		}
		else {
			this.errorInfo = "用户名格式错误!";
			return false;
		}
	}
	this.checkPassword = function(password) {
		if (/^[0-9a-zA-Z-_]{6,12}$/.test(password) == false) {
			this.errorInfo = "密码格式错误!";
			return false;
		}
		else {
			return true;
		}
	}
}
window.onload = function() {
	var validator = new Validator();
	var submit = document.getElementById('signin');
	var usernameInput = document.getElementById('username');
	var passwordInput = document.getElementById('password');
	var tip = document.getElementById('tip');
	submit.onclick = function() {
		if (validator.checkUsername(usernameInput.value) && validator.checkPassword(passwordInput.value)) {
			return true;
		}
		else {
			tip.textContent = validator.errorInfo;
			return false;
		}
	}
	
}