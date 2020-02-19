const express = require('express')
const app = express()
const port = 3030
const yelp = require('yelp-fusion');

const apiKey = 'GghRCb35rrDz7kP46R8HZAnmOR-hdRKjtRVDnxQkLuNYt365y3Bf6LhBSBBE2-eOWeJZ3DzlMLBluNJzDqAbSvb27aCGOxBhlSXKhzwOHTvlstG9FL7Ib04a1Q1MXnYx';
const client = yelp.client(apiKey);
const searchRequest = {
    categories: 'icecream',
    location: 'Alpharetta',
    sort_by: 'rating',
    limit: 5
};

const withReviews = async (result) => {
    const promises = result.map(business => client.reviews(business.id));
    const responses = await Promise.all(promises);
    const reviews = responses
        .map(res => res.jsonBody.reviews[0])
        .map(singleReview => ({ user: singleReview.user.name, text: singleReview.text }));
    console.log(reviews);
    const resultWithReviews = result.map((business, index) => ({
        ...business,
        review: reviews[index]
    }));
    return resultWithReviews;
}
app.get('/api/business-info', async (req, res) => {
    const response = await client.search(searchRequest);
    const result = response.jsonBody.businesses.map(b => ({
        id: b.id,
        name: b.name,
        address: b.location.display_address.join(", ")
    }));
    const resultWithReviews = await withReviews(result);
    res.json({ status: 'success', result: resultWithReviews })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))