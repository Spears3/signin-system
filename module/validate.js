function Validator()  {
	this.errorInfo = "";
	this.checkEmail = function(email) {
		if (/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test(email)) {
			return true;
		}
		else {
			this.errorInfo = "邮箱格式错误!";
			return false;
		} 
	}
	this.checkSid = function(sid) {
		if (/^[1-9][0-9]{7}$/.test(sid))  {
			return true;
		}
		else {
			this.errorInfo = "学号格式错误!";
			return false;
		}
	}
	this.checkPhone = function(phone) {
		if (/^[1-9][0-9]{10}$/.test(phone))  {
			return true;
		}
		else {
			this.errorInfo = "电话格式错误!";
			return false;
		}
	}
	this.checkUsername = function(username) {
		if (/^[a-zA-Z][0-9a-zA-Z_]{5,17}$/.test(username)) {
			return true;
		}
		else {
			this.errorInfo = "用户名格式错误!";
			return false;
		}
	}
	this.checkPassword = function(password, passwordAgain) {
		if (/^[0-9a-zA-Z-_]{6,12}$/.test(password) == false) {
			this.errorInfo = "密码格式错误!";
			return false;
		}
		else {
			if (password != passwordAgain) {
				this.errorInfo = "两次密码不一致!";
				return false;
			}
			else {
				return true;
			}
		}
	}
}

module.exports = Validator;
