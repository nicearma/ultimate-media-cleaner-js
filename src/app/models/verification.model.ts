export class Verification {
  id: number;
  name: string;
  status: string;

  sizes?: { [size: string]: VerificationImage };
}

export class VerificationImage extends Verification {
  sizeName: string;
}
