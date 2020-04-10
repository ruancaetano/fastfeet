import { DataTypes, Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        filename: DataTypes.STRING,
        originalname: DataTypes.STRING,
        path: {
          type: DataTypes.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.filename}`;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default File;
