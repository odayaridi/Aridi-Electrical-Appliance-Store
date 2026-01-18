class ContactRequestController {
    constructor(contactRequestService){
        this.contactRequestService = contactRequestService;
    }
    
    async getAllContactRequestsController(req,res){
        const data = await this.contactRequestService.getAllContactRequestsService();
        if(data.length !== 0){
            res.status(200).json({success:'true',message:'Contact Requests are retrieved successfully',data});
        }
        else{
            res.status(200).json({success:'true',message:'There are no contact requests to retrieve',data});
        }
    }


    async getContactRequestsByNameController(req,res){
        const {fullName} = req.query;
        const data = await this.contactRequestService.getContactRequestsByNameService(fullName);
         if(data.length !== 0){
            res.status(200).json({success:'true',message:'Contact Request(s) are retrieved successfully for this client',data});
        }
        else{
            res.status(200).json({success:'true',message:'There are no contact requests to retrieve for this client',data});
        }
    }

    async insertContactRequestController(req,res){
           const contactReq = req.body;
           const data = await this.contactRequestService.insertContactRequestService(contactReq);
           res.status(201).json({success:'true',message:'Contact Request is submitted successfully',data});
    }
}

module.exports = ContactRequestController;