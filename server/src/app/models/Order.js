import { DataTypes, Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        product: DataTypes.STRING,
        canceledAt: DataTypes.DATE,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'signatureId', as: 'signature' });
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliverymanId',
      as: 'deliveryman',
    });
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipientId',
      as: 'recipient',
    });
    this.hasMany(models.DeliveryProblem);
  }
}

export default Order;
