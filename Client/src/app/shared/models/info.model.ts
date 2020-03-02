export class Info {
    connNb: number;
    riskState: string;
}

export class Community {
    id?: string;
    name: string;
}

export class Survey {
    key: string;
   // existingKey: string;
    answers: number[];
}

export class Key{
    privateKey: string;
    publicKey: string;
}