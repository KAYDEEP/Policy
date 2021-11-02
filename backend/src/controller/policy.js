const Policy = require('../model/policy');
const mongoose = require('mongoose')

// get All months
const getMonthsName = () => {
    return ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
}

//get Search filter
const searchFilter = (search) => {
    if (search) {
        filter_data = {
            $or: [
                { Policy_id: { $regex: search, $options: 'i' } },
                { Customer_id: { $regex: search, $options: 'i' } }
            ],
        }
        return filter_data
    }
}

// get all policies
exports.getPolices = async (req, res) => {
    try {
        const query = req.query;
        const searchData = searchFilter(query.id)
        const productRes = await Policy.find(searchData)
        if (!(productRes && productRes.length)) {
            res.status(400).json({
                message: "No data found.",
                data: false
            })
        }
        res.status(200).json({ message: 'Product list!!!', data: productRes })
    } catch (err) {
        res.status(400).json({
            message: "Something went wrong.",
            data: false
        })

    }
}

// get policy by id
exports.getPolicyById = async (req, res) => {
    try {
        const id = req.params.id.trim();
        const policy = await Policy.findOne({ Policy_id: id });
        if (!policy) {
            res.status(400).json({
                message: "No data found.",
                data: false
            })
        }
        res.status(200).json({ message: 'Policy!!!', data: policy })
    }
    catch (err) {
        res.status(400).json({
            message: "Something went wrong.",
            data: false
        })
    }

}

// get chart data
exports.getChartData = async (req, res) => {
    try {
        const region = req.query.region;
        let dataToFetch = {}

        if (region) {
            dataToFetch.Customer_Region = region;
        }

        const policy = await Policy.find(dataToFetch);
        if (!(policy && policy.length)) {
            res.status(404).json({
                message: 'No data found',
                data: false
            })
        }

        const monthsData = []
        policy.map((item) => {
            const formatDate = new Date(item.purchaseDate)
            const allMonthsKeys = getMonthsName()
            const monthName = allMonthsKeys[formatDate.getMonth()]
            monthsData.push(monthName)
        })

        const count = month => month.reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }), {})
        const resultCount = count(monthsData)
        const resultObject = Object.entries(resultCount)
        const chartResult = resultObject.map(([text, value]) => ({ text, value }));

        res.status(200).json({ message: 'Chart Data fetch successfully', data: chartResult })
    } catch (err) {
        res.status(400).json({
            message: "Something went wrong.",
            data: false
        })
    }

}

// update policy
exports.updatePolicy = async (req, res) => {
    try{
        const id = req.params.id.trim();
        const data = req.body;
    
        const { Premium = "" } = data;
    
        if (Number(Premium) > 1000000) {
            return res.status(400).json({
                message: "Premium cannot be more then 1 million.",
                data: false
            })
        }

        const policy = await Policy.findOne({ Policy_id: id });
        if (!policy) {
            return res.status(400).json({
                message: "Policy not found.",
                data: false
            })
        }
    
        await Policy.updateOne({ Policy_id: id }, data, {
            new: true,
            upsert: true,
            runValidators: true,
        })
    
        res.status(200).json({
            message: "Policy update successfully.",
            data: true
        })

    }catch(err){
        res.status(400).json({
            message: "Something went wrong.",
            data: false
        })
    }

}

