const mongoose = require('mongoose')

const policySchema = new mongoose.Schema({
    Policy_id: {
        type: String,
        trim: true
    },
    purchaseDate: {
        type: String,
        trim: true
    },
    Customer_id: {
        type: String,
        trim: true
    },
    Fuel: {
        type: String,
        trim: true
    },
    VEHICLE_SEGMENT: {
        type: String,
        trim: true
    },
    Premium: {
        type: String,
        trim: true
    },
    property_damage_liability: {
        type: String,
        trim: true
    },
    property_damage_liability: {
        type: String,
        trim: true
    },
    bodily_injury_liability: {
        type: String,
        trim: true
    },
    collision: {
        type: String,
        trim: true
    },
    comprehensive: {
        type: String,
        trim: true
    },
    Customer_Gender: {
        type: String,
        trim: true
    },
    customerIncomeGroup: {
        type: String,
        trim: true
    },
    Customer_Marital_status: {
        type: String,
        trim: true
    },
    Customer_Region: {
        type: String,
        trim: true
    },
},{ timestamps: true })

module.exports = mongoose.model("Policy", policySchema)

