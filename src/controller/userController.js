import User from "../model/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) =>{
    return res.render("join", {pageTitle: "Join"});
}
export const postJoin = async(req, res) =>{
    const {userId, password, password2, email, nickName} = req.body;
    const userUserId = await User.exists({userId});
    const userEmail = await User.exists({email});
    const userNickName = await User.exists({nickName});

    if(userUserId){
        return res.status(400).render("join", {pageTitle: "Join", error:"사용하실 수 없는 ID입니다."});
    }
    if(password !== password2){
        return res.status(400).render("join", {pageTitle: "Join", error:"비밀번호가 일치하지 않습니다."});
    }
    if(userEmail){
        return res.status(400).render("join", {pageTitle: "Join", error:"이미 등록된 이메일입니다."});
    }
    if(userNickName){
        return res.status(400).render("join", {pageTitle: "Join", error:"이미 등록된 닉네임입니다."});
    }

    try{
        const newUser = await User.create({
            userId, 
            password: await bcrypt.hash(password, 4), 
            email, 
            nickName
        });    
        console.log(newUser);
    }catch(error){
        console.log(error);
        return res.status(400).render("join", {pageTitle: "Join", error:`error: ${error.code}`});
    }
    
    return res.redirect("/");
}

export const getLogin = (req, res) =>{
    return res.render("login", {pageTitle: "Login"});
}
export const postLogin = async(req, res) =>{
    const {userId, password} = req.body;
    const user = await User.findOne({userId});

    if(!user){
        return res.status(400).render("login", {pageTitle: "Login", error: "존재하지 않는 ID입니다."});
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if(!passwordCheck){
        return res.status(400).render("login", {pageTitle: "Login", error: "password를 잘못 입력하였습니다."});
    }

    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
}