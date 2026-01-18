const HttpError = require("../utils/HttpError");

class ContactRequestService{
    constructor(contactRequestRepo){
        this.contactRequestRepo = contactRequestRepo;
    }


    async getAllContactRequestsService() {
        const response = await this.contactRequestRepo.getAllContactRequestsRepo();
        if(!response){
            throw new HttpError();
        }
        return response;
    }

    async getContactRequestsByNameService(fullName){
        if(!fullName){
            throw new HttpError('Full name is required', 400);
        }
        const response = await this.contactRequestRepo.getContactRequestsByNameRepo(fullName);
        if(!response){
            throw new HttpError('No contact requests found for this name', 404);
        }
        return response;
    }


    async insertContactRequestService(contactReq){
        const response = await this.contactRequestRepo.insertContactRequestRepo(contactReq);
        if(!response || response.affectedRows === 0) {
            throw new HttpError('Unexpected error while inserting the contact request',500);
        }
        return {
            requestId: response.insertId,
            clientId: contactReq.clientId,
            fullName: contactReq.fullName,
            message: contactReq.message
        }
    }
}


module.exports = ContactRequestService;