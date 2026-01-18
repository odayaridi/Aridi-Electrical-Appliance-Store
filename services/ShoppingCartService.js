const HttpError = require("../utils/HttpError");

class ShoppingCartService {
  constructor(shoppingCartRepository) {
    this.shoppingCartRepository = shoppingCartRepository;
  }

  async insertShoppingCartService(clientId) {
      const response = await this.shoppingCartRepository.insertShoppingCartRepo(
        clientId
      );
      if (!response || response.affectedRows == 0) {
        throw new HttpError();
      }
      return {
        cartId: response.insertId,
        clientId: clientId,
      };
  }

  async deleteShoppingCartService(cartId, clientId) {
      const clientCart =
        await this.shoppingCartRepository.getShoppingCartByIdsRepo(
          cartId,
          clientId
        );
      if (!clientCart) {
        throw new HttpError(
          "The shopping cart for this client is not found!",
          404
        );
      }
      const response = await this.shoppingCartRepository.deleteShoppingCartRepo(cartId);
      if (!response || response.affectedRows == 0) {
        throw new HttpError();
      }
  }
}

module.exports = ShoppingCartService;
