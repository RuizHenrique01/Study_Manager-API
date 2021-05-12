const env = {
    port: process.env.PORT || 3000,
    urlDB: process.env.URL_DB || "mongodb+srv://dbStudyManager:manager1234567@studymanagercluster.lgeyo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
}

module.exports = env