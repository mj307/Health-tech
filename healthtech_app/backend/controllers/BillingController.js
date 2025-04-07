const Billing = require('../models/Billing');

// Get billing info for the authenticated user
exports.getBillingInfo = async (req, res) => {
  try {
    const billing = await Billing.findOne({ user: req.user.id });
    if (!billing) return res.status(404).json({ msg: 'Billing info not found' });
    res.json(billing);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Create or update billing info
exports.upsertBillingInfo = async (req, res) => {
  try {
    const { amount, status, dueDate } = req.body;
    let billing = await Billing.findOne({ user: req.user.id });
    if (billing) {
      billing.amount = amount || billing.amount;
      billing.status = status || billing.status;
      billing.dueDate = dueDate || billing.dueDate;
    } else {
      billing = new Billing({
        user: req.user.id,
        amount,
        status,
        dueDate,
      });
    }

    await billing.save();
    res.json(billing);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
