const router = require("express").Router();
const passport = require("passport");

const {
  createPurchaseOrder,
  editPurchaseOrder,
  cancelPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrderReport,
  GetPurchase_Orders_ProductsbyId
} = require("./PurchaseOrder.controller");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createPurchaseOrder
);

router.put("/edit", editPurchaseOrder);

/**
 * @swagger
 * /api/purchaseorder/cancel:
 *   put:
 *     tags:
 *       - Purchase Order
 *     summary: Cancel Purchase Order
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: properties to cancel purchasr order for provided purchase order id
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             Purchase_OrderId:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Successfully Cancelled the  purchase order
 *       404:
 *         description: Invalid Purchase Order Id, not found in db
 *       401:
 *         description: No auth token
 *       500:
 *         description: Internal server error! SQL error
 */
// Route to cancel the purchase order ------------------------>
router.put("/cancel", cancelPurchaseOrder);

router.post("/getpurchaseorders", getPurchaseOrders);

router.get("/getincomingpurchaseorder", getPurchaseOrderReport);

router.get("/getpurchaseorderbyid", GetPurchase_Orders_ProductsbyId);

module.exports = router;
