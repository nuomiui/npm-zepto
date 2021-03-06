var os = require('os');
var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var dir = __dirname;
function abs(name) {
	return path.join(dir, '../', name);
}
child_process.execSync('git clone https://github.com/madrobby/zepto.git');
// child_process.execSync('cp -R ' + abs('node_modules/zepto') + ' ' + abs('zepto'));
if (os.platform() === 'win32') {
	if (fs.existsSync(abs('index.js'))) {
		fs.unlink(abs('index.js'));
	}
	child_process.execSync('chcp 65001');
	child_process.execSync('cd zepto && npm install');
	child_process.exec(abs('script/build.bat'), function (e,  stdout, stderr) {
		child_process.execSync('coffee make dist');
		console.log(stdout);
		var cmd = [
			'cp ',
			abs('zepto/dist/zepto.js'),
			abs('index.js')
		]
		child_process.execSync(cmd.join(' '));
		var tail = fs.readFileSync(path.join(__dirname, '../_index.js')).toString('utf8');
		fs.appendFileSync(path.join(__dirname, '../index.js'), tail);
	});
} else {
	console.log();
	child_process.execSync('sh ' + abs('script/build.sh'));
}