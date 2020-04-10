import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        passwordHash: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  isPasswordValid(password) {
    return bcrypt.compare(password, this.passwordHash);
  }
}

export default User;
