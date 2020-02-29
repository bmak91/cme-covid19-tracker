export class Info {
    community: string;
    communityId?: string;
}

export class Community {
    id?: string;
    name: string;
}

export class Survey {
    key: string;
    community: Community;
    answers: boolean[];
    phone: string
}