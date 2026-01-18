const { format } = require("date-fns");
const db = require("../database/connection");
const ProductModel = require("../Models/ProductModel");
class ProductRepositotry {

  async getProductsRepo() {
    const sql = `
        SELECT 
          p.product_id,
          p.name,
          p.price,
          p.stock_quantity,
          ps.availability_status_name AS availability_status,
          c.category_name,
          p.features,
          GROUP_CONCAT(pi.image_url ORDER BY pi.image_id SEPARATOR ',') AS image_urls
        FROM 
          products p
        JOIN 
          categories c ON p.category_id = c.category_id
        JOIN 
          product_statuses ps ON p.availability_status_id = ps.availability_status_id
        LEFT JOIN 
          product_images pi ON p.product_id = pi.product_id
        GROUP BY 
          p.product_id, 
          p.name, 
          p.price, 
          p.stock_quantity, 
          availability_status, 
          c.category_name, 
          p.features;
      `;
    const [products] = await db.query(sql);
    return products.map(ProductModel.fromRow);
  }

  async getProductsByCategoryRepo(category) {
    const sql = `
      SELECT 
        p.product_id,
        p.name,
        p.price,
        p.stock_quantity,
        ps.availability_status_name AS availability_status,
        c.category_name,
        p.features,
        GROUP_CONCAT(pi.image_url ORDER BY pi.image_id SEPARATOR ',') AS image_urls
      FROM 
        products p
      JOIN 
        categories c ON p.category_id = c.category_id
      JOIN 
        product_statuses ps ON p.availability_status_id = ps.availability_status_id
      LEFT JOIN 
        product_images pi ON p.product_id = pi.product_id
      WHERE
        LOWER(c.category_name) LIKE LOWER(?)
      GROUP BY 
        p.product_id, 
        p.name, 
        p.price, 
        p.stock_quantity, 
        ps.availability_status_name, 
        c.category_name, 
        p.features
    `;
    const likeCategory = `%${category}%`;
    const [products] = await db.query(sql, [likeCategory]);
    return products.map(ProductModel.fromRow);;
  }

async getProductByIdRepo(pId) {
  const sql = `
      SELECT 
        product_id, 
        name, 
        price, 
        stock_quantity, 
        availability_status_name AS availability_status, 
        category_name, 
        features, 
        created_at, 
        image_url 
      FROM 
        products 
      JOIN 
        product_images USING(product_id) 
      JOIN 
        product_statuses USING(availability_status_id) 
      JOIN 
        categories USING(category_id) 
      WHERE 
        product_id = ?;
    `;
  const [result] = await db.query(sql, [pId]);

  return result.map(row => ({
    productId: row.product_id,
    name: row.name,
    price: row.price,
    stockQuantity: row.stock_quantity,
    availabilityStatus: row.availability_status,
    categoryName: row.category_name,
    features: row.features,
    createdAt: row.created_at,
    imageUrl: row.image_url,
  }));
}



  async getProductByNameRepo(name) {
    const sql = `
      SELECT 
        p.product_id,
        p.name,
        p.price,
        p.stock_quantity,
        ps.availability_status_name AS availability_status,
        c.category_name,
        p.features,
        GROUP_CONCAT(pi.image_url ORDER BY pi.image_id SEPARATOR ',') AS image_urls
      FROM 
        products p
      JOIN 
        categories c ON p.category_id = c.category_id
      JOIN 
        product_statuses ps ON p.availability_status_id = ps.availability_status_id
      LEFT JOIN 
        product_images pi ON p.product_id = pi.product_id
      WHERE 
        LOWER(p.name) LIKE LOWER(?)
      GROUP BY 
        p.product_id,
        p.name,
        p.price,
        p.stock_quantity,
        ps.availability_status_name,
        c.category_name,
        p.features
    `;
    const likeName = `%${name}%`;
    const [products] = await db.query(sql, [likeName]);
    if(!products[0]){
      return null
    }
    return ProductModel.fromRow(products[0]);
  }

  async getProductByNameAndCategoryRepo(name, category) {
    const sql = `
      SELECT 
        p.product_id,
        p.name,
        p.price,
        p.stock_quantity,
        ps.availability_status_name AS availability_status,
        c.category_name,
        p.features,
        GROUP_CONCAT(pi.image_url ORDER BY pi.image_id SEPARATOR ',') AS image_urls
      FROM 
        products p
      JOIN 
        categories c ON p.category_id = c.category_id
      JOIN 
        product_statuses ps ON p.availability_status_id = ps.availability_status_id
      LEFT JOIN 
        product_images pi ON p.product_id = pi.product_id
      WHERE 
        LOWER(p.name) LIKE LOWER(?)
        AND LOWER(c.category_name) = LOWER(?)
      GROUP BY 
        p.product_id,
        p.name,
        p.price,
        p.stock_quantity,
        ps.availability_status_name,
        c.category_name,
        p.features
    `;
    const likeName = `%${name}%`;
    const [products] = await db.query(sql, [likeName, category]);
   return products.map(ProductModel.fromRow);;
  }

  async updateProductQuantityRepo(prodId, newQuantity) {
    const sql = "UPDATE products SET stock_quantity = ? WHERE product_id = ?";
    const [result] = await db.query(sql, [newQuantity, prodId]);
    return result;
  }

  async getProductQuantityByIdRepo(prodId) {
    const sql = "SELECT stock_quantity from products WHERE product_id = ?";
    const [result] = await db.query(sql, [prodId]);
    if(!result[0]){
      return null;
    }
    return {
      stockQuantity:result[0].stock_quantity
    };
  }

  async updateProductStatusRepo(status, prodId) {
    const sql = "UPDATE products SET availability_status_id = ? WHERE product_id = ?";
    const [result] = await db.query(sql, [status, prodId]);
    return result;
  }

  async getProductPriceByIdRepo(pId){
    const sql = 'SELECT price FROM products WHERE product_id = ?';
    const [result] = await db.query(sql, [pId]);
    return result[0];
  }

}

module.exports = ProductRepositotry;
