
const CarbonFootprintCalculator = require('../utils/CarbonFootprintCalculator');

const calculator = new CarbonFootprintCalculator();

exports.calculateFootprint = (req, res) => {
  try {
    const { productData, sustainabilityFeatures, purchaseAmount } = req.body;

    const carbonFootprint = calculator.calculateProductFootprint(productData);
    const ecoScore = calculator.calculateEcoScore(carbonFootprint, sustainabilityFeatures || {});
    const greenCoins = calculator.calculateGreenCoinsReward(ecoScore, purchaseAmount || 0);

    return res.status(200).json({
      carbonFootprint,
      ecoScore,
      greenCoins
    });
  } catch (err) {
    console.error('Error calculating footprint:', err);
    return res.status(500).json({ error: 'Failed to calculate footprint' });
  }
};
