-- TODO: Add index on name
CREATE TABLE public.communities (
    id uuid NOT NULL,
    name text COLLATE pg_catalog."default",
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT communities_pkey PRIMARY KEY (id)
);

CREATE TABLE public.persons (
    id uuid NOT NULL,
    main_community_id uuid,
    key text COLLATE pg_catalog."default",
    public_key text COLLATE pg_catalog."default",
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT persons_pkey PRIMARY KEY (id),
    CONSTRAINT fk_community_id FOREIGN KEY (main_community_id)
        REFERENCES public.communities (id)
);

CREATE TABLE public.persons_communities (
    id uuid NOT NULL,
    person_id uuid NOT NULL,
    community_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT persons_communities_pkey PRIMARY KEY (id),
    CONSTRAINT fk_community_id FOREIGN KEY (community_id)
        REFERENCES public.communities (id),
    CONSTRAINT fk_person_id FOREIGN KEY (person_id)
        REFERENCES public.persons (id)
);


CREATE TABLE public.persons_persons (
    id uuid NOT NULL,
    referrer_id uuid,
    person_id uuid,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT persons_persons_pkey PRIMARY KEY (id),
    CONSTRAINT fk_person_id FOREIGN KEY (person_id)
        REFERENCES public.persons (id),
    CONSTRAINT fk_referrer_id FOREIGN KEY (referrer_id)
        REFERENCES public.persons (id)
);


CREATE TABLE public.answers (
    id uuid NOT NULL,
    person_id uuid NOT NULL,
    q1 int,
    q2 int,
    q3 int,
    q4 int,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT answers_pkey PRIMARY KEY (id),
    CONSTRAINT fk_person_id FOREIGN KEY (person_id)
        REFERENCES public.persons (id)
);


ALTER TABLE public.communities OWNER TO postgres;
ALTER TABLE public.persons OWNER TO postgres;
ALTER TABLE public.persons_communities OWNER TO postgres;
ALTER TABLE public.persons_persons OWNER TO postgres;
ALTER TABLE public.answers OWNER TO postgres;