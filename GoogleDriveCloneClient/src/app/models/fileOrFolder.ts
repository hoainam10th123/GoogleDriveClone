export interface IFileOrFolder{    
    path: string;
    fullPath: string;
    name: string;
    isFolder: boolean;
}

export interface IFileOrFolderRename{    
    path: string;
    fullPath: string;
    name: string;
    isFolder: boolean;
    oldFullPath: string;
}