const db = require("../database/connection");
const ContactRequest = require("../Models/ContactRequestModel");


class ContactRequestRepository {

    async insertContactRequestRepo(contactReq) {
        const sql = 'INSERT INTO contact_requests(client_id, full_name, subject, message) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(sql, [
            contactReq.clientId,
            contactReq.fullName,
            contactReq.subject,
            contactReq.message
        ]);
        return result;
    }

    async getAllContactRequestsRepo() {
        const sql = 'SELECT * FROM contact_requests';
        const [result] = await db.query(sql);
        return result.map(row => ContactRequest.fromRow(row));
    }

    async getContactRequestsByNameRepo(fullName) {
        const sql = 'SELECT * FROM contact_requests WHERE full_name = ?';
        const [result] = await db.query(sql, [fullName]);
        return result.map(row => ContactRequest.fromRow(row));
    }
}

module.exports = ContactRequestRepository;
