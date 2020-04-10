import { DataTypes, Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.NUMBER,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        complement: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Recipient;
