"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedLinkUsers = exports.SharedLink = exports.Token = exports.File = exports.Folder = exports.User = void 0;
const db_1 = __importDefault(require("../db"));
const sequelize_1 = require("sequelize");
const User = db_1.default.define("user", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: sequelize_1.DataTypes.STRING, unique: true },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    storageLimit: { type: sequelize_1.DataTypes.BIGINT, defaultValue: 10000000000 },
    userStorage: { type: sequelize_1.DataTypes.BIGINT, defaultValue: 0 },
    isActivated: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    activationLink: { type: sequelize_1.DataTypes.STRING },
    avatar: { type: sequelize_1.DataTypes.STRING },
    userName: { type: sequelize_1.DataTypes.STRING }
}, {
    indexes: [{
            name: "IDX_USERS_EMAIL",
            fields: ["email"] // дополнительные индексы, по которым будет производиться поиск
        }]
});
exports.User = User;
const Folder = db_1.default.define("folder", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: sequelize_1.DataTypes.INTEGER, references: { model: User, key: "id" } },
    folderName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    path: { type: sequelize_1.DataTypes.STRING(512) },
    parentId: { type: sequelize_1.DataTypes.INTEGER },
    hasLink: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
}, {
    indexes: [{
            name: "IDX_FOLDER_USERID",
            fields: ["userId"]
        }, {
            name: "IDX_FOLDERNAME_PARENTID",
            fields: ["folderName", "parentId"],
            unique: true
        }]
});
exports.Folder = Folder;
const File = db_1.default.define("file", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: sequelize_1.DataTypes.INTEGER, references: { model: User, key: "id" } },
    fileName: { type: sequelize_1.DataTypes.STRING },
    size: { type: sequelize_1.DataTypes.BIGINT },
    extension: { type: sequelize_1.DataTypes.STRING },
    folderId: { type: sequelize_1.DataTypes.INTEGER, references: { model: Folder, key: "id" } },
    hasLink: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
}, {
    indexes: [{
            name: 'IDX_FILES_USERID',
            fields: ['userId']
        }, {
            name: "IDX_FILENAME_FOLDERID_EXTENSION",
            fields: ["fileName", "folderId", "extension"],
            unique: true
        }]
});
exports.File = File;
const Token = db_1.default.define("token", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: sequelize_1.DataTypes.INTEGER, references: { model: User, key: "id" } },
    refreshToken: { type: sequelize_1.DataTypes.STRING },
    deviceInfo: { type: sequelize_1.DataTypes.STRING },
    ip: { type: sequelize_1.DataTypes.STRING } // IP-адрес устройства
}, {
    indexes: [{
            name: 'IDX_TOKEN_REFRESH_TOKEN',
            fields: ['refreshToken']
        }, {
            name: 'IDX_TOKEN_USERID',
            fields: ['userId']
        }]
});
exports.Token = Token;
const SharedLink = db_1.default.define("sharedLink", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    folderId: { type: sequelize_1.DataTypes.INTEGER, allowNull: true, references: { model: Folder, key: "id" } },
    fileId: { type: sequelize_1.DataTypes.INTEGER, allowNull: true, references: { model: File, key: "id" } },
    isPublic: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    expiryDate: { type: sequelize_1.DataTypes.DATE },
    link: { type: sequelize_1.DataTypes.STRING, unique: true }
}, {
    indexes: [{
            name: 'IDX_SHARED_LINK_FOLDERID',
            fields: ['folderId']
        }, {
            name: 'IDX_SHARED_LINK_FILEID',
            fields: ['fileId']
        }],
    hooks: {
        beforeCreate: (sharedLink) => {
            if (sharedLink.folderId && sharedLink.fileId) {
                throw new Error("Только одно из полей folderId или fileId может быть заполнено!");
            }
            if (!sharedLink.folderId && !sharedLink.fileId) {
                throw new Error("Одно из полей folderId или fileId должно быть заполнено!");
            }
        },
        beforeUpdate: (sharedLink) => {
            if (sharedLink.folderId && sharedLink.fileId) {
                throw new Error("Только одно из полей folderId или fileId может быть заполнено!");
            }
        }
    }
});
exports.SharedLink = SharedLink;
const SharedLinkUsers = db_1.default.define("sharedLinkUsers", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: sequelize_1.DataTypes.INTEGER, references: { model: User, key: "id" } },
    sharedLinkId: { type: sequelize_1.DataTypes.INTEGER, references: { model: SharedLink, key: "id" } }
}, {
    indexes: [{
            name: 'IDX_SHARED_LINK_USER_USERID',
            fields: ['userId']
        }]
});
exports.SharedLinkUsers = SharedLinkUsers;
// Каждый LinkUsers относиться к одному пользователю
SharedLinkUsers.belongsTo(User, { foreignKey: "userId" });
User.hasMany(SharedLinkUsers, { foreignKey: "userId" });
// Одна ссылка может давать доступ множеству пользователей
SharedLink.hasMany(SharedLinkUsers, { foreignKey: "sharedLinkId" });
SharedLinkUsers.belongsTo(SharedLink, { foreignKey: "sharedLinkId" });
// File имеет одну ссылку 
File.hasOne(SharedLink, { foreignKey: "itemId", constraints: false, scope: { type: "file" } });
SharedLink.belongsTo(File, { foreignKey: "itemId", constraints: false });
// Folder имеет одну ссылку
Folder.hasOne(SharedLink, { foreignKey: "itemId", constraints: false, scope: { type: "folder" } });
SharedLink.belongsTo(Folder, { foreignKey: "itemId", constraints: false });
// У одного пользователя может быть множество токенов
User.hasMany(Token, { foreignKey: "userId", onDelete: "CASCADE" });
Token.belongsTo(User, { foreignKey: "userId" });
// У одного пользователя может быть множество папок
User.hasMany(File, { foreignKey: "userId", onDelete: "CASCADE" });
File.belongsTo(User, { foreignKey: "userId" });
// У одного пользователя может быть множество файлов
User.hasMany(Folder, { foreignKey: 'userId', onDelete: 'CASCADE' });
Folder.belongsTo(User, { foreignKey: 'userId' });
// Связь папка / Файл
Folder.hasMany(File, { foreignKey: "folderId", onDelete: "CASCADE" });
File.belongsTo(Folder, { foreignKey: "folderId" });
// Связь папка / папка (родительская и дочерние)
Folder.hasMany(Folder, { foreignKey: "parentId", as: "Subfolders" });
Folder.belongsTo(Folder, { foreignKey: 'parentId', as: 'ParentFolder' });
