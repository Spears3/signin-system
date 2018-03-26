function Database() {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/mydb";
	this.initial = function() {
		MongoClient.connect(url, function(err, db){
			if (err) throw err;
			var dbo = db.db("mydb");
			dbo.createCollection('userlist', function(err, res) {
				if (err) throw err;
				console.log("创建userlist集合!");
				db.close();
			});
		});
	} 
	this.insert = function(user) {
		MongoClient.connect(url, function(err, db) {
    		if (err) throw err;
    		var dbo = db.db("mydb");
    		dbo.collection("userlist").insertOne(user, function(err, res) {
        	if (err) throw err;
        		console.log("文档插入成功");
        		console.log(user);
    		});
		});
	}
	this.query = function(info) {
    	return new Promise(function(resolve, reject) {
    		MongoClient.connect(url, function(err, db) {
    			if (err) throw err;
    			var dbo = db.db("mydb");
    			dbo.collection("userlist").findOne(info, function(err, res) {
        			if (err) throw err;
        			resolve(res);
    			});
    		});
    	});
	}
}
 

module.exports = Database;