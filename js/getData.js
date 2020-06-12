const request=require('request')

module.exports.data=request({
    url:'https://api.publicapis.org/categories',json: true}, function(err, res, json) {
        if(err){
            throw err;
        }
        return json
});