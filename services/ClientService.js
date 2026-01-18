const HttpError = require("../utils/HttpError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { toAdminClientDTO, toSelfClientDTO } = require("../DTO/ClientDTO");
class ClientService {
  constructor(clientRepository,shoppingCartRepository) {
    this.clientRepository = clientRepository;
    this.shoppingCartRepository = shoppingCartRepository;
  }

  async getClientsService() {
      const clients = await this.clientRepository.getClientsRepo();
      const result = clients.map(toAdminClientDTO);
      return result;
  }

  async getClientByIdService(id) {
      const client = await this.clientRepository.getClientByIdRepo(id);
       if(!client){
        throw new HttpError('Client not found!',404);
      }
      return toAdminClientDTO(client);
  }

  async getClientByUsernameService(username) {
    const client = await this.clientRepository.getClientByUsernameRepo(username);
    if(!client){
        throw new HttpError('Client not found!',404);
    }
    return toAdminClientDTO(client);
  }

  async insertClientService(client) {
      const checkUserNameExists =await this.clientRepository.checkClientUserNameRepo(client.username);
      if (checkUserNameExists) {
        throw new HttpError("Client with this username already exists!", 400);
      }
      const checkEmailExists = await this.clientRepository.checkClientEmailRepo(
        client.email
      );
      if (checkEmailExists) {
        throw new HttpError("Client with this email already exists!", 400);
      }
      const result = await this.clientRepository.insertClientRepo(client);
      if(!result || result.affectedRows == 0){
           throw new HttpError()
      }
      const newClient = await this.clientRepository.getClientByIdRepo(
        result.insertId
      );
      return toSelfClientDTO(newClient);
  }

  // async authenticateClientService(client) {
  //     const response = await this.clientRepository.authenticateClientRepo(
  //       client
  //     );
  //     if (!response) {
  //       throw new HttpError("Invalid Username or Passsord!", 404);
  //     }
  //     const isMatch = await bcrypt.compare(client.password, response.password);
  //     if (!isMatch) {
  //       throw new HttpError("Invalid Username or password!", 401);
  //     }


  //     const role_name = response.role_id === 1 ? "Admin" : "User";
  //     const token = jwt.sign(
  //       { client_id: response.client_id, role_name },
  //       process.env.JWT_SECRET,
  //       { expiresIn: process.env.JWT_EXPIRES_IN } // e.g., '1h'
  //     );


  //     const cart = await this.shoppingCartRepository.getCartIdByClientIdRepo(response.client_id);
  //     let cartId;
  //     if(!cart){
  //       cartId = null;
  //     }
  //     else{
  //       cartId = cart.cart_id;
  //     }
  //     return {
  //       client_id: response.client_id,
  //       username: client.username,
  //       email: response.email,
  //       created_at: response.created_at,
  //       role_name,
  //       cart_id: cartId,
  //       token
  //     };
  // }

  async authenticateClientService(client) {
    const response = await this.clientRepository.authenticateClientRepo(client);
    if (!response) {
        throw new HttpError("Invalid Username or Passsord!", 404);
    }
    const isMatch = await bcrypt.compare(client.password, response.password);
    if (!isMatch) {
        throw new HttpError("Invalid Username or password!", 401);
    }

    const cart = await this.shoppingCartRepository.getCartIdByClientIdRepo(response.clientId);
    let cartId;
    if(!cart){
        cartId = null;
    }
    else{
        cartId = cart.cartId;
    }
    
    const roleName = response.roleId === 1 ? "Admin" : "User";
    const token = jwt.sign(
        { clientId: response.clientId, roleName },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN } // e.g., '1h'
    );

    return {
        clientId: response.clientId,
        username: client.username,
        roleName:roleName,
        email: response.email,
        roleName,  
        cartId: cartId,
        createdAt: response.createdAt,
        token,
    };
}


  async updateClientService(client,clientId) {
      const clientExits = await this.clientRepository.getClientByIdRepo(clientId);
      if(!clientExits){
        throw new HttpError('Client does not exist to update the fields',404);
      }
      const response = await this.clientRepository.updateClientRepo(client,clientId);
      if(!response || response.affectedRows==0){
        throw new HttpError();
      }
      return {
        username: client.username,
        firstName: client.firstName,
        lastName: client.lastName,
        phoneNumber: client.phoneNumber,
        address: client.address
      };
  }

  async deleteClientService(cId){
      const clientExits = await this.clientRepository.getClientByIdRepo(cId);
      if(!clientExits){
        throw new HttpError('Client does not exist to delete!',404);
      }
        const response = await this.clientRepository.deleteClientRepo(cId);
        if(!response || response.affectedRows==0){
          throw new HttpError();
        }
  }

}
module.exports = ClientService;
