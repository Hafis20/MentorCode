const Wallet = require("../models/walletModel");

const getUserWallet = async (req, res) => {
  try {
    const userId = req.query.userId;
    let wallet = await Wallet.findOne(
      { user_id: userId },
      { user_id: 0, _id: 0 }
    );
    if (!wallet) {
      wallet = new Wallet({
        user_id: userId,
        balance: 0,
        transaction_history: [],
      });
      await wallet.save();
    }
    res.status(200).json(wallet);   // Send the wallet amount
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUserWallet,
};
