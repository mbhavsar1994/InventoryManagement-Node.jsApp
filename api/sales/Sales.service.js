const pool = require("../../Config/database");

module.exports = {
  //geting countries
  create_sales: (req, callBack) => {
    let sales=req.body;
    
    //let query=`SET @CustomerOrderId=?;SET @ProductId=?;SET @Price=?;SET @Quantity=?; SET @SubTotal=?;CALL AddSales(@CustomerOrderId,@ProductId,@Price,@Quantity,@SubTotal,@status,@Err_msg);select @status as status; select @Err_msg as Err_msg;`;
    console.log(sales.product);
  }
};
