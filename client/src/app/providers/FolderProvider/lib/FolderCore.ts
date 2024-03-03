class FolderCore {
	public static setParentId(parentId: number | null | undefined): void {
		if (!parentId) {
			localStorage.removeItem("parentId");
		} else {
			localStorage.setItem("parentId", String(parentId));
		}
	}
}

export default FolderCore;
