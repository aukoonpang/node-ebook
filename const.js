const env = require('./env')

let resUrl
if (env === 'dev') {
    resUrl = 'http://192.168.31.230:8090'
} else if (env === 'prod') {
    resUrl = 'http://47.112.192.129'
}

const category = [
    'Biomedicine',
    'BusinessandManagement',
    'ComputerScience',
    'EarthSciences',
    'Economics',
    'Engineering',
    'Education',
    'Environment',
    'Geography',
    'History',
    'Laws',
    'LifeSciences',
    'Literature',
    'SocialSciences',
    'MaterialsScience',
    'Mathematics',
    'MedicineAndPublicHealth',
    'Philosophy',
    'Physics',
    'PoliticalScienceAndInternationalRelations',
    'Psychology',
    'Statistics'
]


module.exports = {
    resUrl,
    category
}