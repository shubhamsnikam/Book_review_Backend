const Book = require('../model/bookmodel');

async function addbook(req, res) {
    console.log("req.body getapplication****", req.body);
    try {
        const book = new Book(req.body);

        const result = await book.save();
        res.status(200).send({ message: "Book added Successfully", task: result });
    } catch (error) {
        res.status(500).send(error);
    }
}
async function getbook(req, res) {
    console.log("**------**")
    try {
        result = await Book.find();
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

// function for delete Book
async function deletebook(req, res) {
    console.log(req.params.id);
    ID = req.params.id;
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            res.status(400).send({ message: "Book Not Found" });
        }
        res.send({ task: user, message: "Book Deleted" })
    } catch (error) {
        res.status(500).send(error);
    }
}


async function updatebook(req, res) {
    console.log("Book req.params.id=", req.params.id);
    console.log("Book req.body", req.body);


    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!book) {
            res.status(400).send({ message: "Book Not Found" });
        }
        res.status(200).send({ message: "Book Updated", task: book });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function addreviews(req,res){
    try {
        const id =req.params.id;
        console.log(req.params.id);
        const uId= req.user.id;
        console.log(req.user.id);
        const newreview = req.body.Note;
        console.log(req.body.Note);
        console.log(id,uId,newreview);
        const result = await Book.findById(id);
        console.log(result);

        if(!result){
            res.status(400).send({message:"Reviews Not Found"})
        }
        result.reviews.push({u_id:uId,Note:newreview})
        await result.save();
        console.log(result.reviews);

        res.status(200).send({ message: "Review Added Successfully"});
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getReview(req,res){
    const id = req.params.id;
    console.log(req.params.id);
    try {
        const book = await Book.findById(id).populate(`review.Note`);
        if(!book){
            return res.status(404).send({message:"Book Not Found"});
        } 
        res.status(200).send(book.reviews);
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    addbook,
    getbook,
    deletebook,
    updatebook,
    addreviews,
    getReview
}