class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }

    async getClientsController(req, res) {
            const data = await this.clientService.getClientsService();
            if(data.length !== 0){
                res.status(200).json({success:'true',message:'Clients retrieved successfully',data});
            }
            else{
                 res.status(200).json({success:'true',message:'No clients exist to retrieve',data});
            }
    }

    async getClientByIdController(req,res) {
            const {id} = req.params;
            const data = await this.clientService.getClientByIdService(id);
            res.status(200).json({success:'true' , message: 'Client retrieved successfully', data})
    }

    async getClientByUsernameController(req,res) {
        const {username} = req.query;
        const data = await this.clientService.getClientByUsernameService(username);
        res.status(200).json({success:'true' , message: 'Client retrieved successfully', data});
    }

    async insertClientController(req,res) {
            const client = req.body;
            const data = await this.clientService.insertClientService(client);
            res.status(201).json({success:'true',message: "Client inserted successfullty",data})
    }

    async authenticateClientContoller(req,res) {
            const client = req.body;
            const response = await this.clientService.authenticateClientService(client);
            res.cookie("token", response.token, {
            httpOnly: true,
            secure: true, // true in production
            sameSite: "strict", // helps protect against CSRF
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            });
            // Don't include the token in the JSON response anymore
            res.status(201).json({
                success:true,
                message: "Client authenticated successfully",
                data :{
                    clientId: response.clientId,
                    roleName: response.roleName,
                    username: response.username,
                    email: response.email,
                    cartId: response.cartId,
                    createdAt: response.createdAt
                }
            });
    }

    async updateClientController(req,res) {
            const {cId} = req.params;
            const client = req.body;
            const data = await this.clientService.updateClientService(client,cId);
            res.status(200).json({success:'true', message: 'Client updated successfully', data})
    }

    async deleteClientController(req,res) {
            const {cId} = req.params;
            await this.clientService.deleteClientService(cId);
            res.status(204).send();
    }
}

module.exports = ClientController;
