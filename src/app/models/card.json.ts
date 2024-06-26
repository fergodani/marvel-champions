export interface CardJson {
    id?: number | null;
    pack_code?: string | null;
    pack_name?: string | null;
    subname?: string | null;
    cost?: number | null;
    boost?: number | null;
    spoiler?: number | null;
    type_code?: string | null;
    type_name?: string | null;
    duplicate_of_code?: string | null;
    duplicate_of_name?: string | null;
    faction_code?: string | null;
    resource_mental?: number | null;
    resource_energy?: number | null;
    resource_physical?: number | null;
    resource_wild?: number | null;
    thwart_cost?: number | null;
    scheme?: number | null;
    stage?: number | null;
    faction_name?: string | null;
    card_set_code?: string | null;
    card_set_name?: string | null;
    card_set_type_name_code?: string;
    linked_to_code?: string | null;
    linked_to_name?: string | null;
    position?: number | null;
    code?: string | null;
    set_position?: number | null;
    name?: string | null;
    real_name?: string | null;
    text?: string | null;
    real_text?: string | null;
    quantity?: number | null;
    hand_size?: number | null;
    health?: number | null;
    health_per_hero?: boolean | null;
    thwart?: number | null;
    attack?: number | null;
    attack_cost?: number | null;
    defense_cost?: number | null;
    recover?: number | null;
    recover_cost?: number | null;
    base_threat?: number | null;
    escalation_threat?: number | null;
    threat?: number | null;
    back_text?: string | null;
    back_flavor?: string | null;
    backimagesrc?: string | null;
    scheme_crisis?: number | null;
    scheme_hazard?: number | null;
    scheme_acceleration?: number | null;
    deck_requirements?: null;
    deck_options?: null;
    restrictions?: null;
    illustrator?: string | null;
    defense?: number | null;
    base_threat_fixed?: boolean | null;
    escalation_threat_fixed?: boolean | null;
    threat_fixed?: boolean | null;
    deck_limit?: number | null;
    traits?: string | null;
    real_traits?: string | null;
    meta?: MetaData | null;
    flavor?: string | null;
    is_unique?: boolean | null;
    hidden?: boolean | null;
    permanent?: boolean | null;
    double_sided?: boolean | null;
    octgn_id?: string | null;
    attack_star?: boolean | null;
    thwart_star?: boolean | null;
    defense_star?: boolean | null;
    health_star?: boolean | null;
    recover_star?: boolean | null;
    scheme_star?: boolean | null;
    boost_star?: boolean | null;
    threat_star?: boolean | null;
    escalation_threat_star?: boolean | null;
    url?: string | null;
    back_name?: string | null;
    imagesrc?: string | null;
    linked_card?: CardJson | null;
    duplicated_by?: string[] | null;
}

interface MetaData {
    colors?: string[] | null;
    offset?: string | null;
}