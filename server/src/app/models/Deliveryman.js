import { DataTypes, Model } from 'sequelize';

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'deliverymen',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatarId', as: 'avatar' });
  }
}

export default Deliveryman;
