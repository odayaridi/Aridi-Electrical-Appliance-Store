class ProductReviewModel {
  constructor(reviewId, username, productName, reviewText, createdAt) {
    this.reviewId = reviewId;
    this.username = username;
    this.productName = productName;
    this.reviewText = reviewText;
    this.createdAt = createdAt;
  }

  static fromRow(row) {
    return new ProductReviewModel(
      row.review_id,
      row.username,
      row.name,        // productName comes from 'name' column
      row.review_text,
      row.created_at
    );
  }
}

module.exports = ProductReviewModel;
