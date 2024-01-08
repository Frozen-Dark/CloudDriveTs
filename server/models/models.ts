import { DataTypes, Op, Sequelize } from "sequelize";
import { ModelStatic, Model, Optional } from "sequelize";
import sequelize from "@db";
import ApiError from "@error/ApiError";

interface UserAttributes {
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

interface FolderAttributes {
	id: number;
	userId: number;
	folderName: string;
	parentId: number | null;
	hasLink?: boolean;
	foldersId?: Array<number>;
	filesId?: Array<number>;
}

interface FolderCreationAttributes extends Optional<FolderAttributes, "id"> {
	id?: number;
}

interface FileAttributes {
	id: number;
	userId: number;
	fileName: string;
	size: number;
	extension: string;
	parentId: number;
	hasLink: boolean;
}

interface FileCreationAttributes extends Optional<FileAttributes, "id" | "hasLink"> {
	id?: number;
	hasLink?: boolean;
}

interface TokenAttributes {
	id: number;
	userId: number;
	refreshToken: string;
	ip: string;
	platform: string;
	browser: string;
	browserVersion?: string;
	updatedAt: Date;
}

interface TokenCreationAttributes extends Optional<TokenAttributes, "id" | "updatedAt"> {
	id?: number;
	updatedAt?: Date;
}

export enum EditType {
	NONE = "none",
	PART = "part",
	FULL = "full"
}

export enum AccessType {
	GENERAL = "general",
	LOGGED = "logged",
	PRIVATE = "private"
}

interface SharedLinkAttributes {
	id: number;
	folderId?: number;
	fileId?: number;
	accessType?: AccessType;
	editType?: EditType;
	allowedUsersId?: number[];
	expiryDate: Date;
	link: string;
}

type SharedLinkCreationAttributes = Optional<SharedLinkAttributes, "id">;

interface SharedLinkUsersAttributes {
	id: number;
	userId: number;
	sharedLinkId: number;
}

interface SharedLinkUsersCreationAttributes extends Optional<SharedLinkUsersAttributes, "id"> {
	id?: number;
}

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
		folderName: { type: DataTypes.STRING, allowNull: false },
		parentId: { type: DataTypes.INTEGER },
		foldersId: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
		filesId: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
		hasLink: { type: DataTypes.BOOLEAN, defaultValue: false },
		isFavorites: { type: DataTypes.BOOLEAN, defaultValue: false }
	},
	{
		indexes: [
			{
				name: "IDX_FOLDER_USERID",
				fields: ["userId"]
			},
			{
				name: "IDX_FOLDERNAME_PARENTID",
				fields: ["folderName", "parentId"],
				unique: true // не допустит две папки с одинаковым именем
			}
		],
		hooks: {
			beforeUpdate: async (folder) => {
				// Проверка на наличие папки с таким же именем в родительской папке
				const { folderName, parentId, id, userId } = folder.dataValues;

				const duplicateFolder = await Folder.findOne({
					where: {
						id: { [Op.ne]: id }, // Исключение id текущей папки из поиска
						userId,
						parentId,
						folderName
					}
				});
				if (duplicateFolder) {
					throw ApiError.badRequest("Папка с таким именем уже существует в этой родительской папке");
				}
			}
		}
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
		parentId: { type: DataTypes.INTEGER, references: { model: Folder, key: "id" } },
		hasLink: { type: DataTypes.BOOLEAN, defaultValue: false },
		isFavorites: { type: DataTypes.BOOLEAN, defaultValue: false }
	},
	{
		indexes: [
			{
				name: "IDX_FILES_USERID",
				fields: ["userId"]
			},
			{
				name: "IDX_FILENAME_PARENTID_EXTENSION",
				fields: ["fileName", "parentId", "extension"],
				unique: true // не допустит два одинаковых файла с одинаковым именем и расширением в одной папке
			}
		],
		hooks: {
			beforeUpdate: async (file) => {
				// Проверка на наличие файла с таким же именем и расширением в папке
				const duplicateFile = await File.findOne({
					where: {
						fileName: file.dataValues.fileName,
						extension: file.dataValues.extension,
						parentId: file.dataValues.parentId,
						id: { [Op.ne]: file.dataValues.id } // Исключение текущего файла из поиска
					}
				});
				if (duplicateFile) {
					throw ApiError.badRequest("Файл с таким именем и расширением уже существует в этой папке");
				}
			}
		}
	}
);

const Token: ModelStatic<Model<TokenAttributes, TokenCreationAttributes>> = sequelize.define(
	"token",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		userId: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
		refreshToken: { type: DataTypes.STRING },
		ip: { type: DataTypes.STRING },
		platform: { type: DataTypes.STRING },
		browser: { type: DataTypes.STRING },
		browserVersion: { type: DataTypes.STRING }
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
		link: { type: DataTypes.STRING, unique: true },
		accessType: {
			type: DataTypes.ENUM("general", "logged", "private"),
			defaultValue: "logged"
		},
		editType: {
			type: DataTypes.ENUM("none", "part", "full"),
			defaultValue: "none"
		},
		expiryDate: { type: DataTypes.DATE }
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
					throw ApiError.badRequest("Только одно из полей folderId или fileId может быть заполнено");
				}
				if (!sharedLink.folderId && !sharedLink.fileId) {
					throw ApiError.badRequest("Одно из полей folderId или fileId должно быть заполнено");
				}
			},
			beforeUpdate: (sharedLink: any) => {
				if (sharedLink.folderId && sharedLink.fileId) {
					throw ApiError.badRequest("Только одно из полей folderId или fileId может быть заполнено");
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
			sharedLinkId: { type: DataTypes.INTEGER, references: { model: SharedLink, key: "id" } },
			allowedUsersId: {
				type: DataTypes.ARRAY(DataTypes.INTEGER),
				allowNull: true,
				references: { model: "Users", key: "id" }
			}
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
Folder.hasMany(File, { foreignKey: "parentId" });
File.belongsTo(Folder, { foreignKey: "parentId" });

// Связь папка / папка (родительская и дочерние)
Folder.hasMany(Folder, { foreignKey: "parentId", as: "Subfolders" });
Folder.belongsTo(Folder, { foreignKey: "parentId", as: "ParentFolder" });

export { User, Folder, File, Token, SharedLink, SharedLinkUsers };

export {
	UserAttributes,
	UserCreationAttributes,
	FolderAttributes,
	FolderCreationAttributes,
	FileAttributes,
	FileCreationAttributes,
	TokenAttributes,
	TokenCreationAttributes,
	SharedLinkAttributes,
	SharedLinkCreationAttributes,
	SharedLinkUsersAttributes,
	SharedLinkUsersCreationAttributes
};
