const Page = require('../models/page')

const getPage = async(req,res)=>{
    await Page.findOne({slug: 'home'}, (err, page)=> {
        if (err)
            console.log(err);

        res.render('index', {
            title: page.title,
            content: page.content
        });
    });
}

const getSlug = async(req,res)=>{

    const slug = req.params.slug;

    await Page.findOne({slug: slug},  (err, page)=> {
        if (err)
            console.log(err);
        
        if (!page) {
            res.redirect('/');
        } else {
            res.render('index', {
                title: page.content,
                content: page.content
            });
        }
    });

}


module.exports = {
    getPage,
    getSlug
}