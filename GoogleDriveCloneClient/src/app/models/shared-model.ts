export interface ISharedToUser{
    ownerUsername: string;
    sharedUsername: string[];
    fullPath: string;
    url: string;
    shortUrl: string;
    isFolder: boolean;
    name: string;
}

export class SharedToUser implements ISharedToUser{
    ownerUsername: string;
    sharedUsername: string[] = [];
    fullPath: string;
    url: string;
    shortUrl: string;
    isFolder: boolean;
    name: string;    
}