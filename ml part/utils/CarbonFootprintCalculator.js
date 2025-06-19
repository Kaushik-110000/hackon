
class CarbonFootprintCalculator {
  constructor() {
    this.emissionFactors = {
      rawMaterials: {
        steel: 2.9,
        aluminum: 11.5,
        plastic: 6.0,
        cotton: 5.89,
        wood: 0.39,
        recycledSteel: 0.5,
        recycledPlastic: 1.2,
        organicCotton: 3.8,
        bamboo: 0.25
      },
      energy: {
        grid: 0.485, // kg CO2/kWh
        renewable: 0.05, // kg CO2/kWh
        coal: 0.96,
        naturalGas: 0.35
      },
      transportation: {
        truck: 0.089, // kg CO2/km/kg
        ship: 0.014,
        plane: 0.5,
        rail: 0.024
      },
      packaging: {
        plastic: 6.0,
        cardboard: 0.9,
        recycledCardboard: 0.6,
        biodegradable: 1.2,
        minimal: 0.1
      }
    };
  }

  calculateRawMaterialsFootprint(materials) {
    let totalFootprint = 0;
    
    for (const material of materials) {
      const factor = this.emissionFactors.rawMaterials[material.type] || 2.0;
      totalFootprint += material.weight * factor;
    }
    
    return totalFootprint;
  }

  calculateManufacturingFootprint(energyConsumption, energyType = 'grid') {
    const factor = this.emissionFactors.energy[energyType] || this.emissionFactors.energy.grid;
    return energyConsumption * factor;
  }

  
  calculateTransportationFootprint(routes) {
    let totalFootprint = 0;
    
    for (const route of routes) {
      const factor = this.emissionFactors.transportation[route.mode] || 0.089;
      totalFootprint += route.distance * route.weight * factor;
    }
    
    return totalFootprint;
  }


  calculatePackagingFootprint(packagingType, weight) {
    const factor = this.emissionFactors.packaging[packagingType] || 1.0;
    return weight * factor;
  }


  calculateDisposalFootprint(weight, isRecyclable, isBiodegradable) {
    if (isRecyclable) return weight * 0.1;
    if (isBiodegradable) return weight * 0.05;
    return weight * 0.8; 
  }

  calculateProductFootprint(productData) {
    const {
      materials = [],
      manufacturing = {},
      transportation = [],
      packaging = {},
      disposal = {},
      productWeight = 1
    } = productData;

    const rawMaterialsFootprint = this.calculateRawMaterialsFootprint(materials);
    
    const manufacturingFootprint = this.calculateManufacturingFootprint(
      manufacturing.energyConsumption || 10,
      manufacturing.energyType
    );
    
    const transportationFootprint = this.calculateTransportationFootprint(transportation);
    
    const packagingFootprint = this.calculatePackagingFootprint(
      packaging.type || 'cardboard',
      packaging.weight || 0.2
    );
    
    const disposalFootprint = this.calculateDisposalFootprint(
      productWeight,
      disposal.isRecyclable || false,
      disposal.isBiodegradable || false
    );

    return {
      rawMaterials: rawMaterialsFootprint,
      manufacturing: manufacturingFootprint,
      transportation: transportationFootprint,
      packaging: packagingFootprint,
      disposal: disposalFootprint,
      total: rawMaterialsFootprint + manufacturingFootprint + transportationFootprint + packagingFootprint + disposalFootprint
    };
  }

  calculategreenScore(carbonFootprint, sustainabilityFeatures = {}) {
    let score = 50; // Base score

    const totalFootprint = carbonFootprint.total;
    if (totalFootprint < 1) score += 30;
    else if (totalFootprint < 2) score += 20;
    else if (totalFootprint < 5) score += 10;
    else if (totalFootprint > 10) score -= 20;

    if (sustainabilityFeatures.isRecyclable) score += 10;
    if (sustainabilityFeatures.isReusable) score += 15;
    if (sustainabilityFeatures.isBiodegradable) score += 10;
    if (sustainabilityFeatures.renewableEnergy) score += 15;
    if (sustainabilityFeatures.fairTrade) score += 10;
    if (sustainabilityFeatures.locallySourced) score += 8;
    if (sustainabilityFeatures.organicMaterials) score += 12;

    if (sustainabilityFeatures.recycledContent) {
      score += sustainabilityFeatures.recycledContent * 0.3;
    }

    switch (sustainabilityFeatures.packagingType) {
      case 'minimal':
        score += 15;
        break;
      case 'biodegradable':
        score += 12;
        break;
      case 'recycled':
        score += 10;
        break;
      case 'plastic':
        score -= 10;
        break;
    }

    return Math.min(Math.max(Math.round(score), 0), 100);
  }

  calculateGreenCoinsReward(greenScore, purchaseAmount) {
    const baseCoins = Math.floor(greenScore / 10);
    const bonusCoins = Math.floor(purchaseAmount / 10) * (greenScore > 80 ? 2 : 1);
    return baseCoins + bonusCoins;
  }
}

module.exports = CarbonFootprintCalculator;