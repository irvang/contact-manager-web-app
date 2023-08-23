const userInfo = require('./config');

module.exports = {
	// mongodb+srv://hobermallow:<password>@cluster0.hancy0t.mongodb.net/?retryWrites=true&w=majority
	getDbConnectionString: function () {
		// return `mongodb://${userInfo.uname}:${userInfo.pwd}@ds255539.mlab.com:55539/contact-manager`

		// console.log(`mongodb+srv://${userInfo.uname}:${userInfo.pwd}@cluster0.hancy0t.mongodb.net/?retryWrites=true&w=majority`)
		return `mongodb+srv://${userInfo.uname}:${userInfo.pwd}@cluster0.hancy0t.mongodb.net/?retryWrites=true&w=majority`
	}
}


/* 
npm ERR! code UNABLE_TO_GET_ISSUER_CERT_LOCALLYnpm ERR! errno UNABLE_TO_GET_ISSUER_CERT_LOCALLY
npm ERR! request to https://registry.npmjs.org/body-parser failed, reason: unable to get local issuer certificatenpm ERR! A complete log of this run can be found in:npm ERR!     /home/miamidev/.npm/_logs/2023-08-22T21_42_09_859Z-debug-0.log 


cd ~
wget https://nodejs.org/dist/v18.6.1/node-v18.6.1-linux-x64.tar.xz
wget https://nodejs.org/dist/v12.9.1/node-v12.9.1-linux-x64.tar.xz


tar xvf node-v12.9.1-linux-x64.tar.xz

mv node-v12.9.1-linux-x64 nodejs

mkdir ~/bin
cp nodejs/bin/node ~/bin
cd ~/bin
ln -s ../nodejs/lib/node_modules/npm/bin/npm-cli.js npm

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

*/