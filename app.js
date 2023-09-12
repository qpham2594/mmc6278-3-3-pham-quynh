require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

// TODO: import the getCityInfo and getJobs functions from util.js
const {getCityInfo,getJobs} = require ('./util.js')

// TODO: Statically serve the public folder
app.use(express.static('public'))

// TODO: declare the GET route /api/city/:city
// This endpoint should call getCityInfo and getJobs and return
// the result as JSON.
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)


app.get('/api/city/:city', async (req, res) => {
    const city = req.params.city;
    const cityInfo = await getCityInfo(city);
    const jobs = await getJobs(city);

    // Check if either cityInfo or jobs is valid (truthy)
    if (cityInfo || jobs) {
        // Return the data as JSON
        res.json({ cityInfo, jobs });
    } else {
        // If no city info or jobs are found, return a 404 status with an error message
        res.status(404).json({ error: 'Information is not available.' });
    }
});


module.exports = app
