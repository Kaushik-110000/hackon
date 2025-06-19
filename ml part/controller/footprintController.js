
const CarbonFootprintCalculator = require('../utils/CarbonFootprintCalculator');

const calculator = new CarbonFootprintCalculator();

exports.calculateFootprint = (req, res) => {
  try {
    const { productData, sustainabilityFeatures, purchaseAmount } = req.body;

    const carbonFootprint = calculator.calculateProductFootprint(productData);
    const greenScore = calculator.calculategreenScore(carbonFootprint, sustainabilityFeatures || {});
    const greenCoins = calculator.calculateGreenCoinsReward(greenScore, purchaseAmount || 0);

    return res.status(200).json({
      carbonFootprint,
      greenScore,
      greenCoins
    });
  } catch (err) {
    console.error('Error calculating footprint:', err);
    return res.status(500).json({ error: 'Failed to calculate footprint' });
  }
};
