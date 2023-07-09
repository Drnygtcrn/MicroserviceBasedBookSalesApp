const { DegerlendirmeModel} = require("../models");

class DegerlendirmeRepository {
    
    async CreateReview({ User, Book, rating ,comment }) {
        try {
          const review = new DegerlendirmeModel({User, Book, rating ,comment});
          console.log(User);
          console.log(Book);
          const reviewResult = await review.save();
          return reviewResult;
        } catch (err) {
          console.log("Error ==========");
          console.log(err);
          throw err; 
        }
      }
      
      async reviews() {
        try {
          return await DegerlendirmeModel.find();
        } catch (err) {
          console.log("Error ========= Productlar Getirelemedi");
          console.log(err);
          throw err; 
        }
      }
      
      async FindByProducts(ProductID) {
        try {                                        //findOne tek nesne getirir. Örneğin ID için bunu kullan
          const existingReviews = await DegerlendirmeModel.find({ 'Book.proid': ProductID });
          return existingReviews; 
        } catch (err) {
          console.log("Error ========= review getirilemedi");
          console.log(err);
          throw err; 
        }
      }

      async DeleteComment(commentId) {
        try {                                        
          const existingReviews = await DegerlendirmeModel.deleteOne({ _id : commentId });
          return existingReviews; 
        } catch (err) {
          console.log("Error ========= review getirilemedi");
          console.log(err);
          throw err; 
        }
      }

      async UpdateComment({commentId, comment, rating}) {
        try {                                        
          const existingReviews = await DegerlendirmeModel.findOne({ _id : commentId });
          if (comment != null){
            existingReviews.comment = comment;
          }
          if (rating != null ){
            existingReviews.rating = rating;
          }
          await existingReviews.save();
          return existingReviews; 
        } catch (err) {
          console.log("Error ========= review getirilemedi");
          console.log(err);
          throw err; 
        }
      }
      
      async FindByCustomers(CustomerID) {
        try {                                        
          const existingReviews = await DegerlendirmeModel.find({ 'User.UserId': CustomerID });
          return existingReviews; 
        } catch (err) {
          console.log("Error ========= review getirilemedi");
          console.log(err);
          throw err; 
        }
    }
    
  
  
}

module.exports = DegerlendirmeRepository;
