import BookReview from "../model/BookReview";

export const home = async(req, res) =>{
    const reviews = await BookReview.find({});
    return res.render("home", {pageTitle: "서평보기", reviews});
}

export const getRegister = (req, res) =>{
    return res.render("reviewRegister", {pageTitle: "서평등록"});
}
export const postRegister = async(req, res) =>{
    const {bookTitle,
        author,
        publicationYear,
        publisher,
        username,
        text} = req.body;
    try{
        await BookReview.create({
            bookTitle,
            author,
            publicationYear,
            publisher,
            username,
            text,
        });
    }catch(error){
        console.log(error);
        return res.render("reviewRegister", {pageTitle: "서평등록", error:error._message});
    }
    return res.redirect("/");
}

export const reviewWatch = async(req, res)=>{
    const {id} = req.params;
    const review = await BookReview.findById(id);
    if(!review){
        return res.status(404).render("404", {pageTitle: "404", error: "페이지를 찾을 수 없습니다."});
    }
    return res.render("reviewWatch", {pageTitle: "로고", review});
}

export const getReviewEdit = async(req, res)=>{
    const {id} = req.params;
    const review = await BookReview.findById(id);
    if(!review){
        return res.status(404).render("404", {pageTitle: "404", error: "페이지를 찾을 수 없습니다."});
    }
    return res.render("reviewEdit", {pageTitle: "Edit Review", review});
}
export const postReviewEdit = async(req, res)=>{
    const {bookTitle, author, text, publicationYear, publisher} = req.body;
    const {id} = req.params;
    const editReview = await BookReview.findByIdAndUpdate(id, {
        bookTitle, author, text, publicationYear, publisher, date: Date.now()
    });
    return res.redirect(`/${id}`);
}
export const reviewDelete = async(req, res)=>{
    const {id} = req.params;
    await BookReview.findByIdAndDelete(id);
    return res.redirect("/");
}