export const localMiddleware = (req, res, next)=>{
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    if(res.locals.loggedIn){
        res.locals.loggedInUser = req.session.user;
    }
    console.log(res.locals);
    next();
};