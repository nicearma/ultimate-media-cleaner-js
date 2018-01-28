export class File {

  id?: number;

  name: string;

  status: any;

  directory: string;

  src: string;

  url: string;

  size: number;

  type: any;

  sizeName?: string;

  width?: number;

  height?: number;

  sizes?: { [size: string]: File };

}
