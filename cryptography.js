const CryptoJS = require('crypto-js')
const bcrypt = require('bcryptjs')
/**
 * hash of the string
 * @param {String} text Text
 * @return {String} The hash of the string
 */
function hash(text) {
    return bcrypt.hashSync(text, 10)
}
/**
 * compares the string with a hash
 * @param {*} text 
 * @param {*} hash 
 * @returns {Boolean} True if the string is equal to the hash
 */
function compareHash(text, hash) {
    const res = bcrypt.compareSync(text, hash)
    return res;
}
/**
 * Encrypts a string using AES
 * @param {String} text The string to be encrypted
 * @returns {String} The encrypted string (base64)
 */
function encryptString(text) {
    const result = CryptoJS.AES.encrypt(text, process.env.AES_KEY, { iv: process.env.AES_IV }).toString()
    return result;
}

/**
 * Decrypts a string using AES
 * @param {String} text The string to be decrypted
 * @returns {String} The decrypted string
 */
 function decryptString(text) {
    const result = CryptoJS.AES.decrypt(text, process.env.AES_KEY, { iv: process.env.AES_IV }).toString(CryptoJS.enc.Utf8)
    return result;
}
/**
 * @param {String} text 
 * @returns {String}
 */
function SHA256hash(text) {
    return CryptoJS.SHA256(text);
}

module.exports = {
    hash,
    compareHash,
    encryptString,
    decryptString,
    SHA256hash
}