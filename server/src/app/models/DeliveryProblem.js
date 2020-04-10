import { DataTypes, Model } from 'sequelize';

class DeliveryProblem extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
  }
}

export default DeliveryProblem;
