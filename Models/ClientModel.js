class ClientModel {
    constructor(clientId, roleId, username, firstName, lastName, phoneNumber, email, password, address, status, createdAt, updatedAt) {
        this.clientId = clientId;
        this.roleId = roleId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.address = address;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromRow(row) {
        return new ClientModel(
            row.client_id,
            row.role_id,
            row.username,
            row.first_name,
            row.last_name,
            row.phone_number,
            row.email,
            row.password,
            row.address,
            row.status,
            row.created_at,
            row.updated_at
        );
    }

    static toRow(client) {
        return {
            client_id: client.clientId,
            role_id: client.roleId,
            username: client.username,
            first_name: client.firstName,
            last_name: client.lastName,
            phone_number: client.phoneNumber,
            email: client.email,
            password: client.password,
            address: client.address,
            status: client.status,
            created_at: client.createdAt,
            updated_at: client.updatedAt
        };
    }
}

module.exports = ClientModel;
