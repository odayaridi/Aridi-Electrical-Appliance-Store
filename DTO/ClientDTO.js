const toAdminClientDTO = (client) => {
    return {
        clientId: client.clientId,
        username: client.username,
        first_name: client.firstName,
        last_name: client.lastName,
        phone_number: client.phoneNumber,
        email: client.email,
        address: client.address,
        createdAt: client.createdAt,
    };
};

const toSelfClientDTO = (client) => {
    return {
        clientId: client.clientId,
        username: client.username,
        email: client.email,
    };
};


module.exports = {
    toAdminClientDTO,
    toSelfClientDTO
}