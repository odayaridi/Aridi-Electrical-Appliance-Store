class ContactRequest {
    constructor(requestId, clientId, fullName, subject, message, createdAt) {
        this.requestId = requestId;
        this.clientId = clientId;
        this.fullName = fullName;
        this.subject = subject;
        this.message = message;
        this.createdAt = createdAt;
    }

    static fromRow(row) {
        return new ContactRequest(
            row.request_id,
            row.client_id,
            row.full_name,
            row.subject,
            row.message,
            row.created_at
        );
    }
}

module.exports = ContactRequest;
