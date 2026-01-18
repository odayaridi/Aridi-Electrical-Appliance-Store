class ProductModel {
  constructor(productId, name, price, stockQuantity, availabilityStatus, categoryName, features, imageUrls) {
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.stockQuantity = stockQuantity;
    this.availabilityStatus = availabilityStatus;
    this.categoryName = categoryName;
    this.features = features;
    this.imageUrls = imageUrls;
  }

  static fromRow(row) {
    return new ProductModel(
      row.product_id,
      row.name,
      row.price,
      row.stock_quantity,
      row.availability_status,
      row.category_name,
      row.features,
      row.image_urls
    );
  }
}

module.exports = ProductModel;
