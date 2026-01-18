const db = require("../database/connection");
const bcrypt = require("bcryptjs");
const ClientModel = require("../Models/ClientModel");

class ClientRepository {

  async getClientsRepo() {
      const sql = "SELECT * FROM CLIENTS WHERE role_id = ? AND status = ?";
      const [result] = await db.query(sql, [2, 'active']);
      const resultMapped = result.map(row => ClientModel.fromRow(row));
      return resultMapped;
  }

  async getClientByIdRepo(id) {
      const sql = "SELECT * FROM CLIENTS WHERE client_id = ? AND status = ?";
      const [result] = await db.query(sql, [id, 'active']);
      return result[0] ? ClientModel.fromRow(result[0]) : null;
  }

  async getClientByUsernameRepo(username) {
      const sql = "SELECT username FROM CLIENTS WHERE username = ? AND status = ?";
      const [result] = await db.query(sql, [username, 'active']);
      return result[0];
  }

  async checkClientUserNameRepo(username) {
      const sql = "SELECT client_id FROM clients WHERE username = ? AND status = ?";
      const [result] = await db.query(sql, [username, 'active']);
      return result[0];
  }

  async checkClientEmailRepo(email) {
      const sql = "SELECT client_id FROM clients WHERE email = ? AND status = ?";
      const [result] = await db.query(sql, [email, 'active']);
      return result[0];
  }

  async insertClientRepo(client) {
      const hashedPass = await bcrypt.hash(client.password, 10);
      const sql =
        "INSERT INTO CLIENTS (role_id,username,first_name,last_name,phone_number,email,password,address) VALUES (?,?,?,?,?,?,?,?)";
      const [result] = await db.query(sql, [
        2,
        client.username,
        client.firstName,
        client.lastName,
        client.phoneNumber,
        client.email,
        hashedPass,
        client.address,
      ]);
      return result;
  }

  async authenticateClientRepo(client) {
      const sql = "SELECT * FROM CLIENTS WHERE username = ? AND status = ?";
      const [result] = await db.query(sql, [client.username, 'active']);
      return result[0] ? ClientModel.fromRow(result[0]) : null;
  }

  async updateClientRepo(client, clientId) {
    const sql = `UPDATE clients SET username = ?, first_name = ?, last_name = ?, phone_number = ?, address = ? WHERE client_id = ?`;
      const [result] = await db.query(sql, [
        client.username,
        client.firstName,
        client.lastName,
        client.phoneNumber,
        client.address,
        clientId,
      ]);
      return result;
  }

  async deleteClientRepo(clientId) {
        const sql = 'UPDATE CLIENTS SET status = ? WHERE client_id = ? AND status = ?';
        const [result] = await db.query(sql, ['inactive', clientId, 'active']);
        return result;
  }
}

module.exports = ClientRepository;
