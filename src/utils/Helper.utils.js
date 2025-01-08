/**
 * Paginate function for Mongoose models
 *
 * @param {mongoose.Model} model - The Mongoose model to query
 * @param {number} [page=1] - The current page number (default: 1)
 * @param {number} [limit=10] - The number of items per page (default: 10)
 * @param {object} [filter={}] - The filter object for querying (default: empty object)
 * @returns {Promise<object>} - An object containing pagination results
 */
exports.paginate = async (model, page=1, limit=10, filter) => {
    
    const skip = (page - 1) * limit;

    const result = await model.find(filter)
        .skip(skip)
        .limit(limit);
    

    const total = await model.countDocuments(filter);

    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: result,
    };
}