const categoryModels = require('../models/categoryModels')
const subcategoryModels = require('../models/subcategoryModels')

const addCategory = (req, res) => {
    res.render('addCategory')
}
const viewCategory = async (req, res) => {
    try {
        let data = await categoryModels.find({})
        return res.render('viewCategory', {
            data
        })
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}
const addCategoryData = async (req, res) => {

    try {
        let category = await categoryModels.create({
            category: req.body.category
        })
        return res.redirect('back')

    } catch (error) {
        console.log(error);
        return
    }
}
const deletData = async (req, res) => {
    try {
        let id = req.params.id
        await subcategoryModels.deleteMany({ categoryId: id })
        let data = await categoryModels.findByIdAndDelete(id);
        return res.redirect('back')
    } catch (error) {
        console.log(error);
        return
    }

}
const editcategory = async (req, res) => {
    let id = req.params.id
    try {
        let data = await categoryModels.findById(id);
        return res.render('upDataedCategory', {
            data
        });
    } catch (error) {
        console.log(error);
        return
    }
}
const UpdatedCategoryData = async (req, res) => {
    let id = req.body.id
    try {
        let user = await categoryModels.findByIdAndUpdate(id, { category: req.body.category })
        return res.redirect('/viewCategory')
    } catch (error) {
        console.log(error);
        return
    }
}
const active = async (req, res) => {
    try {
        let { id } = req.params
        let val = 0;
        const status = await categoryModels.findByIdAndUpdate(id, {
            status: val
        })
        return res.redirect('back')

    } catch (error) {
        console.log(error);
        return
    }
}
const deactive = async (req, res) => {
    try {
        let { id } = req.params
        let val = 1;
        const status = await categoryModels.findByIdAndUpdate(id, {
            status: val
        })
        return res.redirect('back')

    } catch (error) {
        console.log(error);
        return
    }
}


module.exports = { addCategory, viewCategory, addCategoryData, deletData, editcategory, UpdatedCategoryData, active, deactive }