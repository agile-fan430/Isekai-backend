const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express()
const port = 8081
// const metaData = require('./metadata.json');

const { create } = require('ipfs-http-client')

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// connect to the default API address http://localhost:5001
// const ipfsClient = create('http://localhost:8080');
const ipfsClient = create("https://ipfs.infura.io:5001");

async function uploadFileToIpfs(params) {
	// if (!request.params) {
	// 	throw 'No file content present';
	// }
	// const file = request.params;

	// const files = [{
	// 	path: file.path,
	// 	content: Buffer.from(file.content)
	// }];
	// var newJson = JSON.stringify(params);
	const result = await ipfsClient.add(params);
	console.log(result);
	return (result);
	// return ({ 'status': true, 'result': result.cid.toString() });
}


// app.post('/update-todo', (request, response) => {
// 	uploadFileToIpfs(request.body);
// 	console.log(request.body);
// 	console.log(response);
// });
app.post('/update-todo', uploadFileToIpfs);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})