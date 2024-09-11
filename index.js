import * as util from 'node:util'
import whois from 'whois'
import parseRawData from './parse-raw-data.js'

const log = console.log.bind(console)
var lookup = util.promisify(whois.lookup);

export default async function(domain, options){

	var rawData = await lookup(domain, options || {})	

	var result = {};

	if ( typeof rawData === 'object' ) {
		result = rawData.map(function(data) {
			data.data = parseRawData(data.data);
			return data;
		});
	} else {
		result = parseRawData(rawData);
	}

	return result;
}


