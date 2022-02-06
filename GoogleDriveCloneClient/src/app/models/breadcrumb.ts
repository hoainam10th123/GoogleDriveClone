import { v4 as uuidv4 } from 'uuid';

export interface IBreadcrumb{
    id: string;
    name: string;
    fullPath: string;
}

export class Breadcrumb implements IBreadcrumb {
    name: string;
    fullPath: string;
    id: string;
    
    constructor(_name: string, _fullPath: string){
        this.name = _name;
        this.fullPath = _fullPath;
        this.id = uuidv4();
    }
}