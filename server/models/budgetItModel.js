import mongoose from 'mongoose';

const budgetItSchema = new mongoose.Schema(
    {
        item_type: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        store_name: {
            type: String,
            required: true
        },
        searched_zipcode: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        collection: 'budgetIt'
    }
);

const budgetIt = mongoose.model("budgetIt", budgetItSchema);
export default budgetIt;