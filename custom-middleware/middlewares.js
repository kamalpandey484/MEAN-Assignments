const credentials = require("./credentials");

function authentication(req,res,next){

    const {username,password}=req.body;
    if(username===credentials.credentials.username && password==credentials.credentials.username){
        req.body.isAuthenticated=true;
        next();

    }
    else{
        req.body.isAuthenticated=false;
        next();
    }


}
module.exports={
    authentication
}