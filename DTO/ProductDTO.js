const ToProperResponseDTO = (product,imagesArray)=>{
    return {
            productId: product.productId,
            name: product.name,
            price: product.price,
            stockQuantity: product.stockQuantity,
            availabilityStatus: product.availabilityStatus,
            categoryName: product.categoryName,
            features: product.features,
            created_at: product.createdAt,
            images: imagesArray
    }
}

module.exports = ToProperResponseDTO