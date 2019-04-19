const env = require('./env')

let resUrl
let mp3FilePath
let dbHost
let dbUser
let dbPwd
if (env === 'dev') {
    resUrl = 'http://192.168.31.62:8090'
    mp3FilePath = 'D:\\workspace\\ebook-resource\\mp3'
    dbHost = 'localhost'
    dbUser = 'root'
    dbPwd = 'akp666'
} else if (env === 'prod') {
    resUrl = 'http://47.112.192.129'
    mp3FilePath = '/root/nginx/upload/mp3'
    dbHost = '47.112.192.129'
    dbUser = 'root'
    dbPwd = 'Akp666.'
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
    category,
    dbHost,
    dbUser,
    dbPwd,
    mp3FilePath
}