import { Client } from "minio";
import { DirType } from "@services/folderService";
import { Buffer } from "buffer";

class MinoService {
	getNameAndPath({ userId, fileId }: { userId: number; fileId: number }) {
		const bucketName = "bucket-" + userId;
		const filePath = String(fileId);

		return { bucketName, filePath };
	}

	async createBucket({ userId, mino }: { userId: number; mino: Client }) {
		const { bucketName } = this.getNameAndPath({ userId, fileId: 0 });

		return mino.makeBucket(bucketName, "us-east-1", (err) => {});
	}

	async uploadFile(props: { parentFolder: DirType; mino: Client; data: Buffer; fileId: number; userId: number }) {
		const { fileId, parentFolder, mino, data, userId } = props;
		const { bucketName, filePath } = this.getNameAndPath({ userId, fileId });

		const status = await mino.putObject(bucketName, filePath, data);

		if (status.etag) {
			const { filesId: idList } = parentFolder.dataValues;
			const filesId = idList ? [...idList, fileId] : [fileId];

			await parentFolder.update({ filesId });
		}
	}

	downloadFile({ mino, fileId, userId }: { mino: Client; fileId: number; userId: number }) {
		const { bucketName, filePath } = this.getNameAndPath({ userId, fileId });

		return mino.getObject(bucketName, filePath);
	}

	async deleteFile({ userId, fileId, mino }: { userId: number; fileId: number; mino: Client }) {
		const { bucketName, filePath } = this.getNameAndPath({ userId, fileId });

		return mino.removeObject(bucketName, filePath);
	}
}

export default new MinoService();
