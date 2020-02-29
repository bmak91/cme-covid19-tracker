export class Community {
    community: string;
    communityId?: string;
}

export class Survey {
    key: string;
    community: Community;
    answers: boolean[];
    phone: string
}