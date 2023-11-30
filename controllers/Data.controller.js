const DataRouter = require('express').Router();
const axios = require('axios');
const DataModel = require('../models/Data.models')

DataRouter.post('/', async (req, res) => {
    try {
    
        // Make a request to the Google Books API
        const response = await axios.get(`${process.env.SALES_DATA_API}`);
        
        // Extract and format the data
        const Datas = response.data.map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            description: item.description,
            category: item.category,
            image: item.image,
            sold: item.sold,
            dateOfSale: item.dateOfSale,
        }));
    
        // Save the books to MongoDB
        await DataModel.insertMany(Datas);
    
        return res.status(200).json({ message: 'Datas saved to MongoDB', Datas });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
});


DataRouter.get('/get', (req,res,next) => {
    DataModel.find({})
        .then(response => {
            return res.status(200).json({
                result : response,
                success : true,
            })
        })
        .catch(err => {
            return res.status(401).json({
                success : false,
                Error : err
            })
        })
})

module.exports = DataRouter;
