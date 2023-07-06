const category_Models = require('../models/categoryModels')
const sub_category_models = require('../models/subcategoryModels');

const add_Sub_Category = async (req, res) => {
    try {
        let subData = await category_Models.find({})
        return res.render('addCategory', {
            subData
        })
    } catch (error) {

    }
}
const add_sub_CategoryData = async (req, res) => {
    try {
        await sub_category_models.create({
            categoryId: req.body.categoryId,
            subcategory: req.body.subcategory
        })
        return res.redirect('back');

    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }

}
const viewsubCatgory = async (req, res) => {
    try {

        let data = await sub_category_models.find({}).populate('categoryId');
        return res.render('subcatgoryview', { data })
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
const deleteSubcategory = async (req, res) => {
    const { params: { id } } = req;
    try {
        let detele = await sub_category_models.findByIdAndDelete(id);
        return res.redirect('back')
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
const EditSubcategory = async (req,res)=>{
    const {params:{id}}= req
    try {
       let data = await sub_category_models.findById(id).populate('categoryId');
        return res.render('./subcategoryUpdated.ejs',{
            data
        })
    } catch (error) {
        console.log(error);
        return res.redirect('back'); 
    }
}
const UpdatedSubCategoryData = async (req,res)=>{
    const{body:{id,subcategory}}= req
    try {
        let updated = await sub_category_models.findByIdAndUpdate(id,{subcategory}).populate('categoryId');
        console.log(updated);
        return res.redirect('/viewsubCatgory')
    } catch (error) {
        console.log(error);
        return res.redirect('back'); 
    }
}
const active = async(req,res)=>{
    try {
        let { id } = req.params
        let val = 0;
        const status = await sub_category_models.findByIdAndUpdate(id, {
            status: val
        })
        return res.redirect('back')

    } catch (error) {
        console.log(error);
        return
    }
}
const deactive =  async (req,res)=>{
    try {
        let { id } = req.params
        let val = 1;
        const status = await sub_category_models.findByIdAndUpdate(id, {
            status: val
        })
        return res.redirect('back')

    } catch (error) {
        console.log(error);
        return
    }
}


module.exports = { add_Sub_Category, add_sub_CategoryData, viewsubCatgory, deleteSubcategory,EditSubcategory,UpdatedSubCategoryData,active,deactive }