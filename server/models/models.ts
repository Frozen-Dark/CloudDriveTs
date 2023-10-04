import { DataTypes } from "sequelize";
import { ModelStatic, Model, Optional } from "sequelize";
import sequelize from "@db";

export interface UserAttributes {
	id: number;
	email: string;
	password: string;
	storageLimit?: number;
	userStorage?: number;
	isActivated?: boolean;
	activationLink?: string;
	avatar?: string;
	userName?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {
	id?: number;
}

export interface FolderAttributes {
	id?: number;
	userId: number;
	folderName: string;
	path?: string;
	parentId?: number;
	hasLink?: boolean;
}

export interface FolderCreationAttributes extends Optional<FolderAttributes, "id"> {
	userId: number;
	folderName: string;
}

interface FileAttributes {
	id?: number;
	userId: number;
	fileName: string;
	size: number;
	extension: string;
	folderId: number;
	hasLink?: boolean;
}

interface FileCreationAttributes extends Optional<FileAttributes, "id"> {}

export interface TokenAttributes {
	id?: number;
	userId: number;
	refreshToken: string;
	deviceInfo?: string;
	ip?: string;
}

interface TokenCreationAttributes extends Optional<TokenAttributes, "id"> {}

interface SharedLinkAttributes {
	id: number;
	folderId?: number;
	fileId?: number;
	isPublic?: boolean;
	expiryDate?: Date;
	link: string;
}

interface SharedLinkCreationAttributes extends Optional<SharedLinkAttributes, "id"> {}

interface SharedLinkUsersAttributes {
	id: number;
	userId: number;
	sharedLinkId: number;
}

interface SharedLinkUsersCreationAttributes extends Optional<SharedLinkUsersAttributes, "id"> {}

const User: ModelStatic<Model<UserAttributes, UserCreationAttributes>> = sequelize.define(
	"user",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		email: { type: DataTypes.STRING, unique: true },
		password: { type: DataTypes.STRING, allowNull: false }, //hashed pass
		storageLimit: { type: DataTypes.BIGINT, defaultValue: 10000000000 }, // байты = 10 GB
		userStorage: { type: DataTypes.BIGINT, defaultValue: 0 },
		isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
		activationLink: { type: DataTypes.STRING },
		avatar: { type: DataTypes.STRING },
		userName: { type: DataTypes.STRING }
	},
	{
		indexes: [
			{
				name: "IDX_USERS_EMAIL",
				fields: ["email"] // дополнительные индексы, по которым будет производиться поиск
			}
		]
	}
);

const Folder: ModelStatic<Model<FolderAttributes, FolderCreationAttributes>> = sequelize.define(
	"folder",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		userId: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
		folderName: { type: DataTypes.STRING, allowNull: false }, // Использование ID папки как имени на жестком диске
		path: { type: DataTypes.STRING(512) },
		parentId: { type: DataTypes.INTEGER },
		hasLink: { type: DataTypes.BOOLEAN, defaultValue: false }
	},
	{
		indexes: [
			{
				name: "IDX_FOLDER_USERID",
				fields: ["userId"]
			},
			{
				name: "IDX_FOLDERNAME_PARENTID",
				fields: ["folderName", "parentId"], // не допустит две отдинаковых папки с одинаком именем
				unique: true
			}
		]
	}
);

const File: ModelStatic<Model<FileAttributes, FileCreationAttributes>> = sequelize.define(
	"file",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		userId: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
		fileName: { type: DataTypes.STRING },
		size: { type: DataTypes.BIGINT },
		extension: { type: DataTypes.STRING },
		folderId: { type: DataTypes.INTEGER, references: { model: Folder, key: "id" } },
		hasLink: { type: DataTypes.BOOLEAN, defaultValue: false }
	},
	{
		indexes: [
			{
				name: "IDX_FILES_USERID",
				fields: ["userId"]
			},
			{
				name: "IDX_FILENAME_FOLDERID_EXTENSION",
				fields: ["fileName", "folderId", "extension"], // не допустит два одинаковых файла с одинакомы именем и расширением в одной папке
				unique: true
			}
		]
	}
);

const Token: ModelStatic<Model<TokenAttributes, TokenCreationAttributes>> = sequelize.define(
	"token",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		userId: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
		refreshToken: { type: DataTypes.STRING },
		deviceInfo: { type: DataTypes.STRING }, // Информация об устройстве пользователя
		ip: { type: DataTypes.STRING } // IP-адрес устройства
	},
	{
		indexes: [
			{
				name: "IDX_TOKEN_REFRESH_TOKEN",
				fields: ["refreshToken"]
			},
			{
				name: "IDX_TOKEN_USERID",
				fields: ["userId"]
			}
		]
	}
);

const SharedLink: ModelStatic<Model<SharedLinkAttributes, SharedLinkCreationAttributes>> = sequelize.define(
	"sharedLink",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		folderId: { type: DataTypes.INTEGER, allowNull: true, references: { model: Folder, key: "id" } },
		fileId: { type: DataTypes.INTEGER, allowNull: true, references: { model: File, key: "id" } },
		isPublic: { type: DataTypes.BOOLEAN, defaultValue: false },
		expiryDate: { type: DataTypes.DATE },
		link: { type: DataTypes.STRING, unique: true }
	},
	{
		indexes: [
			{
				name: "IDX_SHARED_LINK_FOLDERID",
				fields: ["folderId"]
			},
			{
				name: "IDX_SHARED_LINK_FILEID",
				fields: ["fileId"]
			}
		],
		hooks: {
			beforeCreate: (sharedLink: any) => {
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
	}
);

const SharedLinkUsers: ModelStatic<Model<SharedLinkUsersAttributes, SharedLinkUsersCreationAttributes>> =
	sequelize.define(
		"sharedLinkUsers",
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			userId: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
			sharedLinkId: { type: DataTypes.INTEGER, references: { model: SharedLink, key: "id" } }
		},
		{
			indexes: [
				{
					name: "IDX_SHARED_LINK_USER_USERID",
					fields: ["userId"]
				}
			]
		}
	);

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
User.hasMany(Folder, { foreignKey: "userId", onDelete: "CASCADE" });
Folder.belongsTo(User, { foreignKey: "userId" });

// Связь папка / Файл
Folder.hasMany(File, { foreignKey: "folderId", onDelete: "CASCADE" });
File.belongsTo(Folder, { foreignKey: "folderId" });

// Связь папка / папка (родительская и дочерние)
Folder.hasMany(Folder, { foreignKey: "parentId", as: "Subfolders" });
Folder.belongsTo(Folder, { foreignKey: "parentId", as: "ParentFolder" });

export { User, Folder, File, Token, SharedLink, SharedLinkUsers };
